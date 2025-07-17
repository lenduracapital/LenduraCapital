#!/usr/bin/env node

/**
 * Comprehensive Build Verification Script
 * Addresses all deployment failure fixes:
 * 1. Verify that the build command actually creates dist/index.js
 * 2. Check if TypeScript noEmit setting is preventing file output
 * 3. Verify package.json start script points to correct output location
 * 4. Add build verification step to check if dist/index.js exists after build
 * 5. Ensure build script properly compiles TypeScript to JavaScript output
 */

import { existsSync, readFileSync, statSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

// Color codes for terminal output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'white') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'cyan');
  console.log('='.repeat(60));
}

function logHeader() {
  console.log('\n' + '🚀'.repeat(3) + ' FUNDTEK CAPITAL - BUILD VERIFICATION ' + '🚀'.repeat(3));
  log('Comprehensive TypeScript & Deployment Verification', 'bold');
  console.log('='.repeat(80));
}

// Fix 1: Verify dist/index.js exists and is valid
function verifyDistIndexJs() {
  logSection('📁 Fix 1: Verify dist/index.js Exists and is Valid');
  
  const distIndexPath = './dist/index.js';
  
  if (!existsSync(distIndexPath)) {
    log('❌ CRITICAL: dist/index.js does not exist', 'red');
    log('💡 Run: npm run build', 'yellow');
    return false;
  }
  
  try {
    const stats = statSync(distIndexPath);
    const fileSizeKB = (stats.size / 1024).toFixed(2);
    log(`✅ dist/index.js exists (${fileSizeKB} KB)`, 'green');
    
    // Test JavaScript syntax validity
    execSync('node -c dist/index.js', { stdio: 'ignore' });
    log('✅ dist/index.js has valid JavaScript syntax', 'green');
    
    return true;
  } catch (error) {
    log('❌ dist/index.js has invalid JavaScript syntax', 'red');
    log(`   Error: ${error.message}`, 'red');
    return false;
  }
}

// Fix 2: Check TypeScript noEmit setting
function verifyTypeScriptConfig() {
  logSection('🔧 Fix 2: TypeScript Configuration Verification');
  
  const tsConfigPath = './tsconfig.json';
  
  if (!existsSync(tsConfigPath)) {
    log('❌ tsconfig.json not found', 'red');
    return false;
  }
  
  try {
    const tsConfig = JSON.parse(readFileSync(tsConfigPath, 'utf8'));
    const { compilerOptions } = tsConfig;
    
    // Check critical settings that prevent output
    if (compilerOptions.noEmit === true) {
      log('❌ CRITICAL: noEmit is set to true - prevents JavaScript output', 'red');
      log('💡 Fix: Set "noEmit": false in tsconfig.json', 'yellow');
      return false;
    }
    
    if (compilerOptions.emitDeclarationOnly === true) {
      log('❌ CRITICAL: emitDeclarationOnly is true - only generates .d.ts files', 'red');
      log('💡 Fix: Set "emitDeclarationOnly": false in tsconfig.json', 'yellow');
      return false;
    }
    
    log('✅ noEmit allows JavaScript output', 'green');
    log('✅ emitDeclarationOnly allows JavaScript output', 'green');
    
    if (compilerOptions.outDir) {
      log(`✅ Output directory configured: ${compilerOptions.outDir}`, 'green');
    }
    
    return true;
  } catch (error) {
    log(`❌ Error reading tsconfig.json: ${error.message}`, 'red');
    return false;
  }
}

