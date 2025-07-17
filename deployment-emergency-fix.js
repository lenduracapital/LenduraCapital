#!/usr/bin/env node

// Emergency deployment fix - create a minimal server that will definitely work

import { writeFileSync } from 'fs';
import { execSync } from 'child_process';

console.log('🚨 Creating emergency deployment fix...');

// Create a minimal, bulletproof server that eliminates all potential failure points
const minimalServer = `import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 EMERGENCY SERVER STARTING...');
console.log('Environment:', process.env.NODE_ENV);
console.log('Port:', process.env.PORT || 3000);

const app = express();

// Essential middleware only
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date(),
    environment: process.env.NODE_ENV,
    port: process.env.PORT || 3000
  });
});

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Catch all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

const server = createServer(app);

server.listen(PORT, HOST, (err) => {
  if (err) {
    console.error('❌ Server failed to start:', err);
    process.exit(1);
  }
  console.log(\`✅ EMERGENCY SERVER RUNNING ON \${HOST}:\${PORT}\`);
  console.log(\`✅ Health check: http://\${HOST}:\${PORT}/api/health\`);
});

server.on('error', (err) => {
  console.error('❌ Server error:', err);
});`;

console.log('📝 Writing emergency server...');
writeFileSync('dist/emergency-server.js', `import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 EMERGENCY SERVER STARTING...');
console.log('Environment:', process.env.NODE_ENV);
console.log('Port:', process.env.PORT || 3000);

const app = express();

// Essential middleware only
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date(),
    environment: process.env.NODE_ENV,
    port: process.env.PORT || 3000
  });
});

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Catch all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

const server = createServer(app);

server.listen(PORT, HOST, (err) => {
  if (err) {
    console.error('❌ Server failed to start:', err);
    process.exit(1);
  }
  console.log(\`✅ EMERGENCY SERVER RUNNING ON \${HOST}:\${PORT}\`);
  console.log(\`✅ Health check: http://\${HOST}:\${PORT}/api/health\`);
});

server.on('error', (err) => {
  console.error('❌ Server error:', err);
});`);

console.log('✅ Emergency server created');

console.log('🧪 Testing emergency server...');
try {
  // Test the emergency server
  execSync('node -c dist/emergency-server.js', { stdio: 'pipe' });
  console.log('✅ Emergency server syntax valid');
  
  console.log('🎉 EMERGENCY FIX READY!');
  console.log('\n📋 Emergency server features:');
  console.log('- No database dependencies');
  console.log('- No complex routing or middleware');
  console.log('- Serves static files from dist/public/');
  console.log('- Health check endpoint');
  console.log('- Enhanced error logging');
  
} catch (error) {
  console.error('❌ Emergency server test failed:', error.message);
}

console.log('\n🚀 Next steps:');
console.log('1. Copy dist/emergency-server.js to dist/index.js');
console.log('2. Deploy - this minimal server should work immediately');
console.log('3. Once working, we can add back features gradually');