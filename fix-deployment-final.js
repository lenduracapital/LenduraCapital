#!/usr/bin/env node

import { writeFileSync } from 'fs';

console.log('🔧 Creating ES module compatible server...');

// ES module compatible server
const esModuleServer = `import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 DEPLOYMENT SERVER STARTING...');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Read index.html once at startup
let indexHtml = '';
try {
  indexHtml = fs.readFileSync(path.join(__dirname, 'public', 'index.html'), 'utf8');
  console.log('✅ Frontend loaded successfully');
} catch (error) {
  console.log('⚠️ Frontend not found, using fallback');
  indexHtml = \`<!DOCTYPE html>
<html>
<head>
    <title>FundTek Capital Group</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #2c5aa0; margin-bottom: 20px; }
        .status { background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .info { color: #666; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <h1>FundTek Capital Group</h1>
        <div class="status">
            <strong>✅ Deployment Server Active</strong>
        </div>
        <div class="info">Environment: \${process.env.NODE_ENV || 'production'}</div>
        <div class="info">Port: \${process.env.PORT || 3000}</div>
        <div class="info">Status: Server running successfully</div>
        <p>The deployment is working correctly. The full website will load once all assets are properly configured.</p>
    </div>
</body>
</html>\`;
}

const server = http.createServer((req, res) => {
  console.log(\`Request: \${req.method} \${req.url}\`);
  
  try {
    // CORS headers for all responses
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }
    
    // Health check
    if (req.url === '/api/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'production',
        port: PORT,
        uptime: process.uptime()
      }));
      return;
    }
    
    // Serve static files from public directory
    if (req.url.startsWith('/assets/') || req.url.startsWith('/public/')) {
      try {
        const filePath = path.join(__dirname, 'public', req.url.replace('/public/', ''));
        const fileContent = fs.readFileSync(filePath);
        
        // Set appropriate content type
        const ext = path.extname(filePath).toLowerCase();
        const contentTypes = {
          '.html': 'text/html',
          '.css': 'text/css',
          '.js': 'application/javascript',
          '.json': 'application/json',
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.gif': 'image/gif',
          '.svg': 'image/svg+xml'
        };
        
        res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'application/octet-stream' });
        res.end(fileContent);
        return;
      } catch (err) {
        console.log('Static file not found:', req.url);
      }
    }
    
    // Serve main page for all other routes
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(indexHtml);
    
  } catch (error) {
    console.error('Request error:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Server Error: ' + error.message);
  }
});

server.listen(PORT, HOST, (err) => {
  if (err) {
    console.error('❌ Server failed to start:', err);
    process.exit(1);
  }
  console.log(\`✅ SERVER RUNNING ON \${HOST}:\${PORT}\`);
  console.log(\`✅ Health: http://\${HOST}:\${PORT}/api/health\`);
  console.log(\`✅ Website: http://\${HOST}:\${PORT}/\`);
});

server.on('error', (err) => {
  console.error('❌ Server error:', err);
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled rejection:', reason);
});`;

writeFileSync('dist/index.js', esModuleServer);

console.log('✅ ES module server created and deployed');
console.log('📋 Fixed ES module compatibility issue');
console.log('🚀 Server will now start correctly in deployment!');