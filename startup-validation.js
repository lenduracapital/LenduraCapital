#!/usr/bin/env node

import { existsSync, statSync } from 'fs';
import { execSync } from 'child_process';

console.log('🔍 Pre-startup validation for deployment...');

// Check if we're in production mode
const isProduction = process.env.NODE_ENV === 'production';
console.log(`🌍 Environment: ${isProduction ? 'production' : 'development'}`);

if (isProduction) {
  console.log('🚀 Running production startup validation...');
  
  // Validate dist/index.js exists
  if (!existsSync('dist/index.js')) {
    console.error('❌ STARTUP FAILURE: dist/index.js does not exist');
    console.error('   Run "npm run build" to create the production build');
    process.exit(1);
  }
  
  // Validate file size
  const stats = statSync('dist/index.js');
  const fileSizeKB = Math.round(stats.size / 1024);
  
  if (fileSizeKB < 10) {
    console.error(`❌ STARTUP FAILURE: dist/index.js is too small (${fileSizeKB} KB)`);
    console.error('   The build may be incomplete. Run "npm run build" again.');
    process.exit(1);
  }
  
  console.log(`✅ dist/index.js validated (${fileSizeKB} KB)`);
  
  // Validate JavaScript syntax
  try {
    execSync('node -c dist/index.js', { stdio: 'pipe' });
    console.log('✅ JavaScript syntax validation passed');
  } catch (error) {
    console.error('❌ STARTUP FAILURE: dist/index.js has syntax errors');
    console.error('   Run "npm run build" to rebuild the application');
    process.exit(1);
  }
  
  // Validate package.json exists
  if (!existsSync('dist/package.json')) {
    console.error('❌ STARTUP FAILURE: dist/package.json missing');
    console.error('   Run "npm run build" to create deployment configuration');
    process.exit(1);
  }
  
  console.log('✅ dist/package.json validated');
  
  // Validate frontend assets exist
  if (!existsSync('dist/public/index.html')) {
    console.error('❌ STARTUP FAILURE: Frontend assets missing');
    console.error('   dist/public/index.html not found. Run "npm run build"');
    process.exit(1);
  }
  
  console.log('✅ Frontend assets validated');
  
  console.log('🎉 All startup validation checks passed!');
  console.log('🚀 Starting production server...');
} else {
  console.log('🔧 Development mode - skipping production validation');
}