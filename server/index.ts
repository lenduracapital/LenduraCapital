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

// Skip all security middleware in development
if (app.get("env") !== "development") {
  // Configure production-grade security
  configureProductionSecurity(app);
  addSecurityHeaders(app);

  // Configure API rate limiting
  configureApiRateLimit(app);
}

// Configure health monitoring
configureHealthMonitoring(app);

// Configure SEO robots.txt
configureRobotsTxt(app);

// Add CORS headers and fix Replit preview connectivity
if (app.get("env") === "development") {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    res.removeHeader("X-Frame-Options");
    res.removeHeader("Cross-Origin-Embedder-Policy");
    res.removeHeader("Cross-Origin-Resource-Policy");
    res.removeHeader("Cross-Origin-Opener-Policy");
    if (req.method === "OPTIONS") {
      res.sendStatus(200);
    } else {
      next();
    }
  });
}

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
  const host = "0.0.0.0";
  
  server.listen(port, host, () => {
    log(`serving on ${host}:${port}`);
    console.log(`Server accessible at:`);
    console.log(`  Local: http://localhost:${port}`);
    console.log(`  Network: http://${host}:${port}`);
    console.log(`  Replit: https://${process.env.REPLIT_DEV_DOMAIN || 'preview-url'}`);
  });
  
  server.on('error', (err: any) => {
    console.error('Server error:', err);
  });
})();
