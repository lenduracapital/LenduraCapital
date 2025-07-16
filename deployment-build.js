#!/usr/bin/env node

/**
 * Deployment Build Script for FundTek Capital Group
 * This script ensures dist/index.js is properly created for deployment
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting deployment build process...');
console.log('=====================================\n');

// Step 1: Clean dist directory
console.log('🧹 Cleaning dist directory...');
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true, force: true });
}
fs.mkdirSync('dist', { recursive: true });

// Step 2: Build client
console.log('\n📦 Building client (Vite)...');
try {
  execSync('vite build', { stdio: 'inherit' });
  console.log('✅ Client build completed');
} catch (error) {
  console.error('❌ Client build failed:', error.message);
  process.exit(1);
}

// Step 3: Build server with specific output file
console.log('\n🔧 Building server (esbuild)...');
try {
  const buildCommand = `esbuild server/index.ts \
    --platform=node \
    --packages=external \
    --bundle \
    --format=esm \
    --outfile=dist/index.js \
    --target=node18 \
    --external:pg-native \
    --external:bufferutil \
    --external:utf-8-validate \
    --external:@mapbox/node-pre-gyp \
    --minify \
    --sourcemap`;
  
  execSync(buildCommand, { stdio: 'inherit' });
  console.log('✅ Server build completed');
} catch (error) {
  console.error('❌ Server build failed:', error.message);
  process.exit(1);
}

// Step 4: Verify dist/index.js exists
console.log('\n🔍 Verifying build output...');
const distIndexPath = path.join(__dirname, 'dist', 'index.js');
if (!fs.existsSync(distIndexPath)) {
  console.error('❌ ERROR: dist/index.js not found after build!');
  console.error('Build failed to produce the required file for deployment.');
  process.exit(1);
}

const stats = fs.statSync(distIndexPath);
console.log(`✅ dist/index.js exists (${(stats.size / 1024).toFixed(2)} KB)`);

// Step 5: Create a start script wrapper if needed
console.log('\n📝 Creating deployment wrapper...');
const startScript = `#!/usr/bin/env node
// Deployment entry point
import('./index.js');
`;

fs.writeFileSync(path.join(__dirname, 'dist', 'start.js'), startScript);
console.log('✅ Deployment wrapper created');

// Step 6: Final verification
console.log('\n✨ Build completed successfully!');
console.log('📁 Output files:');
console.log('   - dist/index.js (main server bundle)');
console.log('   - dist/client/ (client assets)');
console.log('   - dist/start.js (deployment wrapper)');
console.log('\n🚀 Ready for deployment!');