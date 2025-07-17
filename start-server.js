#!/usr/bin/env node

import { existsSync, statSync } from 'fs';
import { execSync } from 'child_process';
import { resolve } from 'path';

console.log('🚀 Starting production server with enhanced error handling...');

// Enhanced validation of dist/index.js
const distIndexPath = resolve('dist/index.js');
if (!existsSync(distIndexPath)) {
  console.error('❌ ERROR: dist/index.js not found at expected location');
  console.error('Expected location:', distIndexPath);
  console.error('Please run "node build-for-deployment.js" to create the production build');
  process.exit(1);
}

// Check file size to ensure it's not empty
const stats = statSync(distIndexPath);
if (stats.size === 0) {
  console.error('❌ ERROR: dist/index.js exists but is empty');
  console.error('Please run "node build-for-deployment.js" to rebuild');
  process.exit(1);
}

console.log(`✅ Found dist/index.js (${(stats.size / 1024).toFixed(2)} KB)`);

// Validate the server file has correct syntax
try {
  execSync('node -c dist/index.js', { stdio: 'pipe' });
  console.log('✅ Server file syntax validation passed');
} catch (error) {
  console.error('❌ ERROR: dist/index.js has syntax errors');
  console.error('Error details:', error.message);
  console.error('Please run "node build-for-deployment.js" to rebuild the server');
  process.exit(1);
}

// Validate frontend assets exist
if (!existsSync('dist/public')) {
  console.error('❌ ERROR: dist/public directory not found');
  console.error('Frontend assets are missing. Please run "node build-for-deployment.js"');
  process.exit(1);
}

if (!existsSync('dist/public/index.html')) {
  console.error('❌ ERROR: dist/public/index.html not found');
  console.error('Frontend entry point is missing. Please run "node build-for-deployment.js"');
  process.exit(1);
}

console.log('✅ Frontend assets validated');

// Start the server with error handling
console.log('🌐 Starting server in production mode...');
try {
  process.env.NODE_ENV = 'production';
  execSync('node dist/index.js', { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
} catch (error) {
  console.error('❌ ERROR: Server failed to start');
  console.error('Exit code:', error.status);
  console.error('Error message:', error.message);
  console.error('\n📋 Troubleshooting steps:');
  console.error('1. Check server logs above for specific errors');
  console.error('2. Verify database connection if using PostgreSQL');
  console.error('3. Check environment variables are set correctly');
  console.error('4. Rebuild with: node build-for-deployment.js');
  process.exit(1);
}