// Main server entry point for Replit deployment
// This file serves as a bridge between the TypeScript server and Replit's requirements

const path = require('path');
const { fileURLToPath } = require('url');

// Set up module aliases
require('module-alias/register');
const moduleAlias = require('module-alias');

// Configure aliases for module resolution
moduleAlias.addAliases({
  '@shared': path.join(__dirname, '../shared'),
  '@': path.join(__dirname, '../client/src')
});

// Import the Express server after aliases are configured
async function startServer() {
  try {
    // Import the server module
    await import('../server/index.js');
    console.log('Server started successfully');
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();