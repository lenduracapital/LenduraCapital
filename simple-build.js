#!/usr/bin/env node

// Simplest possible build script for Replit
import { execSync } from 'child_process';

console.log('Building project...');

// Run vite build
execSync('vite build', { stdio: 'inherit' });

// Run esbuild with explicit outfile
execSync('esbuild server/index.ts --bundle --platform=node --format=esm --packages=external --outfile=dist/index.js --minify', {
  stdio: 'inherit'
});

console.log('Build complete!');