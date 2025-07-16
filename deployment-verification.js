#!/usr/bin/env node

/**
 * Enhanced Deployment Verification Script for FundTek Capital Group
 * Comprehensive checks to ensure deployment readiness
 * Addresses all suggested deployment fixes
 */

import { existsSync, readFileSync, statSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ANSI color codes for terminal output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  log(`\n${colors.bold}${colors.blue}${title}${colors.reset}`);
  log('='.repeat(title.length), 'blue');
}

async function checkTypeScriptConfig() {
  logSection('1. TypeScript Configuration Check');
  
  const tsconfigPath = join(__dirname, 'tsconfig.json');
  
  if (!existsSync(tsconfigPath)) {
    log('❌ tsconfig.json not found', 'red');
    return false;
  }
  
  try {
    const tsconfigContent = readFileSync(tsconfigPath, 'utf-8');
    const tsconfig = JSON.parse(tsconfigContent);
    
    // Check critical compilation settings
    const compilerOptions = tsconfig.compilerOptions || {};
    
    if (compilerOptions.noEmit === false) {
      log('✅ TypeScript compilation enabled (noEmit: false)', 'green');
    } else {
      log('❌ TypeScript compilation disabled (noEmit should be false)', 'red');
      return false;
    }
    
    if (compilerOptions.outDir) {
      log(`✅ Output directory configured: ${compilerOptions.outDir}`, 'green');
    } else {
      log('❌ No output directory specified', 'red');
      return false;
    }
    
    if (compilerOptions.target) {
      log(`✅ Target set to: ${compilerOptions.target}`, 'green');
    }
    
    return true;
  } catch (error) {
    log(`❌ Error reading tsconfig.json: ${error.message}`, 'red');
    return false;
  }
}

