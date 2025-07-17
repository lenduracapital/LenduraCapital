#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';

console.log('🔍 Running deployment diagnostics...');

// Test if the server can start in production mode
console.log('\n🚀 Testing server startup in production mode...');

try {
  // Set production environment
  process.env.NODE_ENV = 'production';
  
  // Test if server file can be imported/required
  console.log('📁 Checking server file...');
  const serverPath = 'dist/index.js';
  
  if (!existsSync(serverPath)) {
    console.error('❌ Server file not found:', serverPath);
    process.exit(1);
  }
  
  // Check server file content for common issues
  const serverContent = readFileSync(serverPath, 'utf8');
  
  // Check for port configuration
  if (!serverContent.includes('process.env.PORT') && !serverContent.includes('5000')) {
    console.warn('⚠️  Warning: Server might not be configured for deployment port');
  }
  
  // Check for 0.0.0.0 binding (required for Replit deployment)
  if (!serverContent.includes('0.0.0.0')) {
    console.error('❌ CRITICAL: Server must bind to 0.0.0.0 for deployment');
    console.error('Current server binding might be localhost only');
    
    // Check the original server file
    if (existsSync('server/index.ts')) {
      const originalServer = readFileSync('server/index.ts', 'utf8');
      console.log('\n📋 Checking server/index.ts for binding configuration...');
      
      if (originalServer.includes('localhost') || originalServer.includes('127.0.0.1')) {
        console.error('❌ Found localhost binding in server/index.ts');
        console.error('This will prevent deployment from working');
        
        // Suggest fix
        console.log('\n🔧 FIX NEEDED: Update server/index.ts to bind to 0.0.0.0');
        console.log('Change: app.listen(port, "localhost") or app.listen(port, "127.0.0.1")');
        console.log('To: app.listen(port, "0.0.0.0")');
      } else if (originalServer.includes('0.0.0.0')) {
        console.log('✅ Server correctly configured to bind to 0.0.0.0');
      } else {
        console.log('📋 Server binding configuration:');
        const listenLines = originalServer.split('\n').filter(line => 
          line.includes('.listen') || line.includes('app.listen')
        );
        listenLines.forEach(line => console.log('  ', line.trim()));
      }
    }
  } else {
    console.log('✅ Server configured to bind to 0.0.0.0');
  }
  
  // Check for environment variables that might be missing
  console.log('\n🔧 Checking environment configuration...');
  const requiredEnvVars = ['DATABASE_URL'];
  
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      console.warn(`⚠️  Warning: ${envVar} environment variable not set`);
    } else {
      console.log(`✅ ${envVar} is configured`);
    }
  }
  
  // Check port configuration
  const port = process.env.PORT || process.env.REPLIT_DB_URL ? 3000 : 5000;
  console.log(`📡 Expected port: ${port}`);
  
  console.log('\n📊 DEPLOYMENT DIAGNOSTICS SUMMARY');
  console.log('If the URL is not loading, the most common issues are:');
  console.log('1. Server not binding to 0.0.0.0 (required for Replit)');
  console.log('2. Server crashing due to missing environment variables');
  console.log('3. Port configuration mismatch');
  console.log('4. Database connection issues');
  
} catch (error) {
  console.error('❌ Deployment diagnostics failed:', error.message);
}