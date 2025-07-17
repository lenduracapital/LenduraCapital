#!/usr/bin/env node

import { spawn } from 'child_process';

console.log('🧪 Testing production server with enhanced logging...');

const serverProcess = spawn('node', ['dist/index.js'], {
  env: {
    ...process.env,
    NODE_ENV: 'production',
    PORT: '8080'
  },
  stdio: ['pipe', 'pipe', 'pipe']
});

let serverOutput = '';
let serverErrors = '';

serverProcess.stdout.on('data', (data) => {
  const output = data.toString();
  serverOutput += output;
  console.log('📋 Server:', output.trim());
});

serverProcess.stderr.on('data', (data) => {
  const error = data.toString();
  serverErrors += error;
  console.error('❌ Error:', error.trim());
});

serverProcess.on('close', (code) => {
  console.log(`\n📊 Server process exited with code: ${code}`);
  
  if (code === 0) {
    console.log('✅ Server ran successfully');
  } else {
    console.error('❌ Server failed with exit code:', code);
  }
  
  console.log('\n📋 Full Output:');
  console.log(serverOutput);
  
  if (serverErrors) {
    console.log('\n❌ Errors:');
    console.log(serverErrors);
  }
  
  if (serverOutput.includes('serving on port')) {
    console.log('\n✅ DIAGNOSIS: Server starts correctly');
    console.log('The issue may be deployment-specific configuration');
  } else if (serverErrors.includes('DATABASE_URL')) {
    console.log('\n🔍 DIAGNOSIS: Database connection issue');
    console.log('Check if DATABASE_URL is properly set in deployment');
  } else {
    console.log('\n❓ DIAGNOSIS: Unknown startup issue');
    console.log('Check logs above for specific error messages');
  }
});

// Stop server after 5 seconds
setTimeout(() => {
  console.log('\n🛑 Stopping test server...');
  serverProcess.kill();
}, 5000);