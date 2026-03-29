# Architecture Overview

## System Architecture

RimRevive Vancouver is a modern web application built with Next.js 14 (App Router) and TypeScript. The application follows a client-server architecture with server-side rendering for optimal performance and SEO.

### High-Level Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Client        │     │   Next.js App   │     │   External      │
│   (Browser)     │────▶│   (Node.js)     │────▶│   Services      │
│                 │     │                 │     │                 │
│ - React         │     │ - App Router    │     │ - Twilio API    │
│ - Tailwind CSS  │     │ - API Routes    │     │ (WhatsApp)      │
│                 │     │ - Server        │     │                 │
└─────────────────┘     │   Components    │     └─────────────────┘
                        │                 │
                        │ - JSON Database │     ┌─────────────────┐
                        │ (File-based)    │     │   Deployment    │
                        │                 │     │   Infrastructure│
                        └─────────────────┘     │                 │
                                                │ - Docker        │
                                                │ - Nginx         │
                                                │ - VPS           │
                                                │ - Let's Encrypt │
                                                └─────────────────┘
```

## Technology Stack

### Frontend
- **Framework**: Next.js 14.2.3 with App Router
- **Language**: TypeScript 5
- **UI Library**: React 18
- **Styling**: Tailwind CSS 3.4.1
- **Build Tool**: Next.js built-in (Webpack/Turbopack)

### Backend
- **Runtime**: Node.js 18+
- **API Framework**: Next.js API Routes
- **Database**: JSON file-based storage (for simplicity)
- **External APIs**: Twilio WhatsApp API

### Infrastructure
- **Containerization**: Docker
- **Web Server**: Nginx (reverse proxy)
- **Hosting**: VPS (Virtual Private Server)
- **SSL**: Let's Encrypt
- **CI/CD**: GitHub Actions (configured in .github/workflows/ci.yml)

## Project Structure

```
rimrevive/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx          # Home page (assembles components)
│   ├── globals.css       # Global Tailwind styles
│   ├── api/              # API routes
│   │   └── submit-quote/ # Quote submission endpoint
│   ├── analisis-mercado/ # Market analysis page
│   └── estudio_mercado_rines_vancouver/ # Market research page
├── components/           # React components
│   ├── Navbar.tsx       # Navigation bar
│   ├── HeroSection.tsx  # Hero section with CTA
│   ├── ProblemSection.tsx # Problem statement
│   ├── BeforeAfterSection.tsx # Before/after comparison
│   ├── HowItWorksSection.tsx # Process explanation
│   ├── PremiumSection.tsx # Premium services
│   ├── FAQSection.tsx   # Frequently asked questions
│   ├── QuoteSection.tsx # Quote request form
│   └── Footer.tsx       # Footer
├── lib/                 # Utility functions and libraries
│   ├── db.ts           # JSON database operations
│   └── whatsapp.ts     # Twilio WhatsApp integration
├── public/             # Static assets (images, fonts, icons)
├── scripts/            # Deployment and utility scripts
├── docs/               # Documentation (generated)
└── [configuration files] # package.json, tsconfig.json, etc.
```

## Data Flow

### Quote Submission Process

1. **User Interaction**:
   - User fills out quote request form in `QuoteSection` component
   - Form data validated client-side

2. **API Request**:
   - Form data sent via POST to `/api/submit-quote`
   - Request handled by `app/api/submit-quote/route.ts`

3. **Server Processing**:
   - Data validation (name and phone required)
   - Lead saved to JSON database via `lib/db.ts`
   - WhatsApp notification sent via `lib/whatsapp.ts`
   - Confirmation sent to client (optional)
   - Database logs updated

4. **Response**:
   - JSON response with success status
   - Client receives confirmation message

### Database Architecture

The application uses a simple JSON file-based database for simplicity and ease of deployment. This is suitable for small-scale applications with moderate traffic.

**Database Structure**:
- `rimrevive.json` file in project root (development) or `/data` volume (production)
- Two main collections: `leads` and `whatsapp_logs`
- Auto-incrementing IDs managed in `lastId` section

**Lead Schema**:
```typescript
interface Lead {
  id: number
  name: string
  email: string
  phone: string
  car_brand: string
  car_model: string
  car_year: string
  rim_position: string
  damage_type: string
  message: string
  photos_count: number
  submitted_at: string
  status: string
  whatsapp_notified: boolean
}
```

## Key Design Decisions

### 1. Next.js App Router
- **Decision**: Use Next.js 14 App Router over Pages Router
- **Reason**: Latest features, better performance, improved developer experience
- **Benefits**: Server Components by default, nested layouts, streaming

### 2. JSON File Database
- **Decision**: Use file-based JSON storage instead of traditional database
- **Reason**: Simplified deployment, no external dependencies
- **Trade-offs**: Not suitable for high-volume applications; can be replaced with PostgreSQL if needed

### 3. WhatsApp Integration
- **Decision**: Use Twilio WhatsApp Business API
- **Reason**: Reliable, enterprise-grade messaging platform
- **Benefits**: Official WhatsApp integration, delivery tracking, global reach

### 4. Mobile-First Design
- **Decision**: Tailwind CSS with mobile-first responsive design
- **Reason**: Majority of users access via mobile devices
- **Benefits**: Better user experience, improved conversion rates

### 5. Docker Deployment
- **Decision**: Containerize application with Docker
- **Reason**: Consistent environments, easy scaling, simplified deployment
- **Benefits**: Portable, version-controlled infrastructure

## Performance Considerations

### Server-Side Rendering (SSR)
- Home page uses React Server Components for fast initial load
- Static generation for market analysis pages
- Dynamic rendering for quote submission

### Asset Optimization
- Images optimized with Next.js Image component
- Fonts optimized with `next/font`
- CSS minified and purged with Tailwind

### Caching Strategy
- Nginx caching for static assets
- Browser caching headers configured
- No database caching needed for current scale

## Security Architecture

### Data Protection
- Environment variables for sensitive data (Twilio credentials)
- HTTPS enforced with Let's Encrypt SSL
- Input validation on API endpoints
- No sensitive data in client bundles

### API Security
- Rate limiting configured at Nginx level
- CORS policies in place
- Error messages sanitized in production

### Infrastructure Security
- Regular security updates via CI/CD pipeline
- Docker image scanning
- Security headers configured in Nginx

## Scalability Considerations

### Current Limitations
- JSON file database not suitable for high concurrency
- Single instance deployment
- No load balancing

### Scaling Path
1. **Database**: Replace JSON with PostgreSQL
2. **Caching**: Add Redis for session/store
3. **Horizontal Scaling**: Multiple Docker containers behind load balancer
4. **CDN**: Cloudflare for static assets

## Monitoring and Observability

### Current Monitoring
- Console logging for development
- Nginx access/error logs
- Twilio delivery reports

### Recommended Enhancements
- Application performance monitoring (APM)
- Error tracking service (Sentry)
- Uptime monitoring
- Business metrics tracking

## Dependencies

### Production Dependencies
- `next`: 14.2.3 - React framework
- `react`: ^18 - UI library
- `react-dom`: ^18 - React DOM rendering
- `twilio`: ^5.13.0 - WhatsApp API client

### Development Dependencies
- TypeScript and type definitions
- Tailwind CSS and PostCSS
- Autoprefixer

## Deployment Architecture

### Production Environment
- VPS with Docker and Docker Compose
- Nginx as reverse proxy and SSL termination
- Let's Encrypt for SSL certificates
- GitHub Actions for CI/CD

### Development Environment
- Local Node.js development
- Hot reload with `next dev`
- Simulated WhatsApp mode for testing

## Future Architecture Considerations

### Potential Improvements
1. **Database Migration**: PostgreSQL with Prisma ORM
2. **Authentication**: Admin dashboard with secure login
3. **Real-time Updates**: WebSocket for lead notifications
4. **Image Upload**: Cloud storage for damage photos
5. **Analytics**: Integrated analytics dashboard

### Microservices Potential
- Separate API service from frontend
- Dedicated notification service
- Image processing service
- Analytics service

This architecture balances simplicity with functionality, providing a solid foundation for the rim repair business while maintaining flexibility for future growth.