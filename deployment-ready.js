#!/usr/bin/env node

import { existsSync, statSync } from 'fs';
import { execSync } from 'child_process';

console.log('🚀 Checking deployment readiness...\n');

const checks = [
  {
    name: 'dist/index.js exists',
    check: () => existsSync('dist/index.js'),
    fix: 'Run: npm run build'
  },
  {
    name: 'dist/index.js is valid JavaScript',
    check: () => {
      try {
        execSync('node -c dist/index.js', { stdio: 'pipe' });
        return true;
      } catch {
        return false;
      }
    },
    fix: 'Run: npm run build'
  },
  {
    name: 'dist/index.js has reasonable size',
    check: () => {
      if (!existsSync('dist/index.js')) return false;
      const stats = statSync('dist/index.js');
      return stats.size > 10000; // At least 10KB
    },
    fix: 'Run: npm run build'
  },
  {
    name: 'Frontend assets exist (dist/public/)',
    check: () => existsSync('dist/public') && existsSync('dist/public/index.html'),
    fix: 'Run: npm run build'
  },
  {
    name: 'CSS and JS assets exist',
    check: () => {
      if (!existsSync('dist/public/assets')) return false;
      try {
        execSync('ls dist/public/assets/*.css dist/public/assets/*.js', { stdio: 'pipe' });
        return true;
      } catch {
        return false;
      }
    },
    fix: 'Run: npm run build'
  },
  {
    name: 'package.json start script exists',
    check: () => {
      try {
        const packageJson = JSON.parse(execSync('cat package.json', { encoding: 'utf8' }));
        return packageJson.scripts && packageJson.scripts.start;
      } catch {
        return false;
      }
    },
    fix: 'Verify package.json has "start" script'
  }
];

let allPassed = true;
let passedCount = 0;

for (const check of checks) {
  const passed = check.check();
  const status = passed ? '✅' : '❌';
  console.log(`${status} ${check.name}`);
  
  if (!passed) {
    console.log(`   Fix: ${check.fix}`);
    allPassed = false;
  } else {
    passedCount++;
  }
}

console.log(`\n📊 Results: ${passedCount}/${checks.length} checks passed`);

if (allPassed) {
  console.log('\n🎉 DEPLOYMENT READY!');
  console.log('✅ All deployment requirements met');
  console.log('🚀 You can now deploy using Replit Deployments');
  console.log('\nNext steps:');
  console.log('1. Use the deploy button in Replit');
  console.log('2. Or configure .replit file with:');
  console.log('   build = ["node", "build-for-deployment.js"]');
  console.log('   run = ["npm", "run", "start"]');
} else {
  console.log('\n❌ DEPLOYMENT NOT READY');
  console.log('Please fix the issues above before deploying');
  process.exit(1);
}