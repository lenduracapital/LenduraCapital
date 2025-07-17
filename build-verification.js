#!/usr/bin/env node

import { existsSync, statSync } from 'fs';
import { execSync } from 'child_process';

console.log('🔍 Running deployment verification...');

// Check if dist/index.js exists
if (!existsSync('dist/index.js')) {
  console.error('❌ FAILED: dist/index.js does not exist');
  process.exit(1);
}

// Check if dist/index.js is valid JavaScript
try {
  execSync('node -c dist/index.js', { stdio: 'pipe' });
  console.log('✅ dist/index.js exists and has valid syntax');
} catch (error) {
  console.error('❌ FAILED: dist/index.js has syntax errors');
  process.exit(1);
}

// Check file size
const stats = statSync('dist/index.js');
const fileSizeKB = Math.round(stats.size / 1024);
console.log(`✅ dist/index.js size: ${fileSizeKB} KB`);

// Check if frontend assets exist
if (!existsSync('dist/public')) {
  console.error('❌ FAILED: dist/public directory does not exist');
  process.exit(1);
}

if (!existsSync('dist/public/index.html')) {
  console.error('❌ FAILED: dist/public/index.html does not exist');
  process.exit(1);
}

console.log('✅ Frontend assets verified in dist/public/');

// Check if all required files exist for deployment
const requiredFiles = [
  'dist/index.js',
  'dist/public/index.html',
  'dist/public/assets'
];

for (const file of requiredFiles) {
  if (!existsSync(file)) {
    console.error(`❌ FAILED: Required file/directory ${file} does not exist`);
    process.exit(1);
  }
}

console.log('✅ All required deployment files verified');

console.log('🎉 All deployment verification checks passed!');