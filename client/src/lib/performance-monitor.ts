import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

interface PerformanceMetric {
  name: string;
  value: number;
  id: string;
  delta: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

interface WebVitalsReport {
  lcp?: number;
  inp?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
  timestamp: number;
  url: string;
  userAgent: string;
}

class PerformanceMonitor {
  private vitals: Partial<WebVitalsReport> = {};
  private thresholds = {
    lcp: { good: 2500, poor: 4000 },
    inp: { good: 200, poor: 500 },
    cls: { good: 0.1, poor: 0.25 },
    fcp: { good: 1800, poor: 3000 },
    ttfb: { good: 800, poor: 1800 }
  };

  constructor() {
    this.initializeTracking();
  }

  private initializeTracking() {
    // Track Core Web Vitals
    onLCP(this.handleMetric.bind(this, 'lcp'));
    onINP(this.handleMetric.bind(this, 'inp'));
    onCLS(this.handleMetric.bind(this, 'cls'));
    onFCP(this.handleMetric.bind(this, 'fcp'));
    onTTFB(this.handleMetric.bind(this, 'ttfb'));

    // Track custom business metrics
    this.trackVideoPerformance();
    this.trackFormInteractions();
    this.trackNavigationTiming();
  }

  private handleMetric(metricName: keyof WebVitalsReport, metric: PerformanceMetric) {
    this.vitals[metricName] = metric.value;
    
    // Send to analytics if available
    if (typeof window.gtag === 'function') {
      window.gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.value),
        non_interaction: true,
        custom_parameter_rating: metric.rating
      });
    }

    // Check performance budgets and alert if exceeded
    this.checkPerformanceBudgets(metricName, metric.value);
    
    // Store in localStorage for offline analysis
    this.storeMetric(metricName, metric);
  }

  private checkPerformanceBudgets(metric: string, value: number) {
    const threshold = this.thresholds[metric as keyof typeof this.thresholds];
    if (!threshold) return;

    const status = value <= threshold.good ? 'good' : 
                  value <= threshold.poor ? 'needs-improvement' : 'poor';

    if (status === 'poor') {
      console.warn(`Performance Budget Exceeded: ${metric.toUpperCase()} = ${value}ms (threshold: ${threshold.poor}ms)`);
      
      // Send alert to monitoring service
      this.sendAlert({
        type: 'performance_budget_exceeded',
        metric,
        value,
        threshold: threshold.poor,
        url: window.location.href,
        timestamp: Date.now()
      });
    }
  }

  private trackVideoPerformance() {
    const videos = document.querySelectorAll('video');
    videos.forEach((video, index) => {
      const startTime = performance.now();
      
      video.addEventListener('loadstart', () => {
        console.log(`Video ${index + 1} loading started`);
      });
      
      video.addEventListener('canplaythrough', () => {
        const loadTime = performance.now() - startTime;
        console.log(`Video ${index + 1} ready to play in ${Math.round(loadTime)}ms`);
        
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'video_load_time', {
            event_category: 'Performance',
            event_label: `video_${index + 1}`,
            value: Math.round(loadTime)
          });
        }
      });
    });
  }

  private trackFormInteractions() {
    // Track form performance and conversion funnel
    const forms = document.querySelectorAll('form, iframe[src*="jotform"]');
    forms.forEach((form, index) => {
      const startTime = performance.now();
      
      if (form.tagName === 'IFRAME') {
        form.addEventListener('load', () => {
          const loadTime = performance.now() - startTime;
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'form_load_time', {
              event_category: 'Performance',
              event_label: 'jotform',
              value: Math.round(loadTime)
            });
          }
        });
      }
    });
  }

  private trackNavigationTiming() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        const timings = {
          dns: navigation.domainLookupEnd - navigation.domainLookupStart,
          tcp: navigation.connectEnd - navigation.connectStart,
          request: navigation.responseStart - navigation.requestStart,
          response: navigation.responseEnd - navigation.responseStart,
          dom: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          load: navigation.loadEventEnd - navigation.loadEventStart
        };
        
        Object.entries(timings).forEach(([name, value]) => {
          if (typeof window.gtag === 'function') {
            window.gtag('event', `timing_${name}`, {
              event_category: 'Navigation Timing',
              value: Math.round(value)
            });
          }
        });
      }, 0);
    });
  }

  private storeMetric(metricName: string, metric: PerformanceMetric) {
    const stored = localStorage.getItem('performance_metrics');
    const metrics = stored ? JSON.parse(stored) : [];
    
    metrics.push({
      name: metricName,
      value: metric.value,
      rating: metric.rating,
      timestamp: Date.now(),
      url: window.location.href
    });
    
    // Keep only last 100 metrics
    if (metrics.length > 100) {
      metrics.splice(0, metrics.length - 100);
    }
    
    localStorage.setItem('performance_metrics', JSON.stringify(metrics));
  }

  private sendAlert(alert: any) {
    // Send to monitoring endpoint
    fetch('/api/performance-alerts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alert)
    }).catch(console.error);
  }

  // Public method to get current vitals report
  getVitalsReport(): WebVitalsReport {
    return {
      ...this.vitals,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent
    } as WebVitalsReport;
  }

  // Method to manually report conversion events
  reportConversion(eventName: string, value?: number) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, {
        event_category: 'Conversion',
        value: value || 1
      });
    }
  }
}

// Initialize performance monitoring
export const performanceMonitor = new PerformanceMonitor();

// Export for manual usage
export { PerformanceMonitor };

// Add to window for debugging
declare global {
  interface Window {
    performanceMonitor: PerformanceMonitor;
    gtag: (...args: any[]) => void;
  }
}

if (typeof window !== 'undefined') {
  window.performanceMonitor = performanceMonitor;
}