#!/usr/bin/env node

// Comprehensive deployment diagnostic tool
import { execSync } from 'child_process';
import { existsSync, statSync } from 'fs';
import { createServer } from 'http';

console.log('🔍 DEPLOYMENT DIAGNOSTIC REPORT');
console.log('================================\n');

// 1. File System Check
console.log('1. DEPLOYMENT FILES:');
const requiredFiles = [
  'dist/start.js',
  'dist/package.json', 
  'dist/public/index.html',
  'dist/public/assets'
];

requiredFiles.forEach(file => {
  const exists = existsSync(file);
  if (exists && file.endsWith('start.js')) {
    const size = (statSync(file).size / 1024).toFixed(1);
    console.log(`   ✅ ${file} (${size}KB)`);
  } else {
    console.log(`   ${exists ? '✅' : '❌'} ${file}`);
  }
});

// 2. Environment Check
console.log('\n2. ENVIRONMENT:');
console.log(`   Node Version: ${process.version}`);
console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
console.log(`   PORT: ${process.env.PORT || 'not set'}`);
console.log(`   DATABASE_URL: ${process.env.DATABASE_URL ? 'set' : 'not set'}`);

// 3. Package.json Check
console.log('\n3. PACKAGE.JSON:');
try {
  const pkg = JSON.parse(require('fs').readFileSync('dist/package.json', 'utf8'));
  console.log(`   ✅ Type: ${pkg.type || 'commonjs'}`);
  console.log(`   ✅ Main: ${pkg.main || 'not set'}`);
  console.log(`   ✅ Start: ${pkg.scripts?.start || 'not set'}`);
} catch (error) {
  console.log(`   ❌ Error reading dist/package.json: ${error.message}`);
}

// 4. Start.js Syntax Check
console.log('\n4. START.JS VALIDATION:');
try {
  execSync('node -c dist/start.js', { stdio: 'pipe' });
  console.log('   ✅ JavaScript syntax valid');
} catch (error) {
  console.log(`   ❌ Syntax error: ${error.message}`);
}

// 5. Port Binding Test
console.log('\n5. PORT BINDING TEST:');
const testPorts = [80, 8080, 3000];

for (const port of testPorts) {
  try {
    const server = createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('OK');
    });
    
    await new Promise((resolve, reject) => {
      server.listen(port, '0.0.0.0', () => {
        console.log(`   ✅ Port ${port}: Available`);
        server.close();
        resolve();
      });
      
      server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          console.log(`   ⚠️ Port ${port}: In use`);
        } else {
          console.log(`   ❌ Port ${port}: ${err.message}`);
        }
        reject(err);
      });
    }).catch(() => {});
  } catch (error) {
    // Port test failed, continue
  }
}

// 6. Deployment Configuration
console.log('\n6. DEPLOYMENT CONFIG:');
try {
  const replit = require('fs').readFileSync('.replit', 'utf8');
  const buildMatch = replit.match(/build = \[(.*?)\]/);
  const runMatch = replit.match(/run = \[(.*?)\]/);
  
  if (buildMatch) {
    console.log(`   ✅ Build command: ${buildMatch[1]}`);
  }
  if (runMatch) {
    console.log(`   ✅ Run command: ${runMatch[1]}`);
  }
} catch (error) {
  console.log(`   ❌ Error reading .replit: ${error.message}`);
}

console.log('\n🏁 DIAGNOSTIC COMPLETE');
console.log('If all checks pass, deployment should work.');
console.log('If deployment still fails, the issue may be with the deployment platform itself.');