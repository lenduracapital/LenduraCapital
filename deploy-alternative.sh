#!/bin/bash

# Alternative Deployment Script for FundTek Capital Group
# Use this script as an alternative to npm run build in deployment settings

set -e

echo "🚀 FundTek Capital Group - Alternative Deployment Build"
echo "====================================================="
echo "Solving deployment issue: npm run build timeouts"
echo "Using reliable production build instead..."
echo ""

# Execute the production build script
echo "📋 Running production build script..."
node production-build.js

# Verify the build succeeded
if [ -f "dist/index.js" ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL - Ready for deployment!"
    echo "📦 dist/index.js created and verified"
    echo "🎯 Use 'npm run start' to launch production server"
    echo ""
    echo "🔧 Deployment command: npm run start"
    echo "📍 Server will bind to: 0.0.0.0:5000"
    echo ""
    exit 0
else
    echo ""
    echo "❌ BUILD FAILED - dist/index.js not found"
    exit 1
fi