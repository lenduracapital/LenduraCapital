// Performance monitoring and optimization utilities
interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
}

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observer: PerformanceObserver | null = null;

  constructor() {
    this.initializeObserver();
    this.measureCoreWebVitals();
  }

  private initializeObserver() {
    if ('PerformanceObserver' in window) {
      this.observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.processEntry(entry);
        }
      });

      try {
        this.observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] });
      } catch (e) {
        this.observer.observe({ entryTypes: ['paint'] });
      }
    }
  }

  private processEntry(entry: PerformanceEntry) {
    switch (entry.entryType) {
      case 'paint':
        if (entry.name === 'first-contentful-paint') {
          this.metrics.fcp = entry.startTime;
          this.checkThresholds('FCP', entry.startTime, 3000);
        }
        break;

      case 'largest-contentful-paint':
        this.metrics.lcp = (entry as any).startTime;
        this.checkThresholds('LCP', (entry as any).startTime, 4000);
        break;

      case 'first-input':
        const fidValue = (entry as any).processingStart - entry.startTime;
        this.metrics.fid = fidValue;
        this.checkThresholds('FID', fidValue, 100);
        break;

      case 'layout-shift':
        if (!(entry as any).hadRecentInput) {
          this.metrics.cls = (this.metrics.cls || 0) + (entry as any).value;
          if (this.metrics.cls !== undefined) {
            this.checkThresholds('CLS', this.metrics.cls, 0.1);
          }
        }
        break;
    }
  }

  private checkThresholds(metric: string, value: number, threshold: number) {
    if (value > threshold) {
      console.warn(`Performance Budget Exceeded: ${metric} = ${Math.round(value)}ms (threshold: ${threshold}ms)`);
      this.reportMetric(metric, value, threshold);
    }
  }

  private async reportMetric(metric: string, value: number, threshold: number) {
    try {
      await fetch('/api/performance-alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metric,
          value: Math.round(value),
          threshold,
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          url: window.location.href
        })
      });
    } catch (error) {
      // Silently fail
    }
  }

  private measureCoreWebVitals() {
    if ('performance' in window && 'timing' in performance) {
      const navigation = performance.timing;
      this.metrics.ttfb = navigation.responseStart - navigation.fetchStart;
    }

    if ('PerformanceNavigationTiming' in window) {
      const navEntries = performance.getEntriesByType('navigation');
      if (navEntries.length > 0) {
        const navTiming = navEntries[0] as PerformanceNavigationTiming;
        this.metrics.ttfb = navTiming.responseStart - navTiming.fetchStart;
      }
    }
  }

  public getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  public disconnect() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

export const performanceMonitor = new PerformanceMonitor();