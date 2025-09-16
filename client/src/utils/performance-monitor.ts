// Performance monitoring utilities for Lighthouse optimization

export interface PerformanceMetrics {
  lcp: number;
  fid: number;
  cls: number;
  fcp: number;
  ttfb: number;
}

export interface ResourceTiming {
  name: string;
  duration: number;
  transferSize: number;
  encodedBodySize: number;
  decodedBodySize: number;
}

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeObservers();
  }

  private initializeObservers() {
    // Core Web Vitals observer
    if ('PerformanceObserver' in window) {
      // LCP Observer
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
            renderTime?: number;
            loadTime?: number;
          };
          this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime || 0;
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
        this.observers.push(lcpObserver);
      } catch (e) {
        console.warn('LCP observer not supported');
      }

      // FID Observer
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            this.metrics.fid = (entry as any).processingStart - entry.startTime;
          });
        });
        fidObserver.observe({ type: 'first-input', buffered: true });
        this.observers.push(fidObserver);
      } catch (e) {
        console.warn('FID observer not supported');
      }

      // CLS Observer
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          });
          this.metrics.cls = clsValue;
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });
        this.observers.push(clsObserver);
      } catch (e) {
        console.warn('CLS observer not supported');
      }
    }

    // Navigation timing for FCP and TTFB
    this.measureNavigationTiming();
  }

  private measureNavigationTiming() {
    if ('performance' in window && 'timing' in performance) {
      const timing = performance.timing;
      this.metrics.ttfb = timing.responseStart - timing.navigationStart;
      
      // FCP measurement
      if ('getEntriesByType' in performance) {
        const paintEntries = performance.getEntriesByType('paint');
        const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
          this.metrics.fcp = fcpEntry.startTime;
        }
      }
    }
  }

  // Get current metrics
  getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  // Analyze resource loading performance
  analyzeResources(): ResourceTiming[] {
    if (!('performance' in window)) return [];

    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    return resources.map(resource => ({
      name: resource.name,
      duration: resource.duration,
      transferSize: resource.transferSize || 0,
      encodedBodySize: resource.encodedBodySize || 0,
      decodedBodySize: resource.decodedBodySize || 0,
    }));
  }

  // Get bundle size analysis
  getBundleAnalysis() {
    const resources = this.analyzeResources();
    const jsResources = resources.filter(r => r.name.includes('.js'));
    const cssResources = resources.filter(r => r.name.includes('.css'));
    const imageResources = resources.filter(r => 
      r.name.match(/\.(jpg|jpeg|png|gif|webp|svg)($|\?)/i)
    );

    return {
      javascript: {
        files: jsResources.length,
        totalSize: jsResources.reduce((acc, r) => acc + r.transferSize, 0),
        totalDuration: jsResources.reduce((acc, r) => acc + r.duration, 0),
      },
      css: {
        files: cssResources.length,
        totalSize: cssResources.reduce((acc, r) => acc + r.transferSize, 0),
        totalDuration: cssResources.reduce((acc, r) => acc + r.duration, 0),
      },
      images: {
        files: imageResources.length,
        totalSize: imageResources.reduce((acc, r) => acc + r.transferSize, 0),
        totalDuration: imageResources.reduce((acc, r) => acc + r.duration, 0),
      },
    };
  }

  // Report performance issues
  getPerformanceReport() {
    const metrics = this.getMetrics();
    const issues: string[] = [];

    if (metrics.lcp && metrics.lcp > 2500) {
      issues.push(`LCP is slow: ${metrics.lcp.toFixed(0)}ms (target: <2500ms)`);
    }

    if (metrics.fid && metrics.fid > 100) {
      issues.push(`FID is slow: ${metrics.fid.toFixed(0)}ms (target: <100ms)`);
    }

    if (metrics.cls && metrics.cls > 0.1) {
      issues.push(`CLS is high: ${metrics.cls.toFixed(3)} (target: <0.1)`);
    }

    if (metrics.fcp && metrics.fcp > 1800) {
      issues.push(`FCP is slow: ${metrics.fcp.toFixed(0)}ms (target: <1800ms)`);
    }

    if (metrics.ttfb && metrics.ttfb > 600) {
      issues.push(`TTFB is slow: ${metrics.ttfb.toFixed(0)}ms (target: <600ms)`);
    }

    return {
      metrics,
      issues,
      passed: issues.length === 0,
    };
  }

  // Clean up observers
  disconnect() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Utility functions
