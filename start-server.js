#!/usr/bin/env node

import { existsSync } from 'fs';
import { execSync } from 'child_process';

console.log('🚀 Starting production server...');

// Validate dist/index.js exists before starting
if (!existsSync('dist/index.js')) {
  console.error('❌ ERROR: dist/index.js not found');
  console.error('Please run "npm run build" first to create the production build');
  process.exit(1);
}

// Validate the server file has correct syntax
try {
  execSync('node -c dist/index.js', { stdio: 'pipe' });
  console.log('✅ Server file validation passed');
} catch (error) {
  console.error('❌ ERROR: dist/index.js has syntax errors');
  console.error('Please run "npm run build" to rebuild the server');
  process.exit(1);
}

// Start the server
console.log('🌐 Starting server in production mode...');
try {
  execSync('node dist/index.js', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ ERROR: Server failed to start');
  console.error(error.message);
  process.exit(1);
}