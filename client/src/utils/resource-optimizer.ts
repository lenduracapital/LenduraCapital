// Resource optimization utilities for Lighthouse performance

export interface PreloadResource {
  href: string;
  as: 'style' | 'script' | 'font' | 'image' | 'video' | 'document';
  type?: string;
  media?: string;
  crossorigin?: 'anonymous' | 'use-credentials';
  importance?: 'high' | 'low' | 'auto';
}

export interface PrefetchResource {
  href: string;
  as?: string;
  type?: string;
}

// Font loading optimization
export class FontOptimizer {
  private fontsLoaded: Set<string> = new Set();
  
  // Preload critical fonts
  preloadFonts(fonts: Array<{ family: string; weight?: string; style?: string; format?: string }>) {
    fonts.forEach(({ family, weight = '400', style = 'normal', format = 'woff2' }) => {
      const fontUrl = `/fonts/${family.toLowerCase().replace(/\s+/g, '-')}-${weight}-${style}.${format}`;
      
      if (!this.fontsLoaded.has(fontUrl)) {
        this.preloadResource({
          href: fontUrl,
          as: 'font',
          type: `font/${format}`,
          crossorigin: 'anonymous',
          importance: 'high',
        });
        this.fontsLoaded.add(fontUrl);
      }
    });
  }

  // Load fonts with font-display: swap
  optimizeFontDisplay() {
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 100 900;
        font-display: swap;
        src: url('/fonts/inter-var.woff2') format('woff2');
      }
      
