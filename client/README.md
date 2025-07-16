# FundTek Capital Group - Client Application

This is the Vite-based React client application for FundTek Capital Group, optimized for Vercel deployment.

## Setup for Vercel Deployment

The client directory is now configured with:

1. **package.json** - Contains all necessary dependencies and scripts
2. **vite.config.ts** - Vite configuration optimized for production
3. **tsconfig.json** - TypeScript configuration for the client
4. **vercel.json** - Vercel deployment configuration

## Build Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run type-check
```

## Deployment

This client directory is ready for Vercel deployment. The build output will be in the `dist` directory.

### Vercel Configuration

The `vercel.json` file includes:
- Build command: `npm run build`
- Output directory: `dist`
- Framework: Vite
- SPA routing configuration

## Features

- React 18 with TypeScript
- Vite for fast development and optimized builds
- Tailwind CSS for styling
- Radix UI components
- React Query for data fetching
- Wouter for routing
- Performance optimizations
- SEO optimizations

## Directory Structure

```
client/
├── dist/              # Build output (generated)
├── public/            # Static assets
├── src/               # Source code
│   ├── components/    # React components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom hooks
│   ├── utils/         # Utilities
│   └── main.tsx       # Entry point
├── index.html         # HTML template
├── package.json       # Dependencies
├── tsconfig.json      # TypeScript config
├── vite.config.ts     # Vite config
└── vercel.json        # Vercel config
```