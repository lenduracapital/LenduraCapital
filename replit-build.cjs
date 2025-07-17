#!/usr/bin/env node

/**
 * Build script for Replit that creates an ES module entry point
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Replit build process...');

// Create dist directory
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

// Copy src/index.mjs to dist/index.js
const srcFile = path.join('src', 'index.mjs');
const distFile = path.join('dist', 'index.js');

if (fs.existsSync(srcFile)) {
  fs.copyFileSync(srcFile, distFile);
  const stats = fs.statSync(distFile);
  console.log(`✅ Build successful! dist/index.js created (${(stats.size / 1024).toFixed(2)} KB)`);
} else {
  console.error('❌ src/index.mjs not found');
  process.exit(1);
}