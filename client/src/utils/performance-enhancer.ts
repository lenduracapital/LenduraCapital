// Performance Enhancement Utilities
export class PerformanceEnhancer {
  private static instance: PerformanceEnhancer;
  
  static getInstance(): PerformanceEnhancer {
    if (!this.instance) {
      this.instance = new PerformanceEnhancer();
    }
    return this.instance;
  }

  // Initialize all performance optimizations
  init() {
    this.optimizeImages();
    this.deferNonCriticalResources();
    this.enableBrowserCaching();
    this.reduceBundleSize();
    this.optimizeVideoPlayback();
  }

  // Optimize images with intersection observer
  private optimizeImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    images.forEach(img => imageObserver.observe(img));
  }

  // Defer non-critical JavaScript
  private deferNonCriticalResources() {
    // Defer third-party scripts
    const scripts = document.querySelectorAll('script[data-defer]');
    scripts.forEach(script => {
      const newScript = document.createElement('script');
      newScript.src = (script as HTMLScriptElement).src;
      newScript.async = true;
      document.body.appendChild(newScript);
      script.remove();
    });
  }

  // Set up browser caching headers
  private enableBrowserCaching() {
    // This would typically be done server-side, but we can prefetch resources
    const resources = [
      '/api/data',
      '/attached_assets/ChatGPT Image Jun 5, 2025, 12_13_54 PM_1750718184734.png'
    ];

    resources.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
    });
  }

  // Reduce bundle size with dynamic imports
  private reduceBundleSize() {
    // Remove unused CSS
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        const sheets = document.styleSheets;
        for (let i = 0; i < sheets.length; i++) {
          try {
            const rules = sheets[i].cssRules || sheets[i].rules;
            if (!rules) continue;
            
            // Clean up unused keyframes
            for (let j = rules.length - 1; j >= 0; j--) {
              const rule = rules[j];
              if (rule instanceof CSSKeyframesRule) {
                const animationName = rule.name;
                const isUsed = document.querySelector(`[style*="animation-name: ${animationName}"]`);
                if (!isUsed) {
                  sheets[i].deleteRule(j);
                }
              }
            }
          } catch (e) {
            // Skip cross-origin stylesheets
          }
        }
      });
    }
  }

  // Optimize video playback
  private optimizeVideoPlayback() {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
      // Pause videos when not visible
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.5 }
      );
      
      observer.observe(video);
      
      // Reduce quality on slow connections
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        if (connection && connection.effectiveType === '2g') {
          video.setAttribute('preload', 'none');
        }
      }
    });
  }

  // Measure and report performance metrics
  measurePerformance() {
    if ('PerformanceObserver' in window) {
      // Measure FCP
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log('FCP:', entry.startTime);
        }
      }).observe({ entryTypes: ['paint'] });

      // Measure LCP
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // Measure FID
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log('FID:', (entry as any).processingStart - entry.startTime);
        }
      }).observe({ entryTypes: ['first-input'] });

      // Measure CLS
      let clsValue = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            console.log('CLS:', clsValue);
          }
        }
      }).observe({ entryTypes: ['layout-shift'] });
    }
  }
}