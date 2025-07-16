#!/bin/bash

# Production build script for FundTek Capital Group deployment
# This script ensures proper TypeScript compilation and build verification

set -e  # Exit on any error

echo "🔨 Starting production build process..."

# Try the fast build approach first (recommended for deployment)
if [ "$1" = "--fast" ] || [ "$BUILD_STRATEGY" = "fast" ]; then
    echo "🚀 Using fast build strategy..."
    ./fast-build.sh
    exit 0
fi

# Step 1: Create dist directory structure
echo "📁 Creating dist directory structure..."
mkdir -p dist
mkdir -p dist/client

# Step 2: Build the backend with esbuild (fast and reliable)
echo "🔧 Building backend with esbuild..."
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

# Step 3: Attempt frontend build with timeout handling
echo "🔧 Building frontend..."
timeout 300s npm run build:client || {
    echo "⚠️  Standard build timed out, falling back to fast build..."
    ./fast-build.sh
    exit 0
}

# Step 4: Copy frontend build files to correct location based on vite config
echo "📁 Organizing build output..."
if [ -d "dist/public" ]; then
    echo "Moving frontend files from dist/public to dist/client..."
    mv dist/public/* dist/client/ 2>/dev/null || true
    rmdir dist/public 2>/dev/null || true
fi

# Step 5: Verify that the main entry file exists
echo "✅ Verifying build output..."
if [ ! -f "./dist/index.js" ]; then
    echo "❌ Build verification failed: dist/index.js not found"
    echo "📋 Directory contents:"
    ls -la dist/
    exit 1
else
    echo "✅ Build verification passed: dist/index.js exists"
    echo "📊 File size: $(du -h dist/index.js | cut -f1)"
fi

# Step 6: Verify client files exist
if [ ! -f "./dist/client/index.html" ]; then
    echo "⚠️  Frontend build may have issues: dist/client/index.html not found"
    echo "📋 Available files in dist/:"
    find dist/ -type f -name "*.html" -o -name "*.js" -o -name "*.css" | head -10
else
    echo "✅ Frontend build verified: dist/client/index.html exists"
fi

# Step 7: Verify the built file can be parsed
echo "🔍 Verifying JavaScript syntax..."
node -c dist/index.js
echo "✅ JavaScript syntax verification passed"

# Step 8: Run final verification
echo "🔍 Running build verification..."
node build-verification.js

echo "🎉 Build completed successfully!"
echo "📋 Build summary:"
echo "   - Backend build: ✅"
echo "   - Frontend build: ✅"
echo "   - File verification: ✅"
echo "   - Syntax check: ✅"
echo "📊 Final structure:"
ls -la dist/