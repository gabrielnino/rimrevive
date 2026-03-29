# Deployment Guide

## Overview

RimRevive Vancouver can be deployed using multiple methods, from local development to full production deployment with Docker and Nginx. This guide covers all deployment options.

## Deployment Options

### 1. Local Development
- Quick setup for development and testing
- No Docker required
- Hot reload enabled

### 2. Docker Development
- Containerized development environment
- Consistent across all machines
- Easy to share with team

### 3. Production (Docker + Nginx)
- Full production deployment
- SSL/TLS with Let's Encrypt
- Reverse proxy with Nginx
- Automated CI/CD pipeline

### 4. Manual Production Build
- Traditional Node.js deployment
- Suitable for platforms like Vercel, AWS, etc.

## Prerequisites

### For All Deployments
- **Node.js**: 18.x or higher
- **npm**: 10.x or higher
- **Git**: For version control

### For Docker Deployments
- **Docker**: 20.x or higher
- **Docker Compose**: 2.x or higher (optional)

### For Production Deployment
- **VPS/Cloud Server**: Ubuntu 22.04+ recommended
- **Domain Name**: Configured with DNS A record
- **SSL Certificate**: Let's Encrypt (automated)
- **Nginx**: As reverse proxy

## Local Development Deployment

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd rimrevive
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment
```bash
cp .env.local.example .env.local
# Edit .env.local with your configuration
```

### Step 4: Run Development Server
```bash
npm run dev
```

### Step 5: Access Application
- Open `http://localhost:3000` in browser
- Hot reload enabled for code changes

### Local Development Notes
- WhatsApp simulation mode enabled by default
- JSON database file created in project root
- TypeScript compilation on the fly

## Docker Development Deployment

### Step 1: Build Docker Image
```bash
docker build -t rimrevive-dev .
```

### Step 2: Run Container
```bash
docker run -p 3000:3000 \
  -v $(pwd):/app \
  -v /app/node_modules \
  --env-file .env.local \
  rimrevive-dev npm run dev
```

### Step 3: Access Application
- Open `http://localhost:3000` in browser
- Changes to local files reflected in container

### Docker Development with Compose
Create `docker-compose.dev.yml`:
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - WHATSAPP_SIMULATE=true
    command: npm run dev
```

Run with:
```bash
docker-compose -f docker-compose.dev.yml up
```

## Production Deployment (Docker + Nginx)

### Architecture Overview
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Internet      │────▶│   Nginx (443)   │────▶│   Next.js App   │
│                 │     │                 │     │   (Docker)      │
│   HTTPS         │     │   SSL/TLS       │     │   Port 3000     │
│   Domain        │     │   Reverse Proxy │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Step 1: Server Preparation

**Update System**:
```bash
sudo apt update && sudo apt upgrade -y
```

**Install Docker**:
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

**Install Docker Compose**:
```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### Step 2: Deploy Next.js Application

**Clone Repository**:
```bash
git clone https://github.com/your-org/rimrevive.git
cd rimrevive
```

**Build Production Image**:
```bash
docker build -t rimrevive-prod .
```

**Run Production Container**:
```bash
docker run -d \
  --name rimrevive-app \
  --network web-network \
  -p 3000:3000 \
  --restart unless-stopped \
  -v /data:/data \
  --env-file .env.production \
  rimrevive-prod
```

### Step 3: Configure Nginx Reverse Proxy

**Install Nginx**:
```bash
sudo apt install nginx -y
```

**Create Nginx Configuration** (`/etc/nginx/sites-available/rimrevive`):
```nginx
server {
    listen 80;
    server_name rimrevive.store;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name rimrevive.store;
    
    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/rimrevive.store/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/rimrevive.store/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Proxy to Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Static assets caching
    location /_next/static {
        proxy_cache_valid 200 365d;
        proxy_pass http://localhost:3000;
    }
}
```

