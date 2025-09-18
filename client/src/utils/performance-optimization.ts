// Comprehensive performance optimization utilities for Lighthouse 70+ scores

export interface PerformanceConfig {
  enableServiceWorker: boolean;
  enableImageOptimization: boolean;
  enableResourceHints: boolean;
  enableCriticalCSS: boolean;
  enableLazyLoading: boolean;
  enableFontOptimization: boolean;
}

export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  private config: PerformanceConfig;
  private observer?: IntersectionObserver;

  constructor(config: PerformanceConfig) {
    this.config = config;
  }

  static getInstance(config?: PerformanceConfig): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer(
        config || {
          enableServiceWorker: true,
          enableImageOptimization: true,
          enableResourceHints: true,
          enableCriticalCSS: true,
          enableLazyLoading: true,
          enableFontOptimization: true,
        }
      );
    }
    return PerformanceOptimizer.instance;
  }

  // Initialize all performance optimizations
  async initialize() {
    console.log('🚀 Initializing performance optimizations...');
    
    try {
      await Promise.all([
        this.optimizeResourceLoading(),
        this.setupIntersectionObserver(),
        this.optimizeFontLoading(),
        this.preloadCriticalResources(),
        this.setupServiceWorker(),
        this.monitorPerformance(),
      ]);
      
      console.log('✅ Performance optimizations initialized successfully');
    } catch (error) {
      console.warn('⚠️ Some performance optimizations failed:', error);
    }
  }

  // Optimize resource loading and network dependencies
  private async optimizeResourceLoading() {
    if (!this.config.enableResourceHints) return;

    // Add resource hints for critical third-party domains
    const resourceHints = [
      { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
      { rel: 'dns-prefetch', href: '//www.googletagmanager.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: true },
    ];

    resourceHints.forEach(hint => {
      const link = document.createElement('link');
      link.rel = hint.rel;
      link.href = hint.href;
      if ('crossOrigin' in hint) link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Prefetch likely navigation targets (after page load)
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.prefetchLikelyPages();
      }, 2000);
    });
  }

  // Setup intersection observer for advanced lazy loading
  private setupIntersectionObserver() {
    if (!this.config.enableLazyLoading) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            
            // Handle images
            if (element.tagName === 'IMG') {
              this.loadImage(element as HTMLImageElement);
            }
            
            // Handle sections for progressive enhancement
            if (element.classList.contains('lazy-section')) {
              element.classList.add('loaded');
              this.observer?.unobserve(element);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    // Observe all lazy elements
    document.querySelectorAll('img[data-src], .lazy-section').forEach(el => {
      this.observer?.observe(el);
    });
  }

  // Load images with modern format support
  private loadImage(img: HTMLImageElement) {
    if (img.dataset.src) {
      // Check for WebP support and use modern formats
      if (this.supportsWebP() && img.dataset.webp) {
        img.src = img.dataset.webp;
      } else if (this.supportsAVIF() && img.dataset.avif) {
        img.src = img.dataset.avif;
      } else {
        img.src = img.dataset.src;
      }
      
      img.classList.add('loaded');
      this.observer?.unobserve(img);
    }
  }

  // Check WebP support
  private supportsWebP(): boolean {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('webp') > -1;
  }

  // Check AVIF support
  private supportsAVIF(): boolean {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    return canvas.toDataURL('image/avif').indexOf('avif') > -1;
  }

  // Optimize font loading with font-display: swap
  private optimizeFontLoading() {
    if (!this.config.enableFontOptimization) return;

    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Inter';
        font-display: swap;
      }
      
      /* Prevent invisible text during font load */
      body {
        font-display: swap;
      }
      
      /* Critical font preloading */
      .hero-title, h1, h2 {
        font-display: swap;
      }
    `;
    document.head.appendChild(style);
  }

  // Preload critical resources for LCP optimization
  private preloadCriticalResources() {
    // Preload hero images and critical assets
    const criticalImages = document.querySelectorAll('.hero-image, [data-priority="high"]');
    criticalImages.forEach(img => {
      if (img instanceof HTMLImageElement) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = img.src || img.dataset.src || '';
        link.as = 'image';
        link.setAttribute('fetchpriority', 'high');
        document.head.appendChild(link);
      }
    });
  }

  // Setup service worker for caching
  private async setupServiceWorker() {
    if (!this.config.enableServiceWorker || !('serviceWorker' in navigator)) return;

    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('✅ Service Worker registered:', registration);
    } catch (error) {
      console.warn('⚠️ Service Worker registration failed:', error);
    }
  }

  // Monitor Core Web Vitals
  private monitorPerformance() {
    // LCP monitoring
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('📊 LCP:', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // FID monitoring
    new PerformanceObserver((entryList) => {
      entryList.getEntries().forEach((entry) => {
        console.log('📊 FID:', entry.processingStart - entry.startTime);
      });
    }).observe({ entryTypes: ['first-input'] });

    // CLS monitoring
    new PerformanceObserver((entryList) => {
      let clsValue = 0;
      entryList.getEntries().forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      console.log('📊 CLS:', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
  }

  // Prefetch likely pages based on user behavior
  private prefetchLikelyPages() {
    const likelyPages = [
      '/solutions',
      '/apply-now',
      '/contact',
      '/about'
    ];

    likelyPages.forEach(page => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = page;
      document.head.appendChild(link);
    });
  }

  // Critical CSS inlining
  inlineCriticalCSS() {
    if (!this.config.enableCriticalCSS) return;

    const criticalCSS = `
      /* Critical above-the-fold styles */
      .hero-section {
        background: linear-gradient(135deg, #193a59 0%, #285d8a 100%);
        contain: layout style paint;
      }
      
      .hero-title {
        font-size: clamp(2.25rem, 6vw, 4rem);
        font-weight: 700;
        line-height: 1.1;
        color: white;
        contain: layout style paint;
        font-display: swap;
      }
      
      /* Loading states */
      .loading-skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, transparent 37%, #f0f0f0 63%);
        background-size: 400% 100%;
        animation: loading 1.4s ease infinite;
      }
      
      @keyframes loading {
        0% { background-position: 100% 50%; }
        100% { background-position: -100% 50%; }
      }
    `;

    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.appendChild(style);
  }

  // Cleanup
  destroy() {
    this.observer?.disconnect();
  }
}

// Initialize performance optimization on page load
export function initPerformanceOptimization() {
  const optimizer = PerformanceOptimizer.getInstance();
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      optimizer.initialize();
      optimizer.inlineCriticalCSS();
    });
  } else {
    optimizer.initialize();
    optimizer.inlineCriticalCSS();
  }
}

// Export for use in main app
export const performanceOptimizer = PerformanceOptimizer.getInstance();