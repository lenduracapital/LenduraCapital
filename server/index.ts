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
  await registerRoutes(app);

  // Configure production error handler
  configureProductionErrorHandler(app);

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    const { createServer } = await import("http");
    const server = createServer(app);
    await setupVite(app, server);
    
    // ALWAYS serve the app on port 5000
    const port = parseInt(process.env.PORT || '5000');
    
    server.listen(port, '0.0.0.0', () => {
      log(`serving on port ${port}`);
      console.log(`✅ Server bound to all interfaces on port ${port}`);
      console.log(`✅ Replit Preview: https://${process.env.REPLIT_DEV_DOMAIN}`);
      
      // Force immediate binding verification
      setTimeout(() => {
        console.log(`✅ Server address: ${JSON.stringify(server.address())}`);
        console.log(`✅ Server listening: ${server.listening}`);
      }, 100);
    });
    
    server.on('connection', (socket) => {
      console.log(`🔗 New connection from: ${socket.remoteAddress}:${socket.remotePort}`);
    });
  } else {
    serveStatic(app);
    
    const port = parseInt(process.env.PORT || '5000');
    app.listen(port, '0.0.0.0', () => {
      log(`serving on 0.0.0.0:${port}`);
      console.log(`✅ Production server running on port ${port}`);
    });
  }
})();
