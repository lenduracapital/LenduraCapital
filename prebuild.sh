#!/bin/bash

# Prebuild Script - Ensures clean build environment
# Addresses: "Add prebuild step to ensure dist directory exists"

set -e

echo "🚀 Prebuild preparation starting..."

# Ensure dist directory exists
echo "📁 Ensuring dist directory exists..."
mkdir -p dist

# Clean any existing build artifacts
echo "🧹 Cleaning existing build artifacts..."
rm -rf dist/*

# Verify TypeScript configuration
echo "🔍 Checking TypeScript configuration..."
if [ -f "tsconfig.json" ]; then
    # Check if noEmit is set to true (would prevent output)
    NO_EMIT=$(node -p "
        try {
            const config = JSON.parse(require('fs').readFileSync('tsconfig.json'));
            config.compilerOptions?.noEmit || false;
        } catch(e) {
            false;
        }
    ")
    
    if [ "$NO_EMIT" = "true" ]; then
        echo "❌ ERROR: TypeScript noEmit is set to true"
        echo "💡 This prevents JavaScript file output generation"
        exit 1
    fi
    
    echo "✅ TypeScript configuration allows file output"
else
    echo "⚠️  No tsconfig.json found"
fi

# Verify build script exists
echo "🔧 Verifying build script..."
BUILD_SCRIPT=$(node -p "
    try {
        JSON.parse(require('fs').readFileSync('package.json')).scripts.build || '';
    } catch(e) {
        '';
    }
")

if [ -z "$BUILD_SCRIPT" ]; then
    echo "❌ ERROR: No build script found in package.json"
    exit 1
fi

echo "✅ Build script found: $BUILD_SCRIPT"

echo "🎯 Prebuild preparation complete"
echo "📁 Directory structure ready for build"