import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";
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

// Add high-performance compression middleware
app.use(compression({
  level: 6,
  threshold: 1024,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

// Completely permissive headers for Jotform debugging
app.use((req, res, next) => {
  // Remove any restrictive headers
  res.removeHeader('X-Frame-Options');
  res.removeHeader('Content-Security-Policy');
  res.removeHeader('X-Content-Type-Options');
  res.removeHeader('Cross-Origin-Embedder-Policy');
  res.removeHeader('Cross-Origin-Opener-Policy');
  
  // Add permissive headers for Jotform
  res.setHeader('X-Frame-Options', 'ALLOWALL');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
  res.setHeader('Feature-Policy', 'fullscreen *; payment *');
  
  next();
});

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

// Serve attached assets directory
app.use('/attached_assets', express.static(path.join(process.cwd(), 'attached_assets')));

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
