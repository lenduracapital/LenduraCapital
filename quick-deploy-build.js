#!/usr/bin/env node

/**
 * Quick deployment build - focuses only on creating dist/index.js
 */

import { execSync } from 'child_process';
import fs from 'fs';

console.log('🚀 Quick deployment build...\n');

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Build server only - this is what deployment needs
console.log('Building server...');
execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/index.js', { 
  stdio: 'inherit' 
});

// Verify the file exists
if (fs.existsSync('dist/index.js')) {
  const size = fs.statSync('dist/index.js').size;
  console.log(`\n✅ Success! dist/index.js created (${(size/1024).toFixed(2)} KB)`);
  process.exit(0);
} else {
  console.error('\n❌ Failed to create dist/index.js');
  process.exit(1);
}