#!/bin/bash

# Fast Build Script for Development and Quick Deployment Testing
# Optimized for speed while maintaining deployment compatibility

set -e

echo "⚡ FundTek Capital Group - Fast Build Process"
echo "============================================"

# Quick clean
echo "🧹 Quick cleanup..."
rm -rf dist

# Parallel build process
echo "🚀 Starting parallel build process..."

# Build frontend in background
echo "🎨 Building frontend (background)..."
npx vite build &
VITE_PID=$!

# Build backend
echo "⚙️  Building backend..."
npx esbuild server/index.ts \
    --platform=node \
    --packages=external \
    --bundle \
    --format=esm \
    --outdir=dist \
    --target=es2022

# Wait for frontend build to complete
echo "⏳ Waiting for frontend build..."
wait $VITE_PID

# Quick verification
echo "🔍 Quick verification..."
if [ -f "dist/index.js" ] && [ -d "dist/client" ]; then
    echo "✅ Fast build completed successfully!"
    echo "📊 Build output:"
    ls -la dist/
    echo "🚀 Ready for testing or deployment"
else
    echo "❌ Fast build failed!"
    exit 1
fi