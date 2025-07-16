#!/usr/bin/env node

/**
 * Deployment verification script
 * Ensures the application is ready for deployment
 */

import fs from 'fs';
import { execSync } from 'child_process';

console.log('🔍 Verifying deployment readiness...\n');

const checks = [];

// Check 1: dist/index.js exists
if (fs.existsSync('dist/index.js')) {
  const size = fs.statSync('dist/index.js').size;
  checks.push({ name: 'dist/index.js exists', status: '✅', details: `${(size/1024).toFixed(2)} KB` });
} else {
  checks.push({ name: 'dist/index.js exists', status: '❌', details: 'File not found' });
}

// Check 2: Test if dist/index.js is valid JavaScript
try {
  execSync('node --check dist/index.js', { stdio: 'pipe' });
  checks.push({ name: 'dist/index.js syntax', status: '✅', details: 'Valid JavaScript' });
} catch (e) {
  checks.push({ name: 'dist/index.js syntax', status: '❌', details: 'Invalid JavaScript' });
}

// Check 3: Environment variables
const requiredEnvVars = ['DATABASE_URL'];
const missingEnvVars = requiredEnvVars.filter(v => !process.env[v]);
if (missingEnvVars.length === 0) {
  checks.push({ name: 'Environment variables', status: '✅', details: 'All required vars present' });
} else {
  checks.push({ name: 'Environment variables', status: '⚠️', details: `Missing: ${missingEnvVars.join(', ')}` });
}

// Check 4: package.json start script
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
if (packageJson.scripts?.start?.includes('dist/index.js')) {
  checks.push({ name: 'Start script', status: '✅', details: packageJson.scripts.start });
} else {
  checks.push({ name: 'Start script', status: '❌', details: 'Not pointing to dist/index.js' });
}

// Display results
console.log('Deployment Checklist:');
console.log('====================');
checks.forEach(check => {
  console.log(`${check.status} ${check.name}`);
  if (check.details) {
    console.log(`   └─ ${check.details}`);
  }
});

const failed = checks.filter(c => c.status === '❌').length;
const warnings = checks.filter(c => c.status === '⚠️').length;

console.log('\nSummary:');
if (failed === 0) {
  console.log('✅ Application is ready for deployment!');
  if (warnings > 0) {
    console.log(`⚠️  ${warnings} warning(s) - deployment may still work`);
  }
  process.exit(0);
} else {
  console.log(`❌ ${failed} critical issue(s) must be fixed before deployment`);
  process.exit(1);
}