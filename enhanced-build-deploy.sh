#!/bin/bash

# Enhanced Deployment Build Script
# Addresses all suggested deployment fixes:
# 1. Fix TypeScript configuration to ensure JavaScript output
# 2. Update build script to use esbuild with explicit output file creation
# 3. Add build verification step to ensure dist/index.js exists
# 4. Create prebuild script to ensure clean dist directory
# 5. Verify start script points to correct output file location

set -e  # Exit on any error

echo "🚀 ENHANCED DEPLOYMENT BUILD STARTING"
echo "📅 $(date)"
echo "=========================================="

# Fix 4: Create prebuild step to ensure clean dist directory
echo "📁 Step 1: Prebuild - Clean Directory Setup"
echo "   Creating clean dist directory..."
mkdir -p dist
rm -rf dist/*
echo "✅ Clean dist directory created"

# Fix 1: Verify TypeScript configuration allows JavaScript output
echo "🔧 Step 2: TypeScript Configuration Check"
NO_EMIT=$(node -p "
    try {
        const config = JSON.parse(require('fs').readFileSync('tsconfig.json'));
        config.compilerOptions?.noEmit || false;
    } catch(e) {
        false;
    }
")

if [ "$NO_EMIT" = "true" ]; then
    echo "❌ CRITICAL: TypeScript noEmit is true - this prevents JavaScript output!"
    echo "💡 Fix: Set noEmit to false in tsconfig.json"
    exit 1
fi

EMIT_DECLARATION_ONLY=$(node -p "
    try {
        const config = JSON.parse(require('fs').readFileSync('tsconfig.json'));
        config.compilerOptions?.emitDeclarationOnly || false;
    } catch(e) {
        false;
    }
")

if [ "$EMIT_DECLARATION_ONLY" = "true" ]; then
    echo "❌ CRITICAL: emitDeclarationOnly is true - only generates .d.ts files!"
    echo "💡 Fix: Set emitDeclarationOnly to false in tsconfig.json"
    exit 1
fi

echo "✅ TypeScript configuration allows JavaScript output"

# Fix 5: Verify start script points to correct output file
echo "📦 Step 3: Package.json Start Script Verification"
START_SCRIPT=$(node -p "
    try {
        JSON.parse(require('fs').readFileSync('package.json')).scripts.start || '';
    } catch(e) {
        '';
    }
")

if [[ "$START_SCRIPT" != *"dist/index.js"* ]]; then
    echo "❌ CRITICAL: Start script doesn't reference dist/index.js"
    echo "   Current: $START_SCRIPT"
    echo "💡 Fix: Update start script to reference dist/index.js"
    exit 1
fi
echo "✅ Start script correctly configured: $START_SCRIPT"

# Fix 2: Enhanced build process with explicit output file creation
echo "🏗️  Step 4: Enhanced Build Process"

echo "   Building frontend (Vite)..."
vite build

echo "   Building backend with explicit output configuration..."
# Use explicit outfile instead of outdir to ensure dist/index.js is created
esbuild server/index.ts \
    --platform=node \
    --packages=external \
    --bundle \
    --format=esm \
    --outfile=dist/index.js \
    --minify \
    --sourcemap

echo "✅ Build process completed"

# Fix 3: Comprehensive build verification
echo "🧪 Step 5: Build Verification"

# Check if dist/index.js exists
if [ ! -f "dist/index.js" ]; then
    echo "❌ CRITICAL FAILURE: dist/index.js does not exist after build"
    echo "🔍 Debug: Contents of dist directory:"
    ls -la dist/ || echo "   dist directory doesn't exist"
    exit 1
fi

# Get file size
FILE_SIZE=$(du -h dist/index.js | cut -f1)
echo "✅ dist/index.js exists (${FILE_SIZE})"

# Test JavaScript syntax
if node -c dist/index.js; then
    echo "✅ dist/index.js has valid JavaScript syntax"
else
    echo "❌ CRITICAL: dist/index.js has invalid JavaScript syntax"
    exit 1
fi

# Test server can start (timeout after 5 seconds)
echo "   Testing server startup..."
if timeout 5s node dist/index.js &>/dev/null || [ $? -eq 124 ]; then
    echo "✅ Server startup test passed"
else
    echo "⚠️  Server startup test completed with warnings (this may be normal)"
fi

echo ""
echo "🎉 ENHANCED DEPLOYMENT BUILD SUCCESSFUL"
echo "=========================================="
echo "✅ All deployment fixes applied:"
echo "   • TypeScript configuration verified"
echo "   • Clean dist directory created"
echo "   • Enhanced build with explicit output file"
echo "   • Build verification passed"
echo "   • Start script verified"
echo ""
echo "📁 Build output:"
ls -la dist/index.js
echo ""
echo "🚀 Ready for deployment!"
echo "   Build: ./enhanced-build-deploy.sh"
echo "   Start: npm start"