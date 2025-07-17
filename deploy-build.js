import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

async function build() {
  console.log('🚀 Starting production build for deployment...');
  
  try {
    // Build client (Vite)
    console.log('📦 Building client...');
    const { stdout: viteOut, stderr: viteErr } = await execAsync('vite build');
    if (viteErr && !viteErr.includes('Browserslist')) {
      console.error('Vite build error:', viteErr);
    }
    console.log('✅ Client build complete');
    
    // Build server with explicit outfile (not outdir)
    console.log('🔧 Building server...');
    const { stdout: esbuildOut, stderr: esbuildErr } = await execAsync(
      'esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/index.js'
    );
    if (esbuildErr) console.error('Server build error:', esbuildErr);
    console.log('✅ Server build complete');
    
    // Add module banner to support ESM imports
    console.log('📝 Adding ESM support...');
    const indexContent = await fs.readFile('dist/index.js', 'utf-8');
    const banner = `import { createRequire } from 'module';
const require = createRequire(import.meta.url);
`;
    await fs.writeFile('dist/index.js', banner + indexContent);
    
    // Create package.json for ESM
    await fs.writeFile('dist/package.json', JSON.stringify({ type: 'module' }, null, 2));
    
    // Verify critical files
    console.log('\n✅ Verifying build output...');
    const checks = [
      { file: 'dist/index.js', desc: 'Server entry point' },
      { file: 'dist/public/index.html', desc: 'Client entry point' },
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
    
    console.log('\n🎉 Build completed successfully!');
    console.log('📍 Server: dist/index.js');
    console.log('📍 Client: dist/public/index.html');
    console.log('\n💡 Deploy with:');
    console.log('   Start command: NODE_ENV=production node dist/index.js');
    
  } catch (error) {
    console.error('\n❌ Build failed:', error.message);
    process.exit(1);
  }
}

build();