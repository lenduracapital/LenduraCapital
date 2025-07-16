import { useEffect, useState } from 'react';
import videoPath from "@assets/Video (FundTek)_1751295081956.webm";

// Performance optimization class
export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  private videoCache: Map<string, HTMLVideoElement> = new Map();
  private imageCache: Map<string, HTMLImageElement> = new Map();
  private preloadedResources: Set<string> = new Set();

  static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }

  // Preload critical video assets
  preloadVideo(src: string): Promise<HTMLVideoElement> {
    return new Promise((resolve, reject) => {
      if (this.videoCache.has(src)) {
        resolve(this.videoCache.get(src)!);
        return;
      }

      const video = document.createElement('video');
      video.src = src;
      video.muted = true;
      video.playsInline = true;
      video.preload = 'metadata';
      
      const handleCanPlay = () => {
        this.videoCache.set(src, video);
        this.preloadedResources.add(src);
        resolve(video);
      };

      const handleError = () => {
        reject(new Error(`Failed to preload video: ${src}`));
      };

      video.addEventListener('canplaythrough', handleCanPlay, { once: true });
      video.addEventListener('error', handleError, { once: true });
      
      video.load();
    });
  }

  // Preload critical images
  preloadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      if (this.imageCache.has(src)) {
        resolve(this.imageCache.get(src)!);
        return;
      }

      const img = document.createElement('img');
      img.src = src;
      
      const handleLoad = () => {
        this.imageCache.set(src, img);
        this.preloadedResources.add(src);
        resolve(img);
      };

      const handleError = () => {
        reject(new Error(`Failed to preload image: ${src}`));
      };

      img.addEventListener('load', handleLoad, { once: true });
      img.addEventListener('error', handleError, { once: true });
    });
  }

  // Check if resource is preloaded
  isResourcePreloaded(src: string): boolean {
    return this.preloadedResources.has(src);
  }

  // Buffer management for videos
  manageVideoBuffer(video: HTMLVideoElement) {
    if ('requestVideoFrameCallback' in video) {
      const optimizeBuffer = () => {
        const buffered = video.buffered;
        const currentTime = video.currentTime;
        const duration = video.duration;
        
        // If we have enough buffer ahead and behind, we're good
        if (buffered.length > 0) {
          const bufferEnd = buffered.end(buffered.length - 1);
          const bufferStart = buffered.start(0);
          
          // Maintain 10 seconds of buffer ahead
          const targetBuffer = Math.min(currentTime + 10, duration);
          
          if (bufferEnd >= targetBuffer) {
            console.log('Video buffering - optimized');
            return;
          }
        }
        
        // Continue buffering
        if (!video.paused && !video.ended) {
          video.requestVideoFrameCallback(optimizeBuffer);
        }
      };
      
      video.requestVideoFrameCallback(optimizeBuffer);
    }
  }
}

// Hook for performance optimization
export function usePerformanceOptimization() {
  const [optimizer] = useState(() => PerformanceOptimizer.getInstance());
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeOptimization = async () => {
      try {
        // Preload critical video immediately
        await optimizer.preloadVideo(videoPath);
        
        // Add connection optimization
        const preconnectDomains = [
          'https://fonts.googleapis.com',
          'https://fonts.gstatic.com',
          'https://form.jotform.com',
          'https://www.googletagmanager.com'
        ];

        preconnectDomains.forEach(domain => {
          const link = document.createElement('link');
          link.rel = 'preconnect';
          link.href = domain;
          link.crossOrigin = 'anonymous';
          document.head.appendChild(link);
        });

        // Add resource hints
        const resourceHints = [
          { href: videoPath, as: 'video', type: 'video/webm' },
          { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', as: 'style' }
        ];

        resourceHints.forEach(hint => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.href = hint.href;
          link.as = hint.as;
          if (hint.type) link.type = hint.type;
          document.head.appendChild(link);
        });

        setIsInitialized(true);
      } catch (error) {
        console.warn('Performance optimization initialization failed:', error);
        setIsInitialized(true); // Still set as initialized to prevent blocking
      }
    };

    initializeOptimization();
  }, [optimizer]);

  return { optimizer, isInitialized };
}