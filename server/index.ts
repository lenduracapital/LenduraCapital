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

// Add compression middleware
import compression from "compression";
app.use(compression({
  level: 6,
  threshold: 1024
}));

// Enhanced security headers
import helmet from "helmet";
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'", "https://www.googletagmanager.com", "https://www.google-analytics.com"],
      frameSrc: ["'self'", "https://form.jotform.com"],
      connectSrc: ["'self'", "wss:", "ws:", "https:", "https://www.google-analytics.com"]
    }
  },
  strictTransportSecurity: {
    maxAge: 63072000,
    includeSubDomains: true,
    preload: true
  },
  contentTypeOptions: true,
  frameOptions: { action: 'sameorigin' },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}));

// Enhanced rate limiting
import rateLimit from "express-rate-limit";
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many form submissions, please try again later."
});

app.use('/api/contact', formLimiter);
app.use('/api/loan-applications', formLimiter);

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
