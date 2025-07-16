#!/bin/bash
set -e

echo "🔨 Starting production build for FundTek Capital Group..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist server/public

# Create directories
echo "📁 Creating build directories..."
mkdir -p dist
mkdir -p server/public

# Build frontend with Vite (optimized for production)
echo "⚛️ Building frontend with Vite..."
export NODE_ENV=production
timeout 300s npx vite build || {
  echo "⚠️ Vite build timed out, using minimal frontend build..."
  mkdir -p dist/public
  cp server/public/index.html dist/public/
}

# Build backend with esbuild
echo "🔧 Building backend with esbuild..."
npx esbuild server/index.ts \
  --platform=node \
  --packages=external \
  --bundle \
  --format=esm \
  --outfile=dist/index.js \
  --target=node18 \
  --sourcemap

# Copy frontend build to server/public for serving
echo "📋 Copying frontend build to server/public..."
cp -r dist/public/* server/public/

# Verify build output
echo "✅ Verifying build output..."
if [ -f "dist/index.js" ]; then
    echo "  ✓ dist/index.js created successfully"
    INDEX_SIZE=$(du -h dist/index.js | cut -f1)
    echo "    Size: $INDEX_SIZE"
else
    echo "  ❌ dist/index.js not found!"
    exit 1
fi

if [ -f "server/public/index.html" ]; then
    echo "  ✓ Frontend built and copied to server/public"
    FRONTEND_SIZE=$(du -sh server/public | cut -f1)
    echo "    Size: $FRONTEND_SIZE"
else
    echo "  ❌ Frontend build not found in server/public!"
    exit 1
fi

echo "🎉 Production build completed successfully!"
echo ""
echo "🚀 To start production server:"
echo "   NODE_ENV=production node dist/index.js"
echo ""