import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

async function build() {
  console.log('🚀 Starting deployment build...');
  
  try {
    // Clean dist directory
    console.log('📦 Cleaning dist directory...');
    await fs.rm('dist', { recursive: true, force: true });
    await fs.mkdir('dist', { recursive: true });
    
    // Build client
    console.log('🎨 Building client...');
    const { stdout: clientStdout, stderr: clientStderr } = await execAsync('cd client && npm run build');
    if (clientStderr) console.error('Client build warnings:', clientStderr);
    
    // Copy client build to dist root
    console.log('📂 Copying client build to dist...');
    await fs.cp('client/dist', 'dist', { recursive: true });
    
    // Build server
    console.log('🔧 Building server...');
    const { stdout: serverStdout, stderr: serverStderr } = await execAsync(
      'esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/index.js'
    );
    if (serverStderr) console.error('Server build warnings:', serverStderr);
    
    // Create package.json for ESM
    console.log('📝 Creating dist/package.json...');
    await fs.writeFile('dist/package.json', JSON.stringify({ type: 'module' }, null, 2));
    
    // Verify build
    console.log('✅ Verifying build output...');
    const indexHtmlExists = await fs.access('dist/index.html').then(() => true).catch(() => false);
    const indexJsExists = await fs.access('dist/index.js').then(() => true).catch(() => false);
    
    if (!indexHtmlExists) {
      throw new Error('dist/index.html not found!');
    }
    if (!indexJsExists) {
      throw new Error('dist/index.js not found!');
    }
    
    // List dist contents
    const files = await fs.readdir('dist');
    console.log('\n📁 Dist contents:');
    for (const file of files) {
      const stats = await fs.stat(path.join('dist', file));
      const size = stats.isDirectory() ? '[DIR]' : `${(stats.size / 1024).toFixed(2)} KB`;
      console.log(`  - ${file} ${size}`);
    }
    
    console.log('\n✅ Build completed successfully!');
    console.log('📍 dist/index.html - Client entry point');
    console.log('📍 dist/index.js - Server entry point');
    
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

build();