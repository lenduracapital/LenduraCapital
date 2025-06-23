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

// Only apply production security in production environment
if (app.get("env") === "production") {
  configureProductionSecurity(app);
}

// Always apply security headers function (handles dev/prod internally)
addSecurityHeaders(app);

// Skip rate limiting in development to avoid connection issues
if (app.get("env") === "production") {
  configureApiRateLimit(app);
}

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
  const port = parseInt(process.env.PORT || '5000');
  const host = process.env.HOST || "0.0.0.0";
  
  // Force IPv4 binding for Replit compatibility
  server.listen(port, host, () => {
    log(`serving on ${host}:${port}`);
    console.log(`✅ Server successfully bound to ${host}:${port}`);
    console.log(`✅ Process ID: ${process.pid}`);
    console.log(`✅ Environment: ${process.env.NODE_ENV}`);
    console.log(`✅ Replit Preview: https://${process.env.REPLIT_DEV_DOMAIN}`);
    console.log(`✅ Server ready for external connections`);
  });
  
  server.on('error', (err: any) => {
    console.error('❌ Server binding failed:', err);
    if (err.code === 'EADDRINUSE') {
      console.error(`❌ Port ${port} already in use`);
    } else if (err.code === 'EACCES') {
      console.error(`❌ Permission denied for port ${port}`);
    }
    process.exit(1);
  });
  
  server.on('listening', () => {
    const addr = server.address();
    console.log(`✅ Server listening on:`, addr);
  });
})();
