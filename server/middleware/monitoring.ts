import { Request, Response, NextFunction } from 'express';
import { auditLogger } from '../audit-logger';

// Performance monitoring metrics
interface PerformanceMetrics {
  requestCount: number;
  responseTimeTotal: number;
  errorCount: number;
  statusCodes: Record<number, number>;
  endpoints: Record<string, {
    count: number;
    totalTime: number;
    averageTime: number;
    errorCount: number;
  }>;
  lastReset: Date;
}

// In-memory metrics storage (in production, use Redis)
let metrics: PerformanceMetrics = {
  requestCount: 0,
  responseTimeTotal: 0,
  errorCount: 0,
  statusCodes: {},
  endpoints: {},
  lastReset: new Date()
};

// Health check status
interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: Date;
  uptime: number;
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  database: {
    status: 'connected' | 'disconnected';
    latency?: number;
  };
  errors: string[];
}

// Monitor request performance
export const performanceMonitoringMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  const endpoint = `${req.method} ${req.route?.path || req.path}`;
  
  // Increment request counter
  metrics.requestCount++;
  
  // Track endpoint-specific metrics
  if (!metrics.endpoints[endpoint]) {
    metrics.endpoints[endpoint] = {
      count: 0,
      totalTime: 0,
      averageTime: 0,
      errorCount: 0
    };
  }
  metrics.endpoints[endpoint].count++;
  
  // Monitor response completion
  res.on('finish', () => {
    const responseTime = Date.now() - startTime;
    
    // Update total response time
    metrics.responseTimeTotal += responseTime;
    
    // Update endpoint metrics
    const endpointMetrics = metrics.endpoints[endpoint];
    endpointMetrics.totalTime += responseTime;
    endpointMetrics.averageTime = endpointMetrics.totalTime / endpointMetrics.count;
    
    // Track status codes
    const statusCode = res.statusCode;
    metrics.statusCodes[statusCode] = (metrics.statusCodes[statusCode] || 0) + 1;
    
    // Track errors
    if (statusCode >= 400) {
      metrics.errorCount++;
      endpointMetrics.errorCount++;
      
      // Log performance issues
      if (responseTime > 5000) { // Slow request (>5s)
        auditLogger.logError(req, 'PERFORMANCE_WARNING', endpoint, 
          `Slow request: ${responseTime}ms`);
      }
    }
    
    // Log suspicious activity
    if (statusCode === 401 || statusCode === 403) {
      auditLogger.logError(req, 'SECURITY_WARNING', endpoint, 
        `Unauthorized access attempt: ${statusCode}`);
    }
    
    // Add performance headers (only if not already sent)
    if (!res.headersSent) {
      res.setHeader('X-Response-Time', `${responseTime}ms`);
      res.setHeader('X-Request-ID', req.headers['x-request-id'] as string);
    }
  });
  
  next();
};

// Rate limiting monitoring
const rateLimitTracker = new Map<string, { count: number; resetTime: number }>();

export const rateLimitMonitoringMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 1000; // Max requests per window
  
  const clientData = rateLimitTracker.get(clientIP);
  
  if (!clientData || now > clientData.resetTime) {
    // Reset or initialize client data
    rateLimitTracker.set(clientIP, {
      count: 1,
      resetTime: now + windowMs
    });
  } else {
    // Increment request count
    clientData.count++;
    
    // Check if limit exceeded
    if (clientData.count > maxRequests) {
      auditLogger.logError(req, 'RATE_LIMIT_EXCEEDED', 'global', 
        `Client ${clientIP} exceeded rate limit: ${clientData.count} requests`);
      
      return res.status(429).json({
        status: 'error',
        message: 'Too many requests',
        code: 'RATE_LIMIT_EXCEEDED',
        retryAfter: Math.ceil((clientData.resetTime - now) / 1000)
      });
    }
  }
  
  // Add rate limit headers
  res.setHeader('X-RateLimit-Limit', maxRequests.toString());
  res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - (clientData?.count || 0)).toString());
  res.setHeader('X-RateLimit-Reset', Math.ceil((clientData?.resetTime || now) / 1000).toString());
  
  next();
};

