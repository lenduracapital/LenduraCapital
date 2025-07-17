import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

async function build() {
  console.log('🚀 Starting deployment build...');
  
  try {
    // Step 1: Clean dist directory
    console.log('📦 Cleaning dist directory...');
    await fs.rm('dist', { recursive: true, force: true });
    await fs.mkdir('dist', { recursive: true });
    
    // Step 2: Build TypeScript server to dist/index.js
    console.log('🔧 Compiling TypeScript server...');
    const { stdout: serverStdout, stderr: serverStderr } = await execAsync(
      'esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/index.js'
    );
    if (serverStderr) console.error('Server build warnings:', serverStderr);
    console.log('✅ Server compiled to dist/index.js');
    
    // Step 3: Build Vite frontend in client directory
    console.log('🎨 Building Vite frontend...');
    const { stdout: clientStdout, stderr: clientStderr } = await execAsync('cd client && npm run build');
    if (clientStderr && !clientStderr.includes('Browserslist')) {
      console.error('Client build warnings:', clientStderr);
    }
    console.log('✅ Client built in client/dist');
    
    // Step 4: Copy client/dist files to both dist/ and dist/public/ 
    console.log('📂 Copying frontend files...');
    
    // Create dist/public directory
    await fs.mkdir('dist/public', { recursive: true });
    
    // Copy files to both locations for compatibility
    const clientDistFiles = await fs.readdir('client/dist');
    for (const file of clientDistFiles) {
      const srcPath = path.join('client/dist', file);
      const destPath = path.join('dist', file);
      const publicDestPath = path.join('dist/public', file);
      const stats = await fs.stat(srcPath);
      
      if (stats.isDirectory()) {
        await fs.cp(srcPath, destPath, { recursive: true });
        await fs.cp(srcPath, publicDestPath, { recursive: true });
      } else {
        await fs.copyFile(srcPath, destPath);
        await fs.copyFile(srcPath, publicDestPath);
      }
    }
    console.log('✅ Frontend files copied to dist and dist/public');
    
    // Step 5: Create package.json for ESM support
    console.log('📝 Creating dist/package.json...');
    await fs.writeFile('dist/package.json', JSON.stringify({ type: 'module' }, null, 2));
    
    // Step 6: Verify critical files
    console.log('\n✅ Verifying build output...');
    const checks = [
      { file: 'dist/index.js', desc: 'Server entry point' },
      { file: 'dist/index.html', desc: 'Client entry point' },
      { file: 'dist/package.json', desc: 'ESM configuration' }
    ];
    
    for (const check of checks) {
      try {
        const stats = await fs.stat(check.file);
        console.log(`✓ ${check.desc}: ${check.file} (${(stats.size / 1024).toFixed(2)} KB)`);
      } catch (err) {
        console.error(`❌ Missing: ${check.file}`);
        throw new Error(`Build verification failed: ${check.file} not found`);
      }
    }
    
    // List dist contents
    const files = await fs.readdir('dist');
    console.log('\n📁 Dist contents:');
    for (const file of files) {
      const stats = await fs.stat(path.join('dist', file));
      const size = stats.isDirectory() ? '[DIR]' : `${(stats.size / 1024).toFixed(2)} KB`;
      console.log(`  - ${file} ${size}`);
    }
    
    console.log('\n🎉 Build completed successfully!');
    console.log('\n📋 Deployment settings:');
    console.log('  Build Command: npm run build');
    console.log('  Start Command: npm start');
    console.log('  Output Directory: dist');
    
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

build();