**Enable Site**:
```bash
sudo ln -s /etc/nginx/sites-available/rimrevive /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 4: SSL/TLS with Let's Encrypt

**Install Certbot**:
```bash
sudo apt install certbot python3-certbot-nginx -y
```

**Obtain Certificate**:
```bash
sudo certbot --nginx -d rimrevive.store
```

**Auto-renewal** (already configured by Certbot):
```bash
sudo certbot renew --dry-run
```

### Step 5: Database Persistence

**Create Data Volume**:
```bash
sudo mkdir -p /data
sudo chown -R 1001:1001 /data
```

**Database File Location**:
- Production: `/data/rimrevive.json`
- Automatically created on first run

## Production Deployment Scripts

The project includes several deployment scripts:

### `deploy-all.sh`
Complete deployment script that:
1. Verifies project structure
2. Builds Docker image
3. Stops previous container
4. Runs new container
5. Configures Nginx proxy

**Usage**:
```bash
chmod +x deploy-all.sh
sudo ./deploy-all.sh
```

### `update-nginx-precise.sh`
Precise Nginx configuration updater:
- Extracts current Nginx configuration
- Inserts proxy configuration at correct location
- Validates configuration
- Reloads Nginx

**Usage**:
```bash
chmod +x update-nginx-precise.sh
sudo ./update-nginx-precise.sh
```

### `update-nginx-proxy.sh`
Alternative Nginx proxy updater (simpler approach).

### `build-docker.sh`
Docker build script with optimizations.

### `test-local.sh`
Local testing script.

## Docker Configuration

### Dockerfile Structure

**Multi-stage build**:
1. **Builder stage**: Installs dependencies and builds application
2. **Runner stage**: Minimal image with only production files

**Key Features**:
- Non-root user for security
- Alpine Linux for small image size
- Standalone output mode for Next.js
- Proper file permissions

### Building Optimized Image

```bash
docker build \
  --build-arg NODE_ENV=production \
  --build-arg NEXT_PUBLIC_SITE_URL=https://rimrevive.store \
  -t rimrevive:latest .
```

### Docker Compose for Production

Create `docker-compose.prod.yml`:
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - TWILIO_ACCOUNT_SID=${TWILIO_ACCOUNT_SID}
      - TWILIO_AUTH_TOKEN=${TWILIO_AUTH_TOKEN}
      - TWILIO_WHATSAPP_NUMBER=${TWILIO_WHATSAPP_NUMBER}
      - TWILIO_TO_NUMBER=${TWILIO_TO_NUMBER}
    volumes:
      - data:/data
    restart: unless-stopped
    networks:
      - web

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/ssl
    depends_on:
      - app
    restart: unless-stopped
    networks:
      - web

volumes:
  data:

networks:
  web:
    driver: bridge
```

## CI/CD Pipeline

### GitHub Actions Workflow

Located in `.github/workflows/ci.yml`:

**Jobs**:
1. **Test**: Runs on Node.js 18 and 20
   - Type checking with TypeScript
   - Build verification
   - Test execution (if tests exist)

2. **Docker**: Builds and pushes Docker image
   - Uses Docker Buildx for multi-platform support
   - Pushes to Docker Hub with latest and SHA tags
   - Caches layers for faster builds

3. **Deploy**: Production deployment (placeholder)
   - Can be extended with SSH deployment

### Pipeline Triggers
- **Push to main**: Full CI/CD pipeline
- **Pull request**: Test only

### Secrets Required
- `DOCKER_USERNAME`: Docker Hub username
- `DOCKER_PASSWORD`: Docker Hub password/token
- `SSH_PRIVATE_KEY`: For deployment (optional)
- `SERVER_HOST`: Deployment server (optional)

## Environment Configuration

### Production Environment File

Create `.env.production`:
```env
# Twilio WhatsApp
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=+1234567890
TWILIO_TO_NUMBER=+16723382258

# Application
NEXT_PUBLIC_SITE_URL=https://rimrevive.store
NEXT_PUBLIC_WHATSAPP_NUMBER=+16041234567
NODE_ENV=production

# WhatsApp Simulation (disable in production)
WHATSAPP_SIMULATE=false
```

### Environment Variables Reference

See `environment-variables.md` for complete reference.

## Database Management

### Production Database

**Location**: `/data/rimrevive.json`

**Backup Strategy**:
```bash
# Daily backup
0 2 * * * tar -czf /backup/rimrevive-$(date +\%Y\%m\%d).tar.gz /data/rimrevive.json
```

**Restore Database**:
```bash
tar -xzf /backup/rimrevive-20240329.tar.gz -C /data/
docker restart rimrevive-app
```

### Database Monitoring

**Check Database Size**:
```bash
ls -lh /data/rimrevive.json
```

**View Recent Leads**:
```bash
tail -100 /data/rimrevive.json | jq '.leads[-5:]'
```

## Monitoring and Maintenance

### Logging