// Security monitoring middleware
export const securityMonitoringMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const suspiciousPatterns = [
    /(<script|javascript:|vbscript:)/i, // XSS attempts
    /(union.*select|drop.*table|insert.*into)/i, // SQL injection
    /(\.\.\/|\.\.\\)/g, // Path traversal
    /(\bor\b.*\b=\b.*\bor\b)/i, // SQL injection patterns
  ];
  
  const requestData = JSON.stringify({
    url: req.url,
    body: req.body,
    query: req.query,
    headers: req.headers
  });
  
  // Check for suspicious patterns
  const foundPatterns = suspiciousPatterns.filter(pattern => pattern.test(requestData));
  
  if (foundPatterns.length > 0) {
    auditLogger.logError(req, 'SECURITY_THREAT', 'global', 
      `Suspicious request detected: ${foundPatterns.length} patterns matched`);
    
    // In production, you might want to block these requests
    // return res.status(403).json({ status: 'error', message: 'Request blocked' });
  }
  
  next();
};

// Health check endpoint data
export const getHealthStatus = async (): Promise<HealthStatus> => {
  const errors: string[] = [];
  let dbStatus: 'connected' | 'disconnected' = 'connected';
  let dbLatency: number | undefined;
  
  // Check database connectivity
  try {
    const { checkDatabaseHealth } = await import('../database-optimization');
    const dbHealth = await checkDatabaseHealth();
    
    if (dbHealth.status !== 'healthy') {
      dbStatus = 'disconnected';
      errors.push(`Database: ${dbHealth.error || 'Connection failed'}`);
    } else {
      dbLatency = dbHealth.latency;
    }
  } catch (error) {
    dbStatus = 'disconnected';
    errors.push(`Database check failed: ${error}`);
  }
  
  // Check memory usage
  const memoryUsage = process.memoryUsage();
  const totalMemory = memoryUsage.heapTotal;
  const usedMemory = memoryUsage.heapUsed;
  const memoryPercentage = (usedMemory / totalMemory) * 100;
  
  if (memoryPercentage > 90) {
    errors.push(`High memory usage: ${memoryPercentage.toFixed(1)}%`);
  }
  
  // Check error rate
  const errorRate = metrics.requestCount > 0 ? (metrics.errorCount / metrics.requestCount) * 100 : 0;
  if (errorRate > 10) {
    errors.push(`High error rate: ${errorRate.toFixed(1)}%`);
  }
  
  // Determine overall status
  let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
  if (errors.length > 0) {
    status = dbStatus === 'disconnected' ? 'unhealthy' : 'degraded';
  }
  
  return {
    status,
    timestamp: new Date(),
    uptime: process.uptime(),
    memory: {
      used: usedMemory,
      total: totalMemory,
      percentage: memoryPercentage
    },
    database: {
      status: dbStatus,
      latency: dbLatency
    },
    errors
  };
};

// Get performance metrics
export const getPerformanceMetrics = () => {
  const averageResponseTime = metrics.requestCount > 0 
    ? metrics.responseTimeTotal / metrics.requestCount 
    : 0;
  
  const errorRate = metrics.requestCount > 0 
    ? (metrics.errorCount / metrics.requestCount) * 100 
    : 0;
  
  return {
    ...metrics,
    averageResponseTime,
    errorRate,
    requestsPerMinute: metrics.requestCount / ((Date.now() - metrics.lastReset.getTime()) / 60000)
  };
};

// Reset metrics (useful for periodic resets)
export const resetMetrics = () => {
  metrics = {
    requestCount: 0,
    responseTimeTotal: 0,
    errorCount: 0,
    statusCodes: {},
    endpoints: {},
    lastReset: new Date()
  };
};

// Middleware to log slow queries/operations
export const slowOperationMiddleware = (threshold: number = 1000) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();
    
    res.on('finish', () => {
      const duration = Date.now() - startTime;
      
      if (duration > threshold) {
        auditLogger.logError(req, 'SLOW_OPERATION', req.path, 
          `Operation took ${duration}ms (threshold: ${threshold}ms)`);
      }
    });
    
    next();
  };
};

// Clean up old rate limit data periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitTracker.entries()) {
    if (now > data.resetTime) {
      rateLimitTracker.delete(ip);
    }
  }
}, 5 * 60 * 1000); // Clean up every 5 minutes