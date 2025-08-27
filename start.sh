#!/bin/bash
echo "🏗️  Building for production..."
npm run build
echo "📁 Copying public assets..."
cp -r public/* dist/public/ 2>/dev/null || true
echo "✅ Production build complete!"
echo "🚀 Starting production server..."
NODE_ENV=production tsx server/index.ts
