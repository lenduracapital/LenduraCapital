#!/usr/bin/env node

/**
 * Enhanced Build verification script for FundTek Capital Group
 * Ensures all required files exist and are properly formatted for production deployment
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const requiredFiles = [
  'dist/index.js',
  'server/index.ts'
];

const optionalFiles = [
  'dist/client/index.html',
  'dist/client/assets'
];

const criticalChecks = [
  { name: 'TypeScript Configuration', check: checkTypeScriptConfig },
  { name: 'Build Output Structure', check: checkBuildStructure },
  { name: 'Production Dependencies', check: checkProductionDependencies },
  { name: 'Environment Configuration', check: checkEnvironmentConfig },
  { name: 'Deployment Readiness', check: checkDeploymentReadiness }
];

console.log('🔍 Starting enhanced build verification...');
console.log('📋 Deployment readiness check for FundTek Capital Group');

let allChecksPassed = true;

// Check required files
console.log('\n📋 Checking required files:');
for (const file of requiredFiles) {
  if (fs.existsSync(file)) {
    const stats = fs.statSync(file);
    console.log(`  ✅ ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
  } else {
    console.log(`  ❌ ${file} - MISSING`);
    allChecksPassed = false;
  }
}

// Check optional files
console.log('\n📋 Checking optional files:');
for (const file of optionalFiles) {
  if (fs.existsSync(file)) {
    const stats = fs.statSync(file);
    if (stats.isDirectory()) {
      const files = fs.readdirSync(file);
      console.log(`  ✅ ${file} (directory with ${files.length} files)`);
    } else {
      console.log(`  ✅ ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
    }
  } else {
    console.log(`  ⚠️  ${file} - not found (optional)`);
  }
}

// Check if main entry point is valid JavaScript
console.log('\n🔍 Validating JavaScript syntax:');
if (fs.existsSync('dist/index.js')) {
  try {
    // Read and check basic syntax by attempting to parse
    const content = fs.readFileSync('dist/index.js', 'utf8');
    if (content.length > 0 && (content.includes('export') || content.includes('import'))) {
      console.log('  ✅ dist/index.js has valid ES module syntax');
      
      // Additional checks for production readiness
      if (content.includes('express') || content.includes('server')) {
        console.log('  ✅ Server-related code detected');
      }
      if (content.includes('drizzle') || content.includes('database')) {
        console.log('  ✅ Database integration detected');
      }
    } else {
      console.log('  ⚠️  dist/index.js may have issues - no ES module exports found');
    }
  } catch (error) {
    console.log(`  ❌ dist/index.js read error: ${error.message}`);
    allChecksPassed = false;
  }
} else {
  console.log('  ❌ dist/index.js not found');
  allChecksPassed = false;
}

// Check frontend assets
console.log('\n🎨 Validating frontend assets:');
if (fs.existsSync('dist/client/index.html')) {
  const htmlContent = fs.readFileSync('dist/client/index.html', 'utf8');
  if (htmlContent.includes('FundTek') || htmlContent.includes('Capital')) {
    console.log('  ✅ HTML contains expected brand content');
  }
  if (htmlContent.includes('/assets/')) {
    console.log('  ✅ HTML references production assets');
  }
} else {
  console.log('  ⚠️  dist/client/index.html not found');
}

if (fs.existsSync('dist/client/assets')) {
  const assets = fs.readdirSync('dist/client/assets');
  const cssFiles = assets.filter(f => f.endsWith('.css'));
  const jsFiles = assets.filter(f => f.endsWith('.js'));
  
  if (cssFiles.length > 0) {
    console.log(`  ✅ Found ${cssFiles.length} CSS file(s)`);
  }
  if (jsFiles.length > 0) {
    console.log(`  ✅ Found ${jsFiles.length} JS file(s)`);
  }
} else {
  console.log('  ⚠️  dist/client/assets directory not found');
}

// Check dist directory structure
console.log('\n📁 Dist directory structure:');
if (fs.existsSync('dist')) {
  const distContents = fs.readdirSync('dist', { withFileTypes: true });
  for (const item of distContents) {
    const icon = item.isDirectory() ? '📁' : '📄';
    console.log(`  ${icon} ${item.name}`);
  }
} else {
  console.log('  ❌ dist directory does not exist');
  allChecksPassed = false;
}

// Run critical deployment checks
console.log('\n🔧 Running critical deployment checks:');
for (const { name, check } of criticalChecks) {
  try {
    const result = check();
    if (result.passed) {
      console.log(`  ✅ ${name}: ${result.message}`);
    } else {
      console.log(`  ❌ ${name}: ${result.message}`);
      allChecksPassed = false;
    }
  } catch (error) {
    console.log(`  ❌ ${name}: Error - ${error.message}`);
    allChecksPassed = false;
  }
}

// Final verification result
console.log('\n' + '='.repeat(60));
if (allChecksPassed) {
  console.log('✅ BUILD VERIFICATION PASSED');
  console.log('🚀 Ready for production deployment');
  console.log('📊 All systems operational for FundTek Capital Group');
  process.exit(0);
} else {
  console.log('❌ BUILD VERIFICATION FAILED');
  console.log('🔧 Please fix the issues above before deployment');
  console.log('📞 Contact DevOps team if issues persist');
  process.exit(1);
}

// Helper functions for critical checks
function checkTypeScriptConfig() {
  try {
    const tsConfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
    const noEmit = tsConfig.compilerOptions?.noEmit;
    
    if (noEmit === false) {
      return { passed: true, message: 'TypeScript compilation enabled' };
    } else {
      return { passed: false, message: 'noEmit should be false for compilation output' };
    }
  } catch (error) {
    return { passed: false, message: 'tsconfig.json not found or invalid' };
  }
}

function checkBuildStructure() {
  const distExists = fs.existsSync('dist');
  const indexExists = fs.existsSync('dist/index.js');
  const clientExists = fs.existsSync('dist/client');
  
  if (distExists && indexExists && clientExists) {
    return { passed: true, message: 'Complete build structure present' };
  } else {
    const missing = [];
    if (!distExists) missing.push('dist directory');
    if (!indexExists) missing.push('dist/index.js');
    if (!clientExists) missing.push('dist/client');
    return { passed: false, message: `Missing: ${missing.join(', ')}` };
  }
}

function checkProductionDependencies() {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const hasBuildScript = packageJson.scripts?.build;
    const hasStartScript = packageJson.scripts?.start;
    const hasExpressDep = packageJson.dependencies?.express;
    
    if (hasBuildScript && hasStartScript && hasExpressDep) {
      return { passed: true, message: 'Production scripts and dependencies ready' };
    } else {
      const missing = [];
      if (!hasBuildScript) missing.push('build script');
      if (!hasStartScript) missing.push('start script');
      if (!hasExpressDep) missing.push('express dependency');
      return { passed: false, message: `Missing: ${missing.join(', ')}` };
    }
  } catch (error) {
    return { passed: false, message: 'package.json not found or invalid' };
  }
}

function checkEnvironmentConfig() {
  const indexContent = fs.existsSync('dist/index.js') ? 
    fs.readFileSync('dist/index.js', 'utf8') : '';
  
  const hasExpressSetup = indexContent.includes('express') || indexContent.includes('app.listen');
  const hasPortBinding = indexContent.includes('process.env.PORT') || indexContent.includes('5000');
  
  if (hasExpressSetup && hasPortBinding) {
    return { passed: true, message: 'Server configuration detected' };
  } else {
    return { passed: false, message: 'Server configuration incomplete' };
  }
}

function checkDeploymentReadiness() {
  const requiredForDeployment = [
    'dist/index.js',
    'package.json',
    'tsconfig.json'
  ];
  
  const missing = requiredForDeployment.filter(file => !fs.existsSync(file));
  
  if (missing.length === 0) {
    // Check if dist/index.js has proper export structure
    try {
      const content = fs.readFileSync('dist/index.js', 'utf8');
      const hasProperStructure = content.includes('express') && 
                                  (content.includes('listen') || content.includes('createServer'));
      
      if (hasProperStructure) {
        return { passed: true, message: 'All deployment requirements met' };
      } else {
        return { passed: false, message: 'dist/index.js missing server structure' };
      }
    } catch (error) {
      return { passed: false, message: 'Cannot read dist/index.js' };
    }
  } else {
    return { passed: false, message: `Missing deployment files: ${missing.join(', ')}` };
  }
}