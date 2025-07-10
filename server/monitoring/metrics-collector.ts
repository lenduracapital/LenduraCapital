import { Request, Response } from 'express';
import { auditLogger } from '../audit-logger';
import { checkDatabaseHealth } from '../database-optimization';

// Prometheus-style metrics collection
interface Metric {
  name: string;
  type: 'counter' | 'gauge' | 'histogram' | 'summary';
  help: string;
  labels?: Record<string, string>;
  value: number;
  timestamp: number;
}

interface HistogramBucket {
  le: number; // Less than or equal to
  count: number;
}

interface HistogramMetric extends Metric {
  type: 'histogram';
  buckets: HistogramBucket[];
  sum: number;
  count: number;
}

// Metrics Registry
class MetricsRegistry {
  private static instance: MetricsRegistry;
  private metrics: Map<string, Metric> = new Map();
  private histograms: Map<string, HistogramMetric> = new Map();

  static getInstance(): MetricsRegistry {
    if (!MetricsRegistry.instance) {
      MetricsRegistry.instance = new MetricsRegistry();
    }
    return MetricsRegistry.instance;
  }

  // Counter: monotonically increasing value
  incrementCounter(name: string, help: string, labels: Record<string, string> = {}, increment: number = 1) {
    const key = this.getMetricKey(name, labels);
    const existing = this.metrics.get(key);
    
    if (existing && existing.type === 'counter') {
      existing.value += increment;
      existing.timestamp = Date.now();
    } else {
      this.metrics.set(key, {
        name,
        type: 'counter',
        help,
        labels,
        value: increment,
        timestamp: Date.now()
      });
    }
  }

  // Gauge: value that can go up or down
  setGauge(name: string, help: string, value: number, labels: Record<string, string> = {}) {
    const key = this.getMetricKey(name, labels);
    this.metrics.set(key, {
      name,
      type: 'gauge',
      help,
      labels,
      value,
      timestamp: Date.now()
    });
  }

  // Histogram: observations in buckets
  observeHistogram(name: string, help: string, value: number, labels: Record<string, string> = {}) {
    const key = this.getMetricKey(name, labels);
    let histogram = this.histograms.get(key);

    if (!histogram) {
      histogram = {
        name,
        type: 'histogram',
        help,
        labels,
        value: 0,
        timestamp: Date.now(),
        buckets: [
          { le: 0.005, count: 0 }, // 5ms
          { le: 0.01, count: 0 },  // 10ms
          { le: 0.025, count: 0 }, // 25ms
          { le: 0.05, count: 0 },  // 50ms
          { le: 0.1, count: 0 },   // 100ms
          { le: 0.25, count: 0 },  // 250ms
          { le: 0.5, count: 0 },   // 500ms
          { le: 1.0, count: 0 },   // 1s
          { le: 2.5, count: 0 },   // 2.5s
          { le: 5.0, count: 0 },   // 5s
          { le: 10.0, count: 0 },  // 10s
          { le: Infinity, count: 0 }
        ],
        sum: 0,
        count: 0
      };
      this.histograms.set(key, histogram);
    }

    // Update histogram
    histogram.sum += value;
    histogram.count++;
    histogram.timestamp = Date.now();

    // Update buckets
    for (const bucket of histogram.buckets) {
      if (value <= bucket.le) {
        bucket.count++;
      }
    }
  }

  private getMetricKey(name: string, labels: Record<string, string>): string {
    const labelStr = Object.entries(labels)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}="${v}"`)
      .join(',');
    return labelStr ? `${name}{${labelStr}}` : name;
  }

  // Export metrics in Prometheus format
  exportPrometheusFormat(): string {
    const lines: string[] = [];

    // Regular metrics
    this.metrics.forEach((metric, key) => {
      lines.push(`# HELP ${metric.name} ${metric.help}`);
      lines.push(`# TYPE ${metric.name} ${metric.type}`);
      
      const labelStr = metric.labels && Object.keys(metric.labels).length > 0
        ? '{' + Object.entries(metric.labels).map(([k, v]) => `${k}="${v}"`).join(',') + '}'
        : '';
      
