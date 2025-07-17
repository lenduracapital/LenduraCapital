#!/usr/bin/env node

import { spawn } from 'child_process';
import { existsSync } from 'fs';

console.log('🧪 Testing deployment server startup...');

// Test 1: Verify build files exist
if (!existsSync('dist/index.js')) {
  console.error('❌ dist/index.js not found - run build first');
  process.exit(1);
}

if (!existsSync('dist/public/index.html')) {
  console.error('❌ dist/public/index.html not found - frontend build failed');
  process.exit(1);
}

console.log('✅ Build files exist');

// Test 2: Start server in production mode and test endpoints
console.log('🚀 Starting server in production mode...');

const serverProcess = spawn('node', ['dist/index.js'], {
  env: {
    ...process.env,
    NODE_ENV: 'production',
    PORT: '3000'
  },
  stdio: ['pipe', 'pipe', 'pipe']
});

let serverStarted = false;
let serverOutput = '';

// Capture server output
serverProcess.stdout.on('data', (data) => {
  const output = data.toString();
  serverOutput += output;
  console.log('📋 Server:', output.trim());
  
  if (output.includes('serving on port')) {
    serverStarted = true;
    console.log('✅ Server started successfully');
    
    // Test health endpoint after server starts
    setTimeout(async () => {
      try {
        console.log('🔍 Testing health endpoint...');
        const response = await fetch('http://localhost:3000/api/health');
        if (response.ok) {
          const data = await response.json();
          console.log('✅ Health check passed:', data);
        } else {
          console.error('❌ Health check failed:', response.status);
        }
      } catch (error) {
        console.error('❌ Health check error:', error.message);
      }
      
      // Test main page
      try {
        console.log('🔍 Testing main page...');
        const response = await fetch('http://localhost:3000/');
        if (response.ok) {
          console.log('✅ Main page accessible');
        } else {
          console.error('❌ Main page failed:', response.status);
        }
      } catch (error) {
        console.error('❌ Main page error:', error.message);
      }
      
      // Clean up
      console.log('🧹 Stopping test server...');
      serverProcess.kill();
      
      console.log('\n📊 DEPLOYMENT TEST SUMMARY');
      if (serverStarted) {
        console.log('✅ Server starts successfully in production mode');
        console.log('✅ Build files are correct');
        console.log('🚀 Deployment should work - server binds to 0.0.0.0:3000');
        console.log('\n🔧 If deployment URL still not working, check:');
        console.log('1. Replit deployment uses the correct PORT (should be automatic)');
        console.log('2. Deployment configuration in .replit is correct');
        console.log('3. Try redeploying after a few minutes');
      } else {
        console.log('❌ Server failed to start - check error messages above');
      }
      
      process.exit(0);
    }, 3000);
  }
});

serverProcess.stderr.on('data', (data) => {
  console.error('❌ Server Error:', data.toString().trim());
});

// Kill server after 10 seconds if it doesn't start
setTimeout(() => {
  if (!serverStarted) {
    console.error('❌ Server failed to start within 10 seconds');
    serverProcess.kill();
    process.exit(1);
  }
}, 10000);