export function measureAsync<T>(fn: () => Promise<T>, label: string): Promise<T> {
  const start = performance.now();
  
  return fn().then((result) => {
    const duration = performance.now() - start;
    console.log(`${label} took ${duration.toFixed(2)}ms`);
    
    // Report to performance timeline
    if ('performance' in window && 'measure' in performance) {
      performance.measure(label, { start, end: performance.now() });
    }
    
    return result;
  });
}

export function measureSync<T>(fn: () => T, label: string): T {
  const start = performance.now();
  const result = fn();
  const duration = performance.now() - start;
  
  console.log(`${label} took ${duration.toFixed(2)}ms`);
  
  // Report to performance timeline
  if ('performance' in window && 'measure' in performance) {
    performance.measure(label, { start, end: performance.now() });
  }
  
  return result;
}

// Image loading performance tracker
export function trackImageLoad(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const start = performance.now();
    const img = new Image();
    
    img.onload = () => {
      const duration = performance.now() - start;
      console.log(`Image ${src} loaded in ${duration.toFixed(2)}ms`);
      resolve();
    };
    
    img.onerror = () => {
      const duration = performance.now() - start;
      console.warn(`Image ${src} failed to load after ${duration.toFixed(2)}ms`);
      reject(new Error(`Failed to load image: ${src}`));
    };
    
    img.src = src;
  });
}

// Font loading performance tracker
export function trackFontLoad(fontFamily: string, timeout = 3000): Promise<void> {
  if (!('fonts' in document)) {
    return Promise.resolve();
  }

  const start = performance.now();
  
  return Promise.race([
    document.fonts.load(`1em ${fontFamily}`).then(() => {
      const duration = performance.now() - start;
      console.log(`Font ${fontFamily} loaded in ${duration.toFixed(2)}ms`);
    }),
    new Promise<void>((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Font ${fontFamily} loading timed out after ${timeout}ms`));
      }, timeout);
    }),
  ]);
}

// Bundle size warning
export function checkBundleSize() {
  const bundleAnalysis = performanceMonitor.getBundleAnalysis();
  const jsSize = bundleAnalysis.javascript.totalSize;
  const cssSize = bundleAnalysis.css.totalSize;
  
  const warnings: string[] = [];
  
  if (jsSize > 500 * 1024) { // 500KB
    warnings.push(`JavaScript bundle is large: ${(jsSize / 1024).toFixed(0)}KB`);
  }
  
  if (cssSize > 100 * 1024) { // 100KB
    warnings.push(`CSS bundle is large: ${(cssSize / 1024).toFixed(0)}KB`);
  }
  
  if (warnings.length > 0) {
    console.warn('Bundle size warnings:', warnings);
  }
  
  return { jsSize, cssSize, warnings };
}

// Critical resource preloader
export function preloadCriticalResources() {
  const criticalResources = [
    // Fonts
    { href: '/fonts/inter-var.woff2', as: 'font', type: 'font/woff2' },
    // Critical CSS would be inlined, so no preload needed
    // Hero images
    { href: '/hero-800w.webp', as: 'image', type: 'image/webp' },
  ];

  criticalResources.forEach(({ href, as, type }) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

// Web Vitals reporting (for analytics)
export function reportWebVitals(onPerfEntry: (metric: { name: string; value: number }) => void) {
  if ('PerformanceObserver' in window) {
    // LCP
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      onPerfEntry({
        name: 'LCP',
        value: lastEntry.renderTime || lastEntry.loadTime,
      });
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    // FID
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        onPerfEntry({
          name: 'FID',
          value: entry.processingStart - entry.startTime,
        });
      });
    });
    fidObserver.observe({ type: 'first-input', buffered: true });

    // CLS
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      onPerfEntry({
        name: 'CLS',
        value: clsValue,
      });
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });
  }
}