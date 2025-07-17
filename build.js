#!/usr/bin/env node
import { build } from 'esbuild';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function buildProject() {
  console.log('🏗️  Starting build process...');
  
  try {
    // Build frontend with Vite
    console.log('📦 Building frontend with Vite...');
    await execAsync('vite build');
    console.log('✅ Frontend build complete');
    
    // Build backend with esbuild
    console.log('📦 Building backend with esbuild...');
    await build({
      entryPoints: ['server/index.ts'],
      bundle: true,
      platform: 'node',
      format: 'esm',
      packages: 'external',
      outfile: 'dist/index.js',
      minify: true,
      sourcemap: true,
      alias: {
        '@shared': './shared',
        '@': './client/src'
      }
    });
    
    console.log('✅ Backend build complete');
    console.log('✅ Build successful! Output: dist/index.js');
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

buildProject();