      lines.push(`${metric.name}${labelStr} ${metric.value} ${metric.timestamp}`);
    });

    // Histogram metrics
    this.histograms.forEach((histogram) => {
      lines.push(`# HELP ${histogram.name} ${histogram.help}`);
      lines.push(`# TYPE ${histogram.name} histogram`);
      
      const baseLabels = histogram.labels || {};
      const baseLabelStr = Object.keys(baseLabels).length > 0
        ? ',' + Object.entries(baseLabels).map(([k, v]) => `${k}="${v}"`).join(',')
        : '';

      // Export buckets
      for (const bucket of histogram.buckets) {
        const le = bucket.le === Infinity ? '+Inf' : bucket.le.toString();
        lines.push(`${histogram.name}_bucket{le="${le}"${baseLabelStr}} ${bucket.count} ${histogram.timestamp}`);
      }

      // Export sum and count
      lines.push(`${histogram.name}_sum${baseLabelStr ? '{' + baseLabelStr.substring(1) + '}' : ''} ${histogram.sum} ${histogram.timestamp}`);
      lines.push(`${histogram.name}_count${baseLabelStr ? '{' + baseLabelStr.substring(1) + '}' : ''} ${histogram.count} ${histogram.timestamp}`);
    });

    return lines.join('\n') + '\n';
  }

  // Get all metrics as JSON
  exportJSON() {
    return {
      metrics: Array.from(this.metrics.values()),
      histograms: Array.from(this.histograms.values()),
      timestamp: Date.now()
    };
  }

  // Clear all metrics (useful for testing)
  clear() {
    this.metrics.clear();
    this.histograms.clear();
  }
}

// Application Performance Monitoring
export class APMCollector {
  private registry: MetricsRegistry;
  private startTime: number;

  constructor() {
    this.registry = MetricsRegistry.getInstance();
    this.startTime = Date.now();
    
    // Start collecting system metrics
    this.startSystemMetricsCollection();
  }

  // Middleware for HTTP request metrics
  requestMetricsMiddleware() {
    return (req: Request, res: Response, next: Function) => {
      const start = Date.now();
      
      // Increment request counter
      this.registry.incrementCounter(
        'http_requests_total',
        'Total number of HTTP requests',
        {
          method: req.method,
          route: req.route?.path || req.path,
          status_class: 'unknown'
        }
      );

      res.on('finish', () => {
        const duration = (Date.now() - start) / 1000; // Convert to seconds
        const statusClass = `${Math.floor(res.statusCode / 100)}xx`;
        
        // Update request counter with final status
        this.registry.incrementCounter(
          'http_requests_total',
          'Total number of HTTP requests',
          {
            method: req.method,
            route: req.route?.path || req.path,
            status_class: statusClass,
            status_code: res.statusCode.toString()
          }
        );

        // Record request duration
        this.registry.observeHistogram(
          'http_request_duration_seconds',
          'HTTP request duration in seconds',
          duration,
          {
            method: req.method,
            route: req.route?.path || req.path,
            status_code: res.statusCode.toString()
          }
        );

        // Record response size if available
        const contentLength = res.get('content-length');
        if (contentLength) {
          this.registry.observeHistogram(
            'http_response_size_bytes',
            'HTTP response size in bytes',
            parseInt(contentLength),
            {
              method: req.method,
              route: req.route?.path || req.path
            }
          );
        }
      });

      next();
    };
  }

  // Financial transaction metrics
  recordTransaction(type: 'loan_application' | 'contact_submission' | 'chat_conversation', amount?: number) {
    this.registry.incrementCounter(
      'financial_transactions_total',
      'Total number of financial transactions',
      { type }
    );

    if (amount !== undefined) {
      this.registry.observeHistogram(
        'transaction_amount_dollars',
        'Financial transaction amounts in dollars',
        amount,
        { type }
      );
    }
  }

  // Database operation metrics
  recordDatabaseOperation(operation: 'select' | 'insert' | 'update' | 'delete', table: string, duration: number) {
    this.registry.incrementCounter(
      'database_operations_total',
      'Total number of database operations',
      { operation, table }
    );

    this.registry.observeHistogram(
      'database_operation_duration_seconds',
      'Database operation duration in seconds',
      duration / 1000,
      { operation, table }
    );
  }

  // Error metrics
  recordError(type: 'validation' | 'database' | 'authentication' | 'authorization' | 'internal', source: string) {
    this.registry.incrementCounter(
      'application_errors_total',
      'Total number of application errors',
      { type, source }
    );
  }

  // Security metrics
  recordSecurityEvent(event: 'login_success' | 'login_failure' | 'unauthorized_access' | 'suspicious_activity', source: string) {
    this.registry.incrementCounter(
      'security_events_total',
      'Total number of security events',
      { event, source }
    );
  }

