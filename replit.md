# FundTek Capital Group - Business Funding Platform

## Overview

FundTek Capital Group is a comprehensive business funding platform built as a full-stack web application. The platform connects businesses with various funding solutions including term loans, merchant cash advances, equipment financing, and other business capital products. The application features a modern React frontend with a professional financial services design, backed by an Express.js API server with PostgreSQL database integration.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens for brand consistency
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and API caching
- **Form Handling**: React Hook Form with Zod validation schemas

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful API with consistent error handling and logging

### Database Schema
- **Users**: Authentication and user management
- **Loan Applications**: Comprehensive loan application tracking with status management
- **Contact Submissions**: Lead capture and inquiry management
- **Schema Validation**: Zod schemas for runtime validation and type safety

## Key Components

### Frontend Components
- **Header**: Navigation with mobile responsiveness and external form integration
- **Hero Section**: Video background with call-to-action for loan applications
- **Process Section**: Three-step funding process visualization
- **Contact Form**: Embedded Jotform for lead capture
- **Industry Services**: Categorized funding solutions by industry
- **Footer**: Company information and social media links

### Backend Services
- **Storage Layer**: Database abstraction with interface-based design
- **Route Handlers**: CRUD operations for loan applications and contact submissions
- **Validation Middleware**: Schema validation using Zod
- **Error Handling**: Centralized error handling with structured responses
- **Logging**: Request/response logging for API monitoring

### External Integrations
- **Jotform**: Third-party form service for lead capture and loan applications
- **Asset Management**: Video and image assets served from attached assets directory
- **Font Integration**: Google Fonts (Inter) for consistent typography

## Data Flow

1. **Lead Generation**: Users interact with embedded Jotform widgets for contact and loan applications
2. **API Processing**: Form submissions are processed through Express.js API endpoints
3. **Data Persistence**: Validated data is stored in PostgreSQL using Drizzle ORM
4. **State Management**: Frontend uses TanStack Query for API state synchronization
5. **User Feedback**: Toast notifications provide immediate feedback for user actions

## External Dependencies

### Frontend Dependencies
- **UI Components**: Radix UI primitives for accessibility and behavior
- **Icons**: Lucide React for consistent iconography
- **Animations**: Class Variance Authority for component variants
- **Date Handling**: date-fns for date manipulation
- **Carousel**: Embla Carousel for image/content carousels

### Backend Dependencies
- **Database**: @neondatabase/serverless for PostgreSQL connectivity
- **ORM**: Drizzle ORM with Zod integration for schema validation
- **Session Storage**: connect-pg-simple for PostgreSQL session store
- **Development**: tsx for TypeScript execution in development

### Build Tools
- **Bundling**: Vite for frontend, esbuild for backend production builds
- **Development**: Concurrent development server setup with hot reload
- **Replit Integration**: Specialized plugins for Replit environment

## Deployment Strategy

### Development Environment
- **Replit Configuration**: Configured for Node.js 20, web, and PostgreSQL 16 modules
- **Hot Reload**: Vite development server with Express.js API proxy
- **Database**: Local PostgreSQL instance with Drizzle migrations

### Production Build
- **Frontend**: Vite production build optimized for performance
- **Backend**: esbuild bundle for Node.js server deployment
- **Assets**: Static file serving with proper caching headers
- **Database**: Environment-based DATABASE_URL configuration

### Environment Requirements
- **Node.js**: Version 20+ for modern JavaScript features
- **PostgreSQL**: Version 16+ for database operations
- **Environment Variables**: DATABASE_URL for database connectivity

## Changelog
```
Changelog:
- June 17, 2025. Initial setup
```

## User Preferences
```
Preferred communication style: Simple, everyday language.
```