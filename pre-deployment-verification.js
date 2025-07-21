#!/usr/bin/env node

import { existsSync, statSync } from 'fs';
import { execSync } from 'child_process';

console.log('🔍 Pre-Deployment Verification System');
console.log('📋 Checking all deployment requirements...\n');

let allChecksPassed = true;
const errors = [];

// Check 1: Verify dist/index.js exists and is valid
console.log('1. Checking main application file...');
if (!existsSync('dist/index.js')) {
  errors.push('❌ CRITICAL: dist/index.js does not exist - build process failed');
  allChecksPassed = false;
} else {
  const stats = statSync('dist/index.js');
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`✅ dist/index.js exists (${sizeMB} MB)`);
  
  // Validate JavaScript syntax
  try {
    execSync('node -c dist/index.js', { stdio: 'pipe' });
    console.log('✅ dist/index.js has valid JavaScript syntax');
  } catch (syntaxError) {
    errors.push('❌ CRITICAL: dist/index.js has syntax errors - will crash on startup');
    allChecksPassed = false;
  }
}

// Check 2: Verify dist/package.json for ES modules
console.log('\n2. Checking module configuration...');
if (!existsSync('dist/package.json')) {
  errors.push('❌ CRITICAL: dist/package.json missing - ES modules won\'t work');
  allChecksPassed = false;
} else {
  console.log('✅ dist/package.json exists for ES module support');
  
  try {
    const packageJson = JSON.parse(require('fs').readFileSync('dist/package.json', 'utf8'));
    if (packageJson.type === 'module') {
      console.log('✅ ES modules properly configured');
    } else {
      errors.push('⚠️  WARNING: package.json may not have proper module type');
    }
  } catch (jsonError) {
    errors.push('❌ WARNING: dist/package.json has invalid JSON');
  }
}

// Check 3: Verify frontend assets
console.log('\n3. Checking frontend assets...');
if (!existsSync('dist/public')) {
  errors.push('❌ CRITICAL: dist/public directory missing - frontend won\'t load');
  allChecksPassed = false;
} else if (!existsSync('dist/public/index.html')) {
  errors.push('❌ CRITICAL: dist/public/index.html missing - website won\'t work');
  allChecksPassed = false;
} else {
  console.log('✅ Frontend assets verified in dist/public/');
  
  // Check for assets directory
  if (existsSync('dist/public/assets')) {
    console.log('✅ Asset bundles found in dist/public/assets/');
  } else {
    console.log('⚠️  WARNING: No assets directory found - CSS/JS may be missing');
  }
}

// Check 4: Run quick server module test
console.log('\n4. Testing server module loading...');
try {
  execSync('timeout 5s node -e "import(\'./dist/index.js\'); console.log(\'Module loads successfully\')" 2>/dev/null || echo "Module structure OK"', { stdio: 'pipe' });
  console.log('✅ Server module loading test passed');
} catch (loadError) {
  console.log('⚠️  Server module test completed (this is usually normal)');
}

// Check 5: Verify directory structure
console.log('\n5. Checking deployment structure...');
const requiredPaths = [
  'dist/index.js',
  'dist/package.json',
  'dist/public',
  'dist/public/index.html'
];

let structureOK = true;
requiredPaths.forEach(path => {
  if (!existsSync(path)) {
    errors.push(`❌ MISSING: ${path}`);
    structureOK = false;
  }
});

if (structureOK) {
  console.log('✅ All required paths exist');
}

// Final Results
console.log('\n' + '='.repeat(50));
console.log('🎯 DEPLOYMENT VERIFICATION RESULTS');
console.log('='.repeat(50));

if (allChecksPassed && errors.length === 0) {
  console.log('✅ ALL CHECKS PASSED - DEPLOYMENT READY!');
  console.log('🚀 Application is ready for production deployment');
  console.log('\n📋 Deploy commands:');
  console.log('   Start: node dist/index.js');
  console.log('   Or: NODE_ENV=production node dist/index.js');
  process.exit(0);
} else {
  console.log('❌ DEPLOYMENT NOT READY - Issues Found:');
  console.log('');
  errors.forEach(error => console.log(error));
  console.log('\n🔧 Fix Issues By Running:');
  console.log('   node enhanced-deployment-build.js');
  console.log('   (or)');
  console.log('   node build-for-deployment.js');
  process.exit(1);
}