      @font-face {
        font-family: 'Inter';
        font-style: italic;
        font-weight: 100 900;
        font-display: swap;
        src: url('/fonts/inter-var-italic.woff2') format('woff2');
      }
    `;
    document.head.appendChild(style);
  }

  // Monitor font loading performance
  async trackFontLoading(fontFamily: string, timeout = 3000): Promise<boolean> {
    if (!('fonts' in document)) {
      return false;
    }

    const start = performance.now();
    
    try {
      await Promise.race([
        document.fonts.load(`1em ${fontFamily}`).catch(() => {
          throw new Error(`Font ${fontFamily} failed to load`);
        }),
        new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Font loading timeout')), timeout);
        }),
      ]);
      
      const duration = performance.now() - start;
      console.log(`Font ${fontFamily} loaded in ${duration.toFixed(2)}ms`);
      return true;
    } catch (error) {
      console.warn(`Font ${fontFamily} failed to load:`, error);
      return false;
    }
  }

  private preloadResource(resource: PreloadResource) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    
    if (resource.type) link.type = resource.type;
    if (resource.media) link.media = resource.media;
    if (resource.crossorigin) link.crossOrigin = resource.crossorigin;
    if (resource.importance) link.setAttribute('importance', resource.importance);
    
    document.head.appendChild(link);
  }
}

// Image optimization utilities
export class ImageOptimizer {
  private imageCache = new Map<string, Promise<void>>();
  
  // Generate responsive image URLs
  generateResponsiveUrls(src: string, widths: number[] = [400, 800, 1200, 1600]): string {
    const baseSrc = src.replace(/\.[^/.]+$/, '');
    
    return widths
      .map(w => `${baseSrc}-${w}w.webp ${w}w`)
      .join(', ');
  }

  // Preload critical images
  preloadCriticalImages(images: Array<{ src: string; sizes?: string; importance?: 'high' | 'low' }>) {
    images.forEach(({ src, sizes = '100vw', importance = 'high' }) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.setAttribute('imagesizes', sizes);
      link.setAttribute('importance', importance);
      
      // Add WebP source if supported
      if (this.supportsWebP()) {
        const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        link.href = webpSrc;
      }
      
      document.head.appendChild(link);
    });
  }

  // Check WebP support
  private supportsWebP(): boolean {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  // Lazy load image with performance tracking
  async loadImage(src: string): Promise<HTMLImageElement> {
    if (this.imageCache.has(src)) {
      await this.imageCache.get(src)!.catch(() => {
        // If cached promise failed, remove it and retry
        this.imageCache.delete(src);
      });
      return new Image(); // Return new instance
    }

    const loadPromise = new Promise<void>((resolve, reject) => {
      const img = new Image();
      const start = performance.now();
      
      img.onload = () => {
        const duration = performance.now() - start;
        console.log(`Image ${src} loaded in ${duration.toFixed(2)}ms`);
        resolve();
      };
      
      img.onerror = () => {
        console.warn(`Failed to load image: ${src}`);
        reject(new Error(`Failed to load image: ${src}`));
      };
      
      img.src = src;
    });

    this.imageCache.set(src, loadPromise);
    
    try {
      await loadPromise;
    } catch (error) {
      // Remove failed promise from cache and create fallback image
      this.imageCache.delete(src);
      console.warn(`Image loading failed for ${src}, returning fallback`);
    }
    
    const img = new Image();
    img.src = src;
    return img;
  }

  // Convert image to WebP if supported
  async convertToWebP(src: string, quality = 0.85): Promise<string> {
    if (!this.supportsWebP()) {
      return src;
    }

    try {
      const response = await fetch(src).catch(() => {
        throw new Error('Failed to fetch image for WebP conversion');
      });
      const blob = await response.blob().catch(() => {
        throw new Error('Failed to get blob from response');
      });
      
      return new Promise<string>((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          resolve(src);
          return;
        }
        
        const img = new Image();
        
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          
          canvas.toBlob(
            (webpBlob) => {
              if (webpBlob) {
                resolve(URL.createObjectURL(webpBlob));
              } else {
                resolve(src);
              }
            },
            'image/webp',
            quality
          );
        };
        
        img.onerror = () => {
          resolve(src); // Fallback to original on error
        };
        
        img.src = URL.createObjectURL(blob);
      }).catch(() => {
        console.warn('WebP conversion failed, falling back to original');
        return src;
      });
    } catch (error) {
      console.warn('WebP conversion failed:', error);
      return src;
    }
  }
}

// Critical CSS optimization
export class CSSOptimizer {

  // Extract and inline critical CSS
  inlineCriticalCSS(css: string) {
    const style = document.createElement('style');
    style.textContent = css;
    style.setAttribute('data-critical', 'true');
    document.head.appendChild(style);
  }

  // Load non-critical CSS asynchronously
  loadNonCriticalCSS(href: string) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    link.onload = () => {
      link.rel = 'stylesheet';
    };
    document.head.appendChild(link);
  }

  // Purge unused CSS (runtime detection)
  detectUnusedCSS(): string[] {
    const allElements = document.querySelectorAll('*');
    const usedClasses = new Set<string>();
    
    allElements.forEach((el) => {
      const classList = el.className;
      if (typeof classList === 'string') {
        classList.split(/\s+/).forEach((cls) => {
          if (cls) usedClasses.add(cls);
        });
      }
    });

    const stylesheets = Array.from(document.styleSheets);
    const unusedRules: string[] = [];

    stylesheets.forEach((stylesheet) => {
      try {
        const rules = Array.from(stylesheet.cssRules || []);
        rules.forEach((rule) => {
          if (rule.type === CSSRule.STYLE_RULE) {
            const styleRule = rule as CSSStyleRule;
            const selector = styleRule.selectorText;
            
            // Simple check for unused classes (can be enhanced)
            if (selector.startsWith('.') && !usedClasses.has(selector.slice(1))) {
              unusedRules.push(selector);
            }
          }
        });
      } catch (e) {
        // Cross-origin stylesheets can't be accessed
        console.warn('Cannot analyze cross-origin stylesheet');
      }
    });

    return unusedRules;
  }
}

// Resource preloader and manager
export class ResourcePreloader {
  private fontOptimizer = new FontOptimizer();
  private imageOptimizer = new ImageOptimizer();

  // Initialize critical resource loading
  initializeCriticalResources() {
    // Preload critical fonts
    this.fontOptimizer.preloadFonts([
      { family: 'Inter', weight: '400', format: 'woff2' },
      { family: 'Inter', weight: '600', format: 'woff2' },
      { family: 'Inter', weight: '700', format: 'woff2' },
    ]);

    // Optimize font display
    this.fontOptimizer.optimizeFontDisplay();

    // Preload critical images (hero, above-the-fold)
    this.imageOptimizer.preloadCriticalImages([
      { src: '/hero-800w.webp', sizes: '100vw', importance: 'high' },
      { src: '/logo.svg', importance: 'high' },
    ]);

    // DNS prefetch for external resources
    this.prefetchDNS([
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ]);
  }

  // Preload resources for next page navigation
  preloadNextPage(route: string) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    document.head.appendChild(link);
  }

  // DNS prefetch for external domains
  private prefetchDNS(domains: string[]) {
    domains.forEach((domain) => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });
  }

  // Preconnect to critical third-party origins
  preconnectOrigins(origins: string[]) {
    origins.forEach((origin) => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = origin;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }

  // Module preloading for critical JavaScript
  preloadModules(modules: string[]) {
    modules.forEach((moduleSrc) => {
      const link = document.createElement('link');
      link.rel = 'modulepreload';
      link.href = moduleSrc;
      document.head.appendChild(link);
    });
  }

  // Get resource loading performance report
  getResourceReport() {
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    const report = {
      totalResources: resources.length,
      slowResources: resources.filter(r => r.duration > 1000),
      largeResources: resources.filter(r => (r.transferSize || 0) > 100 * 1024), // >100KB
      images: resources.filter(r => r.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)),
      fonts: resources.filter(r => r.name.match(/\.(woff|woff2|ttf|otf)$/i)),
      scripts: resources.filter(r => r.name.match(/\.js$/i)),
      styles: resources.filter(r => r.name.match(/\.css$/i)),
    };

    return {
      ...report,
      recommendations: this.generateRecommendations(report),
    };
  }

  private generateRecommendations(report: any) {
    const recommendations: string[] = [];

    if (report.slowResources.length > 0) {
      recommendations.push(`${report.slowResources.length} resources took >1s to load`);
    }

    if (report.largeResources.length > 0) {
      recommendations.push(`${report.largeResources.length} resources are >100KB`);
    }

    if (report.images.length > 10) {
      recommendations.push(`Consider image optimization - ${report.images.length} images loaded`);
    }

    return recommendations;
  }
}

// Export singleton instances
export const fontOptimizer = new FontOptimizer();
export const imageOptimizer = new ImageOptimizer();
export const cssOptimizer = new CSSOptimizer();
export const resourcePreloader = new ResourcePreloader();

// Initialize critical resources on load with error handling
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    try {
      resourcePreloader.initializeCriticalResources();
    } catch (error) {
      console.warn('Failed to initialize critical resources:', error);
    }
  });
  
  // Add development error handler for unhandled rejections
  if (import.meta.env.DEV) {
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      // Prevent the default behavior to avoid console spam
      event.preventDefault();
    });
  }
}

// Performance budget checker
export function checkPerformanceBudget() {
  const budget = {
    maxJSSize: 500 * 1024, // 500KB
    maxCSSSize: 100 * 1024, // 100KB
    maxImageSize: 2 * 1024 * 1024, // 2MB total
    maxFonts: 4,
    maxRequests: 50,
  };

  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  
  const jsSize = resources
    .filter(r => r.name.includes('.js'))
    .reduce((acc, r) => acc + (r.transferSize || 0), 0);
    
  const cssSize = resources
    .filter(r => r.name.includes('.css'))
    .reduce((acc, r) => acc + (r.transferSize || 0), 0);
    
  const imageSize = resources
    .filter(r => r.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i))
    .reduce((acc, r) => acc + (r.transferSize || 0), 0);
    
  const fontCount = resources
    .filter(r => r.name.match(/\.(woff|woff2|ttf|otf)$/i))
    .length;

  const violations: string[] = [];
  
  if (jsSize > budget.maxJSSize) {
    violations.push(`JS bundle too large: ${Math.round(jsSize / 1024)}KB (limit: ${budget.maxJSSize / 1024}KB)`);
  }
  
  if (cssSize > budget.maxCSSSize) {
    violations.push(`CSS bundle too large: ${Math.round(cssSize / 1024)}KB (limit: ${budget.maxCSSSize / 1024}KB)`);
  }
  
  if (imageSize > budget.maxImageSize) {
    violations.push(`Images too large: ${Math.round(imageSize / 1024 / 1024)}MB (limit: ${budget.maxImageSize / 1024 / 1024}MB)`);
  }
  
  if (fontCount > budget.maxFonts) {
    violations.push(`Too many fonts: ${fontCount} (limit: ${budget.maxFonts})`);
  }
  
  if (resources.length > budget.maxRequests) {
    violations.push(`Too many requests: ${resources.length} (limit: ${budget.maxRequests})`);
  }

  return {
    passed: violations.length === 0,
    violations,
    current: { jsSize, cssSize, imageSize, fontCount, requestCount: resources.length },
    budget,
  };
}