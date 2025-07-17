// Main entry point for the FundTek application
// This file is compiled from src/index.ts to dist/index.js

import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Set up module aliases before importing anything else
const moduleAlias = require('module-alias');

// Configure path aliases to work from the dist directory
moduleAlias.addAliases({
  '@shared': path.join(__dirname, '../shared'),
  '@': path.join(__dirname, '../client/src')
});

// Import and start the server
import('../server/index.js').catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});