// Core Web Vitals monitoring - invisible performance tracking
(function() {
  'use strict';
  
  let vitalsData = {};
  
  // Measure and report Core Web Vitals
  function measureCoreWebVitals() {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        vitalsData.lcp = lastEntry.startTime;
        
        if (vitalsData.lcp > 2500) {
          reportVital('LCP', vitalsData.lcp, 2500);
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      
      // First Input Delay (FID) / Interaction to Next Paint (INP)
      const fidObserver = new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry) => {
          vitalsData.fid = entry.processingStart - entry.startTime;
          
          if (vitalsData.fid > 100) {
            reportVital('FID', vitalsData.fid, 100);
          }
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      
      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        
        vitalsData.cls = clsValue;
        
        if (clsValue > 0.1) {
          reportVital('CLS', clsValue, 0.1);
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
    
    // Time to First Byte (TTFB)
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        vitalsData.ttfb = navigation.responseStart - navigation.requestStart;
        
        if (vitalsData.ttfb > 800) {
          reportVital('TTFB', vitalsData.ttfb, 800);
        }
      }
    });
  }
  
  function reportVital(metric, value, threshold) {
    fetch('/api/performance-alerts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        metric,
        value,
        threshold,
        url: window.location.pathname,
        timestamp: Date.now()
      }),
      keepalive: true
    }).catch(() => {}); // Silent fail
  }
  
  // Initialize monitoring
  measureCoreWebVitals();
  
  // Send final report on page unload
  window.addEventListener('beforeunload', () => {
    if (Object.keys(vitalsData).length > 0) {
      navigator.sendBeacon('/api/performance-report', JSON.stringify({
        vitals: vitalsData,
        url: window.location.pathname,
        timestamp: Date.now()
      }));
    }
  });
})();