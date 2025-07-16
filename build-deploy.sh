#!/bin/bash

# Build script for FundTek Capital Group deployment
# This script ensures proper TypeScript compilation and build verification

set -e  # Exit on any error

echo "🔨 Starting build process..."

# Step 1: Create dist directory if it doesn't exist
echo "📁 Creating dist directory..."
mkdir -p dist

# Step 2: Build the frontend with Vite
echo "🔧 Building frontend with Vite..."
npm run build:client || vite build

# Step 3: Build the backend with esbuild
echo "🔧 Building backend with esbuild..."
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

# Step 4: Verify that the main entry file exists
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

# Step 5: Verify the built file can be parsed
echo "🔍 Verifying JavaScript syntax..."
node -c dist/index.js
echo "✅ JavaScript syntax verification passed"

echo "🎉 Build completed successfully!"
echo "📋 Build summary:"
echo "   - Frontend build: ✅"
echo "   - Backend build: ✅"
echo "   - File verification: ✅"
echo "   - Syntax check: ✅"