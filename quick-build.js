#!/usr/bin/env node

/**
 * Quick Build Script for FundTek Capital Group
 * Bypasses problematic Vite build that times out on large assets
 */

import { execSync } from 'child_process';
import fs from 'fs';

console.log('🚀 Quick build process starting...');

try {
  // Clean dist directory
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }
  fs.mkdirSync('dist', { recursive: true });

  // Build server ONLY - this is what deployment needs
  console.log('🔧 Building server bundle with esbuild...');
  const startTime = Date.now();
  
  execSync(`npx esbuild server/index.ts \
    --platform=node \
    --packages=external \
    --bundle \
    --format=esm \
    --outfile=dist/index.js \
    --target=es2022 \
    --minify`, {
    stdio: 'inherit'
  });
  
  const buildTime = Date.now() - startTime;
  
  // Verify dist/index.js exists
  if (fs.existsSync('dist/index.js')) {
    const size = fs.statSync('dist/index.js').size;
    console.log(`\n✅ BUILD SUCCESSFUL!`);
    console.log(`📦 dist/index.js created: ${(size / 1024).toFixed(1)}KB`);
    console.log(`⚡ Build completed in ${buildTime}ms`);
    console.log(`\n🎉 Ready for deployment!`);
    process.exit(0);
  } else {
    throw new Error('dist/index.js was not created');
  }
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}