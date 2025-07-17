#!/bin/bash

# Build Verification Script - Ensures dist/index.js exists after build
# This addresses the deployment failure: "Build command not creating required dist/index.js file"

set -e  # Exit on any error

echo "🔨 Starting build verification process..."
echo "📅 $(date)"

# Step 1: Clean previous build
echo "🧹 Cleaning previous build artifacts..."
rm -rf dist/
echo "✅ Cleanup complete"

# Step 2: Ensure dist directory exists
echo "📁 Creating dist directory..."
mkdir -p dist
echo "✅ Directory created"

# Step 3: Run the build command
echo "🏗️  Running build command..."
npm run build

# Step 4: Verify dist/index.js exists and is valid
echo "🔍 Verifying build output..."

if [ ! -f "dist/index.js" ]; then
    echo "❌ FAILURE: dist/index.js does not exist after build"
    exit 1
fi

# Check file size
FILE_SIZE=$(stat -c%s "dist/index.js" 2>/dev/null || stat -f%z "dist/index.js" 2>/dev/null || echo "0")
if [ "$FILE_SIZE" -lt 1000 ]; then
    echo "❌ FAILURE: dist/index.js is too small ($FILE_SIZE bytes)"
    exit 1
fi

echo "✅ dist/index.js exists and is valid ($FILE_SIZE bytes)"

# Step 5: Test if the file is valid JavaScript
echo "🧪 Testing JavaScript validity..."
node -c dist/index.js
echo "✅ JavaScript syntax is valid"

# Step 6: Verify start script configuration
echo "📦 Verifying package.json start script..."
START_SCRIPT=$(node -p "JSON.parse(require('fs').readFileSync('package.json')).scripts.start")
if [[ "$START_SCRIPT" != *"dist/index.js"* ]]; then
    echo "❌ FAILURE: Start script doesn't reference dist/index.js"
    echo "   Current: $START_SCRIPT"
    exit 1
fi
echo "✅ Start script correctly configured: $START_SCRIPT"

# Step 7: Check frontend build
if [ ! -d "dist/public" ]; then
    echo "⚠️  WARNING: dist/public directory missing (frontend build)"
else
    echo "✅ Frontend build artifacts found in dist/public"
fi

echo ""
echo "🎉 BUILD VERIFICATION COMPLETE"
echo "✅ All deployment requirements satisfied"
echo "🚀 Ready for deployment"