  // System metrics collection
  private startSystemMetricsCollection() {
    setInterval(() => {
      this.collectSystemMetrics();
    }, 30000); // Collect every 30 seconds

    // Collect immediately
    this.collectSystemMetrics();
  }

  private async collectSystemMetrics() {
    // Memory metrics
    const memoryUsage = process.memoryUsage();
    this.registry.setGauge('process_memory_heap_bytes', 'Process heap memory in bytes', memoryUsage.heapUsed);
    this.registry.setGauge('process_memory_heap_total_bytes', 'Process total heap memory in bytes', memoryUsage.heapTotal);
    this.registry.setGauge('process_memory_external_bytes', 'Process external memory in bytes', memoryUsage.external);
    this.registry.setGauge('process_memory_rss_bytes', 'Process resident set size in bytes', memoryUsage.rss);

    // CPU metrics
    const cpuUsage = process.cpuUsage();
    this.registry.setGauge('process_cpu_user_seconds_total', 'Total user CPU time in seconds', cpuUsage.user / 1000000);
    this.registry.setGauge('process_cpu_system_seconds_total', 'Total system CPU time in seconds', cpuUsage.system / 1000000);

    // Uptime
    this.registry.setGauge('process_uptime_seconds', 'Process uptime in seconds', process.uptime());

    // Database health
    try {
      const dbHealth = await checkDatabaseHealth();
      this.registry.setGauge('database_connected', 'Database connection status (1=connected, 0=disconnected)', 
        dbHealth.status === 'healthy' ? 1 : 0);
      
      if (dbHealth.latency !== undefined) {
        this.registry.setGauge('database_latency_seconds', 'Database latency in seconds', dbHealth.latency / 1000);
      }
      
      if (dbHealth.totalConnections !== undefined) {
        this.registry.setGauge('database_connections_total', 'Total database connections', dbHealth.totalConnections);
        this.registry.setGauge('database_connections_idle', 'Idle database connections', dbHealth.idleConnections || 0);
        this.registry.setGauge('database_connections_waiting', 'Waiting database connections', dbHealth.waitingConnections || 0);
      }
    } catch (error) {
      this.registry.setGauge('database_connected', 'Database connection status (1=connected, 0=disconnected)', 0);
    }

    // Node.js version info
    this.registry.setGauge('nodejs_version_info', 'Node.js version info', 1, {
      version: process.version,
      arch: process.arch,
      platform: process.platform
    });
  }

  // Export metrics
  getMetrics() {
    return this.registry.exportJSON();
  }

  getPrometheusMetrics() {
    return this.registry.exportPrometheusFormat();
  }
}

// Singleton instance
export const apmCollector = new APMCollector();

// Health check with detailed metrics
export async function getDetailedHealth() {
  const registry = MetricsRegistry.getInstance();
  
  // Get current metrics
  const metrics = registry.exportJSON();
  
  // Calculate health indicators
  const memoryMetric = metrics.metrics.find(m => m.name === 'process_memory_heap_bytes');
  const memoryTotalMetric = metrics.metrics.find(m => m.name === 'process_memory_heap_total_bytes');
  const dbConnectedMetric = metrics.metrics.find(m => m.name === 'database_connected');
  
  const memoryUsagePercent = memoryMetric && memoryTotalMetric 
    ? (memoryMetric.value / memoryTotalMetric.value) * 100 
    : 0;
  
  const isDatabaseConnected = dbConnectedMetric ? dbConnectedMetric.value === 1 : false;
  
  // Determine overall health
  let status = 'healthy';
  const issues: string[] = [];
  
  if (memoryUsagePercent > 90) {
    status = 'degraded';
    issues.push(`High memory usage: ${memoryUsagePercent.toFixed(1)}%`);
  }
  
  if (!isDatabaseConnected) {
    status = 'unhealthy';
    issues.push('Database connection failed');
  }
  
  return {
    status,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: {
      usage_percent: memoryUsagePercent,
      heap_used: memoryMetric?.value || 0,
      heap_total: memoryTotalMetric?.value || 0
    },
    database: {
      connected: isDatabaseConnected
    },
    issues,
    metrics_summary: {
      total_metrics: metrics.metrics.length,
      total_histograms: metrics.histograms.length
    }
  };
}