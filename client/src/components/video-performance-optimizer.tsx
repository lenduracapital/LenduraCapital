import { useEffect } from 'react';

export default function VideoPerformanceOptimizer() {
  useEffect(() => {
    // Advanced video performance optimizations
    const optimizeVideoPerformance = () => {
      // Implement video buffer management
      const videos = document.querySelectorAll('video');
      
      videos.forEach((video: HTMLVideoElement) => {
        // Optimize buffer size for better performance
        if ('buffered' in video) {
          video.addEventListener('progress', () => {
            if (video.buffered.length > 0) {
              const bufferedEnd = video.buffered.end(video.buffered.length - 1);
              const duration = video.duration;
              
              // If we've buffered more than 30% of video, we can start playing smoothly
              if (bufferedEnd / duration > 0.3 && video.readyState >= 3) {
                video.style.opacity = '1';
                video.classList.add('loaded');
              }
            }
          });
        }

        // Pause video when not in viewport to save resources
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.target === video) {
                if (entry.isIntersecting) {
                  if (video.paused) {
                    video.play().catch(() => {});
                  }
                } else {
                  // Pause when not visible to save bandwidth and CPU
                  if (!video.paused) {
                    video.pause();
                  }
                }
              }
            });
          },
          { threshold: 0.1 }
        );

        observer.observe(video);

        // Clean up observer on unmount
        return () => observer.disconnect();
      });

      // Prefetch video metadata for faster loading
      const prefetchVideoMetadata = () => {
        const videoSources = [
          '/attached_assets/Video (FundTek)_1751295081956.webm'
        ];

        videoSources.forEach((src) => {
          const video = document.createElement('video');
          video.preload = 'metadata';
          video.src = src;
          video.load();
        });
      };

      // Only prefetch on fast connections
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        if (connection && connection.effectiveType && 
            ['4g', 'slow-2g'].includes(connection.effectiveType)) {
          prefetchVideoMetadata();
        }
      } else {
        // Fallback for browsers without Network Information API
        prefetchVideoMetadata();
      }
    };

    // Run optimization after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', optimizeVideoPerformance);
    } else {
      optimizeVideoPerformance();
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', optimizeVideoPerformance);
    };
  }, []);

  return null;
}