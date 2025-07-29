import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import helmet from "helmet";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { config, getDeploymentInfo } from "./config";
import { 
  environmentMiddleware, 
  createHealthCheckHandler, 
  createEnvValidationHandler,
  requestLoggingMiddleware 
} from "./middleware/environment";
import path from "path";

console.log("=== FUNDTEK CAPITAL GROUP - SERVER STARTUP ===");
console.log("📍 Current Working Directory:", process.cwd());
console.log("📄 Script Location:", import.meta.url);
console.log("🟢 Node Version:", process.version);
console.log("🌍 Environment:", config.NODE_ENV);
console.log("🌐 Port:", config.PORT);
console.log("🗄️  Database:", config.DATABASE_URL ? 'Connected' : 'Missing DATABASE_URL');

const deployment = getDeploymentInfo();
console.log("🚀 Deployment Platform:", deployment.name);
if (deployment.url !== 'localhost') {
  console.log("🌐 Platform URL:", deployment.url);
}

const app = express();

// Configure trust proxy for Replit deployment (CRITICAL for 500 error fix)
app.set('trust proxy', true);

// Add environment context to all requests
app.use(environmentMiddleware);

// Add request logging (respects LOG_LEVEL and DEBUG_REQUESTS)
app.use(requestLoggingMiddleware);

// Enhanced compression middleware for better performance
app.use(compression({
  level: 9, // Maximum compression
  threshold: 512, // Compress smaller files too
  filter: (req, res) => {
    // Don't compress images or videos
    const contentType = res.getHeader('content-type') as string;
    if (contentType?.startsWith('image/') || 
        contentType?.startsWith('video/')) {
      return false;
    }
    // Default compression filter for other content
    return true;
  }
}));

// Apply security headers with helmet
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://fonts.gstatic.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com", "https://www.google-analytics.com"],
      connectSrc: ["'self'", "https://www.google-analytics.com"],
      mediaSrc: ["'self'", "data:", "blob:"],
    },
  },
}));

// Environment-specific headers with enhanced error handling
app.use((req, res, next) => {
  try {
    const isProduction = config.NODE_ENV === 'production';
    
    if (isProduction) {
      // Production security headers
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'DENY');
      res.setHeader('X-XSS-Protection', '1; mode=block');
      res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
      
      // Simple CORS for production - allow all origins for deployment platform
      res.setHeader('Access-Control-Allow-Origin', '*');
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
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
  } catch (error) {
    console.error('❌ Header middleware error:', error);
    // Continue with basic headers
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  next();
});

// Enhanced health check endpoints with comprehensive environment info
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/health', createHealthCheckHandler());

// Environment validation endpoint for debugging deployment issues
app.get('/api/env-status', createEnvValidationHandler());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enhanced static file serving with aggressive caching
app.use('/attached_assets', express.static(path.join(process.cwd(), 'attached_assets'), {
  maxAge: '1y', // Cache for 1 year
  etag: true,
  lastModified: true,
  immutable: true, // Files never change
  setHeaders: (res, path) => {
    // Different cache strategies by file type
    if (path.endsWith('.jpg') || path.endsWith('.jpeg') || path.endsWith('.png') || path.endsWith('.webp')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // 1 year for images
    } else if (path.endsWith('.webm') || path.endsWith('.mp4')) {
      res.setHeader('Cache-Control', 'public, max-age=2592000'); // 30 days for videos
    } else if (path.endsWith('.js') || path.endsWith('.css')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // 1 year for JS/CSS
    }
  }
}));

// Enhanced request logging is now handled by requestLoggingMiddleware

// Swagger API documentation removed for lighter deployment

(async () => {
  try {
    const isProduction = config.NODE_ENV === 'production';
    const PORT = config.PORT;
    const HOST = config.HOST;

    console.log(`🚀 Starting server in ${isProduction ? 'production' : 'development'} mode...`);
    console.log(`📡 Port: ${PORT} (from ${process.env.PORT ? 'environment' : 'default'})`);
    console.log(`🌐 Host: ${HOST}`);
    
    // In development, set up Vite first
    let server: any;
    
    if (!isProduction) {
      server = await registerRoutes(app);
      await setupVite(app, server);
    } else {
      // Production: Set up proper routing for frontend + backend
      server = await registerRoutes(app);
      
      // Production static file serving
      console.log('📁 Setting up production static file serving...');
      
      // Check if we're running from the dist directory (deployment) or project root
      const isRunningFromDist = process.cwd().endsWith('/dist');
      const publicPath = isRunningFromDist 
        ? path.join(process.cwd(), 'public')  // dist/public when running from dist/
        : path.join(process.cwd(), 'dist', 'public');  // dist/public when running from project root
      
      const serverPublicPath = path.join(process.cwd(), 'server', 'public');
      
      // Try to serve from the correct public path first, fallback to server/public
      const staticPath = require('fs').existsSync(publicPath) ? publicPath : serverPublicPath;
      console.log(`📁 Serving static files from: ${staticPath}`);
      
      // Serve static assets with optimized caching headers
      app.use(express.static(staticPath, {
        maxAge: '1y',
        etag: true,
        lastModified: true,
        immutable: true,
        setHeaders: (res, filePath) => {
          // Optimize cache headers based on file type
          if (filePath.endsWith('.js') || filePath.endsWith('.css')) {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          } else if (filePath.endsWith('.jpg') || filePath.endsWith('.png') || filePath.endsWith('.webp') || filePath.endsWith('.jpeg')) {
            res.setHeader('Cache-Control', 'public, max-age=31536000');
          } else if (filePath.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache, must-revalidate');
          }
        }
      }));
      
      // SPA routing: serve index.html for non-API routes
      app.use('*', (req, res, next) => {
        try {
          // Don't serve index.html for API routes
          if (req.originalUrl.startsWith('/api/')) {
            return next();
          }
          
          // Serve index.html for all other routes (SPA routing)
          const indexPath = path.join(staticPath, 'index.html');
          if (require('fs').existsSync(indexPath)) {
            console.log(`📄 Serving SPA route: ${req.originalUrl} -> ${indexPath}`);
            res.sendFile(indexPath);
          } else {
            console.error(`❌ Frontend index.html not found at: ${indexPath}`);
            res.status(404).json({ error: 'Frontend not built' });
          }
        } catch (error) {
          console.error('❌ SPA routing error:', error);
          res.status(500).json({ error: 'SPA routing failed' });
        }
      });
    }

  // Setup error handlers AFTER static files
  app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('❌ Request error:', {
      path: req.path,
      method: req.method,
      error: err.message,
      stack: err.stack
    });
    res.status(500).json({ 
      error: "Internal server error", 
      details: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  });



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