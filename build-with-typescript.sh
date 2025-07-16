#!/bin/bash

# TypeScript Build Script - Ensures proper TypeScript compilation
# Addresses the core issue: "TypeScript compilation output is not being created during build"

set -e

echo "🔧 TypeScript Build Process for FundTek Capital Group"
echo "===================================================="

# Clean and prepare
rm -rf dist
mkdir -p dist

echo "1️⃣ Running TypeScript compilation check..."
npx tsc --noEmit --project tsconfig.json

echo "2️⃣ Building with TypeScript-aware bundler..."
npx esbuild server/index.ts \
    --platform=node \
    --packages=external \
    --bundle \
    --format=esm \
    --outdir=dist \
    --target=es2022 \
    --minify \
    --sourcemap \
    --external:pg-native \
    --external:bufferutil \
    --external:utf-8-validate

echo "3️⃣ Verifying TypeScript output..."
if [ -f "dist/index.js" ]; then
    echo "✅ dist/index.js successfully generated"
    echo "📊 Size: $(stat -c%s dist/index.js) bytes"
    
    # Test syntax
    node -c dist/index.js && echo "✅ JavaScript syntax valid"
else
    echo "❌ FAILED: dist/index.js not generated"
    exit 1
fi

echo "✅ TypeScript build complete - ready for deployment"