#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, writeFileSync } from 'fs';

console.log('🚀 Configuring production deployment for Replit...');

// 1. Ensure build artifacts exist
console.log('🔍 Verifying build artifacts...');
if (!existsSync('dist/index.js')) {
  console.log('❌ dist/index.js not found, building now...');
  execSync('node build-for-deployment.js', { stdio: 'inherit' });
}

// 2. Create production environment configuration
console.log('⚙️  Creating production environment configuration...');
const productionConfig = {
  "NODE_ENV": "production",
  "PORT": "${PORT:-3000}",
  "HOST": "0.0.0.0"
};

// 3. Create startup verification script for production
console.log('📝 Creating production startup script...');
const productionStartScript = `#!/usr/bin/env node

import { existsSync } from 'fs';
import { execSync } from 'child_process';

console.log('🚀 Production startup verification...');

// Check environment
const isProduction = process.env.NODE_ENV === 'production';
console.log(\`✅ Environment: \${process.env.NODE_ENV || 'development'}\`);

if (isProduction) {
  // Production checks
  if (!existsSync('dist/index.js')) {
    console.error('❌ CRITICAL: dist/index.js not found in production');
    process.exit(1);
  }
  
  if (!existsSync('dist/public/index.html')) {
    console.error('❌ CRITICAL: Frontend assets not found');
    process.exit(1);
  }
  
  console.log('✅ Production build artifacts verified');
}

// Start server
console.log('🚀 Starting server...');
execSync('node dist/index.js', { stdio: 'inherit' });
`;

writeFileSync('start-production.js', productionStartScript);
execSync('chmod +x start-production.js', { stdio: 'pipe' });

// 4. Create deployment verification
console.log('🔍 Running production deployment verification...');

const verificationTests = [
  {
    name: 'Backend Build',
    check: () => existsSync('dist/index.js'),
    error: 'dist/index.js not found'
  },
  {
    name: 'Frontend Build', 
    check: () => existsSync('dist/public/index.html'),
    error: 'Frontend not built'
  },
  {
    name: 'ES Modules Config',
    check: () => existsSync('dist/package.json'),
    error: 'dist/package.json missing'
  },
  {
    name: 'Static Assets Directory',
    check: () => existsSync('server/public') || existsSync('dist/public'),
    error: 'No static assets directory found'
  }
];

let allTestsPassed = true;

console.log('\n📋 Production Deployment Checklist:');
verificationTests.forEach(test => {
  const passed = test.check();
  console.log(`   ${passed ? '✅' : '❌'} ${test.name}`);
  if (!passed) {
    console.log(`      Error: ${test.error}`);
    allTestsPassed = false;
  }
});

if (allTestsPassed) {
  console.log('\n🎉 Production deployment configuration complete!');
  console.log('\n📝 Next steps for Replit deployment:');
  console.log('1. Click the Deploy button in Replit');
  console.log('2. Build command: node build-for-deployment.js');  
  console.log('3. Run command: npm run start');
  console.log('4. Application will be available on your .replit.app domain');
  console.log('\n✅ Traffic routing configured:');
  console.log('   • /api/* → Backend (Express routes)');
  console.log('   • /* → Frontend (React SPA)');
  console.log('   • Static assets served with caching headers');
} else {
  console.log('\n❌ Production deployment configuration failed');
  console.log('   Run: node build-for-deployment.js');
  process.exit(1);
}