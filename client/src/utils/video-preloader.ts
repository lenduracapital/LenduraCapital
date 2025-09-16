// Advanced video preloading utility for optimal performance

interface VideoPreloaderOptions {
  videoSources: {
    mp4720: string;
    mp4480: string;
    fallback: string;
  };
  poster: string;
}

export class VideoPreloader {
  private static instance: VideoPreloader;
  private preloadedSources = new Set<string>();
  
  public static getInstance(): VideoPreloader {
    if (!VideoPreloader.instance) {
      VideoPreloader.instance = new VideoPreloader();
    }
    return VideoPreloader.instance;
  }

  public preloadVideo(options: VideoPreloaderOptions): Promise<void> {
    return new Promise((resolve) => {
      const { videoSources, poster } = options;
      
      // Determine best quality based on device and connection
      const isMobile = window.innerWidth <= 768;
      let bestSource = videoSources.mp4480; // Default to mobile quality
      
      // Check connection speed
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        if (connection && !isMobile) {
          if (connection.effectiveType === '4g' || 
              connection.effectiveType === 'high' ||
              (connection.downlink && connection.downlink > 2)) {
            bestSource = videoSources.mp4720;
          }
        }
      } else if (!isMobile) {
        bestSource = videoSources.mp4720;
      }

      // Preload poster first (small file, immediate visual feedback)
      const posterImg = new Image();
      posterImg.onload = () => {
        this.preloadedSources.add(poster);
        
        // Then preload the selected video
        if (!this.preloadedSources.has(bestSource)) {
          const video = document.createElement('video');
          video.preload = 'metadata';
          video.src = bestSource;
          video.muted = true;
          
          video.addEventListener('loadedmetadata', () => {
            this.preloadedSources.add(bestSource);
            resolve();
          });
          
          video.addEventListener('error', () => {
            // Fallback to lower quality if high quality fails
            if (bestSource === videoSources.mp4720) {
              video.src = videoSources.mp4480;
            } else {
              resolve(); // Still resolve to prevent hanging
            }
          });
          
          video.load();
        } else {
          resolve();
        }
      };
      
      posterImg.src = poster;
    });
  }

  public isPreloaded(source: string): boolean {
    return this.preloadedSources.has(source);
  }
}

// Export singleton instance
export const videoPreloader = VideoPreloader.getInstance();