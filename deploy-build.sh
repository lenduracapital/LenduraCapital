#!/bin/bash

# Enhanced Build Script for Deployment
# This script implements all the suggested deployment fixes

echo "🚀 Starting enhanced build process..."

# 1. Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist

# 2. Verify TypeScript configuration
echo "🔍 Checking TypeScript configuration..."
if grep -q '"noEmit": true' tsconfig.json; then
    echo "❌ ERROR: TypeScript noEmit is set to true, this prevents file output!"
    echo "Please set noEmit to false in tsconfig.json"
    exit 1
fi

echo "✅ TypeScript configuration is correct"

# 3. Run type checking
echo "🔧 Running TypeScript type checking..."
npx tsc --noEmit
if [ $? -ne 0 ]; then
    echo "❌ TypeScript type checking failed!"
    exit 1
fi

echo "✅ TypeScript type checking passed"

# 4. Build frontend
echo "🏗️  Building frontend..."
npx vite build
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed!"
    exit 1
fi

echo "✅ Frontend build completed"

# 5. Build backend
echo "🏗️  Building backend..."
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist
if [ $? -ne 0 ]; then
    echo "❌ Backend build failed!"
    exit 1
fi

echo "✅ Backend build completed"

# 6. Verify required files exist
echo "🔍 Verifying build output..."
node build-verification.js
if [ $? -ne 0 ]; then
    echo "❌ Build verification failed!"
    exit 1
fi

# 7. Test production start
echo "🧪 Testing production start..."
timeout 10s node dist/index.js &
SERVER_PID=$!
sleep 3

# Check if server is responding
if curl -f -s http://localhost:5000/api/data > /dev/null; then
    echo "✅ Production server test passed"
    kill $SERVER_PID 2>/dev/null
else
    echo "❌ Production server test failed"
    kill $SERVER_PID 2>/dev/null
    exit 1
fi

echo ""
echo "🎉 Build process completed successfully!"
echo "📦 dist/index.js is ready for deployment"
echo "🚀 You can now deploy with confidence"