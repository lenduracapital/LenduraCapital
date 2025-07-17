#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, mkdirSync, rmSync, statSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 REPLIT DEPLOYMENT FIX - Comprehensive Build Solution\n');
console.log('This script ensures dist/index.js is created correctly for Replit deployment.\n');

// Step 1: Clean existing dist
console.log('Step 1: Cleaning dist directory...');
if (existsSync('dist')) {
  rmSync('dist', { recursive: true, force: true });
}
mkdirSync('dist', { recursive: true });

// Step 2: Build frontend
console.log('\nStep 2: Building frontend with Vite...');
try {
  execSync('vite build', { stdio: 'inherit' });
  console.log('✅ Frontend build complete');
} catch (error) {
  console.error('❌ Frontend build failed:', error.message);
  process.exit(1);
}

// Step 3: Build backend with explicit output file
console.log('\nStep 3: Building backend with esbuild...');
try {
  // Use esbuild directly with explicit outfile
  execSync('esbuild server/index.ts --bundle --platform=node --format=esm --packages=external --outfile=dist/index.js --minify', {
    stdio: 'inherit'
  });
  console.log('✅ Backend build complete');
} catch (error) {
  console.error('❌ Backend build failed:', error.message);
  process.exit(1);
}

// Step 4: Verify the output
console.log('\nStep 4: Verifying build output...');
const indexPath = join('dist', 'index.js');
if (!existsSync(indexPath)) {
  console.error('❌ CRITICAL: dist/index.js was not created!');
  console.log('\nDebugging info:');
  console.log('Current directory:', process.cwd());
  console.log('Dist contents:');
  try {
    execSync('ls -la dist/', { stdio: 'inherit' });
  } catch (e) {}
  process.exit(1);
}

const stats = statSync(indexPath);
const sizeKB = (stats.size / 1024).toFixed(2);
console.log(`✅ dist/index.js exists (${sizeKB} KB)`);

// Step 5: Test syntax
console.log('\nStep 5: Testing JavaScript syntax...');
try {
  execSync(`node --check ${indexPath}`, { stdio: 'pipe' });
  console.log('✅ JavaScript syntax is valid');
} catch (error) {
  console.error('❌ JavaScript syntax error:', error.message);
  process.exit(1);
}

// Step 6: Create deployment instructions
console.log('\n' + '='.repeat(60));
console.log('✅ BUILD SUCCESSFUL - READY FOR DEPLOYMENT');
console.log('='.repeat(60));
console.log('\nDeployment Instructions for Replit:');
console.log('1. Use this as your build command: node replit-deployment-fix.mjs');
console.log('2. Use this as your start command: npm start');
console.log('3. Main file created: dist/index.js');
console.log(`4. File size: ${sizeKB} KB`);
console.log('\nIf deployment still fails, try:');
console.log('- Clear deployment cache');
console.log('- Restart the deployment process');
console.log('- Ensure Node.js version compatibility');
console.log('='.repeat(60) + '\n');

process.exit(0);