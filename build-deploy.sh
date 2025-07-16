#!/bin/bash

# Enhanced Build and Deploy Script for FundTek Capital Group
# Ensures reliable TypeScript compilation and deployment preparation

set -e  # Exit on any error

echo "🚀 FundTek Capital Group - Enhanced Build Process"
echo "=================================================="

# Function to log with timestamp
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# Clean previous builds
log "🧹 Cleaning previous build artifacts..."
rm -rf dist
rm -rf node_modules/.vite
rm -rf node_modules/typescript/tsbuildinfo

# Verify TypeScript configuration
log "🔧 Verifying TypeScript configuration..."
if ! grep -q '"noEmit": false' tsconfig.json; then
    log "⚠️  Warning: TypeScript noEmit should be false for deployment builds"
fi

# Install dependencies if needed
log "📦 Ensuring dependencies are installed..."
if [ ! -d "node_modules" ]; then
    npm install
fi

# Run TypeScript type checking
log "🔍 Running TypeScript type checking..."
npx tsc --noEmit

# Build frontend with Vite
log "🎨 Building frontend with Vite..."
npx vite build

# Build backend with esbuild
log "⚙️  Building backend with esbuild..."
npx esbuild server/index.ts \
    --platform=node \
    --packages=external \
    --bundle \
    --format=esm \
    --outdir=dist \
    --target=es2022 \
    --sourcemap=false \
    --minify

# Verify build output
log "🔍 Verifying build output..."
if [ ! -f "dist/index.js" ]; then
    echo "❌ ERROR: dist/index.js not found!"
    exit 1
fi

if [ ! -d "dist/client" ]; then
    echo "❌ ERROR: dist/client directory not found!"
    exit 1
fi

# Check file sizes
log "📊 Build output summary:"
if [ -f "dist/index.js" ]; then
    INDEX_SIZE=$(du -h dist/index.js | cut -f1)
    log "  📄 dist/index.js: $INDEX_SIZE"
fi

if [ -d "dist/client" ]; then
    CLIENT_SIZE=$(du -sh dist/client | cut -f1)
    log "  📁 dist/client: $CLIENT_SIZE"
fi

# Run build verification
log "✅ Running build verification..."
node build-verification.js

# Final deployment check
log "🎯 Final deployment readiness check..."
if [ -f "dist/index.js" ] && [ -d "dist/client" ]; then
    log "✅ Build completed successfully!"
    log "🚀 Ready for production deployment"
    
    # Display deployment commands
    echo ""
    echo "🔧 Deployment Commands:"
    echo "  Start production server: npm start"
    echo "  Or run directly: NODE_ENV=production node dist/index.js"
    echo ""
    
    exit 0
else
    log "❌ Build verification failed!"
    exit 1
fi