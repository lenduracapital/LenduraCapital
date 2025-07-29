// Critical resource loading optimization

// Define which resources are critical for first paint
const CRITICAL_RESOURCES = [
  // Critical CSS - already handled by Vite
  // Logo - needed for header
  '/assets/ChatGPT%20Image%20Jun%205,%202025,%2012_13_54%20PM_1752722086552.png',
  // Hero background if small
  '/assets/image_1752182868701.png'
];

// Large resources that should be deferred
const DEFER_RESOURCES = [
  '/assets/pexels-kindelmedia-7979438_1752763530596.jpg', // 2.7MB
  '/assets/pexels-tima-miroshnichenko-6169650_1752763276873.jpg', // 2.0MB
  '/assets/pexels-imin-technology-276315592-12935045_1752762977147.jpg', // 1.9MB
  '/attached_assets/Video (FundTek)_1751295081956.webm' // Video file
];

export function prioritizeResourceLoading() {
  if (typeof window === 'undefined') return;

  // Preload critical resources immediately
  CRITICAL_RESOURCES.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = resource.includes('.png') || resource.includes('.jpg') ? 'image' : 'fetch';
    link.href = resource;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });

  // Add resource hints for better loading
  const dnsPreconnect = document.createElement('link');
  dnsPreconnect.rel = 'dns-prefetch';
  dnsPreconnect.href = '//fonts.googleapis.com';
  document.head.appendChild(dnsPreconnect);

  // Defer heavy resources until after critical path
  window.addEventListener('load', () => {
    // Start loading deferred resources 2 seconds after page load
    setTimeout(() => {
      DEFER_RESOURCES.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = resource;
        document.head.appendChild(link);
      });
    }, 2000);
  });
}

// Initialize performance timeline
export function initPerformanceTimeline() {
  if (typeof window === 'undefined' || !window.performance) return;

  // Mark critical milestones
  performance.mark('app-start');
  
  // Log performance when everything is loaded
  window.addEventListener('load', () => {
    performance.mark('app-loaded');
    
    // Measure performance
    try {
      performance.measure('app-load-time', 'app-start', 'app-loaded');
      const measure = performance.getEntriesByName('app-load-time')[0];
      console.log(`🚀 FundTek app loaded in ${Math.round(measure.duration)}ms`);
      
      // Performance logged to console only
    } catch (e) {
      // Performance API not fully supported
    }
  });
}