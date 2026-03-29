# Environment Variables Reference

## Overview

Environment variables are used to configure the RimRevive application for different environments (development, testing, production). This document provides a complete reference of all environment variables used in the project.

## Variable Categories

### 1. Twilio WhatsApp Configuration
### 2. Application Configuration
### 3. Database Configuration
### 4. Deployment Configuration
### 5. Feature Flags

## Complete Reference

### Twilio WhatsApp Configuration

#### `TWILIO_ACCOUNT_SID`
**Required**: Yes (for production WhatsApp functionality)
**Type**: String
**Default**: None
**Description**: Your Twilio Account SID. Found in the Twilio Console dashboard.
**Example**: `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
**Environment**: Production, Development (if real WhatsApp needed)

#### `TWILIO_AUTH_TOKEN`
**Required**: Yes (for production WhatsApp functionality)
**Type**: String
**Default**: None
**Description**: Your Twilio Auth Token. Found in the Twilio Console dashboard.
**Example**: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
**Environment**: Production, Development (if real WhatsApp needed)
**Security**: Highly sensitive - never commit to version control

#### `TWILIO_WHATSAPP_NUMBER`
**Required**: Yes (for production WhatsApp functionality)
**Type**: String
**Default**: None
**Description**: Your Twilio WhatsApp-enabled phone number in E.164 format.
**Example**: `+14155238886`
**Environment**: Production, Development (if real WhatsApp needed)

#### `TWILIO_TO_NUMBER`
**Required**: Yes (for production WhatsApp functionality)
**Type**: String
**Default**: `+16723382258`
**Description**: The business owner's phone number where WhatsApp notifications will be sent. In E.164 format.
**Example**: `+16041234567`
**Environment**: Production, Development

### Application Configuration

#### `NODE_ENV`
**Required**: No
**Type**: String
**Default**: `development`
**Allowed Values**: `development`, `production`, `test`
**Description**: Node.js environment mode. Affects logging, error messages, and some behaviors.
**Example**: `production`
**Environment**: All

#### `NEXT_PUBLIC_SITE_URL`
**Required**: Yes (for production)
**Type**: String
**Default**: `http://localhost:3000` (development)
**Description**: The public URL of your application. Used for generating absolute URLs in WhatsApp messages and other places.
**Example**: `https://rimrevive.store`
**Environment**: Production, Development

#### `NEXT_PUBLIC_WHATSAPP_NUMBER`
**Required**: No
**Type**: String
**Default**: `+16041234567`
**Description**: The WhatsApp number displayed to users for direct contact.
**Example**: `+16041234567`
**Environment**: All

#### `APP_URL`
**Required**: No
**Type**: String
**Default**: Same as `NEXT_PUBLIC_SITE_URL`
**Description**: Internal application URL. Used in WhatsApp message templates for admin links.
**Example**: `https://rimrevive.store`
**Environment**: Production, Development

### Database Configuration

#### `DB_PATH`
**Required**: No
**Type**: String
**Default**: 
  - Development: `./rimrevive.json` (project root)
  - Production: `/data/rimrevive.json`
**Description**: Path to the JSON database file.
**Example**: `/var/lib/rimrevive/data.json`
**Environment**: Production, Development (override if needed)

### Feature Flags

#### `WHATSAPP_SIMULATE`
**Required**: No
**Type**: Boolean
**Default**: `true` (development), `false` (production)
**Description**: When `true`, WhatsApp messages are logged to console instead of being sent via Twilio. Useful for development and testing.
**Example**: `true`
**Environment**: Development, Testing

#### `ENABLE_ADMIN_DASHBOARD`
**Required**: No
**Type**: Boolean
**Default**: `false`
**Description**: Feature flag to enable/disable the admin dashboard. Not currently implemented.
**Example**: `true`
**Environment**: Development

### Deployment Configuration

#### `PORT`
**Required**: No
**Type**: Number
**Default**: `3000`
**Description**: Port on which the Next.js application will run.
**Example**: `3000`
**Environment**: All

#### `HOSTNAME`
**Required**: No
**Type**: String
**Default**: `0.0.0.0`
**Description**: Hostname the application will bind to. Use `0.0.0.0` to accept connections from any IP.
**Example**: `0.0.0.0`
**Environment**: Docker deployments

