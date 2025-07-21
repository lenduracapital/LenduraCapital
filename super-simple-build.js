#!/usr/bin/env node
console.log('Creating ultra-simple deployment...');

import { writeFileSync, mkdirSync } from 'fs';

// Create dist directory
mkdirSync('dist', { recursive: true });
mkdirSync('dist/public', { recursive: true });

// Ultra-simple server
const serverCode = `
import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.get('/health', (req, res) => res.json({status:'ok'}));
app.get('*', (req, res) => res.sendFile(join(__dirname, 'public/index.html')));

app.listen(PORT, '0.0.0.0', () => console.log('Server on port', PORT));
`;

// Simple HTML page
const htmlCode = `<!DOCTYPE html>
<html><head><title>FundTek Capital</title></head>
<body><h1>FundTek Capital Group</h1><p>Server is working!</p></body></html>`;

// Write files
writeFileSync('dist/start.js', serverCode.trim());
writeFileSync('dist/public/index.html', htmlCode);
writeFileSync('dist/package.json', JSON.stringify({
  "type": "module",
  "main": "start.js", 
  "scripts": {"start": "node start.js"}
}, null, 2));

console.log('✅ Ultra-simple deployment ready');
console.log('Files: dist/start.js, dist/package.json, dist/public/index.html');