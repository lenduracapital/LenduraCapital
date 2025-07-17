#!/usr/bin/env node

import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';

console.log('🏗️  Ensuring dist directory structure for deployment...');

// Ensure dist directory exists
const distPath = resolve('dist');
if (!existsSync(distPath)) {
  console.log('📁 Creating dist directory...');
  mkdirSync(distPath, { recursive: true });
}

// Ensure dist/public directory exists  
const distPublicPath = resolve('dist/public');
if (!existsSync(distPublicPath)) {
  console.log('📁 Creating dist/public directory...');
  mkdirSync(distPublicPath, { recursive: true });
}

// If dist/index.js doesn't exist, create a placeholder that will fail gracefully
const distIndexPath = resolve('dist/index.js');
if (!existsSync(distIndexPath)) {
  console.log('⚠️  Creating placeholder dist/index.js (build required)...');
  writeFileSync(distIndexPath, `// PLACEHOLDER FILE - RUN BUILD COMMAND
console.error('❌ This is a placeholder file. Run "npm run build" or "node build-for-deployment.js" to create the actual server bundle.');
process.exit(1);
`);
}

// If dist/public/index.html doesn't exist, create a basic placeholder
const distHtmlPath = resolve('dist/public/index.html');
if (!existsSync(distHtmlPath)) {
  console.log('⚠️  Creating placeholder dist/public/index.html (build required)...');
  writeFileSync(distHtmlPath, `<!DOCTYPE html>
<html>
<head>
    <title>Build Required</title>
</head>
<body>
    <h1>Build Required</h1>
    <p>Please run "npm run build" or "node build-for-deployment.js" to build the application.</p>
</body>
</html>`);
}

console.log('✅ Dist directory structure ensured');
console.log('📋 Next steps:');
console.log('1. Run: npm run build (or node build-for-deployment.js)');
console.log('2. Run: node verify-deployment-build.js');
console.log('3. Deploy with confidence!');