#### `DATABASE_URL`
**Required**: No
**Type**: String
**Default**: None
**Description**: Connection string for a real database (PostgreSQL, MySQL). Currently not used as the app uses JSON file storage.
**Example**: `postgresql://user:password@localhost:5432/rimrevive`
**Environment**: Future use

## Environment-Specific Configurations

### Development Environment

**File**: `.env.local` (gitignored)

**Typical Configuration**:
```env
# Twilio (optional - simulation mode by default)
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=+1234567890
TWILIO_TO_NUMBER=+16723382258

# Application
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=+16041234567

# Features
WHATSAPP_SIMULATE=true
```

**Notes**:
- WhatsApp simulation mode enabled by default
- Localhost URLs
- Fake Twilio credentials can be used (simulation mode ignores them)

### Production Environment

**File**: `.env.production` (gitignored, deployed separately)

**Typical Configuration**:
```env
# Twilio (required)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_WHATSAPP_NUMBER=+14155238886
TWILIO_TO_NUMBER=+16041234567

# Application
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://rimrevive.store
NEXT_PUBLIC_WHATSAPP_NUMBER=+16041234567
APP_URL=https://rimrevive.store

# Features
WHATSAPP_SIMULATE=false

# Deployment
PORT=3000
HOSTNAME=0.0.0.0
```

**Notes**:
- Real Twilio credentials required
- HTTPS URLs
- Simulation mode disabled
- Database path defaults to `/data/rimrevive.json`

### Testing Environment

**File**: `.env.test` (optional)

**Typical Configuration**:
```env
NODE_ENV=test
WHATSAPP_SIMULATE=true
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Setting Up Environment Variables

### Local Development

1. Copy the example file:
```bash
cp .env.local.example .env.local
```

2. Edit `.env.local` with your configuration:
```bash
nano .env.local
```

3. Restart the development server if running:
```bash
npm run dev
```

### Docker Development

1. Create `.env.local` as above

2. Pass environment file to Docker:
```bash
docker run -p 3000:3000 --env-file .env.local rimrevive:latest
```

### Docker Compose

In `docker-compose.yml`:
```yaml
services:
  app:
    environment:
      - NODE_ENV=production
      - TWILIO_ACCOUNT_SID=${TWILIO_ACCOUNT_SID}
    env_file:
      - .env.production
```

### Production Deployment

**Option 1: Environment file on server**
```bash
# Create production environment file
sudo nano /opt/rimrevive/.env.production

# Set permissions
sudo chmod 600 /opt/rimrevive/.env.production
```

**Option 2: Docker secrets** (more secure):
```bash
echo "your_twilio_auth_token" | docker secret create twilio_auth_token -
```

**Option 3: Host environment variables**:
```bash
export TWILIO_ACCOUNT_SID="ACxxx"
export TWILIO_AUTH_TOKEN="xxx"
```

## Validation

### Required Variables Check

The application validates required variables on startup:

```typescript
// In lib/whatsapp.ts
if (!client || !fromNumber || !toNumber) {
  throw new Error('Configuración de WhatsApp incompleta')
}
```

### Development vs Production

**Development**:
- Missing Twilio credentials → simulation mode automatically enabled
- Localhost URLs accepted
- Verbose error messages

**Production**:
- Missing Twilio credentials → WhatsApp functionality disabled
- HTTPS required for public URLs
- Generic error messages

## Security Considerations

### Sensitive Variables

**High Sensitivity**:
- `TWILIO_AUTH_TOKEN` - equivalent to password
- `TWILIO_ACCOUNT_SID` - should also be protected

**Medium Sensitivity**:
- `TWILIO_WHATSAPP_NUMBER` - public but should not be exposed unnecessarily
- `TWILIO_TO_NUMBER` - business phone number

### Protection Measures

1. **Never commit to version control**
   - `.env.local` in `.gitignore`
   - Use `.env.example` for template

2. **File permissions**
   ```bash
   chmod 600 .env.production
   ```

3. **Docker secrets** (production)
   ```yaml
   secrets:
     twilio_auth_token:
       external: true
   ```

4. **Environment-specific files**
   - Development: `.env.local`
   - Production: `.env.production` (on server only)
   - Testing: `.env.test`

### Rotation Policy

**Twilio Credentials**:
- Rotate every 90 days
- Update environment variables
- Restart application

**Application URLs**:
- Update when domain changes
- Clear browser cache after changes

## Troubleshooting

### Common Issues

**"Configuración de WhatsApp incompleta" Error**:
```bash
# Check if variables are set
echo $TWILIO_ACCOUNT_SID

