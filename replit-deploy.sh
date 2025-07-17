#!/bin/bash

# Replit deployment script that uses the custom build process
echo "🚀 Running Replit deployment build..."

# Execute the custom build script
node build-for-deployment.js

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo ""
    echo "📋 Deployment Configuration:"
    echo "  Build Command: ./replit-deploy.sh"
    echo "  Start Command: npm start"
    echo "  Output Directory: dist"
    exit 0
else
    echo "❌ Build failed!"
    exit 1
fi