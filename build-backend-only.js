#!/usr/bin/env node

/**
 * Backend-only build script for Replit deployment
 * Compiles only the server TypeScript code to dist/index.js
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';


console.log('🚀 Building backend server...\n');

// Clean dist directory
console.log('📦 Cleaning dist directory...');
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true, force: true });
}
fs.mkdirSync('dist');

// Build server with esbuild
console.log('🔨 Compiling server TypeScript code...');
try {
  execSync(
    'esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --sourcemap',
    { stdio: 'inherit' }
  );
  console.log('✅ Server compiled successfully!\n');
} catch (error) {
  console.error('❌ Server build failed:', error.message);
  process.exit(1);
}

// Verify output
console.log('🔍 Verifying build output...');
const outputFile = path.join('dist', 'index.js');
if (!fs.existsSync(outputFile)) {
  console.error('❌ Error: dist/index.js was not created');
  process.exit(1);
}

const stats = fs.statSync(outputFile);
console.log(`✅ Created: ${outputFile} (${(stats.size / 1024).toFixed(2)} KB)`);

// Test syntax
console.log('\n🧪 Testing JavaScript syntax...');
try {
  execSync(`node --check ${outputFile}`, { stdio: 'ignore' });
  console.log('✅ Syntax check passed!');
} catch (error) {
  console.error('❌ Syntax error in compiled code');
  process.exit(1);
}

console.log('\n✨ Backend build complete! Ready for deployment.');
console.log('📝 Run "npm start" to start the production server.');