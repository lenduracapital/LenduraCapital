import { Request, Response, NextFunction } from 'express';
import cluster from 'cluster';
import os from 'os';

interface ServerMetrics {
  requestCount: number;
  responseTime: number;
  errorCount: number;
  memoryUsage: number;
  cpuUsage: number;
  lastUpdated: Date;
}

interface LoadBalancerConfig {
  maxRequestsPerMinute: number;
  maxConcurrentRequests: number;
  healthCheckInterval: number;
  responseTimeThreshold: number;
  memoryThreshold: number;
  cpuThreshold: number;
}

export class LoadBalancer {
  private static instance: LoadBalancer;
  private metrics: ServerMetrics;
  private config: LoadBalancerConfig;
  private requestQueue: Array<{ req: Request; res: Response; next: NextFunction }> = [];
  private activeRequests = 0;
  private requestCounts: Map<string, { count: number; resetTime: number }> = new Map();

  constructor(config?: Partial<LoadBalancerConfig>) {
    this.config = {
      maxRequestsPerMinute: 1000,
      maxConcurrentRequests: 100,
      healthCheckInterval: 30000, // 30 seconds
      responseTimeThreshold: 5000, // 5 seconds
      memoryThreshold: 80, // 80% memory usage
      cpuThreshold: 80, // 80% CPU usage
      ...config
    };

    this.metrics = {
      requestCount: 0,
      responseTime: 0,
      errorCount: 0,
      memoryUsage: 0,
      cpuUsage: 0,
      lastUpdated: new Date()
    };

    this.startHealthCheck();
  }

  static getInstance(config?: Partial<LoadBalancerConfig>): LoadBalancer {
    if (!LoadBalancer.instance) {
      LoadBalancer.instance = new LoadBalancer(config);
    }
    return LoadBalancer.instance;
  }

  // Middleware for request limiting and load balancing
  middleware() {
    return (req: Request, res: Response, next: NextFunction) => {
      const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
      const startTime = Date.now();

      // Rate limiting per IP
      if (!this.checkRateLimit(clientIp)) {
        return res.status(429).json({
          error: 'Too many requests',
          retryAfter: 60
        });
      }

      // Check if server is overloaded
      if (this.isServerOverloaded()) {
        return res.status(503).json({
          error: 'Server temporarily overloaded',
          retryAfter: 30
        });
      }

      // Queue request if at capacity
      if (this.activeRequests >= this.config.maxConcurrentRequests) {
        this.requestQueue.push({ req, res, next });
        this.processQueue();
        return;
      }

      // Process request
      this.activeRequests++;
      this.metrics.requestCount++;

      // Track response time
      res.on('finish', () => {
        const responseTime = Date.now() - startTime;
        this.updateResponseTime(responseTime);
        this.activeRequests--;
        this.processQueue();

        // Track errors
        if (res.statusCode >= 400) {
          this.metrics.errorCount++;
        }
      });

      next();
    };
  }

  private checkRateLimit(clientIp: string): boolean {
    const now = Date.now();
    const minute = Math.floor(now / 60000);
    const key = `${clientIp}:${minute}`;
    
    const current = this.requestCounts.get(key);
    if (!current) {
      this.requestCounts.set(key, { count: 1, resetTime: now + 60000 });
      return true;
    }

    if (now > current.resetTime) {
      this.requestCounts.set(key, { count: 1, resetTime: now + 60000 });
      return true;
    }

    if (current.count >= this.config.maxRequestsPerMinute) {
      return false;
    }

    current.count++;
    return true;
  }

  private isServerOverloaded(): boolean {
    const memoryUsage = (process.memoryUsage().heapUsed / process.memoryUsage().heapTotal) * 100;
    const responseTimeHigh = this.metrics.responseTime > this.config.responseTimeThreshold;
    const memoryHigh = memoryUsage > this.config.memoryThreshold;
    
    return responseTimeHigh || memoryHigh;
  }

  private processQueue(): void {
    if (this.requestQueue.length === 0 || this.activeRequests >= this.config.maxConcurrentRequests) {
      return;
    }

    const { req, res, next } = this.requestQueue.shift()!;
    this.activeRequests++;
    
    // Check if request hasn't timed out
    if (!res.headersSent) {
      next();
    } else {
      this.activeRequests--;
      this.processQueue();
    }
  }

  private updateResponseTime(responseTime: number): void {
    // Moving average for response time
    this.metrics.responseTime = (this.metrics.responseTime * 0.9) + (responseTime * 0.1);
  }

  private startHealthCheck(): void {
    setInterval(() => {
      this.updateMetrics();
      this.cleanupRateLimitData();
    }, this.config.healthCheckInterval);
  }

  private updateMetrics(): void {
    const memoryUsage = process.memoryUsage();
    this.metrics.memoryUsage = (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100;
    this.metrics.lastUpdated = new Date();

    // Log metrics
    console.log(`[LOAD BALANCER] Active requests: ${this.activeRequests}, Queue: ${this.requestQueue.length}, Memory: ${this.metrics.memoryUsage.toFixed(1)}%, Response time: ${this.metrics.responseTime.toFixed(0)}ms`);
  }

  private cleanupRateLimitData(): void {
    const now = Date.now();
    for (const [key, data] of this.requestCounts.entries()) {
      if (now > data.resetTime) {
        this.requestCounts.delete(key);
      }
    }
  }

  // Get current server metrics
  getMetrics(): ServerMetrics & { activeRequests: number; queueLength: number } {
    return {
      ...this.metrics,
      activeRequests: this.activeRequests,
      queueLength: this.requestQueue.length
    };
  }

  // Health check endpoint
  healthCheck(): { status: string; metrics: any } {
    const isHealthy = !this.isServerOverloaded() && this.activeRequests < this.config.maxConcurrentRequests;
    
    return {
      status: isHealthy ? 'healthy' : 'unhealthy',
      metrics: this.getMetrics()
    };
  }
}

// Cluster setup for multi-core load balancing
export function setupCluster(): void {
  const numCPUs = os.cpus().length;
  
  if (cluster.isPrimary && process.env.NODE_ENV === 'production') {
    console.log(`[CLUSTER] Master process ${process.pid} is running`);
    console.log(`[CLUSTER] Starting ${numCPUs} worker processes`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    // Handle worker restarts
    cluster.on('exit', (worker, code, signal) => {
      console.log(`[CLUSTER] Worker ${worker.process.pid} died. Restarting...`);
      cluster.fork();
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('[CLUSTER] Master received SIGTERM, shutting down workers');
      for (const id in cluster.workers) {
        cluster.workers[id]?.kill();
      }
    });
  }
}

export const loadBalancer = LoadBalancer.getInstance();