import { useEffect } from 'react';

export default function VideoMetricsTracker() {
  useEffect(() => {
    // Track video performance metrics
    const trackVideoMetrics = () => {
      const videos = document.querySelectorAll('video');
      
      videos.forEach((video: HTMLVideoElement, index) => {
        const startTime = performance.now();
        
        // Track video loading time
        video.addEventListener('loadstart', () => {
          console.log(`Video ${index + 1} loading started`);
        });

        video.addEventListener('canplay', () => {
          const loadTime = performance.now() - startTime;
          console.log(`Video ${index + 1} ready to play in ${loadTime.toFixed(2)}ms`);
          
          // Send to analytics
          if (typeof gtag !== 'undefined') {
            gtag('event', 'video_performance', {
              event_category: 'Video',
              event_label: `Video ${index + 1} Load Time`,
              value: Math.round(loadTime)
            });
          }
        });

        video.addEventListener('loadeddata', () => {
          const dataLoadTime = performance.now() - startTime;
          console.log(`Video ${index + 1} data loaded in ${dataLoadTime.toFixed(2)}ms`);
        });

        // Track buffer health
        video.addEventListener('progress', () => {
          if (video.buffered.length > 0) {
            const bufferedEnd = video.buffered.end(video.buffered.length - 1);
            const duration = video.duration || 0;
            const bufferPercent = duration > 0 ? (bufferedEnd / duration) * 100 : 0;
            
            if (bufferPercent > 30 && !video.hasAttribute('data-buffer-healthy')) {
              video.setAttribute('data-buffer-healthy', 'true');
              console.log(`Video ${index + 1} buffer healthy: ${bufferPercent.toFixed(1)}%`);
            }
          }
        });

        // Track stalling events
        video.addEventListener('waiting', () => {
          console.warn(`Video ${index + 1} buffering...`);
        });

        video.addEventListener('stalled', () => {
          console.warn(`Video ${index + 1} stalled`);
        });
      });

      // Track overall page performance after video optimizations
      setTimeout(() => {
        if ('navigation' in performance && 'getEntriesByType' in performance) {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          
          if (navigation) {
            const metrics = {
              DNS: navigation.domainLookupEnd - navigation.domainLookupStart,
              TCP: navigation.connectEnd - navigation.connectStart,
              TLS: navigation.secureConnectionStart > 0 ? navigation.connectEnd - navigation.secureConnectionStart : 0,
              TTFB: navigation.responseStart - navigation.requestStart,
              DOMLoad: navigation.domContentLoadedEventEnd - navigation.navigationStart,
              PageLoad: navigation.loadEventEnd - navigation.navigationStart
            };

            console.log('Page Performance Metrics:', metrics);
            
            // Send to analytics
            if (typeof gtag !== 'undefined') {
              Object.entries(metrics).forEach(([key, value]) => {
                gtag('event', 'performance_metric', {
                  event_category: 'Performance',
                  event_label: key,
                  value: Math.round(value)
                });
              });
            }
          }
        }
      }, 3000);
    };

    // Initialize tracking
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', trackVideoMetrics);
    } else {
      trackVideoMetrics();
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', trackVideoMetrics);
    };
  }, []);

  return null;
}