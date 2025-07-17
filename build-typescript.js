#!/usr/bin/env node

// Build script that compiles TypeScript from src/ to dist/
import { execSync } from 'child_process';
import { existsSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';

console.log('🏗️  Building TypeScript project...\n');

// Step 1: Clean dist directory
console.log('Step 1: Cleaning dist directory...');
if (existsSync('dist')) {
  rmSync('dist', { recursive: true, force: true });
}
mkdirSync('dist', { recursive: true });
console.log('✅ Dist directory cleaned\n');

// Step 2: Build frontend with Vite
console.log('Step 2: Building frontend with Vite...');
try {
  execSync('vite build', { stdio: 'inherit' });
  console.log('✅ Frontend build complete\n');
} catch (error) {
  console.error('❌ Frontend build failed:', error.message);
  process.exit(1);
}

// Step 3: Compile TypeScript from src/ to dist/
console.log('Step 3: Compiling TypeScript from src/ to dist/...');
try {
  execSync('esbuild src/index.ts --bundle --platform=node --format=esm --packages=external --outfile=dist/index.js --minify', {
    stdio: 'inherit'
  });
  console.log('✅ TypeScript compilation complete\n');
} catch (error) {
  console.error('❌ TypeScript compilation failed:', error.message);
  process.exit(1);
}

// Step 4: Verify output
console.log('Step 4: Verifying build output...');
if (!existsSync('dist/index.js')) {
  console.error('❌ Build failed: dist/index.js not created');
  process.exit(1);
}

const { statSync } = await import('fs');
const stats = statSync('dist/index.js');
const sizeKB = (stats.size / 1024).toFixed(2);
console.log(`✅ dist/index.js created successfully (${sizeKB} KB)\n`);

console.log('🎉 Build complete! Ready to run: node dist/index.js');