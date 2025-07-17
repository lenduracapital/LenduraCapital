#!/usr/bin/env node

import { existsSync, statSync, readFileSync } from 'fs';
import { execSync } from 'child_process';

console.log('🔍 Verifying deployment build output...');

let hasErrors = false;

function logError(message) {
  console.error(`❌ ${message}`);
  hasErrors = true;
}

// 1. Check if dist/index.js exists at the exact expected location
if (!existsSync('dist/index.js')) {
  logError('CRITICAL: dist/index.js not found at expected location');
  console.error('Expected path: dist/index.js');
  console.error('Current working directory:', process.cwd());
  console.error('Please run "npm run build" or "node build-for-deployment.js" to create the build');
} else {
  const stats = statSync('dist/index.js');
  if (stats.size === 0) {
    logError('CRITICAL: dist/index.js exists but is empty');
  } else {
    console.log(`✅ dist/index.js found (${(stats.size / 1024).toFixed(2)} KB)`);
    
    // Verify the file has valid syntax
    try {
      execSync('node -c dist/index.js', { stdio: 'pipe' });
      console.log('✅ dist/index.js syntax validation passed');
    } catch (error) {
      logError('CRITICAL: dist/index.js has syntax errors');
      console.error('Error details:', error.message);
    }
  }
}

// 2. Check if frontend assets are built
if (!existsSync('dist/public')) {
  logError('CRITICAL: Frontend assets directory (dist/public) not found');
} else {
  console.log('✅ Frontend assets directory found');
  
  if (!existsSync('dist/public/index.html')) {
    logError('CRITICAL: Frontend entry point (dist/public/index.html) not found');
  } else {
    const htmlStats = statSync('dist/public/index.html');
    console.log(`✅ Frontend entry point found (${(htmlStats.size / 1024).toFixed(2)} KB)`);
  }
}

// 3. Verify package.json start script
if (!existsSync('package.json')) {
  logError('CRITICAL: package.json not found');
} else {
  try {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
    if (!packageJson.scripts?.start) {
      logError('CRITICAL: package.json missing start script');
    } else {
      console.log(`✅ Start script found: ${packageJson.scripts.start}`);
      
      // Check if start script points to dist/index.js
      if (packageJson.scripts.start.includes('dist/index.js')) {
        console.log('✅ Start script correctly points to dist/index.js');
      } else {
        logError('WARNING: Start script may not point to the expected dist/index.js file');
      }
    }
  } catch (error) {
    logError(`CRITICAL: Cannot read package.json: ${error.message}`);
  }
}

// 4. Final verification report
console.log('\n📊 DEPLOYMENT BUILD VERIFICATION SUMMARY');
if (hasErrors) {
  console.error('❌ DEPLOYMENT BUILD VERIFICATION FAILED');
  console.error('\n🔧 To fix these issues:');
  console.error('1. Run: npm run build');
  console.error('2. Or run: node build-for-deployment.js');
  console.error('3. Verify the build completes without errors');
  console.error('4. Re-run this verification: node verify-deployment-build.js');
  process.exit(1);
} else {
  console.log('✅ ALL DEPLOYMENT BUILD CHECKS PASSED');
  console.log('🚀 Ready for deployment!');
  console.log('\nDeployment will use:');
  console.log('- Build command: node build-for-deployment.js');
  console.log('- Start command: npm run start');
  console.log('- Entry point: dist/index.js');
}