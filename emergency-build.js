#!/usr/bin/env node
import { execSync } from 'child_process';
import { rmSync, existsSync, writeFileSync, copyFileSync } from 'fs';
import { resolve } from 'path';

console.log('🚨 EMERGENCY DEPLOYMENT BUILD');

const distPath = resolve('./dist');

// Clean start
if (existsSync(distPath)) {
  rmSync(distPath, { recursive: true, force: true });
}

console.log('Building frontend...');
try {
  execSync('npm run build:client', { stdio: 'inherit' });
} catch (error) {
  console.log('Frontend build failed, trying vite directly...');
  execSync('npx vite build', { stdio: 'inherit' });
}

// Copy minimal server
copyFileSync('minimal-server.js', 'dist/start.js');

// Create package.json
writeFileSync('dist/package.json', JSON.stringify({
  "type": "module",
  "main": "start.js",
  "scripts": { "start": "node start.js" }
}, null, 2));

console.log('✅ Emergency build complete');
console.log('Files created:');
console.log('- dist/start.js (minimal server)');
console.log('- dist/package.json');
console.log('- dist/public/ (frontend)');