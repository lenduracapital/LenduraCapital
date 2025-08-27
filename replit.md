# Lendura Capital - Replit Documentation

## Overview
Lendura Capital provides advanced Small Business Administration (SBA) loan solutions through a high-performance digital platform. The project aims to deliver cutting-edge performance optimization, a superior user experience, and robust, scalable digital services. The platform focuses on streamlining the loan application process, managing contact submissions, and providing a secure, reliable environment for financial transactions and client interactions.

## User Preferences
- Professional, technical communication style
- Focus on deployment readiness and reliability
- Comprehensive documentation for production systems
- Performance optimization priorities

## System Architecture

### UI/UX Decisions
- Modern, adaptive styling using Tailwind CSS.
- Optimized for responsiveness across devices with GPU-accelerated rendering.
- Intelligent resource loading, including adaptive video quality streaming and smart preloading systems.
- Critical resource prioritization for faster initial paint.
- Clean user interface without distracting performance displays (e.g., removed visual "load ..ms" indicator).

### Technical Implementations
- **Frontend**: React 18 with TypeScript, Wouter for routing, TanStack Query for data fetching, and Shadcn/ui components.
- **Backend**: Express.js with TypeScript, Drizzle ORM for PostgreSQL integration, comprehensive security middleware, and production-ready error handling and logging.
- **Environment Management**: Enterprise-grade environment variable management with Zod-based validation, auto-detection of deployment platforms (Replit, Railway, Vercel, Heroku), and platform-specific configuration optimization.
- **Deployment Process**: Utilizes `esbuild` for server bundling and Vite for frontend builds. Comprehensive build verification ensures `dist/index.js` (or `dist/start.js` as needed) and static assets are correctly generated. Features include pre-deployment validation scripts, clean `dist` directory before building, and robust error handling during deployment.
- **Performance Optimizations**: Critical resource prioritization, deferred video loading, image lazy loading, smart resource prefetching, enhanced font loading strategies, and connection-aware performance adjustments for video streaming.
- **Stability Improvements**: Implemented memory leak fixes in monitoring middleware, disabled excessive logging, and a comprehensive stability system with request timeouts, memory usage monitoring, automatic garbage collection, and graceful shutdown handlers.
- **Security & Compliance**: SOC 2 compliance monitoring, comprehensive audit logging, production security headers, and rate limiting. Database transactions for critical operations ensure data integrity.

### Feature Specifications
- User authentication system.
- Loan application management.
- Contact form submissions.
- Jotform integration.
- Chatbot conversation storage.
- Health check endpoints (`/health`, `/api/health`, `/api/env-status`) for real-time monitoring.
- Enhanced error logging for detailed debugging.

## External Dependencies
- **Database**: PostgreSQL (Replit's integrated service).
- **Analytics**: Google Analytics 4 (GA4) directly integrated into HTML.
- **APIs/Services**: No other external APIs mentioned beyond Jotform integration.
- **Libraries/Frameworks**: Vite, Esbuild, Tailwind CSS, Wouter, TanStack Query, Shadcn/ui, Express.js, Drizzle ORM.