#!/bin/bash

# Production Deployment Readiness Script
# Simple, reliable build process for deployment environments

set -e

echo "🚀 PRODUCTION DEPLOYMENT BUILD"
echo "==============================="

# Clean and prepare
echo "📁 Preparing build environment..."
mkdir -p dist
rm -rf dist/*

# Build with enhanced reliability
echo "🏗️  Building application..."

# Build frontend
echo "   Building frontend..."
vite build --mode production

# Build backend with explicit file output (most reliable for deployment)
echo "   Building backend..."
esbuild server/index.ts \
    --platform=node \
    --packages=external \
    --bundle \
    --format=esm \
    --outfile=dist/index.js \
    --minify \
    --sourcemap=external

# Verify deployment requirements
echo "🧪 Verifying deployment requirements..."

# Check dist/index.js exists
if [ ! -f "dist/index.js" ]; then
    echo "❌ ERROR: dist/index.js not created"
    exit 1
fi

# Check file size (should be reasonable)
SIZE=$(du -h dist/index.js | cut -f1)
echo "✅ dist/index.js created (${SIZE})"

# Validate JavaScript syntax
if node -c dist/index.js; then
    echo "✅ JavaScript syntax valid"
else
    echo "❌ ERROR: Invalid JavaScript syntax"
    exit 1
fi

# Check start script in package.json
START_SCRIPT=$(node -e "console.log(JSON.parse(require('fs').readFileSync('package.json')).scripts.start)")
if [[ "$START_SCRIPT" == *"dist/index.js"* ]]; then
    echo "✅ Start script configured: $START_SCRIPT"
else
    echo "❌ ERROR: Start script not pointing to dist/index.js"
    exit 1
fi

echo ""
echo "🎉 DEPLOYMENT BUILD COMPLETE"
echo "==============================="
echo "✅ dist/index.js ready for deployment"
echo "✅ All requirements satisfied"
echo ""
echo "To deploy:"
echo "  1. Upload project files"
echo "  2. Run: npm ci --production"
echo "  3. Run: npm start"
echo ""
echo "Build artifacts:"
ls -lah dist/index.js
echo ""