async function checkBuildStructure() {
  logSection('2. Build Output Structure Check');
  
  const distPath = join(__dirname, 'dist');
  const indexJsPath = join(distPath, 'index.js');
  const clientPath = join(distPath, 'client');
  
  let allPassed = true;
  
  // Check dist directory
  if (existsSync(distPath)) {
    log('✅ dist/ directory exists', 'green');
  } else {
    log('❌ dist/ directory missing', 'red');
    allPassed = false;
  }
  
  // Check main server bundle
  if (existsSync(indexJsPath)) {
    const stats = statSync(indexJsPath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    log(`✅ dist/index.js exists (${sizeKB} KB)`, 'green');
  } else {
    log('❌ dist/index.js missing - main server bundle not found', 'red');
    allPassed = false;
  }
  
  // Check frontend structure (optional but recommended)
  if (existsSync(clientPath)) {
    log('✅ dist/client/ directory exists', 'green');
  } else {
    log('⚠️  dist/client/ directory missing (will be created during build)', 'yellow');
  }
  
  return allPassed;
}

async function checkJavaScriptSyntax() {
  logSection('3. JavaScript Syntax Validation');
  
  const indexJsPath = join(__dirname, 'dist', 'index.js');
  
  if (!existsSync(indexJsPath)) {
    log('❌ Cannot validate syntax - dist/index.js does not exist', 'red');
    return false;
  }
  
  try {
    // Use Node.js built-in syntax checking
    const { execSync } = await import('child_process');
    execSync(`node -c "${indexJsPath}"`, { stdio: 'pipe' });
    log('✅ JavaScript syntax validation passed', 'green');
    return true;
  } catch (error) {
    log('❌ JavaScript syntax validation failed', 'red');
    log(`   Error: ${error.message}`, 'red');
    return false;
  }
}

async function checkStartScript() {
  logSection('4. Start Script Configuration Check');
  
  const packageJsonPath = join(__dirname, 'package.json');
  
  if (!existsSync(packageJsonPath)) {
    log('❌ package.json not found', 'red');
    return false;
  }
  
  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    const startScript = packageJson.scripts?.start;
    
    if (!startScript) {
      log('❌ No start script defined in package.json', 'red');
      return false;
    }
    
    // Check if start script points to dist/index.js
    if (startScript.includes('dist/index.js')) {
      log(`✅ Start script correctly configured: "${startScript}"`, 'green');
      return true;
    } else {
      log(`❌ Start script does not reference dist/index.js: "${startScript}"`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ Error reading package.json: ${error.message}`, 'red');
    return false;
  }
}

async function checkBuildScripts() {
  logSection('5. Build Scripts Availability Check');
  
  const packageJsonPath = join(__dirname, 'package.json');
  const productionBuildScript = join(__dirname, 'build-production.sh');
  
  let allPassed = true;
  
  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    const buildScript = packageJson.scripts?.build;
    
    if (buildScript) {
      log(`✅ Build script found: "${buildScript}"`, 'green');
    } else {
      log('❌ No build script defined in package.json', 'red');
      allPassed = false;
    }
  } catch (error) {
    log(`❌ Error checking package.json build script: ${error.message}`, 'red');
    allPassed = false;
  }
  
  // Check for custom production build script
  if (existsSync(productionBuildScript)) {
    log('✅ Production build script available (build-production.sh)', 'green');
  } else {
    log('⚠️  Production build script not found (build-production.sh)', 'yellow');
  }
  
  return allPassed;
}

async function main() {
  log(`${colors.bold}${colors.cyan}🚀 FundTek Capital Group - Deployment Verification${colors.reset}`);
  log(`${colors.cyan}${'='.repeat(55)}${colors.reset}`);
  log('Comprehensive deployment readiness check\n');
  
  const checks = [
    { name: 'TypeScript Configuration', fn: checkTypeScriptConfig },
    { name: 'Build Output Structure', fn: checkBuildStructure },
    { name: 'JavaScript Syntax', fn: checkJavaScriptSyntax },
    { name: 'Start Script Configuration', fn: checkStartScript },
    { name: 'Build Scripts Availability', fn: checkBuildScripts }
  ];
  
  const results = [];
  
  for (const check of checks) {
    try {
      const result = await check.fn();
      results.push({ name: check.name, passed: result });
    } catch (error) {
      log(`❌ ${check.name} failed with error: ${error.message}`, 'red');
      results.push({ name: check.name, passed: false });
    }
  }
  
  // Summary
  logSection('Deployment Verification Summary');
  
  const passedCount = results.filter(r => r.passed).length;
  const totalCount = results.length;
  
  results.forEach(result => {
    const icon = result.passed ? '✅' : '❌';
    const color = result.passed ? 'green' : 'red';
    log(`${icon} ${result.name}`, color);
  });
  
  log(`\n📊 Results: ${passedCount}/${totalCount} checks passed`, passedCount === totalCount ? 'green' : 'yellow');
  
  if (passedCount === totalCount) {
    log('\n🎉 ALL DEPLOYMENT CHECKS PASSED!', 'green');
    log('✅ Ready for production deployment', 'green');
    log('\n🚀 Deployment Commands:', 'cyan');
    log('   Build: ./build-production.sh', 'cyan');
    log('   Start: npm start', 'cyan');
  } else {
    log('\n⚠️  DEPLOYMENT READINESS ISSUES DETECTED', 'yellow');
    log('Please resolve the failing checks before deploying', 'yellow');
    
    // Provide specific guidance
    log('\n💡 Quick Fixes:', 'cyan');
    if (!results.find(r => r.name === 'Build Output Structure')?.passed) {
      log('   Run: ./build-production.sh', 'cyan');
    }
    if (!results.find(r => r.name === 'TypeScript Configuration')?.passed) {
      log('   Check: tsconfig.json "noEmit" should be false', 'cyan');
    }
  }
  
  process.exit(passedCount === totalCount ? 0 : 1);
}

// Run the verification
main().catch(error => {
  log(`❌ Deployment verification failed: ${error.message}`, 'red');
  process.exit(1);
});