#!/usr/bin/env node

/**
 * Simple build script that ensures dist/index.js is created
 */

import { execSync } from 'child_process';
import fs from 'fs';

console.log('🏗️  Building FundTek Capital Group...\n');

// Clean dist
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true, force: true });
}
fs.mkdirSync('dist');

// Build client
console.log('📦 Building client...');
try {
  execSync('vite build', { stdio: 'inherit' });
} catch (e) {
  console.error('Client build failed');
  process.exit(1);
}

// Build server - use outfile instead of outdir
console.log('\n🔧 Building server...');
try {
  execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/index.js --target=node18', { stdio: 'inherit' });
} catch (e) {
  console.error('Server build failed');
  process.exit(1);
}

// Verify
if (!fs.existsSync('dist/index.js')) {
  console.error('\n❌ Build failed: dist/index.js not created');
  process.exit(1);
}

console.log('\n✅ Build successful! dist/index.js created');