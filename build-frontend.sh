#!/bin/bash
set -e

echo "⚛️ Building frontend with optimizations..."

# Set NODE_ENV for production build
export NODE_ENV=production

# Run Vite build
npx vite build

echo "✅ Frontend build completed"