#!/usr/bin/env node

import { existsSync, statSync } from 'fs';
import { resolve } from 'path';

const requiredFiles = [
  'dist/index.js',
  'dist/public/index.html'
];

console.log('🔍 Verifying build output...');

let allFilesExist = true;

for (const file of requiredFiles) {
  const filePath = resolve(file);
  if (existsSync(filePath)) {
    const stats = statSync(filePath);
    console.log(`✅ ${file} exists (${stats.size} bytes)`);
  } else {
    console.error(`❌ ${file} is missing`);
    allFilesExist = false;
  }
}

if (!allFilesExist) {
  console.error('❌ Build verification failed: Required files are missing');
  process.exit(1);
}

console.log('✅ Build verification passed: All required files exist');