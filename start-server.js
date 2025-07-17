#!/usr/bin/env node

import { existsSync, statSync } from 'fs';
import { execSync } from 'child_process';

console.log('🔍 Pre-startup verification...');

// Check 1: Verify dist/index.js exists
if (!existsSync('dist/index.js')) {
  console.error('❌ CRITICAL ERROR: dist/index.js does not exist');
  console.error('📋 Troubleshooting steps:');
  console.error('1. Run: npm run build');
  console.error('2. Check if build completed successfully');
  console.error('3. Verify server/index.ts exists');
  process.exit(1);
}

// Check 2: Verify file size is reasonable (not empty)
const stats = statSync('dist/index.js');
const fileSizeKB = Math.round(stats.size / 1024);
if (stats.size < 1000) { // Less than 1KB indicates problem
  console.error(`❌ CRITICAL ERROR: dist/index.js is too small (${fileSizeKB} KB)`);
  console.error('📋 This usually indicates a build failure');
  process.exit(1);
}

// Check 3: Verify JavaScript syntax
try {
  execSync('node -c dist/index.js', { stdio: 'pipe' });
  console.log(`✅ dist/index.js verified (${fileSizeKB} KB, valid syntax)`);
} catch (error) {
  console.error('❌ CRITICAL ERROR: dist/index.js has syntax errors');
  console.error('📋 Rebuild required: npm run build');
  process.exit(1);
}

// Check 4: Verify dist/package.json exists for ES modules
if (!existsSync('dist/package.json')) {
  console.error('❌ CRITICAL ERROR: dist/package.json missing');
  console.error('📋 Required for ES modules deployment');
  console.error('1. Run: node build-for-deployment.js');
  process.exit(1);
}
console.log('✅ ES modules configuration verified');

// Check 5: Verify frontend assets exist
if (!existsSync('dist/public')) {
  console.error('❌ WARNING: dist/public directory missing');
  console.error('📋 Frontend may not be available');
}

// Check 6: Verify essential environment variables
if (!process.env.DATABASE_URL) {
  console.error('❌ WARNING: DATABASE_URL not set');
}

console.log('✅ All pre-startup checks passed');
console.log('🚀 Starting production server...');

// Start the actual server
try {
  execSync('node dist/index.js', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Server failed to start:', error.message);
  process.exit(1);
}