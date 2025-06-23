#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Start the TypeScript server using Node.js with experimental loader
const serverPath = path.join(__dirname, 'server/index.ts');
const child = spawn('node', [
  '--loader', 'tsx/esm',
  serverPath
], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: process.env.NODE_ENV || 'development'
  }
});

child.on('exit', (code) => {
  process.exit(code || 0);
});

process.on('SIGINT', () => {
  child.kill('SIGINT');
});

process.on('SIGTERM', () => {
  child.kill('SIGTERM');
});