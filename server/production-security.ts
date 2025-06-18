import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import type { Express } from 'express';

// Production-grade security middleware
export function configureProductionSecurity(app: Express) {
  // Advanced security headers with Helmet
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: process.env.NODE_ENV === 'development' ? [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
          "https://cdn.jsdelivr.net"
        ] : [
          "'self'",
          "https://fonts.googleapis.com",
          "https://cdn.jsdelivr.net"
        ],
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com",
          "data:"
        ],
        scriptSrc: process.env.NODE_ENV === 'development' ? [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          "https://www.googletagmanager.com",
          "https://www.google-analytics.com",
          "https://connect.facebook.net",
          "https://form.jotform.com",
          "https://js.jotform.com"
        ] : [
          "'self'",
          "https://www.googletagmanager.com",
          "https://www.google-analytics.com",
          "https://connect.facebook.net",
          "https://form.jotform.com",
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
          "https://form.jotform.com"
        ],
        frameSrc: [
          "'self'",
          "https://form.jotform.com",
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
    frameguard: { action: 'deny' },
    xssFilter: true,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
  }));
}

// API rate limiting for DDoS protection
export function configureApiRateLimit(app: Express) {
  // General API rate limiting
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
      error: 'Too many requests from this IP, please try again later.',
      retryAfter: 15 * 60
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
      retryAfter: 60
    }
  });

  app.use('/api/', apiLimiter);
  app.use('/api/contact-submissions', formLimiter);
  app.use('/api/chat-submissions', formLimiter);
  app.use('/api/loan-applications', formLimiter);
}

// Production error handling
export function configureProductionErrorHandler(app: Express) {
  app.use((err: any, req: any, res: any, next: any) => {
    // Log error for monitoring (could integrate with external service)
    const errorLog = {
      timestamp: new Date().toISOString(),
      error: err.message,
      stack: err.stack,
      url: req.url,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    };

    // In production, log to external service (Sentry, LogRocket, etc.)
    if (process.env.NODE_ENV === 'production') {
      // External logging would go here
      console.error('Production Error:', JSON.stringify(errorLog));
    }

    // Send sanitized response
    if (process.env.NODE_ENV === 'production') {
      res.status(500).json({ 
        error: 'Internal server error',
        timestamp: new Date().toISOString(),
        requestId: req.id || Math.random().toString(36).substr(2, 9)
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

// Health monitoring endpoints
export function configureHealthMonitoring(app: Express) {
  // Basic health check
  app.get('/health', (req, res) => {
    const healthCheck = {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      environment: process.env.NODE_ENV || 'development'
    };
    
    res.status(200).json(healthCheck);
  });

  // Detailed system health
  app.get('/health/system', (req, res) => {
    const systemHealth = {
      status: 'OK',
      timestamp: new Date().toISOString(),
      system: {
        platform: process.platform,
        arch: process.arch,
        nodeVersion: process.version,
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        cpu: process.cpuUsage()
      },
      headers: {
        userAgent: req.get('User-Agent'),
        contentType: req.get('Content-Type'),
        host: req.get('Host')
      }
    };
    
    res.status(200).json(systemHealth);
  });
}

// Enhanced robots.txt for SEO
export function configureRobotsTxt(app: Express) {
  app.get('/robots.txt', (req, res) => {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://fundtekcapital.com' 
      : 'http://localhost:5000';

    const robotsTxt = `User-agent: *
Allow: /
Allow: /solutions/
Allow: /qualified-industries
Allow: /testimonials
Allow: /contact
Allow: /apply

Disallow: /api/
Disallow: /health/
Disallow: /*.json$
Disallow: /*?*

# Google-specific optimizations
User-agent: Googlebot
Allow: /
Crawl-delay: 1

# Bing optimization
User-agent: Bingbot
Allow: /
Crawl-delay: 2

Sitemap: ${baseUrl}/sitemap.xml`;

    res.setHeader('Content-Type', 'text/plain');
    res.send(robotsTxt);
  });
}

// Security headers middleware for enhanced protection
export function addSecurityHeaders(app: Express) {
  app.use((req, res, next) => {
    // Additional security headers not covered by Helmet
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(self)');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
    
    // Cache control for security
    if (req.path.startsWith('/api/')) {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }
    
    next();
  });
}