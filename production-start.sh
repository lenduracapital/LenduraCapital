#!/bin/bash
echo "🏗️  Building Lendura Capital for production..."
npm run build
echo "📁 Copying public assets to build directory..."
cp -r public/* dist/public/ 2>/dev/null || true
echo "📦 Verifying build assets..."
ls -la dist/public/assets/ | head -5
echo "✅ Production build complete!"
echo "🚀 Starting Lendura Capital production server..."
NODE_ENV=production tsx server/index.ts
