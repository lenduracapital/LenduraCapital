#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, statSync } from 'fs';
import { resolve } from 'path';

console.log('🚀 Running Complete Deployment Verification...');
console.log('📋 Verifying ALL 5 Suggested Deployment Fixes Applied\n');

let allTestsPassed = true;

// Fix 1: Build script creates dist/index.js at correct location
console.log('✅ FIX 1: Build Script Creates dist/index.js at Correct Location');
try {
  if (!existsSync('dist/index.js')) {
    throw new Error('dist/index.js not found');
  }
  
  const stats = statSync('dist/index.js');
  const fileSizeKB = (stats.size / 1024).toFixed(1);
  console.log(`   📁 dist/index.js exists at expected location`);
  console.log(`   📊 File size: ${fileSizeKB} KB`);
  
  // Verify JavaScript syntax
  execSync('node -c dist/index.js', { stdio: 'pipe' });
  console.log(`   ✅ JavaScript syntax is valid`);
  
} catch (error) {
  console.log(`   ❌ FAILED: ${error.message}`);
  allTestsPassed = false;
}

// Fix 2: Build verification checks file exists
console.log('\n✅ FIX 2: Build Verification Ensures dist/index.js Exists');
try {
  // Test the build verification script
  execSync('node build-verification.js', { stdio: 'pipe' });
  console.log(`   ✅ Build verification script passes`);
  console.log(`   🔍 Comprehensive checks: file existence, syntax, frontend assets`);
  
} catch (error) {
  console.log(`   ❌ FAILED: Build verification script failed`);
  allTestsPassed = false;
}

// Fix 3: Clean dist directory before building
console.log('\n✅ FIX 3: Clean Dist Directory Before Building');
try {
  // Verify build script includes cleaning logic
  const buildScript = execSync('grep -n "rmSync.*dist" build-for-deployment.js', { encoding: 'utf8' });
  console.log(`   🧹 Clean dist logic found in build script`);
  console.log(`   📝 ${buildScript.trim()}`);
  
} catch (error) {
  console.log(`   ❌ FAILED: Clean dist logic not found in build script`);
  allTestsPassed = false;
}

// Fix 4: Run command uses correct file path  
console.log('\n✅ FIX 4: Run Command Uses Correct File Path');
try {
  // Check package.json start script
  const packageJson = JSON.parse(execSync('cat package.json', { encoding: 'utf8' }));
  const startScript = packageJson.scripts.start;
  
  if (startScript.includes('dist/index.js')) {
    console.log(`   📦 package.json start script: "${startScript}"`);
    console.log(`   ✅ Correctly points to dist/index.js`);
  } else {
    throw new Error(`Start script doesn't point to dist/index.js: ${startScript}`);
  }
  
} catch (error) {
  console.log(`   ❌ FAILED: ${error.message}`);
  allTestsPassed = false;
}

// Fix 5: dist/package.json for proper module resolution
console.log('\n✅ FIX 5: dist/package.json for Proper Module Resolution');
try {
  if (!existsSync('dist/package.json')) {
    throw new Error('dist/package.json not found');
  }
  
  const distPackageJson = JSON.parse(execSync('cat dist/package.json', { encoding: 'utf8' }));
  
  console.log(`   📄 dist/package.json exists`);
  console.log(`   🔧 Type: ${distPackageJson.type}`);
  console.log(`   📍 Main: ${distPackageJson.main}`);
  
  if (distPackageJson.type !== 'module') {
    throw new Error('dist/package.json should have "type": "module"');
  }
  
  if (distPackageJson.main !== 'index.js') {
    throw new Error('dist/package.json should have "main": "index.js"');
  }
  
  console.log(`   ✅ Proper ES module configuration`);
  
} catch (error) {
  console.log(`   ❌ FAILED: ${error.message}`);
  allTestsPassed = false;
}

// Additional verification: Frontend assets
console.log('\n🌐 ADDITIONAL: Frontend Assets Verification');
try {
  if (!existsSync('dist/public/index.html')) {
    throw new Error('dist/public/index.html not found');
  }
  
  const htmlStats = statSync('dist/public/index.html');
  const htmlSizeKB = (htmlStats.size / 1024).toFixed(1);
  
  console.log(`   📱 dist/public/index.html exists (${htmlSizeKB} KB)`);
  
  // Count asset files
  const assetCount = execSync('find dist/public/assets -type f | wc -l', { encoding: 'utf8' }).trim();
  console.log(`   🎨 ${assetCount} asset files in dist/public/assets/`);
  console.log(`   ✅ Frontend build complete`);
  
} catch (error) {
  console.log(`   ❌ WARNING: Frontend assets issue: ${error.message}`);
}

// Final summary
console.log('\n' + '='.repeat(60));
if (allTestsPassed) {
  console.log('🎉 ALL DEPLOYMENT FIXES SUCCESSFULLY APPLIED AND VERIFIED!');
  console.log('🚀 DEPLOYMENT STATUS: READY');
  console.log('\n📋 Deployment Commands:');
  console.log('   Build: node build-for-deployment.js');
  console.log('   Start: NODE_ENV=production node dist/index.js');
  console.log('\n✅ All 5 suggested fixes implemented and working correctly');
} else {
  console.log('❌ SOME DEPLOYMENT FIXES NEED ATTENTION');
  console.log('🔧 Please review the failed checks above');
}
console.log('='.repeat(60));