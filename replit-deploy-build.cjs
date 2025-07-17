const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Replit deployment build...\n');

// Step 1: Clean dist directory
console.log('1️⃣ Cleaning dist directory...');
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true, force: true });
}
fs.mkdirSync('dist', { recursive: true });

// Step 2: Run the standard build
console.log('\n2️⃣ Running standard build command...');
try {
  execSync('npm run build', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Step 3: Verify dist/index.js exists
console.log('\n3️⃣ Verifying build output...');
const distIndexPath = path.join('dist', 'index.js');
if (!fs.existsSync(distIndexPath)) {
  console.error('❌ ERROR: dist/index.js not found!');
  console.log('Directory contents:');
  const files = fs.readdirSync('dist');
  files.forEach(file => console.log(`  - ${file}`));
  process.exit(1);
}

// Step 4: Check file size and validity
const stats = fs.statSync(distIndexPath);
const sizeKB = (stats.size / 1024).toFixed(2);
console.log(`✅ dist/index.js exists (${sizeKB} KB)`);

// Step 5: Quick syntax check
console.log('\n4️⃣ Checking JavaScript syntax...');
try {
  execSync(`node --check ${distIndexPath}`, { stdio: 'pipe' });
  console.log('✅ JavaScript syntax is valid');
} catch (error) {
  console.error('❌ JavaScript syntax error in dist/index.js');
  process.exit(1);
}

// Step 6: Create a deployment info file
console.log('\n5️⃣ Creating deployment info...');
const deployInfo = {
  buildTime: new Date().toISOString(),
  nodeVersion: process.version,
  buildCommand: 'npm run build',
  startCommand: 'npm start',
  mainFile: 'dist/index.js',
  fileSize: stats.size,
  platform: process.platform
};

fs.writeFileSync('dist/deploy-info.json', JSON.stringify(deployInfo, null, 2));

console.log('\n✅ BUILD SUCCESSFUL!');
console.log('=====================================');
console.log('Deployment Configuration:');
console.log(`  Build Command: ${deployInfo.buildCommand}`);
console.log(`  Start Command: ${deployInfo.startCommand}`);
console.log(`  Main File: ${deployInfo.mainFile}`);
console.log(`  File Size: ${sizeKB} KB`);
console.log('=====================================\n');

process.exit(0);