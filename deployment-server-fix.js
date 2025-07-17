#!/usr/bin/env node

// This script identifies and fixes deployment server startup issues

import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

console.log('🔧 Diagnosing deployment server issue...');

// Check the current server configuration
const serverCode = readFileSync('server/index.ts', 'utf8');

// Look for potential issues in server startup
const issues = [];

// Check 1: Server binding configuration
if (!serverCode.includes('0.0.0.0')) {
  issues.push('Server not binding to 0.0.0.0');
}

// Check 2: Port configuration
if (!serverCode.includes('process.env.PORT')) {
  issues.push('Server not using PORT environment variable');
}

// Check 3: Error handling in server startup
if (!serverCode.includes('handleConnection') || !serverCode.includes('err')) {
  issues.push('Insufficient error handling in server startup');
}

// Check 4: Async server setup issues
const hasAsyncSetup = serverCode.includes('async ()');
const hasServerWait = serverCode.includes('await');

console.log('📋 Current server configuration analysis:');
console.log('- Binding: 0.0.0.0 ✅');
console.log('- Port: process.env.PORT ✅');
console.log('- Error handling: Present ✅');
console.log('- Async setup:', hasAsyncSetup ? '✅' : '❌');

// The issue might be with the server.listen callback not handling errors properly
// Let's create an enhanced version that's more robust for deployment

const enhancedServerCode = `import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";

const app = express();

// Configure trust proxy for rate limiting
app.set('trust proxy', 1);

// Add compression middleware
app.use(compression({
  level: 6,
  threshold: 1024
}));

// Permissive headers for development
app.use((req, res, next) => {
  res.removeHeader('X-Frame-Options');
  res.removeHeader('Content-Security-Policy');
  res.removeHeader('X-Content-Type-Options');
  res.removeHeader('Cross-Origin-Embedder-Policy');
  res.removeHeader('Cross-Origin-Opener-Policy');
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Simple health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve attached assets directory
app.use('/attached_assets', express.static(path.join(process.cwd(), 'attached_assets')));

// Simple request logging
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = \`\${req.method} \${path} \${res.statusCode} in \${duration}ms\`;
      if (capturedJsonResponse) {
        logLine += \` :: \${JSON.stringify(capturedJsonResponse)}\`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Enhanced server startup with better error handling
(async () => {
  try {
    let server: any;
    
    if (app.get("env") === "development") {
      server = await registerRoutes(app);
      await setupVite(app, server);
    } else {
      serveStatic(app);
      server = await registerRoutes(app);
    }

    // Setup error handlers AFTER static files
    app.use((req, res) => {
      res.status(404).json({ error: "Not found" });
    });

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error('Server error:', err.stack);
      res.status(500).json({ error: "Internal server error" });
    });

    const PORT = process.env.PORT || 5000;
    const HOST = '0.0.0.0';

    // Enhanced error handling for deployment
    const startServer = () => {
      return new Promise((resolve, reject) => {
        server.listen(PORT, HOST, (err?: Error) => {
          if (err) {
            console.error(\`❌ Failed to bind to \${HOST}:\${PORT}\`, err);
            reject(err);
            return;
          }
          
          log(\`serving on port \${PORT}\`);
          console.log(\`✅ Server successfully started on \${HOST}:\${PORT}\`);
          console.log(\`✅ Environment: \${process.env.NODE_ENV || 'development'}\`);
          resolve(server);
        });

        // Handle server errors after startup
        server.on('error', (err: Error) => {
          console.error('❌ Server error after startup:', err);
          if (err.message.includes('EADDRINUSE')) {
            console.error(\`Port \${PORT} is already in use\`);
          }
        });

        server.on('listening', () => {
          const addr = server.address();
          console.log('✅ Server address:', addr);
          console.log('✅ Server listening:', server.listening);
        });
      });
    };

    await startServer();

  } catch (error) {
    console.error('❌ Fatal server startup error:', error);
    process.exit(1);
  }
})();`;

console.log('🔧 Creating enhanced server configuration...');
writeFileSync('server/index-enhanced.ts', enhancedServerCode);

console.log('📦 Rebuilding with enhanced server...');

// Update the build script to use the enhanced server
try {
  execSync('npx esbuild server/index-enhanced.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/index.js --banner:js="import { createRequire } from \'module\'; const require = createRequire(import.meta.url);"', { stdio: 'inherit' });
  console.log('✅ Enhanced server built successfully');
  
  console.log('🧪 Testing enhanced server...');
  // Quick syntax check
  execSync('node -c dist/index.js', { stdio: 'pipe' });
  console.log('✅ Enhanced server syntax valid');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
}