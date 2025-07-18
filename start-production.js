#!/usr/bin/env node

import { existsSync } from 'fs';
import { execSync } from 'child_process';

console.log('🚀 Production startup verification...');

// Check environment
const isProduction = process.env.NODE_ENV === 'production';
console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);

if (isProduction) {
  // Production checks
  if (!existsSync('dist/index.js')) {
    console.error('❌ CRITICAL: dist/index.js not found in production');
    process.exit(1);
  }
  
  if (!existsSync('dist/public/index.html')) {
    console.error('❌ CRITICAL: Frontend assets not found');
    process.exit(1);
  }
  
  console.log('✅ Production build artifacts verified');
}

// Start server
console.log('🚀 Starting server...');
execSync('node dist/index.js', { stdio: 'inherit' });
