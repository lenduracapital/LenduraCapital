#!/usr/bin/env node

// =============================================================================
// DEPLOYMENT ENVIRONMENT VALIDATION SCRIPT
// =============================================================================
// This script validates environment variables before deployment
// Run this locally to check your deployment configuration

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(colors[color] + message + colors.reset);
}

// Required environment variables for deployment
const REQUIRED_VARS = [
  {
    name: 'DATABASE_URL',
    description: 'PostgreSQL connection string',
    required: true,
    example: 'postgresql://user:pass@host:5432/database'
  }
];

// Optional but recommended environment variables
const OPTIONAL_VARS = [
  {
    name: 'NODE_ENV',
    description: 'Environment mode (auto-detected if missing)',
    required: false,
    example: 'production'
  },
  {
    name: 'PORT',
    description: 'Server port (auto-detected from platform)',
    required: false,
    example: '3000'
  },
  {
    name: 'SESSION_SECRET',
    description: 'Secure session secret key',
    required: false,
    example: 'your-super-secure-secret-key-here'
  }
];

// Validate environment variables
function validateEnvironment() {
  log('\n🔍 FUNDTEK CAPITAL GROUP - DEPLOYMENT ENVIRONMENT CHECK\n', 'bold');
  
  let hasErrors = false;
  let hasWarnings = false;
  
  // Check required variables
  log('✅ REQUIRED ENVIRONMENT VARIABLES:', 'green');
  for (const envVar of REQUIRED_VARS) {
    const value = process.env[envVar.name];
    if (value) {
      log(`  ✓ ${envVar.name}: [CONFIGURED]`, 'green');
      
      // Validate DATABASE_URL format
      if (envVar.name === 'DATABASE_URL') {
        try {
          new URL(value);
          if (!value.startsWith('postgres://') && !value.startsWith('postgresql://')) {
            log(`    ⚠️  Warning: DATABASE_URL should start with postgresql://`, 'yellow');
            hasWarnings = true;
          }
        } catch {
          log(`    ❌ Error: DATABASE_URL is not a valid URL`, 'red');
          hasErrors = true;
        }
      }
    } else {
      log(`  ❌ ${envVar.name}: MISSING`, 'red');
      log(`    Description: ${envVar.description}`, 'red');
      log(`    Example: ${envVar.example}`, 'red');
      hasErrors = true;
    }
  }
  
  // Check optional variables
  log('\n💡 OPTIONAL ENVIRONMENT VARIABLES:', 'blue');
  for (const envVar of OPTIONAL_VARS) {
    const value = process.env[envVar.name];
    if (value) {
      log(`  ✓ ${envVar.name}: [CONFIGURED]`, 'green');
    } else {
      log(`  ⚪ ${envVar.name}: Not set (will use defaults)`, 'yellow');
      log(`    Description: ${envVar.description}`, 'yellow');
      log(`    Example: ${envVar.example}`, 'yellow');
    }
  }
  
  // Deployment platform detection
  log('\n🚀 DEPLOYMENT PLATFORM DETECTION:', 'blue');
  const platforms = [
    { name: 'Replit', env: 'REPL_ID' },
    { name: 'Railway', env: 'RAILWAY_PROJECT_ID' },
    { name: 'Vercel', env: 'VERCEL_URL' },
    { name: 'Heroku', env: 'HEROKU_APP_NAME' }
  ];
  
  let detectedPlatform = null;
  for (const platform of platforms) {
    if (process.env[platform.env]) {
      detectedPlatform = platform.name;
      log(`  ✓ Detected platform: ${platform.name}`, 'green');
      break;
    }
  }
  
  if (!detectedPlatform) {
    log(`  ⚪ Platform: Unknown (using generic deployment settings)`, 'yellow');
  }
  
  // Build and deployment files check
  log('\n📁 DEPLOYMENT FILES CHECK:', 'blue');
  const deploymentFiles = [
    { file: 'package.json', required: true },
    { file: 'build-for-deployment.js', required: true },
    { file: '.env.example', required: false }
  ];
  
  for (const file of deploymentFiles) {
    try {
      readFileSync(join(__dirname, file.file));
      log(`  ✓ ${file.file}: Present`, 'green');
    } catch {
      if (file.required) {
        log(`  ❌ ${file.file}: MISSING (Required)`, 'red');
        hasErrors = true;
      } else {
        log(`  ⚪ ${file.file}: Not found (Optional)`, 'yellow');
      }
    }
  }
  
  // Final assessment
  log('\n📊 DEPLOYMENT READINESS ASSESSMENT:', 'bold');
  
  if (hasErrors) {
    log('❌ DEPLOYMENT NOT READY', 'red');
    log('   Fix the errors above before deploying', 'red');
    process.exit(1);
  } else if (hasWarnings) {
    log('⚠️  DEPLOYMENT READY WITH WARNINGS', 'yellow');
    log('   Consider addressing warnings for optimal performance', 'yellow');
  } else {
    log('✅ DEPLOYMENT READY', 'green');
    log('   All required environment variables are configured', 'green');
  }
  
  // Deployment instructions
  log('\n🚀 DEPLOYMENT INSTRUCTIONS:', 'blue');
  log('  1. Set environment variables in your deployment platform:', 'blue');
  log('     - DATABASE_URL (Required)', 'blue');
  log('     - NODE_ENV=production (Recommended)', 'blue');
  log('     - SESSION_SECRET (Recommended for security)', 'blue');
  log('  2. Use build command: node build-for-deployment.js', 'blue');
  log('  3. Use start command: node dist/start.js', 'blue');
  log('  4. Test with health check endpoints:', 'blue');
  log('     - /health (Simple status)', 'blue');
  log('     - /api/health (Detailed info)', 'blue');
  log('     - /api/env-status (Environment validation)', 'blue');
  
  log('');
}

// Run validation
validateEnvironment();