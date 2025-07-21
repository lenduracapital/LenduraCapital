import rateLimit from 'express-rate-limit';
import { config } from '../config';

// =============================================================================
// INTELLIGENT RATE LIMITING BASED ON ENVIRONMENT
// =============================================================================

export const createRateLimiter = () => {
  const isProduction = config.NODE_ENV === 'production';
  
  return rateLimit({
    windowMs: config.RATE_LIMIT_WINDOW_MS, // 15 minutes default
    max: config.RATE_LIMIT_MAX_REQUESTS, // 100 requests per window default
    message: {
      error: 'Too many requests from this IP',
      resetTime: new Date(Date.now() + config.RATE_LIMIT_WINDOW_MS).toISOString()
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    skip: (req) => {
      // Skip rate limiting for health checks
      if (req.path === '/health' || req.path === '/api/health') {
        return true;
      }
      
      // More lenient in development
      if (!isProduction && req.ip === '127.0.0.1') {
        return true;
      }
      
      return false;
    },
    handler: (req, res) => {
      console.warn(`⚠️ Rate limit exceeded for IP: ${req.ip} on ${req.path}`);
      res.status(429).json({
        error: 'Too many requests from this IP',
        resetTime: new Date(Date.now() + config.RATE_LIMIT_WINDOW_MS).toISOString()
      });
    }
  });
};

// API-specific rate limiter
export const createAPIRateLimiter = () => {
  const isProduction = config.NODE_ENV === 'production';
  
  return rateLimit({
    windowMs: 60 * 1000, // 1 minute for API calls
    max: isProduction ? 30 : 100, // Stricter for API in production
    message: {
      error: 'API rate limit exceeded',
      resetTime: new Date(Date.now() + 60 * 1000).toISOString()
    },
    skip: (req) => {
      // Skip for health checks
      if (req.path.includes('/health')) {
        return true;
      }
      return false;
    }
  });
};