// Deployment Verification Script
// Ensures all deployment requirements are met

import fs from 'fs';
import path from 'path';

console.log('🔍 Verifying deployment readiness...\n');

const checks = [
  {
    name: 'Server Bundle Exists',
    check: () => fs.existsSync('dist/index.js'),
    fix: 'Run: node build-for-deployment.js or ./replit-deploy.sh'
  },
  {
    name: 'Server Bundle is Valid JavaScript',
    check: () => {
      if (!fs.existsSync('dist/index.js')) return false;
      const content = fs.readFileSync('dist/index.js', 'utf8');
      return content.includes('export') || content.includes('import') || content.includes('require');
    },
    fix: 'Ensure esbuild compiles TypeScript correctly'
  },
  {
    name: 'ESM Package Configuration',
    check: () => {
      if (!fs.existsSync('dist/package.json')) return false;
      const pkg = JSON.parse(fs.readFileSync('dist/package.json', 'utf8'));
      return pkg.type === 'module';
    },
    fix: 'Create dist/package.json with {"type":"module"}'
  },
  {
    name: 'TypeScript Configuration Allows Output',
    check: () => {
      if (!fs.existsSync('tsconfig.json')) return true;
      const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
      return tsconfig.compilerOptions.noEmit !== true;
    },
    fix: 'Set "noEmit": false in tsconfig.json'
  },
  {
    name: 'Start Script Points to Correct File',
    check: () => {
      if (!fs.existsSync('package.json')) return false;
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      return pkg.scripts?.start?.includes('dist/index.js');
    },
    fix: 'Update package.json start script to use dist/index.js'
  }
];

let passed = 0;
let failed = 0;

for (const check of checks) {
  const result = check.check();
  if (result) {
    console.log(`✅ ${check.name}`);
    passed++;
  } else {
    console.log(`❌ ${check.name}`);
    console.log(`   Fix: ${check.fix}\n`);
    failed++;
  }
}

console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('🎉 ALL DEPLOYMENT CHECKS PASSED!');
  console.log('✅ Ready for production deployment');
  
  // Show file info
  if (fs.existsSync('dist/index.js')) {
    const stats = fs.statSync('dist/index.js');
    console.log(`📦 dist/index.js: ${(stats.size / 1024).toFixed(2)} KB`);
  }
} else {
  console.log('⚠️  Deployment requirements not met');
  console.log('Please fix the failed checks above');
  process.exit(1);
}