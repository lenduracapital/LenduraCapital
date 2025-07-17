#!/bin/bash

# Replit deployment build script
# Creates dist/index.js as required

set -e

echo "🚀 Building for Replit deployment..."

# Clean dist
rm -rf dist
mkdir -p dist

# Build frontend
echo "📦 Building frontend..."
vite build

# Compile TypeScript to CommonJS
echo "🔧 Compiling TypeScript..."
npx tsc

# Check if dist/src/index.js was created
if [ -f "dist/src/index.js" ]; then
    # Move to expected location
    mv dist/src/index.js dist/index.js
    echo "✅ Moved dist/src/index.js to dist/index.js"
    
    # Copy other required files
    cp -r dist/server dist/ 2>/dev/null || true
    cp -r dist/shared dist/ 2>/dev/null || true
else
    echo "❌ dist/src/index.js not found"
    exit 1
fi

# Verify build
if [ -f "dist/index.js" ]; then
    SIZE=$(du -h dist/index.js | cut -f1)
    echo "✅ Build successful! dist/index.js created ($SIZE)"
else
    echo "❌ Build failed: dist/index.js not found"
    exit 1
fi