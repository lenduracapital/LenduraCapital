// Entry point for Replit deployment
// This CommonJS file imports the Express server

const path = require('path');

// Set up module aliases before any imports
require('module-alias/register');
const moduleAlias = require('module-alias');

// Configure path aliases
moduleAlias.addAliases({
  '@shared': path.join(__dirname, '../shared'),
  '@': path.join(__dirname, '../client/src')
});

// Import and start the Express server
require('../server/index.js');