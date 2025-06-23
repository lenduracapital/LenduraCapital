import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { 
  configureProductionSecurity,
  configureApiRateLimit,
  configureProductionErrorHandler,
  configureHealthMonitoring,
  configureRobotsTxt,
  addSecurityHeaders
} from "./production-security";

const app = express();

// Configure trust proxy for rate limiting
app.set('trust proxy', 1);

// Configure production-grade security
configureProductionSecurity(app);
addSecurityHeaders(app);

// Configure API rate limiting
configureApiRateLimit(app);

// Configure health monitoring
configureHealthMonitoring(app);

// Configure SEO robots.txt
configureRobotsTxt(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

(async () => {
  const server = await registerRoutes(app);

  // Configure production error handler
  configureProductionErrorHandler(app);

  // Add static file serving BEFORE Vite middleware
  app.use(express.static('public', {
    maxAge: '1d',
    setHeaders: (res, path) => {
      if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css; charset=utf-8');
      } else if (path.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      } else if (path.endsWith('.html')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
      } else if (path.endsWith('.mp4')) {
        res.setHeader('Content-Type', 'video/mp4');
      } else if (path.endsWith('.png') || path.endsWith('.jpg') || path.endsWith('.jpeg')) {
        res.setHeader('Content-Type', 'image/' + path.split('.').pop());
      }
    }
  }));
  app.use('/attached_assets', express.static('attached_assets', {
    maxAge: '7d',
    setHeaders: (res, path) => {
      if (path.endsWith('.mp4')) {
        res.setHeader('Content-Type', 'video/mp4');
      } else if (path.endsWith('.png')) {
        res.setHeader('Content-Type', 'image/png');
      } else if (path.endsWith('.jpg') || path.endsWith('.jpeg')) {
        res.setHeader('Content-Type', 'image/jpeg');
      }
    }
  }));

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen(port, "0.0.0.0", () => {
    log(`serving on port ${port}`);
    console.log(`Server running on port ${port}`);
  });
})();
