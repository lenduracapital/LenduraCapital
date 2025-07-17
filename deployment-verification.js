#!/usr/bin/env node

import { existsSync, statSync } from 'fs';
import { resolve } from 'path';

const requiredFiles = [
  'dist/index.js',
  'dist/public/index.html',
  'dist/public/assets'
];

const scripts = [
  'build-for-deployment.js',
  'start-server.js', 
  'build-verification.js'
];

console.log('🔍 Verifying deployment readiness...');

console.log('\n📦 Checking build output:');
let buildReady = true;

for (const file of requiredFiles) {
  const filePath = resolve(file);
  if (existsSync(filePath)) {
    const stats = statSync(filePath);
    if (stats.isDirectory()) {
      console.log(`✅ ${file} directory exists`);
    } else {
      console.log(`✅ ${file} exists (${stats.size} bytes)`);
    }
  } else {
    console.error(`❌ ${file} is missing`);
    buildReady = false;
  }
}

console.log('\n🛠️  Checking deployment scripts:');
let scriptsReady = true;

for (const script of scripts) {
  const scriptPath = resolve(script);
  if (existsSync(scriptPath)) {
    console.log(`✅ ${script} exists`);
  } else {
    console.error(`❌ ${script} is missing`);
    scriptsReady = false;
  }
}

console.log('\n📋 Deployment Configuration:');
console.log(`✅ Build command: node build-for-deployment.js`);
console.log(`✅ Start command: node start-server.js`);
console.log(`✅ Output directory: dist/`);
console.log(`✅ Main entry: dist/index.js`);
console.log(`✅ Frontend assets: dist/public/`);

if (buildReady && scriptsReady) {
  console.log('\n🚀 Deployment is ready!');
  console.log('\nFor manual deployment:');
  console.log('1. Run: node build-for-deployment.js');
  console.log('2. Run: node start-server.js');
  console.log('\nReplit deployment will use these scripts automatically.');
} else {
  console.error('\n❌ Deployment is not ready. Please fix the missing files/scripts.');
  process.exit(1);
}