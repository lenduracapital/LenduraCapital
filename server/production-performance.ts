import { Express } from 'express';

// Production security headers - invisible optimization
export function configureProductionPerformance(app: Express) {
  // Security headers for production
  app.use((req, res, next) => {
    // HSTS (HTTP Strict Transport Security)
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    
    // XSS Protection
    res.setHeader('X-XSS-Protection', '1; mode=block');
    
    // Content Type Options
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // Frame Options
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    
    // Content Security Policy
    res.setHeader('Content-Security-Policy', `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://form.jotform.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://form.jotform.com;
      font-src 'self' https://fonts.gstatic.com;
      img-src 'self' data: https: blob:;
      media-src 'self' blob:;
      connect-src 'self' https://www.google-analytics.com https://form.jotform.com;
      frame-src https://form.jotform.com;
    `.replace(/\s+/g, ' ').trim());
    
    // Referrer Policy
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Permissions Policy
    res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
    
    next();
  });

  // Performance optimization headers
  app.use((req, res, next) => {
    // Early Hints for critical resources
    if (req.accepts('text/html')) {
      res.setHeader('Link', [
        '</js/analytics-client.js>; rel=preload; as=script',
        '</js/core-web-vitals.js>; rel=preload; as=script',
        '<https://fonts.gstatic.com>; rel=preconnect; crossorigin'
      ].join(', '));
    }
    
    next();
  });
}

// Weekly database vacuum scheduler
export function scheduleMaintenanceTasks() {
  const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;
  
  setInterval(async () => {
    try {
      const { vacuumDatabase } = await import('./performance-monitoring');
      await vacuumDatabase();
      console.log('Weekly database maintenance completed');
    } catch (error) {
      console.error('Database maintenance failed:', error);
    }
  }, WEEK_IN_MS);
}