#!/usr/bin/env node

/**
 * Verification script for backend setup on Replit
 * Checks all configuration requirements
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('🔍 Verifying Backend Setup for Replit\n');

const checks = {
  serverFolder: false,
  tsconfig: false,
  distFolder: false,
  distIndex: false,
  dependencies: false,
  buildCommand: false,
  startCommand: false
};

// 1. Check server folder structure
console.log('1️⃣ Checking server folder structure...');
if (fs.existsSync('server/index.ts')) {
  console.log('   ✅ server/index.ts exists');
  checks.serverFolder = true;
} else {
  console.log('   ❌ server/index.ts not found');
}

// 2. Check TypeScript configuration
console.log('\n2️⃣ Checking TypeScript configuration...');
if (fs.existsSync('tsconfig.json')) {
  const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
  console.log('   ✅ tsconfig.json exists');
  console.log(`   📂 Output directory: ${tsconfig.compilerOptions.outDir || 'not set'}`);
  console.log(`   📂 Root directory: ${tsconfig.compilerOptions.rootDir || 'not set'}`);
  checks.tsconfig = true;
} else {
  console.log('   ❌ tsconfig.json not found');
}

// 3. Check build output
console.log('\n3️⃣ Checking build output...');
if (fs.existsSync('dist')) {
  console.log('   ✅ dist/ folder exists');
  checks.distFolder = true;
  
  if (fs.existsSync('dist/index.js')) {
    const stats = fs.statSync('dist/index.js');
    console.log(`   ✅ dist/index.js exists (${(stats.size / 1024).toFixed(2)} KB)`);
    checks.distIndex = true;
  } else {
    console.log('   ❌ dist/index.js not found');
  }
} else {
  console.log('   ❌ dist/ folder not found');
}

// 4. Check dependencies
console.log('\n4️⃣ Checking critical dependencies...');
const requiredDeps = ['express', 'drizzle-orm', 'typescript', 'tsx', 'esbuild'];
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };

let allDepsInstalled = true;
for (const dep of requiredDeps) {
  if (allDeps[dep]) {
    console.log(`   ✅ ${dep}: ${allDeps[dep]}`);
  } else {
    console.log(`   ❌ ${dep}: not found`);
    allDepsInstalled = false;
  }
}

// Check for pg separately as it might be installed as a dependency
try {
  execSync('npm ls pg --depth=0', { stdio: 'pipe' });
  console.log('   ✅ pg: installed (via dependencies)');
} catch {
  console.log('   ⚠️  pg: not directly installed but may be available via drizzle-orm');
}

checks.dependencies = allDepsInstalled;

// 5. Test build command
console.log('\n5️⃣ Testing build process...');
try {
  console.log('   Running: node build-backend-only.js');
  execSync('node build-backend-only.js', { stdio: 'pipe' });
  console.log('   ✅ Build completed successfully');
  checks.buildCommand = true;
} catch (error) {
  console.log('   ❌ Build failed:', error.message);
}

// 6. Test syntax of compiled code
console.log('\n6️⃣ Testing compiled code syntax...');
if (fs.existsSync('dist/index.js')) {
  try {
    execSync('node --check dist/index.js', { stdio: 'pipe' });
    console.log('   ✅ Syntax check passed');
    checks.startCommand = true;
  } catch (error) {
    console.log('   ❌ Syntax error in dist/index.js');
  }
} else {
  console.log('   ⚠️  Cannot test - dist/index.js not found');
}

// Summary
console.log('\n📊 SUMMARY:');
console.log('============');
const allPassed = Object.values(checks).every(check => check);

Object.entries(checks).forEach(([name, passed]) => {
  const formattedName = name.replace(/([A-Z])/g, ' $1').trim();
  console.log(`${passed ? '✅' : '❌'} ${formattedName.charAt(0).toUpperCase() + formattedName.slice(1)}`);
});

console.log('\n' + (allPassed ? 
  '🎉 All checks passed! Your backend is ready for Replit deployment.' : 
  '⚠️  Some checks failed. Please fix the issues above.'));

console.log('\n📝 To run your app:');
console.log('   1. Build: npm run build (or node build-backend-only.js)');
console.log('   2. Start: npm start');

// Exit with appropriate code
process.exit(allPassed ? 0 : 1);