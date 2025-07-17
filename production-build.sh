#!/bin/bash

# FundTek Capital - Production Build Script
# Comprehensive deployment-ready build with verification
# Updated: July 17, 2025

set -e  # Exit on any error

echo "🚀 FundTek Capital - Production Build Starting..."
echo "=================================================="

# Clean previous build
echo "🧹 Cleaning previous build output..."
rm -rf dist/
echo "✅ Build directory cleaned"

# Run the comprehensive build
echo "🏗️  Building application..."
npm run build

# Verify build output
echo "🔍 Verifying build output..."
if [ ! -f "dist/index.js" ]; then
    echo "❌ CRITICAL: dist/index.js not created!"
    echo "💡 Build command failed to produce required server bundle"
    exit 1
fi

# Get file size
BUILD_SIZE=$(du -h dist/index.js | cut -f1)
echo "✅ Server bundle created: dist/index.js (${BUILD_SIZE})"

# Check frontend build
if [ ! -d "dist/public" ]; then
    echo "⚠️  Frontend build output missing at dist/public"
else
    echo "✅ Frontend build output verified"
fi

# Run verification script
echo "🔍 Running comprehensive deployment verification..."
node build-verification.js

# Final verification
echo "🎯 Final deployment readiness check..."
if [ -f "dist/index.js" ] && [ -d "dist/public" ]; then
    echo "✅ Build completed successfully!"
    echo "📦 Ready for deployment"
    echo ""
    echo "🚀 Deployment Commands:"
    echo "   Start: npm start"
    echo "   OR:    NODE_ENV=production node dist/index.js"
    echo ""
    echo "📊 Build Summary:"
    echo "   Server: dist/index.js (${BUILD_SIZE})"
    echo "   Frontend: dist/public/"
    echo "   Status: DEPLOYMENT READY ✅"
else
    echo "❌ Build verification failed"
    exit 1
fi

echo "=================================================="
echo "🎉 Production build completed successfully!"