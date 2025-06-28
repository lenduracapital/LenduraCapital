// Advanced performance optimization utilities
export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  private intersectionObserver?: IntersectionObserver;
  private imageCache = new Map<string, HTMLImageElement>();

  static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }

  // Optimize video loading with buffer management
  optimizeVideoElement(video: HTMLVideoElement): void {
    // Set optimal buffer settings
    video.preload = 'metadata';
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('x5-playsinline', 'true');
    video.setAttribute('x5-video-player-type', 'h5');
    video.setAttribute('x5-video-player-fullscreen', 'false');
    
    // Enable hardware acceleration
    video.style.transform = 'translateZ(0)';
    video.style.willChange = 'transform, opacity';
    
    // Progressive loading
    this.setupProgressiveVideoLoad(video);
  }

  private setupProgressiveVideoLoad(video: HTMLVideoElement): void {
    // Load video in chunks for smoother experience
    video.addEventListener('loadstart', () => {
      video.style.opacity = '0';
    });

    video.addEventListener('canplay', () => {
      video.style.transition = 'opacity 0.6s ease-in-out';
      video.style.opacity = '1';
      video.classList.add('loaded');
    });

    // Pause video when not visible to save bandwidth
    this.setupVideoVisibilityOptimization(video);
  }

  private setupVideoVisibilityOptimization(video: HTMLVideoElement): void {
    if (!this.intersectionObserver) {
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const videoElement = entry.target as HTMLVideoElement;
            if (entry.isIntersecting) {
              videoElement.play().catch(() => {
                // Fallback for autoplay restrictions
                videoElement.muted = true;
                videoElement.play();
              });
            } else {
              videoElement.pause();
            }
          });
        },
        { threshold: 0.25 }
      );
    }
    this.intersectionObserver.observe(video);
  }

  // Optimize images with lazy loading and WebP support
  optimizeImage(img: HTMLImageElement, src: string): void {
    // Check WebP support
    const supportsWebP = this.checkWebPSupport();
    
    // Use optimized format if available
    const optimizedSrc = supportsWebP && src.includes('.jpg') ? 
      src.replace('.jpg', '.webp') : src;
    
    // Implement lazy loading
    if ('loading' in HTMLImageElement.prototype) {
      img.loading = 'lazy';
    } else {
      this.setupLazyLoading(img);
    }
    
    // Cache images
    this.cacheImage(optimizedSrc);
    
    // Set decode hint
    img.decoding = 'async';
    img.style.transform = 'translateZ(0)';
    
    img.src = optimizedSrc;
  }

  private checkWebPSupport(): boolean {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  private setupLazyLoading(img: HTMLImageElement): void {
    if (!this.intersectionObserver) {
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const imgElement = entry.target as HTMLImageElement;
              const src = imgElement.dataset.src;
              if (src) {
                imgElement.src = src;
                imgElement.removeAttribute('data-src');
                this.intersectionObserver?.unobserve(imgElement);
              }
            }
          });
        },
        { rootMargin: '50px' }
      );
    }
    this.intersectionObserver.observe(img);
  }

  private cacheImage(src: string): void {
    if (!this.imageCache.has(src)) {
      const img = new Image();
      img.src = src;
      this.imageCache.set(src, img);
    }
  }

  // Critical resource preloading
  preloadCriticalResources(): void {
    // Preload critical fonts
    this.preloadFont('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2');
    
    // Preload critical images
    this.preloadImage('/attached_assets/image_1750955621069.png');
    this.preloadImage('/attached_assets/ChatGPT Image Jun 5, 2025, 12_13_54 PM_1750718184734.png');
  }

  private preloadFont(href: string): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    link.href = href;
    document.head.appendChild(link);
  }

  private preloadImage(src: string): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  }

  // Bundle optimization helpers
  setupComponentOptimization(): void {
    // Add CSS containment for better rendering performance
    const style = document.createElement('style');
    style.textContent = `
      .component-container { contain: layout style paint; }
      .heavy-component { contain: strict; }
      .scroll-container { contain: layout style; }
    `;
    document.head.appendChild(style);
  }

  // Memory cleanup
  cleanup(): void {
    this.intersectionObserver?.disconnect();
    this.imageCache.clear();
  }
}

// Initialize performance optimizations
export const performanceOptimizer = PerformanceOptimizer.getInstance();