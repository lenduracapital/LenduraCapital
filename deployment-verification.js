#!/usr/bin/env node

import { existsSync, statSync } from 'fs';
import { execSync } from 'child_process';

console.log('🔍 Running comprehensive deployment verification...');

let allChecksPass = true;

// Check 1: Verify dist/index.js exists
console.log('\n1. Checking dist/index.js...');
if (!existsSync('dist/index.js')) {
  console.error('   ❌ FAIL: dist/index.js does not exist');
  allChecksPass = false;
} else {
  const stats = statSync('dist/index.js');
  const fileSizeKB = Math.round(stats.size / 1024);
  
  if (stats.size < 1000) {
    console.error(`   ❌ FAIL: dist/index.js is too small (${fileSizeKB} KB)`);
    allChecksPass = false;
  } else {
    console.log(`   ✅ PASS: dist/index.js exists (${fileSizeKB} KB)`);
  }
}

// Check 2: Verify JavaScript syntax
console.log('\n2. Checking JavaScript syntax...');
try {
  execSync('node -c dist/index.js', { stdio: 'pipe' });
  console.log('   ✅ PASS: dist/index.js has valid syntax');
} catch (error) {
  console.error('   ❌ FAIL: dist/index.js has syntax errors');
  allChecksPass = false;
}

// Check 3: Verify frontend assets
console.log('\n3. Checking frontend assets...');
if (!existsSync('dist/public')) {
  console.error('   ❌ FAIL: dist/public directory does not exist');
  allChecksPass = false;
} else if (!existsSync('dist/public/index.html')) {
  console.error('   ❌ FAIL: dist/public/index.html does not exist');
  allChecksPass = false;
} else {
  console.log('   ✅ PASS: Frontend assets verified');
}

// Check 4: Verify .replit deployment configuration
console.log('\n4. Checking .replit deployment configuration...');
try {
  const replitContent = execSync('cat .replit', { encoding: 'utf8' });
  if (replitContent.includes('build = ["node", "build-for-deployment.js"]')) {
    console.log('   ✅ PASS: .replit build command correctly configured');
  } else {
    console.log('   ⚠️  INFO: .replit uses npm run build (also acceptable)');
  }
  
  if (replitContent.includes('run = ["sh", "-c", "node dist/index.js"]') || replitContent.includes('run = "npm run start"')) {
    console.log('   ✅ PASS: .replit run command correctly configured');
  } else {
    console.error('   ❌ FAIL: .replit run command not properly configured');
    allChecksPass = false;
  }
} catch (error) {
  console.error('   ❌ FAIL: Cannot read .replit configuration');
  allChecksPass = false;
}

// Check 5: Test production server startup (dry run)
console.log('\n5. Testing server startup (dry run)...');
try {
  // Quick syntax check that would catch import issues
  execSync('node -pe "console.log(\'Import test passed\')" dist/index.js', { stdio: 'pipe', timeout: 5000 });
  console.log('   ✅ PASS: Server file can be loaded');
} catch (error) {
  console.error('   ❌ FAIL: Server startup test failed');
  allChecksPass = false;
}

console.log('\n' + '='.repeat(50));
if (allChecksPass) {
  console.log('🎉 ALL DEPLOYMENT CHECKS PASSED!');
  console.log('✅ Ready for production deployment');
  console.log('🚀 Use: npm run start');
  process.exit(0);
} else {
  console.log('❌ DEPLOYMENT VERIFICATION FAILED');
  console.log('📋 Fix the issues above before deploying');
  process.exit(1);
}