# FundTek Capital Group - Business Funding Platform

## Overview

FundTek Capital Group is a comprehensive business funding platform built as a full-stack web application. The platform connects businesses with various funding solutions including term loans, merchant cash advances, equipment financing, and other commercial lending options. The application serves as both a lead generation system and a comprehensive resource for businesses seeking financing.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Framework**: shadcn/ui components built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom design tokens for brand consistency
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and API caching
- **Form Handling**: React Hook Form with Zod validation schemas
- **Performance**: Lazy loading for non-critical pages, service worker for caching

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL with Neon serverless support
- **Session Management**: Express sessions for user state management
- **API Design**: RESTful API with consistent error handling and structured logging
- **Security**: Helmet middleware, CSP headers, rate limiting, and production-grade security

## Key Components

### Frontend Components
- **Header**: Responsive navigation with mobile hamburger menu and external form integration
- **Hero Section**: Video background with optimized loading and call-to-action overlays
- **Process Section**: Three-step funding process visualization with interactive elements
- **Contact Form**: Embedded Jotform integration for lead capture
- **Solution Pages**: Detailed pages for each funding type (term loans, merchant cash advance, etc.)
- **Industry Services**: Categorized funding solutions by business type
- **Testimonials**: Customer success stories with ratings and business details
- **Footer**: Company information, social media links, and legal page navigation

### Backend Services
- **Storage Layer**: Database abstraction layer with interface-based design for testability
- **Route Handlers**: CRUD operations for loan applications and contact submissions
- **Validation Middleware**: Schema validation using Zod for data integrity
- **Security Middleware**: Production-grade security headers and CSP configuration
- **Performance Monitoring**: Real-time performance tracking and alerting
- **Error Handling**: Centralized error handling with structured JSON responses

## Data Flow

### Lead Generation Flow
1. User visits landing pages optimized for specific funding types
2. User interacts with embedded Jotform or internal contact forms
3. Form data is validated using Zod schemas
4. Lead information is stored in PostgreSQL database
5. Email notifications are sent via SendGrid integration
6. Follow-up sequences are triggered for sales team

### Application Processing Flow
1. Business owners complete detailed loan application forms
2. Application data is validated and stored with status tracking
3. Applications are routed to appropriate underwriters
4. Status updates are tracked and communicated to applicants
5. Approval decisions trigger funding processes

## External Dependencies

### Third-Party Integrations
- **Jotform**: External form service for lead capture and loan applications
- **SendGrid**: Email service for notifications and follow-up communications
- **Google Analytics**: Website traffic and conversion tracking
- **Sentry**: Error monitoring and performance tracking (configured but optional)
- **Neon Database**: Serverless PostgreSQL hosting

### Development Dependencies
- **ESLint & Prettier**: Code quality and formatting tools
- **Lighthouse CI**: Automated performance and accessibility testing
- **Pa11y**: Accessibility compliance testing (WCAG2AA standard)
- **Drizzle Kit**: Database schema management and migrations

## Deployment Strategy

### Production Configuration
- **Build Process**: Vite builds optimized frontend assets, esbuild bundles backend
- **Server**: Express.js server serves both API endpoints and static assets
- **Database**: PostgreSQL with connection pooling for performance
- **Security**: Production-grade security headers, rate limiting, and CSP policies
- **Performance**: Service worker caching, image optimization, and Core Web Vitals monitoring

### Environment Setup
- **Environment Variables**: DATABASE_URL, SENDGRID_API_KEY, JWT_SECRET, PORT
- **Database Schema**: Automated schema pushes using Drizzle Kit
- **Asset Optimization**: Video compression, image format conversion (WebP/AVIF)
- **SEO Optimization**: Sitemap generation, robots.txt, and structured data markup

### Monitoring and Analytics
- **Performance Monitoring**: Real-time Core Web Vitals tracking
- **Error Tracking**: Centralized error logging and alerting
- **Conversion Tracking**: Form submission and application completion metrics
- **Security Monitoring**: Rate limiting and suspicious activity detection

## Changelog

Changelog:
- June 23, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.