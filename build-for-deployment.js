#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, rmSync } from 'fs';
import { resolve } from 'path';

console.log('🚀 Starting deployment build...');

// Step 1: Clean dist directory
console.log('🧹 Cleaning dist directory...');
const distPath = resolve('dist');
if (existsSync(distPath)) {
  rmSync(distPath, { recursive: true, force: true });
}

try {
  // Step 2: Build frontend with Vite
  console.log('📦 Building frontend with Vite...');
  execSync('npx vite build', { stdio: 'inherit' });

  // Step 3: Build backend with esbuild
  console.log('⚙️  Building backend with esbuild...');
  execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/index.js', { stdio: 'inherit' });

  // Step 4: Simple verification that dist/index.js exists
  console.log('🔍 Verifying build output...');
  if (!existsSync('dist/index.js')) {
    throw new Error('dist/index.js was not created');
  }
  console.log('✅ Build verification passed: dist/index.js exists');

  console.log('✅ Deployment build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}