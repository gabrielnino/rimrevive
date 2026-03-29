# RimRevive Vancouver - Website

![RimRevive Vancouver](https://rimrevive.store/favicon.ico)

**Live Website:** [https://rimrevive.store](https://rimrevive.store)

## 🎯 Overview

RimRevive Vancouver is a professional website for a rim restoration and repair service based in Vancouver, Canada. The site allows customers to get instant quotes for rim repair services via WhatsApp integration.

## 🚀 Features

- **Modern Design**: Clean, professional UI with Tailwind CSS
- **WhatsApp Integration**: Direct quote requests via Twilio API
- **Responsive Layout**: Mobile-first design
- **Fast Performance**: Built with Next.js 14 for optimal speed
- **SEO Optimized**: Meta tags and structured data
- **Contact Forms**: Multiple contact options for customers

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2.3 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4.1
- **UI Components**: React 18
- **API Integration**: Twilio (WhatsApp)
- **Deployment**: Docker + Nginx
- **Hosting**: VPS with SSL (Let's Encrypt)

## 📁 Project Structure

```
rimrevive/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   ├── globals.css       # Global styles
│   ├── api/              # API routes
│   │   └── whatsapp/     # WhatsApp integration
│   ├── analisis-mercado/ # Market analysis
│   └── estudio_mercado_rines_vancouver/ # Market research
├── components/           # React components
│   ├── Navbar.tsx       # Navigation
│   ├── HeroSection.tsx  # Hero section
│   ├── ProblemSection.tsx # Problem statement
│   ├── BeforeAfterSection.tsx # Before/after comparison
│   ├── HowItWorksSection.tsx # Process explanation
│   ├── PremiumSection.tsx # Premium services
│   ├── FAQSection.tsx   # Frequently asked questions
│   ├── QuoteSection.tsx # Quote request form
│   └── Footer.tsx       # Footer
├── public/              # Static assets
├── lib/                # Utility functions
└── scripts/            # Deployment scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Docker
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/[username]/rimrevive.git
   cd rimrevive
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## 🐳 Docker Deployment

### Build Docker Image
```bash
docker build -t rimrevive:latest .
```

### Run Container
```bash
docker run -p 3000:3000 rimrevive:latest
```

### Production Deployment (with Nginx)
See `deploy-all.sh` for complete deployment script.

## 📦 Environment Variables

Create a `.env.local` file with:

```env
# Twilio Configuration (WhatsApp)
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Application
NEXT_PUBLIC_SITE_URL=https://rimrevive.store
NEXT_PUBLIC_WHATSAPP_NUMBER=+1234567890
```

## 🔧 API Endpoints

### WhatsApp Quote Request
- **Endpoint**: `/api/whatsapp/quote`
- **Method**: POST
- **Purpose**: Send quote request via WhatsApp
- **Request Body**: Customer contact info and service details

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, SEO)
- **Page Load Time**: < 2 seconds
- **Bundle Size**: Optimized with Next.js code splitting

## 🔒 Security

- HTTPS enforced with Let's Encrypt SSL
- Security headers configured in Nginx
- Environment variables for sensitive data
- Rate limiting on API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
 5. Open a Pull Request

## 📚 Documentation

Comprehensive documentation is available in the `/docs` directory:

- [Architecture Overview](docs/architecture.md) - System architecture and design decisions
- [Component Documentation](docs/components.md) - React component reference
- [API Reference](docs/api-reference.md) - API endpoints and usage
- [Deployment Guide](docs/deployment.md) - Full deployment instructions
- [Environment Variables](docs/environment-variables.md) - Configuration reference
- [Database Schema](docs/database.md) - JSON database structure
- [Contributing Guidelines](docs/contributing.md) - How to contribute to the project

For local development, see the [Quick Start](#-getting-started) section.

## 📄 License

This project is proprietary and confidential.

## 📞 Contact

- **Website**: [rimrevive.store](https://rimrevive.store)
- **Business**: Rim repair and restoration services in Vancouver
- **Services**: Rim straightening, welding, painting, powder coating

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for utility-first styling
- Twilio for WhatsApp API integration
- Vercel for deployment inspiration