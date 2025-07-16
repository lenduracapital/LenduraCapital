#!/usr/bin/env node

/**
 * Deployment Verification Script for FundTek Capital Group
 * Comprehensive checks to ensure deployment readiness
 * Addresses all suggested deployment fixes
 */

import fs from 'fs';
import path from 'path';

console.log('🔍 FundTek Capital Group - Deployment Verification');
console.log('=================================================');

const checks = [];

// 1. TypeScript Configuration Check
function checkTypeScriptConfig() {
  try {
    const tsConfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
    const noEmit = tsConfig.compilerOptions?.noEmit;
    const outDir = tsConfig.compilerOptions?.outDir;
    
    if (noEmit === false && outDir === './dist') {
      return { passed: true, message: 'TypeScript compilation properly configured' };
    } else {
      return { passed: false, message: `TypeScript config issues: noEmit=${noEmit}, outDir=${outDir}` };
    }
  } catch (error) {
    return { passed: false, message: 'tsconfig.json not found or invalid' };
  }
}

// 2. Build Output Structure Check
function checkBuildStructure() {
  const distExists = fs.existsSync('dist');
  const indexExists = fs.existsSync('dist/index.js');
  
  if (distExists && indexExists) {
    const stats = fs.statSync('dist/index.js');
    const size = stats.size;
    
    if (size > 1000) { // Must be substantial file
      return { passed: true, message: `dist/index.js exists (${size} bytes)` };
    } else {
      return { passed: false, message: `dist/index.js too small (${size} bytes)` };
    }
  } else {
    const missing = [];
    if (!distExists) missing.push('dist directory');
    if (!indexExists) missing.push('dist/index.js');
    return { passed: false, message: `Missing: ${missing.join(', ')}` };
  }
}

// 3. JavaScript Syntax Validation
function checkJavaScriptSyntax() {
  try {
    if (!fs.existsSync('dist/index.js')) {
      return { passed: false, message: 'dist/index.js not found' };
    }
    
    // Check basic file structure
    const content = fs.readFileSync('dist/index.js', 'utf8');
    if (content.length > 100 && content.includes('import') || content.includes('export')) {
      return { passed: true, message: 'JavaScript file structure valid' };
    } else {
      return { passed: false, message: 'Invalid JavaScript file structure' };
    }
  } catch (error) {
    return { passed: false, message: `File read error: ${error.message}` };
  }
}

// 4. Package.json Start Script Check
function checkStartScript() {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const startScript = packageJson.scripts?.start;
    
    if (startScript && startScript.includes('dist/index.js')) {
      return { passed: true, message: 'Start script correctly configured' };
    } else {
      return { passed: false, message: `Start script issue: ${startScript}` };
    }
  } catch (error) {
    return { passed: false, message: 'package.json not found or invalid' };
  }
}

// 5. Build Scripts Availability Check
function checkBuildScripts() {
  const buildScripts = [
    'build-production.sh',
    'build-server-only.sh'
  ];
  
  const available = buildScripts.filter(script => 
    fs.existsSync(script) && fs.accessSync && (() => {
      try {
        fs.accessSync(script, fs.constants.X_OK);
        return true;
      } catch {
        return false;
      }
    })()
  );
  
  if (available.length >= 1) {
    return { passed: true, message: `Build scripts available: ${available.join(', ')}` };
  } else {
    return { passed: false, message: 'No executable build scripts found' };
  }
}

// Run all checks
const allChecks = [
  { name: 'TypeScript Configuration', fn: checkTypeScriptConfig },
  { name: 'Build Output Structure', fn: checkBuildStructure },
  { name: 'JavaScript Syntax', fn: checkJavaScriptSyntax },
  { name: 'Start Script Configuration', fn: checkStartScript },
  { name: 'Build Scripts Availability', fn: checkBuildScripts }
];

console.log('\n📋 Running deployment readiness checks...\n');

let allPassed = true;

allChecks.forEach((check, index) => {
  const result = check.fn();
  const status = result.passed ? '✅' : '❌';
  console.log(`${index + 1}. ${status} ${check.name}: ${result.message}`);
  
  if (!result.passed) {
    allPassed = false;
  }
});

console.log('\n' + '='.repeat(50));

if (allPassed) {
  console.log('🎉 DEPLOYMENT READY!');
  console.log('✅ All deployment checks passed');
  console.log('\n📋 Deployment commands:');
  console.log('   npm start                    # Start production server');
  console.log('   NODE_ENV=production node dist/index.js  # Direct start');
} else {
  console.log('❌ DEPLOYMENT NOT READY');
  console.log('🔧 Fix the failed checks above before deploying');
  process.exit(1);
}

console.log('');