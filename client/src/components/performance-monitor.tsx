import { useEffect } from "react";

export default function PerformanceMonitor() {
  useEffect(() => {
    // Core Web Vitals monitoring
    const observeWebVitals = () => {
      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'LCP',
              value: Math.round(lastEntry.startTime),
              custom_parameter: lastEntry.startTime < 2500 ? 'good' : lastEntry.startTime < 4000 ? 'needs_improvement' : 'poor'
            });
          }
        });
        
        try {
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          // Fallback for older browsers
          console.log('LCP observer not supported');
        }

        // First Input Delay (FID) / Interaction to Next Paint (INP)
        const fidObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            const fid = entry.processingStart - entry.startTime;
            
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'web_vitals', {
                event_category: 'Web Vitals',
                event_label: 'FID',
                value: Math.round(fid),
                custom_parameter: fid < 100 ? 'good' : fid < 300 ? 'needs_improvement' : 'poor'
              });
            }
          });
        });

        try {
          fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {
          console.log('FID observer not supported');
        }

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        let clsEntries: any[] = [];
        
        const clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsEntries.push(entry);
              clsValue += entry.value;
            }
          });
          
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'CLS',
              value: Math.round(clsValue * 1000),
              custom_parameter: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs_improvement' : 'poor'
            });
          }
        });

        try {
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
          console.log('CLS observer not supported');
        }

        // Time to First Byte (TTFB)
        window.addEventListener('load', () => {
          const navTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          if (navTiming) {
            const ttfb = navTiming.responseStart - navTiming.requestStart;
            
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'web_vitals', {
                event_category: 'Web Vitals',
                event_label: 'TTFB',
                value: Math.round(ttfb),
                custom_parameter: ttfb < 600 ? 'good' : ttfb < 1000 ? 'needs_improvement' : 'poor'
              });
            }
          }
        });

        // Resource loading performance
        const resourceObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.name.includes('.js') || entry.name.includes('.css')) {
              const duration = entry.responseEnd - entry.startTime;
              
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'resource_timing', {
                  event_category: 'Performance',
                  event_label: entry.name.split('/').pop() || 'unknown',
                  value: Math.round(duration)
                });
              }
            }
          });
        });

        try {
          resourceObserver.observe({ entryTypes: ['resource'] });
        } catch (e) {
          console.log('Resource observer not supported');
        }
      }
    };

    // Initialize monitoring after a short delay
    const timer = setTimeout(observeWebVitals, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Monitor user engagement metrics
  useEffect(() => {
    let startTime = Date.now();
    let isActive = true;
    
    const trackEngagement = () => {
      const sessionDuration = Math.round((Date.now() - startTime) / 1000);
      
      if (typeof window !== 'undefined' && (window as any).gtag && sessionDuration > 10) {
        (window as any).gtag('event', 'user_engagement', {
          event_category: 'Engagement',
          engagement_time_msec: sessionDuration * 1000
        });
      }
    };

    // Track scroll depth
    const trackScrollDepth = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > 0 && scrollPercent % 25 === 0 && typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'scroll_depth', {
          event_category: 'Engagement',
          event_label: `${scrollPercent}%`,
          value: scrollPercent
        });
      }
    };

    // Page visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isActive = false;
        trackEngagement();
      } else {
        isActive = true;
        startTime = Date.now();
      }
    };

    // Event listeners
    window.addEventListener('scroll', trackScrollDepth, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', trackEngagement);

    return () => {
      window.removeEventListener('scroll', trackScrollDepth);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', trackEngagement);
    };
  }, []);

  return null;
}