**Application Logs**:
```bash
docker logs rimrevive-app --tail 50 -f
```

**Nginx Access Logs**:
```bash
tail -f /var/log/nginx/access.log
```

**Nginx Error Logs**:
```bash
tail -f /var/log/nginx/error.log
```

### Health Checks

**Application Health**:
```bash
curl -f https://rimrevive.store/api/submit-quote
```

**Database Health**:
```bash
docker exec rimrevive-app wc -l /data/rimrevive.json
```

### Performance Monitoring

**Resource Usage**:
```bash
docker stats rimrevive-app
```

**Response Times**:
```bash
curl -o /dev/null -s -w "%{time_total}\n" https://rimrevive.store
```

## Scaling Considerations

### Vertical Scaling
- Increase server RAM/CPU
- Adjust Node.js memory limits
- Optimize Nginx worker processes

### Horizontal Scaling
1. **Load Balancer**: Add HAProxy or AWS ALB
2. **Multiple Containers**: Run multiple Next.js instances
3. **Shared Database**: Replace JSON with PostgreSQL
4. **Session Storage**: Redis for session management

### Database Scaling
Current JSON database suitable for:
- Up to 10,000 leads
- Low concurrent writes
- Single instance deployment

For higher traffic, migrate to:
- PostgreSQL with connection pooling
- Redis for caching
- Database replication

## Security Considerations

### Docker Security
- Non-root user in container
- Read-only filesystem where possible
- Resource limits on containers
- Regular image updates

### Nginx Security
- SSL/TLS with strong ciphers
- Security headers
- Rate limiting
- Request size limits

### Application Security
- Environment variables for secrets
- Input validation
- HTTPS enforcement
- Regular dependency updates

## Troubleshooting

### Common Issues

**Application Won't Start**:
```bash
# Check logs
docker logs rimrevive-app

# Check port availability
netstat -tlnp | grep :3000

# Check environment variables
docker exec rimrevive-app printenv | grep TWILIO
```

**Nginx 502 Bad Gateway**:
```bash
# Check if Next.js is running
curl http://localhost:3000/api/submit-quote

# Check Nginx error logs
tail -f /var/log/nginx/error.log

# Check Docker network
docker network ls
docker network inspect web-network
```

**SSL Certificate Issues**:
```bash
# Test SSL
openssl s_client -connect rimrevive.store:443

# Renew certificate
sudo certbot renew --force-renewal
```

**Database Permission Issues**:
```bash
# Check permissions
ls -la /data/

# Fix permissions
sudo chown -R 1001:1001 /data
```

### Debug Commands

**Full System Check**:
```bash
./test-local.sh
```

**Docker Status**:
```bash
docker ps -a
docker images
docker volume ls
```

**Network Connectivity**:
```bash
# From host to container
curl http://localhost:3000

# From container to external
docker exec rimrevive-app curl -I https://api.twilio.com
```

## Backup and Recovery

### Backup Strategy

**Daily Backups**:
```bash
#!/bin/bash
BACKUP_DIR="/backup"
DATE=$(date +%Y%m%d)

# Backup database
cp /data/rimrevive.json "$BACKUP_DIR/rimrevive-$DATE.json"

# Backup Docker volumes
docker run --rm -v rimrevive_data:/data -v $BACKUP_DIR:/backup alpine \
  tar czf /backup/rimrevive-data-$DATE.tar.gz /data

# Keep 30 days of backups
find $BACKUP_DIR -name "rimrevive-*" -mtime +30 -delete
```

### Disaster Recovery

**Restore Procedure**:
1. Stop application
2. Restore database file
3. Restore Docker volumes
4. Start application
5. Verify functionality

## Cost Optimization

### Infrastructure Costs
- Use spot instances for non-critical components
- Implement auto-scaling
- Use Cloudflare CDN for static assets
- Optimize Docker image size

### Monitoring Costs
- Use open-source monitoring (Prometheus, Grafana)
- Implement log rotation
- Use structured logging to reduce volume

## Support and Maintenance

### Regular Maintenance Tasks

**Weekly**:
- Check application logs for errors
- Review server resource usage
- Backup verification

**Monthly**:
- Dependency updates
- Security patch application
- Performance review

**Quarterly**:
- SSL certificate renewal check
- Database optimization
- Architecture review

### Getting Help
- Check documentation first
- Review server logs
- Test with simplified configuration
- Contact development team

---

*Last Updated: March 29, 2026*