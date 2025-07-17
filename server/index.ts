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

// Updated: July 16, 2025 - Deployment fixes applied

// Global error handlers to prevent crashes
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  // Don't exit the process, try to recover
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't exit the process, try to recover
});

// Import enterprise-level middleware and monitoring
import { globalErrorHandler, notFoundHandler, requestIdMiddleware } from "./middleware/error-handler";
import { performanceMonitoringMiddleware, rateLimitMonitoringMiddleware, securityMonitoringMiddleware, slowOperationMiddleware, getHealthStatus, getPerformanceMetrics } from "./middleware/monitoring";
import { apmCollector, getDetailedHealth } from "./monitoring/metrics-collector";
import { setupSwagger } from "./swagger/api-docs";
import { soc2Monitor } from "./compliance/soc2-framework";
import { createMigrationManager } from "./data-management/migrations";

// Import API v1 routes
import apiV1Routes from "./api/v1/routes";
import { applyStabilityImprovements } from "./stability-improvements";

const app = express();

// Configure trust proxy for rate limiting
app.set('trust proxy', 1);

// Add request ID middleware for tracing
app.use(requestIdMiddleware);

// Add enterprise monitoring middleware
app.use(performanceMonitoringMiddleware);
app.use(rateLimitMonitoringMiddleware);
app.use(securityMonitoringMiddleware);
app.use(slowOperationMiddleware(2000)); // Alert on operations > 2s
app.use(apmCollector.requestMetricsMiddleware());

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

// Enhanced health endpoints
app.get('/api/health', async (req, res) => {
  try {
    const health = await getHealthStatus();
    const status = health.status === 'healthy' ? 200 : 
                  health.status === 'degraded' ? 200 : 503;
    res.status(status).json(health);
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date(),
      error: 'Health check failed'
    });
  }
});

app.get('/api/health/detailed', async (req, res) => {
  try {
    const health = await getDetailedHealth();
    res.json(health);
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: 'Detailed health check failed'
    });
  }
});

// Metrics endpoint (Prometheus format)
app.get('/api/metrics', (req, res) => {
  res.setHeader('Content-Type', 'text/plain; version=0.0.4; charset=utf-8');
  res.send(apmCollector.getPrometheusMetrics());
});

// Performance metrics endpoint (JSON)
app.get('/api/metrics/performance', (req, res) => {
  res.json(getPerformanceMetrics());
});

// SOC 2 compliance endpoint
app.get('/api/compliance/soc2', async (req, res) => {
  try {
    const status = soc2Monitor.getComplianceStatus();
    res.json(status);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Compliance check failed'
    });
  }
});

app.get('/api/compliance/soc2/report', async (req, res) => {
  try {
    const report = soc2Monitor.generateComplianceReport();
    res.json(report);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Compliance report generation failed'
    });
  }
});

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
  // Initialize database migrations
  try {
    const migrationManager = createMigrationManager();
    await migrationManager.initialize();
    
    const migrationStatus = await migrationManager.getStatus();
    log(`📊 Database migrations: ${migrationStatus.executed}/${migrationStatus.total} executed`);
    
    if (migrationStatus.pending > 0) {
      log(`🚀 Running ${migrationStatus.pending} pending migrations...`);
      const result = await migrationManager.runPendingMigrations();
      
      if (result.success) {
        log(`✅ Successfully ran ${result.migrationsRun.length} migrations`);
      } else {
        log(`❌ Migration errors: ${result.errors.join(', ')}`);
      }
    }
    
    await migrationManager.close();
  } catch (error) {
    log(`⚠️ Migration system error: ${error}`);
  }

  // Run initial SOC 2 compliance check
  try {
    const passedTests = await soc2Monitor.runAutomatedTests();
    log(`🔒 SOC 2 compliance: ${passedTests} automated controls passed`);
  } catch (error) {
    log(`⚠️ SOC 2 compliance check error: ${error}`);
  }

  // Setup API documentation
  setupSwagger(app);

  // API v1 routes with enterprise features
  app.use('/api/v1', apiV1Routes);

  await registerRoutes(app);

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    const { createServer } = await import("http");
    const server = createServer(app);
    
    // Apply stability improvements to the server instance
    applyStabilityImprovements(app, server);
    
    // Add connection limits and timeout handling
    server.maxConnections = 1000;
    server.timeout = 120000; // 2 minutes
    server.keepAliveTimeout = 65000;
    server.headersTimeout = 70000;
    
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
    
    // Add error handling
    server.on('error', (error) => {
      console.error('❌ Server error:', error);
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use`);
        process.exit(1);
      }
    });
    
    // Handle server shutdown gracefully
    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully...');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });
    
    // Remove verbose connection logging to prevent log flooding
    // server.on('connection', (socket) => {
    //   console.log(`🔗 New connection from: ${socket.remoteAddress}:${socket.remotePort}`);
    // });
    
    // Add 404 handler and error handler AFTER vite setup in development
    app.use(notFoundHandler);
    app.use(globalErrorHandler);
  } else {
    serveStatic(app);
    
    // Add 404 handler and error handler AFTER static serve in production
    app.use(notFoundHandler);
    app.use(globalErrorHandler);
    
    const port = parseInt(process.env.PORT || '5000');
    app.listen(port, '0.0.0.0', () => {
      log(`serving on 0.0.0.0:${port}`);
      console.log(`✅ Production server running on port ${port}`);
    });
  }
})();
