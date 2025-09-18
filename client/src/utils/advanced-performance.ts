// Advanced performance optimization utilities for Lighthouse 90+ scores

export interface CriticalResourceConfig {
  fonts: Array<{ href: string; format: string; weight?: string }>;
  criticalCSS: string[];
  preloadImages: Array<{ href: string; sizes?: string; media?: string }>;
  prefetchRoutes: string[];
  deferredAssets: string[];
}

export class AdvancedPerformanceOptimizer {
  private static instance: AdvancedPerformanceOptimizer;
  private isInitialized = false;
  private observer?: IntersectionObserver;

  static getInstance(): AdvancedPerformanceOptimizer {
    if (!AdvancedPerformanceOptimizer.instance) {
      AdvancedPerformanceOptimizer.instance = new AdvancedPerformanceOptimizer();
    }
    return AdvancedPerformanceOptimizer.instance;
  }

  // Initialize all performance optimizations
  initialize(config: CriticalResourceConfig) {
    if (this.isInitialized) return;
    
    this.preloadCriticalFonts(config.fonts);
    this.preloadCriticalImages(config.preloadImages);
    this.prefetchRoutes(config.prefetchRoutes);
    this.setupResourceHints();
    this.optimizeFontDisplay();
    this.preventLayoutShift();
    this.setupDeferredLoading(config.deferredAssets);
    
    this.isInitialized = true;
  }

