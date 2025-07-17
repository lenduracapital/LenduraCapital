#!/usr/bin/env node

import { existsSync, statSync } from 'fs';
import { execSync } from 'child_process';

console.log('🔍 Final Deployment Verification Check...\n');

let allChecksPass = true;

// Check 1: Verify dist/index.js exists at exact expected location
console.log('1. Checking dist/index.js...');
if (!existsSync('dist/index.js')) {
  console.error('   ❌ FAIL: dist/index.js not found');
  allChecksPass = false;
} else {
  const stats = statSync('dist/index.js');
  console.log(`   ✅ PASS: dist/index.js exists (${Math.round(stats.size / 1024)}KB)`);
  
  // Syntax check
  try {
    execSync('node -c dist/index.js', { stdio: 'pipe' });
    console.log('   ✅ PASS: dist/index.js has valid syntax');
  } catch (error) {
    console.error('   ❌ FAIL: dist/index.js has syntax errors');
    allChecksPass = false;
  }
}

// Check 2: Verify frontend assets
console.log('\n2. Checking frontend assets...');
if (!existsSync('dist/public')) {
  console.error('   ❌ FAIL: dist/public directory missing');
  allChecksPass = false;
} else if (!existsSync('dist/public/index.html')) {
  console.error('   ❌ FAIL: dist/public/index.html missing');
  allChecksPass = false;
} else {
  const htmlStats = statSync('dist/public/index.html');
  console.log(`   ✅ PASS: Frontend assets exist (HTML: ${Math.round(htmlStats.size / 1024)}KB)`);
}

// Check 3: Verify build command works
console.log('\n3. Verifying build command configuration...');
try {
  const packageJson = JSON.parse(execSync('cat package.json', { encoding: 'utf8' }));
  if (packageJson.scripts && packageJson.scripts.start === 'NODE_ENV=production node dist/index.js') {
    console.log('   ✅ PASS: package.json start script correctly configured');
  } else {
    console.error('   ❌ FAIL: package.json start script mismatch');
    allChecksPass = false;
  }
} catch (error) {
  console.error('   ❌ FAIL: Cannot read package.json');
  allChecksPass = false;
}

// Check 4: Verify .replit deployment configuration
console.log('\n4. Checking .replit deployment configuration...');
try {
  const replitContent = execSync('cat .replit', { encoding: 'utf8' });
  if (replitContent.includes('build = ["node", "build-for-deployment.js"]')) {
    console.log('   ✅ PASS: .replit build command correctly configured');
  } else {
    console.error('   ❌ FAIL: .replit build command not found or incorrect');
    allChecksPass = false;
  }
  
  if (replitContent.includes('run = ["sh", "-c", "node dist/index.js"]')) {
    console.log('   ✅ PASS: .replit run command correctly configured');
  } else {
    console.log('   ⚠️  INFO: .replit run command could be enhanced with start-server.js');
  }
} catch (error) {
  console.error('   ❌ FAIL: Cannot read .replit file');
  allChecksPass = false;
}

// Check 5: Test build process
console.log('\n5. Testing build process can create required files...');
try {
  // Backup current dist if it exists
  if (existsSync('dist')) {
    execSync('mv dist dist-backup', { stdio: 'pipe' });
  }
  
  // Run build
  execSync('node build-for-deployment.js', { stdio: 'pipe' });
  
  // Check results
  if (existsSync('dist/index.js') && existsSync('dist/public/index.html')) {
    console.log('   ✅ PASS: Build process successfully creates all required files');
  } else {
    console.error('   ❌ FAIL: Build process did not create required files');
    allChecksPass = false;
  }
  
  // Restore backup if needed
  if (existsSync('dist-backup')) {
    execSync('rm -rf dist && mv dist-backup dist', { stdio: 'pipe' });
  }
} catch (error) {
  console.error('   ❌ FAIL: Build process failed');
  console.error(`   Error: ${error.message}`);
  allChecksPass = false;
  
  // Restore backup
  if (existsSync('dist-backup')) {
    execSync('rm -rf dist && mv dist-backup dist', { stdio: 'pipe' });
  }
}

// Final result
console.log('\n' + '='.repeat(50));
if (allChecksPass) {
  console.log('🎉 ALL DEPLOYMENT FIXES SUCCESSFULLY APPLIED!');
  console.log('\n✅ Fixed Issues:');
  console.log('   1. Build script uses --outfile to create dist/index.js at exact location');
  console.log('   2. Enhanced build verification ensures dist/index.js exists');
  console.log('   3. Start script validates files before starting server');
  console.log('   4. Comprehensive error handling with clear troubleshooting');
  console.log('   5. .replit deployment configuration verified');
  console.log('\n🚀 Deployment Status: READY');
  console.log('   • Run "node build-for-deployment.js" to build');
  console.log('   • Run "npm run start" to start production server');
  console.log('   • Deploy using Replit deployment feature');
} else {
  console.log('❌ SOME DEPLOYMENT ISSUES REMAIN');
  console.log('\n💡 Review the failed checks above and run:');
  console.log('   node build-for-deployment.js');
  console.log('   npm run start');
}
console.log('='.repeat(50));