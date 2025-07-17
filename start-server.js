#!/usr/bin/env node

import { existsSync } from 'fs';
import { resolve } from 'path';

const serverFile = resolve('dist/index.js');

if (!existsSync(serverFile)) {
  console.error(`❌ Server file not found: ${serverFile}`);
  console.error('Please run the build command first: npm run build');
  process.exit(1);
}

console.log('🚀 Starting production server...');

try {
  // Import and run the server
  const server = await import(serverFile);
  console.log('✅ Server started successfully');
} catch (error) {
  console.error('❌ Failed to start server:', error.message);
  console.error('Stack trace:', error.stack);
  process.exit(1);
}