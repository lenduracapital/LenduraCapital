#!/bin/bash
set -e

echo "🚀 Starting Replit deployment build..."
echo "Current directory: $(pwd)"
echo "Node version: $(node --version)"

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist/

# Build the project
echo "📦 Running build command..."
npm run build

# Verify the build output
echo "🔍 Verifying build output..."
if [ ! -f "dist/index.js" ]; then
    echo "❌ ERROR: dist/index.js not found after build!"
    echo "Contents of dist directory:"
    ls -la dist/ || echo "dist directory doesn't exist"
    exit 1
fi

# Check file size
FILE_SIZE=$(stat -c%s "dist/index.js" 2>/dev/null || stat -f%z "dist/index.js" 2>/dev/null || echo "0")
echo "✅ dist/index.js exists (size: $FILE_SIZE bytes)"

# Test that it's valid JavaScript
echo "🧪 Testing JavaScript syntax..."
node -c dist/index.js || {
    echo "❌ ERROR: dist/index.js has invalid JavaScript syntax!"
    exit 1
}

echo "✅ Build successful!"
echo "📁 Build artifacts:"
ls -la dist/

# Show deployment readiness
echo ""
echo "🎉 DEPLOYMENT READY"
echo "==================="
echo "Build command: npm run build"
echo "Start command: npm start"
echo "Output file: dist/index.js"
echo ""