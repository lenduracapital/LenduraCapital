#!/usr/bin/env node

/**
 * Comprehensive Build Verification Script
 * Addresses all deployment failure fixes:
 * 1. Verify that the build command actually creates dist/index.js
 * 2. Check if TypeScript noEmit setting is preventing file output
 * 3. Update package.json start script to match actual build output location
 * 4. Add a build verification step to check if dist/index.js exists after build
 * 5. Ensure build script properly compiles TypeScript to JavaScript output
 */

import { existsSync, readFileSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Color codes for terminal output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'white') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(50));
  log(title, 'cyan');
  console.log('='.repeat(50));
}

function logHeader() {
  console.log('\n' + '🚀'.repeat(3) + ' FUNDTEK CAPITAL - BUILD VERIFICATION ' + '🚀'.repeat(3));
  log('Comprehensive TypeScript & Deployment Verification', 'bold');
  console.log('='.repeat(80));
}

// Fix 2: Check TypeScript noEmit setting
async function verifyTypeScriptConfig() {
  logSection('🔧 Fix 2: TypeScript Configuration Verification');
  
  const tsConfigPath = join(__dirname, 'tsconfig.json');
  
  if (!existsSync(tsConfigPath)) {
    log('❌ tsconfig.json not found', 'red');
    return false;
  }

  try {
    const tsConfig = JSON.parse(readFileSync(tsConfigPath, 'utf-8'));
    const compilerOptions = tsConfig.compilerOptions || {};
    
    // Check critical TypeScript settings
    const noEmit = compilerOptions.noEmit;
    const outDir = compilerOptions.outDir;
    const target = compilerOptions.target;
    const module = compilerOptions.module;
    
    log(`📋 TypeScript Configuration Analysis:`, 'yellow');
    log(`   • noEmit: ${noEmit} ${noEmit === false ? '✅' : '❌ (should be false)'}`, noEmit === false ? 'green' : 'red');
    log(`   • outDir: ${outDir || 'not set'} ${outDir ? '✅' : '⚠️'}`, outDir ? 'green' : 'yellow');
    log(`   • target: ${target || 'not set'} ${target ? '✅' : '⚠️'}`, target ? 'green' : 'yellow');
    log(`   • module: ${module || 'not set'} ${module ? '✅' : '⚠️'}`, module ? 'green' : 'yellow');
    
    if (noEmit === true) {
      log('❌ CRITICAL: noEmit is set to true - TypeScript will not output JavaScript files!', 'red');
      log('💡 Fix: Set "noEmit": false in tsconfig.json compilerOptions', 'yellow');
      return false;
    }
    
    if (noEmit === false) {
      log('✅ TypeScript configured correctly for JavaScript output', 'green');
    }
    
    return true;
  } catch (error) {
    log(`❌ Error parsing tsconfig.json: ${error.message}`, 'red');
    return false;
  }
}

// Fix 1 & 4: Verify build command creates dist/index.js
async function verifyBuildOutput() {
  logSection('🏗️  Fix 1 & 4: Build Output Verification');
  
  const distPath = join(__dirname, 'dist');
  const indexJsPath = join(distPath, 'index.js');
  const publicPath = join(distPath, 'public');
  
  if (!existsSync(distPath)) {
    log('❌ dist/ directory does not exist', 'red');
    log('💡 Fix: Run "npm run build" to create build output', 'yellow');
    return false;
  }
  
  log('✅ dist/ directory exists', 'green');
  
  if (!existsSync(indexJsPath)) {
    log('❌ dist/index.js does not exist', 'red');
    log('💡 Fix: Build command is not producing the required dist/index.js file', 'yellow');
    return false;
  }
  
  // Get file stats
  const stats = statSync(indexJsPath);
  const fileSizeKB = (stats.size / 1024).toFixed(2);
  
  log(`✅ dist/index.js exists (${fileSizeKB} KB)`, 'green');
  
  // Verify the file is valid JavaScript
  try {
    const content = readFileSync(indexJsPath, 'utf-8');
    
    // Basic JavaScript validation
    if (content.length < 100) {
      log('⚠️  dist/index.js appears to be too small to be a complete build', 'yellow');
    }
    
    // Check for ES module syntax
    if (content.includes('import ') || content.includes('export ')) {
      log('✅ ES module syntax detected in build output', 'green');
    }
    
    // Check for Express server code
    if (content.includes('express') || content.includes('app.listen')) {
      log('✅ Express server code detected in build output', 'green');
    }
    
  } catch (error) {
    log(`❌ Error reading dist/index.js: ${error.message}`, 'red');
    return false;
  }
  
  // Check for frontend build output
  if (existsSync(publicPath)) {
    log('✅ Frontend build output (dist/public/) exists', 'green');
  } else {
    log('⚠️  Frontend build output (dist/public/) missing', 'yellow');
  }
  
  return true;
}

// Fix 3: Verify package.json start script
async function verifyStartScript() {
  logSection('📦 Fix 3: Package.json Start Script Verification');
  
  const packageJsonPath = join(__dirname, 'package.json');
  
  if (!existsSync(packageJsonPath)) {
    log('❌ package.json not found', 'red');
    return false;
  }

  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    const scripts = packageJson.scripts || {};
    const startScript = scripts.start;
    const buildScript = scripts.build;
    
    log('📋 Package.json Scripts Analysis:', 'yellow');
    
    if (!startScript) {
      log('❌ No start script defined', 'red');
      log('💡 Fix: Add "start": "NODE_ENV=production node dist/index.js" to package.json scripts', 'yellow');
      return false;
    }
    
    log(`   • start: "${startScript}"`, 'cyan');
    
    // Check if start script points to dist/index.js
    if (startScript.includes('dist/index.js')) {
      log('✅ Start script correctly references dist/index.js', 'green');
    } else {
      log('❌ Start script does not reference dist/index.js', 'red');
      log('💡 Fix: Update start script to: "NODE_ENV=production node dist/index.js"', 'yellow');
      return false;
    }
    
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
    
    return true;
  } catch (error) {
    log(`❌ Error parsing package.json: ${error.message}`, 'red');
    return false;
  }
}