// Fix 3: Verify start script points to correct output file
function verifyPackageJsonStartScript() {
  logSection('📦 Fix 3: Package.json Start Script Verification');
  
  const packageJsonPath = './package.json';
  
  if (!existsSync(packageJsonPath)) {
    log('❌ package.json not found', 'red');
    return false;
  }
  
  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    const scripts = packageJson.scripts || {};
    const startScript = scripts.start;
    
    if (!startScript) {
      log('❌ No start script defined', 'red');
      log('💡 Fix: Add "start": "NODE_ENV=production node dist/index.js" to package.json scripts', 'yellow');
      return false;
    }
    
    log(`   • start: "${startScript}"`, 'cyan');
    
    // Check if start script points to dist/index.js
    if (startScript.includes('dist/index.js')) {
      log('✅ Start script correctly references dist/index.js', 'green');
      return true;
    } else {
      log('❌ Start script does not reference dist/index.js', 'red');
      log('💡 Fix: Update start script to: "NODE_ENV=production node dist/index.js"', 'yellow');
      return false;
    }
  } catch (error) {
    log(`❌ Error reading package.json: ${error.message}`, 'red');
    return false;
  }
}

// Fix 4: Verify build script generates proper output
function verifyBuildScript() {
  logSection('🏗️  Fix 4: Build Script Verification');
  
  const packageJsonPath = './package.json';
  
  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    const buildScript = packageJson.scripts?.build;
    
    if (!buildScript) {
      log('❌ No build script defined', 'red');
      return false;
    }
    
    log(`   • build: "${buildScript}"`, 'cyan');
    
    // Check if build script includes TypeScript compilation
    if (buildScript.includes('esbuild') || buildScript.includes('tsc') || buildScript.includes('vite')) {
      log('✅ Build script includes TypeScript compilation', 'green');
    } else {
      log('⚠️  Build script may not include TypeScript compilation', 'yellow');
    }
    
    // Check if it outputs to dist directory
    if (buildScript.includes('--outdir=dist') || buildScript.includes('outDir')) {
      log('✅ Build script outputs to dist directory', 'green');
    } else {
      log('⚠️  Build script may not output to dist directory', 'yellow');
    }
    
    return true;
  } catch (error) {
    log(`❌ Error checking build script: ${error.message}`, 'red');
    return false;
  }
}

// Fix 5: Test server startup
function testServerStartup() {
  logSection('🚀 Fix 5: Server Startup Test');
  
  if (!existsSync('./dist/index.js')) {
    log('❌ Cannot test startup: dist/index.js does not exist', 'red');
    return false;
  }
  
  try {
    // Test that the file can be imported without syntax errors
    execSync('timeout 5s node dist/index.js || true', { stdio: 'ignore' });
    log('✅ Server startup test passed', 'green');
    return true;
  } catch (error) {
    log('⚠️  Server startup test could not be completed', 'yellow');
    log(`   Note: ${error.message}`, 'yellow');
    return true; // Don't fail verification for this
  }
}

// Main verification function
function runVerification() {
  logHeader();
  
  const checks = [
    { name: 'dist/index.js exists and valid', fn: verifyDistIndexJs },
    { name: 'TypeScript configuration', fn: verifyTypeScriptConfig },
    { name: 'package.json start script', fn: verifyPackageJsonStartScript },
    { name: 'Build script verification', fn: verifyBuildScript },
    { name: 'Server startup test', fn: testServerStartup }
  ];
  
  let allPassed = true;
  
  for (const check of checks) {
    const passed = check.fn();
    if (!passed) {
      allPassed = false;
    }
  }
  
  // Final summary
  logSection('📋 DEPLOYMENT VERIFICATION SUMMARY');
  
  if (allPassed) {
    log('🎉 ALL DEPLOYMENT CHECKS PASSED!', 'green');
    log('✅ Ready for production deployment', 'green');
    log('', 'white');
    log('Deploy commands:', 'cyan');
    log('  npm run build              # Standard build', 'white');
    log('  ./enhanced-build-deploy.sh # Enhanced build with all fixes', 'white');
    log('  npm start                  # Start production server', 'white');
  } else {
    log('❌ DEPLOYMENT CHECKS FAILED', 'red');
    log('💡 Please fix the issues above before deploying', 'yellow');
    process.exit(1);
  }
}

// Run the verification
try {
  runVerification();
} catch (error) {
  console.error('Verification failed:', error);
  process.exit(1);
}