#!/bin/bash

# Deployment Build Script for FundTek Capital Group
# This script implements all the suggested fixes for deployment

set -e  # Exit on any error

echo "🚀 FundTek Capital Group - Deployment Build"
echo "=========================================="
echo ""

# Function to log with timestamp
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

log "📋 Implementing deployment fixes:"
log "✅ 1. TypeScript configuration enabled for compilation"
log "✅ 2. Reliable build script that compiles TypeScript"
log "✅ 3. Build verification to ensure dist/index.js exists"
log ""

# Clean previous build
log "🧹 Cleaning previous build artifacts..."
rm -rf dist
rm -rf node_modules/.vite
mkdir -p dist

# Build server with esbuild (fast and reliable)
log "🔧 Building server bundle with esbuild..."
npx esbuild server/index.ts \
    --platform=node \
    --packages=external \
    --bundle \
    --format=esm \
    --outfile=dist/index.js \
    --target=es2022 \
    --minify

# Verify dist/index.js exists
log "🔍 Verifying build output..."
if [ -f "dist/index.js" ]; then
    SIZE=$(stat -c%s dist/index.js 2>/dev/null || stat -f%z dist/index.js 2>/dev/null || echo "0")
    SIZE_KB=$((SIZE / 1024))
    log "✅ dist/index.js successfully created: ${SIZE_KB}KB"
    
    # Test JavaScript syntax
    node -c dist/index.js
    log "✅ JavaScript syntax validation passed"
else
    log "❌ ERROR: dist/index.js was not created!"
    exit 1
fi

# Create a simple deployment marker
echo "{\"buildTime\":\"$(date -u +%Y-%m-%dT%H:%M:%SZ)\",\"version\":\"1.0.0\"}" > dist/build-info.json

log ""
log "🎉 BUILD COMPLETED SUCCESSFULLY!"
log "📦 Deployment artifacts ready:"
log "   - dist/index.js (server bundle)"
log "   - dist/build-info.json (build metadata)"
log ""
log "✅ Ready for deployment with 'npm start'"

exit 0