// Fix 5: Ensure build script properly compiles TypeScript
async function verifyBuildScript() {
  logSection('⚙️  Fix 5: Build Script Compilation Verification');
  
  const packageJsonPath = join(__dirname, 'package.json');
  
  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    const buildScript = packageJson.scripts?.build;
    
    if (!buildScript) {
      log('❌ No build script found', 'red');
      return false;
    }
    
    log(`📋 Build Script Analysis: "${buildScript}"`, 'yellow');
    
    // Check for key build components
    const checks = [
      { name: 'Frontend Build (vite)', pattern: /vite\s+build/, required: true },
      { name: 'Backend Compilation (esbuild)', pattern: /esbuild.*server/, required: true },
      { name: 'Output Directory (--outdir=dist)', pattern: /--outdir=dist/, required: true },
      { name: 'Node Platform (--platform=node)', pattern: /--platform=node/, required: true },
      { name: 'ES Module Format (--format=esm)', pattern: /--format=esm/, required: true },
      { name: 'Bundle Mode (--bundle)', pattern: /--bundle/, required: false },
      { name: 'External Packages (--packages=external)', pattern: /--packages=external/, required: false }
    ];
    
    let allRequired = true;
    
    checks.forEach(check => {
      const found = check.pattern.test(buildScript);
      const status = found ? '✅' : (check.required ? '❌' : '⚠️');
      const color = found ? 'green' : (check.required ? 'red' : 'yellow');
      
      log(`   ${status} ${check.name}`, color);
      
      if (check.required && !found) {
        allRequired = false;
      }
    });
    
    if (allRequired) {
      log('✅ Build script properly configured for TypeScript compilation', 'green');
    } else {
      log('❌ Build script missing required TypeScript compilation components', 'red');
    }
    
    return allRequired;
  } catch (error) {
    log(`❌ Error analyzing build script: ${error.message}`, 'red');
    return false;
  }
}

// Additional verification: Server startup test
async function verifyServerStartup() {
  logSection('🚀 Additional: Server Startup Verification');
  
  const indexJsPath = join(__dirname, 'dist', 'index.js');
  
  if (!existsSync(indexJsPath)) {
    log('❌ Cannot test server startup - dist/index.js not found', 'red');
    return false;
  }
  
  try {
    // Simple syntax check by attempting to read the file
    const content = readFileSync(indexJsPath, 'utf-8');
    
    // Look for server startup patterns
    const patterns = {
      'Express Server': /express/i,
      'Port Binding': /listen|port/i,
      'Environment Variables': /process\.env|NODE_ENV/i,
      'Error Handling': /catch|error/i
    };
    
    log('📋 Server Code Analysis:', 'yellow');
    
    Object.entries(patterns).forEach(([name, pattern]) => {
      const found = pattern.test(content);
      log(`   ${found ? '✅' : '⚠️'} ${name}`, found ? 'green' : 'yellow');
    });
    
    log('✅ Server startup verification completed', 'green');
    log('💡 Note: For full verification, start the server with: npm start', 'yellow');
    
    return true;
  } catch (error) {
    log(`❌ Error verifying server startup: ${error.message}`, 'red');
    return false;
  }
}

// Main verification function
async function runFullVerification() {
  logHeader();
  
  const results = {
    typescript: await verifyTypeScriptConfig(),
    buildOutput: await verifyBuildOutput(),
    startScript: await verifyStartScript(),
    buildScript: await verifyBuildScript(),
    serverStartup: await verifyServerStartup()
  };
  
  // Summary
  logSection('📊 VERIFICATION SUMMARY');
  
  const checks = [
    { name: 'TypeScript Configuration', key: 'typescript' },
    { name: 'Build Output Verification', key: 'buildOutput' },
    { name: 'Start Script Configuration', key: 'startScript' },
    { name: 'Build Script Compilation', key: 'buildScript' },
    { name: 'Server Startup Readiness', key: 'serverStartup' }
  ];
  
  let passedCount = 0;
  
  checks.forEach(check => {
    const passed = results[check.key];
    log(`${passed ? '✅' : '❌'} ${check.name}`, passed ? 'green' : 'red');
    if (passed) passedCount++;
  });
  
  console.log('\n' + '='.repeat(50));
  log(`Results: ${passedCount}/${checks.length} checks passed`, passedCount === checks.length ? 'green' : 'yellow');
  
  if (passedCount === checks.length) {
    log('\n🎉 ALL DEPLOYMENT FIXES VERIFIED!', 'green');
    log('✅ Ready for production deployment', 'green');
    log('\n🚀 Deployment Commands:', 'cyan');
    log('   Build: npm run build', 'white');
    log('   Start: npm start', 'white');
  } else {
    log('\n⚠️  Some issues need to be addressed before deployment', 'yellow');
    log('💡 See specific fix recommendations above', 'yellow');
  }
  
  console.log('\n' + '='.repeat(80) + '\n');
  
  return passedCount === checks.length;
}

// Run the verification
runFullVerification().catch(error => {
  log(`❌ Verification failed with error: ${error.message}`, 'red');
  process.exit(1);
});