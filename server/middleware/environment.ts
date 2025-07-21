import { Request, Response, NextFunction } from 'express';
import { config, getDeploymentInfo } from '../config';

// =============================================================================
// ENVIRONMENT MIDDLEWARE FOR REQUEST CONTEXT
// =============================================================================

export function environmentMiddleware(req: Request, res: Response, next: NextFunction) {
  // Add environment information to request object
  (req as any).env = {
    ...config,
    deployment: getDeploymentInfo(),
    isProduction: config.NODE_ENV === 'production',
    isDevelopment: config.NODE_ENV === 'development',
    isTest: config.NODE_ENV === 'test',
  };
  
  next();
}

// =============================================================================
// HEALTH CHECK WITH ENVIRONMENT INFO
// =============================================================================

export function createHealthCheckHandler() {
  return (req: Request, res: Response) => {
    try {
      const deployment = getDeploymentInfo();
      
      const healthInfo = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: config.NODE_ENV,
        port: config.PORT,
        host: config.HOST,
        deployment: {
          platform: deployment.name,
          url: deployment.url,
        },
        database: {
          connected: !!config.DATABASE_URL,
          url: config.DATABASE_URL ? '[CONNECTED]' : '[MISSING]',
        },
        services: {
          smtp: !!config.SMTP_HOST,
          stripe: !!config.STRIPE_SECRET_KEY,
          analytics: !!config.GOOGLE_ANALYTICS_ID,
          monitoring: !!config.SENTRY_DSN,
        },
        security: {
          sessionSecret: !!config.SESSION_SECRET,
          jwtSecret: !!config.JWT_SECRET,
          corsOrigins: config.CORS_ORIGINS ? config.CORS_ORIGINS.split(',').length : 0,
        },
        rateLimit: {
          windowMs: config.RATE_LIMIT_WINDOW_MS,
          maxRequests: config.RATE_LIMIT_MAX_REQUESTS,
        },
        logging: {
          level: config.LOG_LEVEL,
          debugRequests: config.DEBUG_REQUESTS,
        },
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        version: process.version,
      };
      
      res.json(healthInfo);
    } catch (error) {
      console.error('Health check error:', error);
      res.status(500).json({
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      });
    }
  };
}

// =============================================================================
// ENVIRONMENT VALIDATION ENDPOINT
// =============================================================================

export function createEnvValidationHandler() {
  return (req: Request, res: Response) => {
    try {
      const deployment = getDeploymentInfo();
      
      const validation = {
        status: 'valid',
        environment: config.NODE_ENV,
        deployment: deployment.name,
        checks: {
          database: {
            configured: !!config.DATABASE_URL,
            status: config.DATABASE_URL ? 'connected' : 'missing',
            message: config.DATABASE_URL ? 'Database URL is configured' : 'DATABASE_URL environment variable is required',
          },
          server: {
            port: config.PORT,
            host: config.HOST,
            status: 'configured',
          },
          security: {
            sessionSecret: !!config.SESSION_SECRET,
            jwtSecret: !!config.JWT_SECRET,
            status: config.SESSION_SECRET ? 'configured' : 'using default',
            message: config.SESSION_SECRET ? 'Security secrets are configured' : 'Consider setting SESSION_SECRET for production',
          },
          services: {
            smtp: config.SMTP_HOST ? 'configured' : 'not configured',
            payment: config.STRIPE_SECRET_KEY ? 'configured' : 'not configured',
            analytics: config.GOOGLE_ANALYTICS_ID ? 'configured' : 'not configured',
            monitoring: config.SENTRY_DSN ? 'configured' : 'not configured',
          },
        },
        recommendations: [],
      };
      
      // Add recommendations based on environment
      const recommendations: string[] = [];
      
      if (!config.SESSION_SECRET) {
        recommendations.push('Set SESSION_SECRET environment variable for production security');
      }
      
      if (config.NODE_ENV === 'production' && !config.SENTRY_DSN) {
        recommendations.push('Consider setting SENTRY_DSN for production error monitoring');
      }
      
      if (config.NODE_ENV === 'production' && !config.SMTP_HOST) {
        recommendations.push('Configure SMTP settings for email functionality');
      }
      
      validation.recommendations = recommendations;
      
      res.json(validation);
    } catch (error) {
      console.error('Environment validation error:', error);
      res.status(500).json({
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };
}

// =============================================================================
// REQUEST LOGGING MIDDLEWARE
// =============================================================================

export function requestLoggingMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!config.DEBUG_REQUESTS && config.NODE_ENV === 'production') {
    return next();
  }
  
  const start = Date.now();
  const { method, path, ip } = req;
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    
    const logLevel = statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info';
    
    const logMessage = `${method} ${path} ${statusCode} ${duration}ms - ${ip}`;
    
    if (logLevel === 'error') {
      console.error(`❌ ${logMessage}`);
    } else if (logLevel === 'warn') {
      console.warn(`⚠️  ${logMessage}`);
    } else if (config.LOG_LEVEL === 'debug' || config.DEBUG_REQUESTS) {
      console.log(`📝 ${logMessage}`);
    }
  });
  
  next();
}