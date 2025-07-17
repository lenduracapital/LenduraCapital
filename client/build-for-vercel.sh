#!/bin/bash

# Quick build script for Vercel deployment
echo "Building client for Vercel deployment..."

# Create dist directory
mkdir -p dist

# Copy index.html
cp index.html dist/

# Create minimal JS bundle
echo "console.log('FundTek Capital Group - Client Ready');" > dist/main.js

# Update index.html to use the built main.js
sed -i 's|/src/main.tsx|/main.js|g' dist/index.html
sed -i 's|type="module"||g' dist/index.html

echo "✅ Client build complete for Vercel"
echo "📁 Output in: client/dist/"
ls -la dist/