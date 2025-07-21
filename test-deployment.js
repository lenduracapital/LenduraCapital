#!/usr/bin/env node

// Simple test script to diagnose deployment issues
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { createServer } from 'http';

console.log('🔍 Deployment Diagnosis Test');
console.log('===========================');

// Test 1: Check if required files exist
console.log('\n1. Checking required files:');
const requiredFiles = [
  'dist/start.js',
  'dist/package.json', 
  'dist/public/index.html'
];

requiredFiles.forEach(file => {
  const exists = existsSync(file);
  console.log(`   ${exists ? '✅' : '❌'} ${file}`);
});

// Test 2: Check if start.js can be imported
console.log('\n2. Testing start.js syntax:');
try {
  execSync('node -c dist/start.js', { stdio: 'pipe' });
  console.log('   ✅ start.js syntax valid');
} catch (error) {
  console.log('   ❌ start.js syntax error:', error.message);
}

// Test 3: Check environment variables
console.log('\n3. Environment check:');
console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
console.log(`   PORT: ${process.env.PORT || 'not set'}`);
console.log(`   DATABASE_URL: ${process.env.DATABASE_URL ? 'set' : 'not set'}`);

// Test 4: Quick server test
console.log('\n4. Quick server test:');
const testServer = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'test server working' }));
});

testServer.listen(9999, () => {
  console.log('   ✅ Basic HTTP server can bind to port 9999');
  testServer.close();
});

console.log('\nDiagnosis complete.');