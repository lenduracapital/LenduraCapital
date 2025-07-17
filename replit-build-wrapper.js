#!/usr/bin/env node

// This wrapper ensures dist/index.js is created properly for Replit deployment
import { execSync } from 'child_process';
import { existsSync } from 'fs';

console.log('🚀 Replit Build Wrapper - Ensuring dist/index.js creation\n');

try {
  // Run the custom build script that uses --outfile
  console.log('Running optimized build process...');
  execSync('node build.js', { stdio: 'inherit' });
  
  // Verify the output
  if (!existsSync('dist/index.js')) {
    throw new Error('Build failed: dist/index.js not created');
  }
  
  console.log('\n✅ Build completed successfully!');
  console.log('📁 dist/index.js is ready for deployment');
  
} catch (error) {
  console.error('\n❌ Build failed:', error.message);
  process.exit(1);
}