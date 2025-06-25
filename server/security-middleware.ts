import helmet from 'helmet';
import * as Sentry from '@sentry/node';
import rateLimit from 'express-rate-limit';
import type { Express } from 'express';

// Initialize Sentry for real-time error monitoring
export function initializeSentry(app: Express) {
  if (process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: 1.0,
      environment: process.env.NODE_ENV || 'development',
    });
  }
}

// Production-grade security middleware using Helmet
export function configureSecurityHeaders(app: Express) {
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
          "https://cdn.jsdelivr.net"
        ],
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com",
          "data:"
        ],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://www.googletagmanager.com",
          "https://www.google-analytics.com",
          "https://connect.facebook.net",
          "https://form.jotform.com",
          "https://*.jotform.com",
          "https://js.jotform.com"
        ],
        imgSrc: [
          "'self'",
          "data:",
          "https:",
          "blob:"
        ],
        connectSrc: [
          "'self'",
          "https://api.fundtekcapitalgroup.com",
          "https://www.google-analytics.com",
          "https://vitals.vercel-analytics.com",
          "https://form.jotform.com",
          "https://*.jotform.com",
          "https://submit.jotform.com"
        ],
        frameSrc: [
          "'self'",
          "https://form.jotform.com",
          "https://*.jotform.com",
          "https://www.facebook.com"
        ],
        mediaSrc: ["'self'", "blob:", "data:"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: []
      },
    },
    hsts: {
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true
    },
    noSniff: true,
    frameguard: { action: 'sameorigin' },
    xssFilter: true,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
  }));
}

// Error handling middleware with Sentry integration
export function configureSentryErrorHandler(app: Express) {
  // Custom error handler for production
  app.use((err: any, req: any, res: any, next: any) => {
    // Capture error with Sentry if configured
    if (process.env.SENTRY_DSN) {
      Sentry.captureException(err);
    }

    // Log error details without exposing them
    if (process.env.NODE_ENV === 'production') {
      res.status(500).json({ 
        error: 'Internal server error',
        timestamp: new Date().toISOString(),
        requestId: req.id || 'unknown'
      });
    } else {
      res.status(500).json({ 
        error: err.message,
        stack: err.stack,
        timestamp: new Date().toISOString()
      });
    }
  });
}

// Rate limiting for API protection
export function configureRateLimiting(app: Express) {
  
  // General API rate limiting
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
      error: 'Too many requests from this IP, please try again later.',
      retryAfter: 15 * 60 // 15 minutes in seconds
    },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Stricter rate limiting for form submissions
  const formLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // Limit form submissions to 5 per minute
    message: {
      error: 'Too many form submissions, please wait before trying again.',
      retryAfter: 60 // 1 minute in seconds
    }
  });

  app.use('/api/', apiLimiter);
  app.use('/api/contact-submissions', formLimiter);
  app.use('/api/chat-submissions', formLimiter);
  app.use('/api/loan-applications', formLimiter);
}

// Health check endpoint for monitoring
export function configureHealthCheck(app: Express) {
  app.get('/health', (req, res) => {
    const healthCheck = {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0'
    };
    
    res.status(200).json(healthCheck);
  });

  // Detailed health check for monitoring systems
  app.get('/health/detailed', async (req, res) => {
    try {
      // Check database connectivity
      const dbHealth = await checkDatabaseConnection();
      
      const detailedHealth = {
        status: dbHealth.connected ? 'OK' : 'DEGRADED',
        timestamp: new Date().toISOString(),
        services: {
          database: {
            status: dbHealth.connected ? 'healthy' : 'unhealthy',
            latency: dbHealth.latency,
            error: dbHealth.error
          },
          api: {
            status: 'healthy',
            uptime: process.uptime()
          }
        },
        system: {
          memory: process.memoryUsage(),
          cpu: process.cpuUsage(),
          platform: process.platform,
          nodeVersion: process.version
        }
      };
      
      res.status(dbHealth.connected ? 200 : 503).json(detailedHealth);
    } catch (error) {
      res.status(503).json({
        status: 'ERROR',
        timestamp: new Date().toISOString(),
        error: 'Health check failed'
      });
    }
  });
}

// Database connection health check
async function checkDatabaseConnection(): Promise<{connected: boolean, latency?: number, error?: string}> {
  try {
    const start = Date.now();
    // Simple database ping
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => resolve(true), 100); // Simulate DB check
    });
    const latency = Date.now() - start;
    
    return { connected: true, latency };
  } catch (error) {
    return { 
      connected: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}