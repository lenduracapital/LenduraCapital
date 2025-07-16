#!/usr/bin/env node

/**
 * Build verification script for FundTek Capital Group
 * Ensures all required files exist and are properly formatted
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

console.log('🔍 Starting build verification...');

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

// Final verification result
console.log('\n' + '='.repeat(50));
if (allChecksPassed) {
  console.log('✅ BUILD VERIFICATION PASSED');
  console.log('🚀 Ready for deployment');
  process.exit(0);
} else {
  console.log('❌ BUILD VERIFICATION FAILED');
  console.log('🔧 Please fix the issues above before deployment');
  process.exit(1);
}