  // Critical font preloading with font-display optimization
  private preloadCriticalFonts(fonts: Array<{ href: string; format: string; weight?: string }>) {
    fonts.forEach(font => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = font.href;
      link.as = 'font';
      link.type = `font/${font.format}`;
      link.crossOrigin = 'anonymous';
      // Force font-display: swap for faster rendering
      link.onload = () => {
        const style = document.createElement('style');
        style.textContent = `
          @font-face {
            font-family: 'Inter';
            font-weight: ${font.weight || '400'};
            font-display: swap;
            src: url('${font.href}') format('${font.format}');
          }
        `;
        document.head.appendChild(style);
      };
      document.head.appendChild(link);
    });
  }

  // Critical image preloading for LCP optimization
  private preloadCriticalImages(images: Array<{ href: string; sizes?: string; media?: string }>) {
    images.forEach(image => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = image.href;
      link.as = 'image';
      if (image.sizes) link.setAttribute('imagesizes', image.sizes);
      if (image.media) link.media = image.media;
      document.head.appendChild(link);
    });
  }

  // Prefetch likely navigation routes
  private prefetchRoutes(routes: string[]) {
    // Wait until the page is loaded to avoid blocking critical resources
    window.addEventListener('load', () => {
      setTimeout(() => {
        routes.forEach(route => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = route;
          document.head.appendChild(link);
        });
      }, 2000); // Delay to not impact initial load
    });
  }

  // Setup DNS prefetch and preconnect for external resources
  private setupResourceHints() {
    const resourceHints = [
      { rel: 'dns-prefetch', href: '//images.unsplash.com' },
      { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
      { rel: 'preconnect', href: 'https://images.unsplash.com', crossOrigin: true },
    ];

    resourceHints.forEach(hint => {
      const link = document.createElement('link');
      link.rel = hint.rel;
      link.href = hint.href;
      if ('crossOrigin' in hint) link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }

  // Optimize font loading with font-display: swap
  private optimizeFontDisplay() {
    const style = document.createElement('style');
    style.textContent = `
      /* Ensure all fonts use swap for faster rendering */
      @font-face {
        font-family: 'Inter';
        font-display: swap;
      }
      
      /* Prevent invisible text during font load */
      body {
        font-display: swap;
      }
      
      /* Critical CSS for initial render */
      .hero-section, .blog-card, .guide-card {
        font-display: swap;
        contain: layout style paint;
      }
    `;
    document.head.appendChild(style);
  }

  // Prevent Cumulative Layout Shift (CLS)
  private preventLayoutShift() {
    const style = document.createElement('style');
    style.textContent = `
      /* Prevent layout shift for images */
      img {
        max-width: 100%;
        height: auto;
      }
      
      /* Reserve space for lazy loaded images */
      .blog-card img, .guide-card img {
        aspect-ratio: 16 / 10;
        object-fit: cover;
        background: #f3f4f6;
      }
      
      /* Prevent layout shift for fonts */
      body {
        font-size-adjust: 0.5;
      }
      
      /* Stable sizing for content containers */
      .content-container {
        min-height: 200px;
        contain: layout;
      }
      
      /* Smooth height transitions */
      .card-container {
        transition: height 0.3s ease;
        will-change: auto;
      }
    `;
    document.head.appendChild(style);
  }

  // Setup deferred loading for non-critical assets
  private setupDeferredLoading(assets: string[]) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        assets.forEach(asset => {
          if (asset.endsWith('.js')) {
            const script = document.createElement('script');
            script.src = asset;
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
          } else if (asset.endsWith('.css')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = asset;
            link.media = 'print';
            link.onload = () => { link.media = 'all'; };
            document.head.appendChild(link);
          }
        });
      }, 3000);
    });
  }

  // Advanced lazy loading with Intersection Observer
  setupAdvancedLazyLoading() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          
          // Handle images
          if (element.tagName === 'IMG') {
            const img = element as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.add('loaded');
              this.observer?.unobserve(img);
            }
          }
          
          // Handle sections
          if (element.classList.contains('lazy-section')) {
            element.classList.add('loaded');
            this.observer?.unobserve(element);
          }
        }
      });
    }, {
      root: null,
      rootMargin: '50px',
      threshold: 0.1
    });

    // Observe all lazy elements
    document.querySelectorAll('img[data-src], .lazy-section').forEach(el => {
      this.observer?.observe(el);
    });
  }

  // Critical path CSS inlining for blog/guides
  inlineCriticalCSS() {
    const criticalCSS = `
      /* Critical styles for above-the-fold content */
      .hero-section { background: linear-gradient(135deg, #193a59 0%, #285d8a 100%); }
      .blog-card, .guide-card { 
        background: white; 
        border-radius: 12px; 
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .blog-card:hover, .guide-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
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

  // Performance monitoring and Core Web Vitals optimization
  optimizeCoreWebVitals() {
    // LCP Optimization
    this.optimizeLCP();
    
    // FID Optimization  
    this.optimizeFID();
    
    // CLS Optimization
    this.optimizeCLS();
  }

  private optimizeLCP() {
    // Preload hero images and fonts
    const heroImages = document.querySelectorAll('.hero-image, .blog-hero img, .guide-hero img');
    heroImages.forEach(img => {
      if (img instanceof HTMLImageElement) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = img.src || img.dataset.src || '';
        link.as = 'image';
        document.head.appendChild(link);
      }
    });
  }

  private optimizeFID() {
    // Defer non-critical JavaScript
    const scripts = document.querySelectorAll('script:not([data-critical])');
    scripts.forEach(script => {
      if (script instanceof HTMLScriptElement && !script.async && !script.defer) {
        script.defer = true;
      }
    });
  }

  private optimizeCLS() {
    // Already implemented in preventLayoutShift method
    console.log('CLS optimization applied through preventLayoutShift method');
  }

  // Cleanup resources
  destroy() {
    this.observer?.disconnect();
    this.isInitialized = false;
  }
}

// Blog/Guides specific performance configuration
export const BLOG_GUIDES_CONFIG: CriticalResourceConfig = {
  fonts: [
    { 
      href: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2',
      format: 'woff2',
      weight: '400'
    },
    {
      href: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiJ-Ek-_EeA.woff2', 
      format: 'woff2',
      weight: '600'
    }
  ],
  criticalCSS: [
    '/critical-blog.css',
    '/critical-guides.css'
  ],
  preloadImages: [
    { 
      href: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=450&fit=crop&fm=webp&q=85',
      sizes: '(max-width: 768px) 100vw, 800px'
    }
  ],
  prefetchRoutes: [
    '/guides/complete-sba-loan-guide-2025',
    '/guides/restaurant-financing-complete-guide', 
    '/blog/sba-loan-changes-2025'
  ],
  deferredAssets: [
    // Note: Only include actual files that exist in the public directory
    // '/analytics.js' and '/chat-widget.js' were causing 404 errors
  ]
};

// Initialize performance optimization
export function initAdvancedPerformance() {
  const optimizer = AdvancedPerformanceOptimizer.getInstance();
  
  // Initialize immediately for critical resources
  optimizer.initialize(BLOG_GUIDES_CONFIG);
  optimizer.inlineCriticalCSS();
  optimizer.optimizeCoreWebVitals();
  
  // Setup lazy loading after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      optimizer.setupAdvancedLazyLoading();
    });
  } else {
    optimizer.setupAdvancedLazyLoading();
  }
}

// Export singleton instance for external use
export const performanceOptimizer = AdvancedPerformanceOptimizer.getInstance();