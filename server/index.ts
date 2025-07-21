import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";
// Swagger removed for lighter deployment

console.log("=== SERVER STARTUP DEBUG ===");
console.log("Current Working Directory:", process.cwd());
console.log("Script Location:", import.meta.url);
console.log("Node Version:", process.version);
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("__dirname equivalent:", path.dirname(new URL(import.meta.url).pathname));

const app = express();

// Configure trust proxy for rate limiting
app.set('trust proxy', 1);

// Add compression middleware
app.use(compression({
  level: 6,
  threshold: 1024
}));

// Environment-specific headers
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    // Production security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    
    // CORS for production domain
    const allowedOrigins = [
      'https://*.replit.app',
      'https://*.replit.dev', 
      process.env.PRODUCTION_DOMAIN
    ].filter(Boolean);
    
    const origin = req.headers.origin;
    if (origin && allowedOrigins.some(allowed => 
      allowed.includes('*') ? 
        origin.includes(allowed.replace('*', '')) : 
        origin === allowed
    )) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
  } else {
    // Development: permissive headers
    res.removeHeader('X-Frame-Options');
    res.removeHeader('Content-Security-Policy');
    res.removeHeader('X-Content-Type-Options');
    res.removeHeader('Cross-Origin-Embedder-Policy');
    res.removeHeader('Cross-Origin-Opener-Policy');
    
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
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
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Swagger API documentation removed for lighter deployment

(async () => {
  try {
    console.log(`🚀 Starting server in ${process.env.NODE_ENV || 'development'} mode...`);
    console.log(`📡 Port: ${process.env.PORT || (process.env.NODE_ENV === 'production' ? 3000 : 5000)}`);
    console.log(`🗄️ Database: ${process.env.DATABASE_URL ? 'Connected' : 'Missing DATABASE_URL'}`);
    
    // In development, set up Vite first
    let server: any;
    
    if (app.get("env") === "development") {
      server = await registerRoutes(app);
      await setupVite(app, server);
    } else {
      // Production: Set up proper routing for frontend + backend
      server = await registerRoutes(app);
      
      // Production static file serving
      console.log('📁 Setting up production static file serving...');
      const distPath = path.join(process.cwd(), 'dist', 'public');
      const serverPublicPath = path.join(process.cwd(), 'server', 'public');
      
      // Try to serve from dist/public first, fallback to server/public
      const staticPath = require('fs').existsSync(distPath) ? distPath : serverPublicPath;
      console.log(`📁 Serving static files from: ${staticPath}`);
      
      // Serve static assets with caching headers
      app.use(express.static(staticPath, {
        maxAge: '1y',
        etag: true,
        lastModified: true
      }));
      
      // SPA routing: serve index.html for non-API routes
      app.use('*', (req, res, next) => {
        // Don't serve index.html for API routes
        if (req.originalUrl.startsWith('/api/')) {
          return next();
        }
        
        // Serve index.html for all other routes (SPA routing)
        const indexPath = path.join(staticPath, 'index.html');
        if (require('fs').existsSync(indexPath)) {
          res.sendFile(indexPath);
        } else {
          res.status(404).json({ error: 'Frontend not built' });
        }
      });
    }

  // Setup error handlers AFTER static files
  app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal server error" });
  });

  const PORT = process.env.PORT || (process.env.NODE_ENV === 'production' ? 3000 : 5000);
  const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : '0.0.0.0';

  // Enhanced error handling for deployment
  const startServer = () => {
    return new Promise((resolve, reject) => {
      const serverInstance = server.listen(PORT, HOST, (err?: Error) => {
        if (err) {
          console.error(`❌ Failed to bind to ${HOST}:${PORT}`, err);
          reject(err);
          return;
        }
        
        log(`serving on port ${PORT}`);
        console.log(`✅ Server successfully started on ${HOST}:${PORT}`);
        console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
        resolve(serverInstance);
      });

      // Handle server errors after startup
      serverInstance.on('error', (err: Error) => {
        console.error('❌ Server error after startup:', err);
        if (err.message.includes('EADDRINUSE')) {
          console.error(`Port ${PORT} is already in use`);
        }
      });

      serverInstance.on('listening', () => {
        const addr = serverInstance.address();
        console.log('✅ Server address:', addr);
        console.log('✅ Server listening:', serverInstance.listening);
      });
    });
  };

  await startServer();

  } catch (error) {
    console.error('❌ Fatal server startup error:', error);
    process.exit(1);
  }
})();