# Check .env file syntax
cat .env.production | grep -v "^#"

# Restart application to pick up changes
docker restart rimrevive-app
```

**WhatsApp Simulation Mode Always Active**:
```bash
# Check WHATSAPP_SIMULATE value
echo $WHATSAPP_SIMULATE

# Check if Twilio credentials are set
if [ -z "$TWILIO_ACCOUNT_SID" ]; then
  echo "Twilio credentials missing"
fi
```

**Wrong URLs in WhatsApp Messages**:
```bash
# Check NEXT_PUBLIC_SITE_URL
echo $NEXT_PUBLIC_SITE_URL

# Should be full URL with protocol
# Correct: https://rimrevive.store
# Incorrect: rimrevive.store
```

### Debug Commands

**List all environment variables**:
```bash
# In Docker container
docker exec rimrevive-app printenv | sort

# In local development
printenv | grep -E "(TWILIO|NEXT|NODE)" | sort
```

**Test Twilio connectivity**:
```bash
curl -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN \
  https://api.twilio.com/2010-04-01/Accounts.json
```

**Check variable precedence**:
```bash
# Docker Compose
docker-compose config

# Kubernetes
kubectl describe pod rimrevive-pod | grep -A5 Environment
```

## Best Practices

### 1. Use Different Files per Environment
- `.env.local` - local development
- `.env.production` - production server
- `.env.staging` - staging environment
- `.env.test` - testing

### 2. Template File
Keep `.env.example` in repository with:
- All required variables
- Example values
- Comments explaining each variable

### 3. Validation on Startup
Add startup validation script:
```javascript
// check-env.js
const required = ['TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN']
required.forEach(varName => {
  if (!process.env[varName]) {
    console.error(`Missing required environment variable: ${varName}`)
    process.exit(1)
  }
})
```

### 4. Documentation
- Keep this document updated
- Document new variables immediately
- Include examples and default values

### 5. Security
- Never log sensitive variables
- Use secrets management in production
- Regular credential rotation

## Adding New Environment Variables

### Step 1: Define Variable
1. Choose descriptive name in `SCREAMING_SNAKE_CASE`
2. Determine if public (prefix with `NEXT_PUBLIC_`) or private
3. Define type, default, and validation rules

### Step 2: Update Code
1. Add to TypeScript types if needed
2. Add validation where used
3. Add fallback/default value

### Step 3: Update Documentation
1. Add to this document
2. Update `.env.example`
3. Update deployment guides if needed

### Step 4: Deploy
1. Add to production environment
2. Test in staging first
3. Monitor for issues

## Example Files

### `.env.example` (Template)
```env
# Twilio WhatsApp Configuration
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_NUMBER=+14155238886
TWILIO_TO_NUMBER=+16041234567

# Application Configuration
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=+16041234567
APP_URL=http://localhost:3000

# Feature Flags
WHATSAPP_SIMULATE=true

# Deployment
PORT=3000
HOSTNAME=0.0.0.0
```

### `.env.production.example`
```env
# Production Twilio Configuration
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_WHATSAPP_NUMBER=+14155238886
TWILIO_TO_NUMBER=+16041234567

# Production Application
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://rimrevive.store
NEXT_PUBLIC_WHATSAPP_NUMBER=+16041234567
APP_URL=https://rimrevive.store

# Production Features
WHATSAPP_SIMULATE=false
```

## Related Documentation

- [Deployment Guide](./deployment.md) - Environment setup for deployment
- [Architecture Overview](./architecture.md) - How environment variables fit into architecture
- [API Reference](./api-reference.md) - API behavior based on environment

---

*Last Updated: March 29, 2026*