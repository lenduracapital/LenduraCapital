#!/bin/bash

echo "🚀 Replit Deployment Build Script"
echo "================================"

# Clean and create dist directory
echo "📦 Cleaning dist directory..."
rm -rf dist
mkdir -p dist

# Build client
echo "🎨 Building client (Vite)..."
if ! npx vite build; then
    echo "❌ Client build failed"
    exit 1
fi

# Build server with explicit outfile
echo "🔧 Building server..."
if ! npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/index.js; then
    echo "❌ Server build failed"
    exit 1
fi

# Create package.json for ESM
echo '{"type": "module"}' > dist/package.json

# Verify build output
echo ""
echo "✅ Verifying build output..."
if [ ! -f "dist/index.js" ]; then
    echo "❌ ERROR: dist/index.js not found!"
    exit 1
fi

if [ ! -f "dist/public/index.html" ]; then
    echo "❌ ERROR: dist/public/index.html not found!"
    exit 1
fi

# Show file sizes
echo ""
echo "📊 Build Results:"
echo "  - dist/index.js: $(du -h dist/index.js | cut -f1)"
echo "  - dist/public/index.html: $(du -h dist/public/index.html | cut -f1)"
echo ""
echo "✅ Build completed successfully!"
echo ""
echo "🚀 Deploy with these settings:"
echo "  Build command: ./replit-deploy.sh"
echo "  Start command: NODE_ENV=production node dist/index.js"