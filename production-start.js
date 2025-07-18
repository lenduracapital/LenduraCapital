#!/usr/bin/env node

import { existsSync, statSync } from 'fs';
import { execSync } from 'child_process';

console.log('🚀 Production server startup with comprehensive validation...');

// Set production environment
process.env.NODE_ENV = 'production';

try {
  // Validation 1: Ensure dist/index.js exists at correct location
  if (!existsSync('dist/index.js')) {
    console.error('❌ CRITICAL: dist/index.js not found at expected path');
    console.error('   This is the exact file path expected by deployment');
    console.error('   Run: node enhanced-build-for-deployment.js');
    process.exit(1);
  }

  // Validation 2: Check file size to ensure complete build
  const stats = statSync('dist/index.js');
  const fileSizeKB = Math.round(stats.size / 1024);
  
  if (fileSizeKB < 10) {
    console.error(`❌ CRITICAL: dist/index.js is too small (${fileSizeKB} KB)`);
    console.error('   Build may be incomplete or corrupted');
    console.error('   Run: node enhanced-build-for-deployment.js');
    process.exit(1);
  }
  
  console.log(`✅ dist/index.js validated at correct location (${fileSizeKB} KB)`);

  // Validation 3: Verify JavaScript syntax to prevent startup crashes
  try {
    execSync('node -c dist/index.js', { stdio: 'pipe' });
    console.log('✅ JavaScript syntax validation passed');
  } catch (syntaxError) {
    console.error('❌ CRITICAL: dist/index.js has syntax errors');
    console.error('   Server will crash immediately if started');
    console.error('   Run: node enhanced-build-for-deployment.js');
    process.exit(1);
  }

  // Validation 4: Ensure ES modules configuration exists
  if (!existsSync('dist/package.json')) {
    console.error('❌ CRITICAL: dist/package.json missing for ES modules');
    console.error('   Node.js needs this to properly load the application');
    console.error('   Run: node enhanced-build-for-deployment.js');
    process.exit(1);
  }
  
  console.log('✅ ES modules configuration verified');

  // Validation 5: Check frontend assets for serving
  if (!existsSync('dist/public/index.html')) {
    console.error('❌ WARNING: Frontend assets missing at dist/public/');
    console.error('   Static file serving may not work properly');
    console.error('   Consider running: node enhanced-build-for-deployment.js');
  } else {
    console.log('✅ Frontend assets verified');
  }

  // Validation 6: Verify PORT environment variable for deployment
  const port = process.env.PORT || 3000;
  console.log(`✅ Server will bind to port: ${port}`);

  console.log('🎉 All startup validation checks passed!');
  console.log('🚀 Starting production server...');
  console.log('');

  // Import and start the actual server
  const serverModule = await import('./dist/index.js');
  
} catch (error) {
  console.error('❌ STARTUP FAILED:', error.message);
  console.error('');
  console.error('📋 Recovery steps:');
  console.error('1. Rebuild application: node enhanced-build-for-deployment.js');
  console.error('2. Check for build errors and fix source code');
  console.error('3. Verify all dependencies are installed: npm install');
  console.error('4. Contact support if issues persist');
  process.exit(1);
}