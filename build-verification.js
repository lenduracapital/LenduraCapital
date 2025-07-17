#!/usr/bin/env node

/**
 * Build Verification Script
 * Ensures all required files are generated during the build process
 */

import { existsSync, statSync } from 'fs';
import { join } from 'path';

const REQUIRED_FILES = [
  'dist/index.js',
  'dist/public/index.html'
];

const REQUIRED_DIRS = [
  'dist',
  'dist/public'
];

function checkFileExists(filepath) {
  if (!existsSync(filepath)) {
    console.error(`❌ Required file missing: ${filepath}`);
    return false;
  }
  
  const stats = statSync(filepath);
  if (stats.size === 0) {
    console.error(`❌ Required file is empty: ${filepath}`);
    return false;
  }
  
  console.log(`✅ File verified: ${filepath} (${stats.size} bytes)`);
  return true;
}

function checkDirectoryExists(dirpath) {
  if (!existsSync(dirpath)) {
    console.error(`❌ Required directory missing: ${dirpath}`);
    return false;
  }
  
  console.log(`✅ Directory verified: ${dirpath}`);
  return true;
}

function main() {
  console.log('🔍 Verifying build output...\n');
  
  let allChecksPass = true;
  
  // Check required directories
  for (const dir of REQUIRED_DIRS) {
    if (!checkDirectoryExists(dir)) {
      allChecksPass = false;
    }
  }
  
  // Check required files
  for (const file of REQUIRED_FILES) {
    if (!checkFileExists(file)) {
      allChecksPass = false;
    }
  }
  
  console.log('\n' + '='.repeat(50));
  
  if (allChecksPass) {
    console.log('✅ All build verification checks passed!');
    console.log('🚀 Build is ready for deployment');
    process.exit(0);
  } else {
    console.log('❌ Build verification failed!');
    console.log('🛠️  Please check the build process and fix any issues');
    process.exit(1);
  }
}

main();