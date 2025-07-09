import { useEffect } from 'react';

// Core Web Vitals monitoring component
export default function PerformanceOptimization() {
  useEffect(() => {
    // Preload critical resources
    const preloadResources = () => {
      // Preload Google Fonts
      const fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
      fontLink.as = 'style';
      fontLink.onload = function() { this.rel = 'stylesheet'; };
      document.head.appendChild(fontLink);

      // DNS prefetch for external resources
      const prefetchDomains = [
        'https://www.googletagmanager.com',
        'https://form.jotform.com',
        'https://calendly.com'
      ];
      
      prefetchDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = domain;
        document.head.appendChild(link);
      });

      // Preconnect to critical resources
      const preconnectLink = document.createElement('link');
      preconnectLink.rel = 'preconnect';
      preconnectLink.href = 'https://fonts.gstatic.com';
      preconnectLink.crossOrigin = 'anonymous';
      document.head.appendChild(preconnectLink);
    };

    // Core Web Vitals monitoring
    const monitorWebVitals = () => {
      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            console.log('LCP:', entry.startTime);
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'web_vitals', {
                name: 'LCP',
                value: Math.round(entry.startTime),
                event_category: 'performance'
              });
            }
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            console.log('FID:', (entry as any).processingStart - entry.startTime);
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'web_vitals', {
                name: 'FID',
                value: Math.round((entry as any).processingStart - entry.startTime),
                event_category: 'performance'
              });
            }
          }
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'web_vitals', {
              name: 'CLS',
              value: Math.round(clsValue * 1000),
              event_category: 'performance'
            });
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      }
    };

    // Page load performance tracking
    const trackPageLoad = () => {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
          
          console.log('Page Load Time:', pageLoadTime);
          
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'page_load_time', {
              value: Math.round(pageLoadTime),
              event_category: 'performance'
            });
          }

          // Alert if page load is slow
          if (pageLoadTime > 3000) {
            console.warn('Slow page load detected:', pageLoadTime + 'ms');
          }
        }, 0);
      });
    };

    // Initialize all performance optimizations
    preloadResources();
    monitorWebVitals();
    trackPageLoad();

  }, []);

  return null;
}