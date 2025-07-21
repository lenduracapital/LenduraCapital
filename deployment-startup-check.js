#!/usr/bin/env node

import { existsSync } from 'fs';
import { execSync } from 'child_process';

console.log('🔍 Pre-startup deployment verification...');

// Critical file checks before starting
const criticalFiles = [
  { path: 'dist/index.js', description: 'Main application file' },
  { path: 'dist/package.json', description: 'Module configuration' },
  { path: 'dist/public/index.html', description: 'Frontend entry point' }
];

let allChecksPassed = true;

for (const file of criticalFiles) {
  if (!existsSync(file.path)) {
    console.error(`❌ STARTUP ERROR: ${file.description} missing at ${file.path}`);
    allChecksPassed = false;
  } else {
    console.log(`✅ ${file.description}: ${file.path}`);
  }
}

if (!allChecksPassed) {
  console.error('\n❌ DEPLOYMENT STARTUP FAILED');
  console.error('🔧 Solution: Run the build process first:');
  console.error('   node enhanced-deployment-build.js');
  console.error('   or');
  console.error('   node build-for-deployment.js');
  process.exit(1);
}

// Verify main application file can be loaded
try {
  console.log('\n🔍 Testing application module loading...');
  execSync('node -c dist/index.js', { stdio: 'pipe' });
  console.log('✅ Application module syntax verified');
} catch (error) {
  console.error('❌ Application module has syntax errors');
  console.error('🔧 Solution: Rebuild the application');
  process.exit(1);
}

console.log('\n✅ All pre-startup checks passed');
console.log('🚀 Application is ready to start');