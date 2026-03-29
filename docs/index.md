# RimRevive Documentation

Welcome to the RimRevive Vancouver documentation. This documentation covers everything you need to know about the project, from architecture and development to deployment and contribution.

## Documentation Structure

### Getting Started
- [Project Overview](#) - High-level project description
- [Quick Start Guide](#) - Get up and running quickly

### Architecture & Design
- [Architecture Overview](./architecture.md) - System architecture and design decisions
- [Database Schema](./database.md) - JSON database structure and operations
- [Environment Variables](./environment-variables.md) - Configuration reference

### Development
- [Component Documentation](./components.md) - React component reference
- [API Reference](./api-reference.md) - API endpoints and usage
- [Contributing Guidelines](./contributing.md) - How to contribute to the project

### Deployment
- [Deployment Guide](./deployment.md) - Full deployment instructions
- [Docker Configuration](#) - Containerization details
- [CI/CD Pipeline](#) - Automated testing and deployment

### Operations
- [Monitoring & Maintenance](#) - Production operations
- [Troubleshooting](#) - Common issues and solutions
- [Backup & Recovery](#) - Data protection strategies

## Project Overview

RimRevive Vancouver is a professional website for a rim restoration and repair service based in Vancouver, Canada. The site allows customers to get instant quotes for rim repair services via WhatsApp integration.

### Key Features
- **Modern Design**: Clean, professional UI with Tailwind CSS
- **WhatsApp Integration**: Direct quote requests via Twilio API
- **Responsive Layout**: Mobile-first design
- **Fast Performance**: Built with Next.js 14 for optimal speed
- **SEO Optimized**: Meta tags and structured data

### Technology Stack
- **Framework**: Next.js 14.2.3 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4.1
- **UI Components**: React 18
- **API Integration**: Twilio (WhatsApp)
- **Deployment**: Docker + Nginx

## Quick Start

### Local Development
```bash
# Clone repository
git clone https://github.com/[username]/rimrevive.git
cd rimrevive

# Install dependencies
npm install

# Set up environment
cp .env.local.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

### Docker Development
```bash
# Build and run
docker build -t rimrevive .
docker run -p 3000:3000 rimrevive
```

### Production Deployment
See [Deployment Guide](./deployment.md) for full production deployment instructions.

## Documentation Status

| Document | Status | Last Updated |
|----------|--------|--------------|
| Architecture Overview | ✅ Complete | March 29, 2026 |
| Component Documentation | ✅ Complete | March 29, 2026 |
| API Reference | ✅ Complete | March 29, 2026 |
| Deployment Guide | ✅ Complete | March 29, 2026 |
| Environment Variables | ✅ Complete | March 29, 2026 |
| Database Schema | ✅ Complete | March 29, 2026 |
| Contributing Guidelines | ✅ Complete | March 29, 2026 |

## Need Help?

### Common Resources
- [GitHub Repository](https://github.com/[username]/rimrevive)
- [Issue Tracker](https://github.com/[username]/rimrevive/issues)
- [Live Website](https://rimrevive.store)

### Getting Support
1. Check the relevant documentation section
2. Search existing issues
3. Create a new issue for bugs or feature requests
4. Contact the development team for critical issues

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](./contributing.md) for details on how to:
- Report bugs
- Suggest features
- Submit code changes
- Improve documentation

## License

This project is proprietary and confidential. See LICENSE file for details.

---

*Last Updated: March 29, 2026*