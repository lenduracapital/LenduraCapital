import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";
import { setupSwagger } from "./swagger/api-docs";

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

// Set up Swagger API documentation
setupSwagger(app);

(async () => {
  // In development, set up Vite first
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
    console.error(err.stack);
    res.status(500).json({ error: "Internal server error" });
  });

  const PORT = process.env.PORT || 5000;
  const HOST = '0.0.0.0';

  const handleConnection = (err?: Error) => {
    if (err) {
      console.error(`Failed to bind to ${HOST}:${PORT}`, err);
      process.exit(1);
    }
    log(`serving on port ${PORT}`);
    
    server.on('listening', () => {
      const addr = server.address();
      console.log('✅ Server address:', addr);
      console.log('✅ Server listening:', server.listening);
    });
  };

  server.listen(PORT, HOST, handleConnection);
})();