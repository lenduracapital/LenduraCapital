#!/usr/bin/env node

// Replit-specific build script that ensures proper TypeScript compilation
// This script compiles src/index.ts to dist/index.js

import { execSync } from 'child_process';
import { existsSync, mkdirSync, rmSync, copyFileSync } from 'fs';
import { join } from 'path';

console.log('🚀 Replit Build Script - TypeScript Compilation\n');

// Step 1: Clean and prepare dist directory
console.log('Step 1: Preparing dist directory...');
if (existsSync('dist')) {
  rmSync('dist', { recursive: true, force: true });
}
mkdirSync('dist', { recursive: true });
console.log('✅ Dist directory ready\n');

// Step 2: Build frontend with Vite
console.log('Step 2: Building frontend assets...');
try {
  execSync('vite build', { stdio: 'inherit' });
  console.log('✅ Frontend build complete\n');
} catch (error) {
  console.error('❌ Frontend build failed:', error.message);
  process.exit(1);
}

// Step 3: Compile TypeScript from src/index.ts to dist/index.js
console.log('Step 3: Compiling TypeScript (src/index.ts → dist/index.js)...');
try {
  // Use esbuild with explicit input and output
  execSync('esbuild src/index.ts --bundle --platform=node --format=esm --packages=external --outfile=dist/index.js --minify', {
    stdio: 'inherit'
  });
  console.log('✅ TypeScript compilation complete\n');
} catch (error) {
  console.error('❌ TypeScript compilation failed:', error.message);
  process.exit(1);
}

// Step 4: Verify the build output
console.log('Step 4: Verifying build output...');
const indexPath = join('dist', 'index.js');

if (!existsSync(indexPath)) {
  console.error('❌ CRITICAL: dist/index.js was not created!');
  process.exit(1);
}

// Check file size and syntax
const { statSync } = await import('fs');
const stats = statSync(indexPath);
const sizeKB = (stats.size / 1024).toFixed(2);
console.log(`✅ dist/index.js exists (${sizeKB} KB)`);

// Test JavaScript syntax
try {
  execSync(`node --check ${indexPath}`, { stdio: 'pipe' });
  console.log('✅ JavaScript syntax is valid\n');
} catch (error) {
  console.error('❌ JavaScript syntax error:', error.message);
  process.exit(1);
}

// Step 5: Display deployment instructions
console.log('=' .repeat(60));
console.log('🎉 BUILD SUCCESSFUL - READY FOR DEPLOYMENT');
console.log('=' .repeat(60));
console.log('\nReplit Deployment Configuration:');
console.log('- Build command: node replit-build.js');
console.log('- Start command: node dist/index.js');
console.log(`- Main file: dist/index.js (${sizeKB} KB)`);
console.log('\nThe project structure is now:');
console.log('  src/index.ts  →  dist/index.js');
console.log('=' .repeat(60) + '\n');