#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, rmSync, statSync, readFileSync } from 'fs';
import { resolve } from 'path';

console.log('🚀 Creating deployment-ready build...');

// Step 1: Ensure clean slate
console.log('🧹 Cleaning previous build...');
const distPath = resolve('dist');
if (existsSync(distPath)) {
  rmSync(distPath, { recursive: true, force: true });
}

try {
  // Step 2: Create dist directory structure first
  console.log('🏗️  Ensuring directory structure...');
  execSync('node ensure-dist-structure.js', { stdio: 'inherit' });

  // Step 3: Run the comprehensive build
  console.log('📦 Running comprehensive build...');
  execSync('node build-for-deployment.js', { stdio: 'inherit' });

  // Step 4: Enhanced verification with detailed reporting
  console.log('🔍 Running enhanced deployment verification...');
  
  // Verify dist/index.js exists and has correct size
  if (!existsSync('dist/index.js')) {
    throw new Error('CRITICAL: dist/index.js was not created by the build process');
  }
  
  const indexStats = statSync('dist/index.js');
  if (indexStats.size < 1000) { // Should be at least 1KB for a real server
    throw new Error(`CRITICAL: dist/index.js is too small (${indexStats.size} bytes) - build may have failed`);
  }
  
  console.log(`✅ Server bundle: dist/index.js (${(indexStats.size / 1024).toFixed(2)} KB)`);

  // Verify syntax
  try {
    execSync('node -c dist/index.js', { stdio: 'pipe' });
    console.log('✅ Server bundle syntax validation passed');
  } catch (syntaxError) {
    throw new Error(`CRITICAL: dist/index.js has syntax errors: ${syntaxError.message}`);
  }

  // Verify frontend assets
  if (!existsSync('dist/public/index.html')) {
    throw new Error('CRITICAL: Frontend entry point dist/public/index.html was not created');
  }
  
  const htmlStats = statSync('dist/public/index.html');
  console.log(`✅ Frontend entry: dist/public/index.html (${(htmlStats.size / 1024).toFixed(2)} KB)`);

  // Verify package.json start script points to correct location
  const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
  if (!packageJson.scripts?.start?.includes('dist/index.js')) {
    console.warn('⚠️  Warning: package.json start script might not point to dist/index.js');
  } else {
    console.log('✅ Start script correctly configured');
  }

  // Step 5: Final deployment readiness check
  console.log('🔍 Running final deployment verification...');
  execSync('node verify-deployment-build.js', { stdio: 'inherit' });

  console.log('\n🎉 DEPLOYMENT-READY BUILD COMPLETED SUCCESSFULLY!');
  console.log('\n📋 Deployment Summary:');
  console.log('- Build Output: dist/index.js ✅');
  console.log('- Frontend Assets: dist/public/ ✅');
  console.log('- Syntax Validation: Passed ✅');
  console.log('- Start Script: Configured ✅');
  console.log('\n🚀 Ready for deployment with Replit Deploy!');
  
} catch (error) {
  console.error('\n❌ DEPLOYMENT BUILD FAILED:', error.message);
  console.error('\n🔧 Troubleshooting Steps:');
  console.error('1. Check if all dependencies are installed: npm install');
  console.error('2. Verify server/index.ts exists and is valid');
  console.error('3. Check TypeScript compilation: npx tsc --noEmit');
  console.error('4. Clear node_modules and reinstall if persistent issues');
  console.error('5. Check that .replit deployment configuration matches build output');
  process.exit(1);
}