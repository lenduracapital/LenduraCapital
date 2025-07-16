#!/bin/bash

# Production Build Script for FundTek Capital Group
# Addresses deployment failures by ensuring reliable TypeScript compilation
# Creates required dist/index.js file for deployment

set -e  # Exit on any error

echo "🚀 FundTek Capital Group - Production Build Process"
echo "=================================================="
echo "Fixing deployment issues with TypeScript compilation"
echo ""

# Function to log with timestamp
log() {
    echo "[$(date '+%H:%M:%S')] $1"
}

log "🧹 Step 1: Clean build artifacts..."
rm -rf dist
rm -rf node_modules/.vite
mkdir -p dist

log "🔧 Step 2: Verify TypeScript configuration..."
if ! grep -q '"noEmit": false' tsconfig.json; then
    log "❌ ERROR: TypeScript noEmit must be false for compilation output"
    exit 1
fi
log "✅ TypeScript compilation enabled"

log "📦 Step 3: Build frontend with Vite (optimized)..."
# Use faster build with limited parallelization to avoid timeout
NODE_OPTIONS="--max-old-space-size=2048" npx vite build --mode production --logLevel error

log "⚡ Step 4: Build server with esbuild..."
npx esbuild server/index.ts \
    --platform=node \
    --packages=external \
    --bundle \
    --format=esm \
    --outfile=dist/index.js \
    --target=es2022 \
    --minify \
    --sourcemap \
    --external:pg-native \
    --external:bufferutil \
    --external:utf-8-validate \
    --external:fsevents

log "✅ Step 5: Verify build output..."
if [ -f "dist/index.js" ]; then
    SIZE=$(stat -c%s dist/index.js 2>/dev/null || stat -f%z dist/index.js 2>/dev/null || echo "unknown")
    log "✅ dist/index.js created successfully (${SIZE} bytes)"
    
    # Test JavaScript syntax
    if node -c dist/index.js 2>/dev/null; then
        log "✅ JavaScript syntax valid"
    else
        log "❌ JavaScript syntax validation failed"
        exit 1
    fi
else
    log "❌ CRITICAL: dist/index.js not created"
    exit 1
fi

# Verify frontend build
if [ -f "dist/index.html" ]; then
    log "✅ Frontend build complete"
else
    log "❌ Frontend build missing"
    exit 1
fi

log "🎉 Production build complete!"
log "📁 Build artifacts:"
ls -la dist/ | head -10

echo ""
echo "✅ DEPLOYMENT READY"
echo "📋 Next steps:"
echo "   npm start                 # Start production server"
echo "   node dist/index.js        # Direct server start"
echo ""