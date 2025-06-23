// Advanced Core Web Vitals optimization for Google ranking
export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  
  public static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }

  // Optimize Largest Contentful Paint (LCP)
  public optimizeLCP(): void {
    // Preload critical resources
    this.preloadCriticalResources();
    
    // Optimize images with lazy loading
    this.implementIntersectionObserver();
    
    // Reduce server response time
    this.enableResourceHints();
  }

  // Optimize First Input Delay (FID)
  public optimizeFID(): void {
    // Break up long tasks
    this.deferNonCriticalJS();
    
    // Use web workers for heavy computations
    this.implementWebWorkers();
    
    // Optimize event handlers
    this.optimizeEventListeners();
  }

  // Optimize Cumulative Layout Shift (CLS)
  public optimizeCLS(): void {
    // Set dimensions on media elements
    this.setImageDimensions();
    
    // Reserve space for dynamic content
    this.reserveLayoutSpace();
    
    // Use transform instead of layout-triggering properties
    this.optimizeAnimations();
  }

  private preloadCriticalResources(): void {
    const criticalResources = [
      { href: '/fonts/inter.woff2', as: 'font', type: 'font/woff2' },
      { href: '/api/performance-monitor', as: 'fetch' }
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      if (resource.type) link.type = resource.type;
      if (resource.as === 'font') link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }

  private implementIntersectionObserver(): void {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    }, { rootMargin: '50px' });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  private enableResourceHints(): void {
    // DNS prefetch for external domains
    const domains = ['fonts.googleapis.com', 'www.google-analytics.com'];
    
    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = `//${domain}`;
      document.head.appendChild(link);
    });
  }

  private deferNonCriticalJS(): void {
    // Use requestIdleCallback for non-critical operations
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // Load analytics and other non-critical scripts
        this.loadNonCriticalScripts();
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        this.loadNonCriticalScripts();
      }, 1);
    }
  }

  private implementWebWorkers(): void {
    if ('Worker' in window) {
      // Create web worker for heavy computations
      const workerScript = `
        self.onmessage = function(e) {
          const { type, data } = e.data;
          switch(type) {
            case 'PROCESS_ANALYTICS':
              // Process analytics data without blocking main thread
              self.postMessage({ type: 'ANALYTICS_PROCESSED', result: data });
              break;
          }
        };
      `;
      
      const blob = new Blob([workerScript], { type: 'application/javascript' });
      const worker = new Worker(URL.createObjectURL(blob));
      
      worker.onmessage = (e) => {
        const { type, result } = e.data;
        if (type === 'ANALYTICS_PROCESSED') {
          // Handle processed analytics
        }
      };
    }
  }

  private optimizeEventListeners(): void {
    // Use passive listeners for better performance
    const passiveEvents = ['scroll', 'wheel', 'touchstart', 'touchmove'];
    
    passiveEvents.forEach(eventType => {
      document.addEventListener(eventType, () => {}, { passive: true });
    });
  }

  private setImageDimensions(): void {
    // Ensure all images have explicit dimensions
    document.querySelectorAll('img').forEach(img => {
      if (!img.width || !img.height) {
        // Set aspect ratio to prevent layout shift
        img.style.aspectRatio = '16/9';
        img.style.width = '100%';
        img.style.height = 'auto';
      }
    });
  }

  private reserveLayoutSpace(): void {
    // Reserve space for dynamic content
    const dynamicElements = document.querySelectorAll('[data-dynamic]');
    
    dynamicElements.forEach(element => {
      const el = element as HTMLElement;
      if (!el.style.minHeight) {
        el.style.minHeight = '200px'; // Reserve minimum space
      }
    });
  }

  private optimizeAnimations(): void {
    // Use transform and opacity for animations
    const style = document.createElement('style');
    style.textContent = `
      .optimized-animation {
        will-change: transform, opacity;
        transform: translateZ(0);
      }
      
      .fade-in {
        animation: fadeIn 0.3s ease-in-out;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }

  private loadNonCriticalScripts(): void {
    // Load analytics and other non-critical functionality
    const scripts = [
      { src: '/js/analytics.js', defer: true },
      { src: '/js/social-widgets.js', defer: true }
    ];

    scripts.forEach(scriptConfig => {
      const script = document.createElement('script');
      script.src = scriptConfig.src;
      script.defer = scriptConfig.defer;
      document.head.appendChild(script);
    });
  }

  // Monitor and report Core Web Vitals
  public initializeVitalsMonitoring(): void {
    if ('web-vitals' in window) {
      // Monitor FCP, LCP, FID, CLS
      this.measureVitals();
    }
  }

  private measureVitals(): void {
    // Measure First Contentful Paint
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (entry.name === 'first-contentful-paint') {
          this.reportVital('FCP', entry.startTime);
        }
      });
    }).observe({ entryTypes: ['paint'] });

    // Measure Largest Contentful Paint
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.reportVital('LCP', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // Measure Cumulative Layout Shift
    let clsValue = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      this.reportVital('CLS', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
  }

  private reportVital(name: string, value: number): void {
    // Report to performance monitoring endpoint
    fetch('/api/performance-alerts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        metric: name,
        value,
        timestamp: Date.now(),
        url: location.pathname
      })
    }).catch(() => {
      // Silently handle errors
    });
  }
}

// Initialize performance optimizer
export const performanceOptimizer = PerformanceOptimizer.getInstance();