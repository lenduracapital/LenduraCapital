// ES Module entry point for Replit deployment
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Set up module aliases
await import('module-alias/register');
const moduleAlias = require('module-alias');

// Configure path aliases
moduleAlias.addAliases({
  '@shared': path.join(__dirname, '../shared'),
  '@': path.join(__dirname, '../client/src')
});

// Import and start the server
await import('../server/index.js');