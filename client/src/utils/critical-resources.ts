// Critical resource loading optimization

// Define which resources are critical for first paint
const CRITICAL_RESOURCES = [
  // Critical CSS - already handled by Vite
  // Logo - needed for header
  '/attached_assets/ChatGPT Image Jun 5, 2025, 12_13_54 PM_1752722086552.png',
  // Hero background if small
  '/attached_assets/pexels-mikhail-nilov-6963857 (1)_1752762912598.jpg'
];

// Video resources for preloading (using actual available files)
const VIDEO_RESOURCES = [
  '/attached_assets/pexels-mikhail-nilov-6963857 (1)_1752762912598.jpg', // Poster image - preload immediately
  '/attached_assets/Video (FundTek)_1751295081956.webm' // Main video file
];

// Large resources that should be deferred
const DEFER_RESOURCES = [
  '/assets/pexels-kindelmedia-7979438_1752763530596.jpg', // 2.7MB
  '/assets/pexels-tima-miroshnichenko-6169650_1752763276873.jpg', // 2.0MB
  '/assets/pexels-imin-technology-276315592-12935045_1752762977147.jpg', // 1.9MB
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

  // Preload video poster immediately for faster video loading experience
  const posterLink = document.createElement('link');
  posterLink.rel = 'preload';
  posterLink.as = 'image';
  posterLink.href = '/attached_assets/pexels-mikhail-nilov-6963857 (1)_1752762912598.jpg';
  posterLink.crossOrigin = 'anonymous';
  document.head.appendChild(posterLink);

  // Add resource hints for better loading
  const dnsPreconnect = document.createElement('link');
  dnsPreconnect.rel = 'dns-prefetch';
  dnsPreconnect.href = '//fonts.googleapis.com';
  document.head.appendChild(dnsPreconnect);

  // Intelligently preload video based on connection and device
  const preloadVideo = () => {
    // Check connection speed and device type
    const isMobile = window.innerWidth <= 768;
    let connectionSpeed = 'fast';
    
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection && (
        connection.effectiveType === '3g' || 
        connection.effectiveType === '2g' || 
        connection.effectiveType === 'slow-2g' ||
        (connection.downlink && connection.downlink < 1.5)
      )) {
        connectionSpeed = 'slow';
      }
    }

    // Preload appropriate video quality
    const videoLink = document.createElement('link');
    videoLink.rel = 'preload';
    videoLink.as = 'video';
    
    // Use the actual video file available
    videoLink.href = '/attached_assets/Video (FundTek)_1751295081956.webm';
    
    videoLink.crossOrigin = 'anonymous';
    document.head.appendChild(videoLink);
  };

  // Start video preloading immediately on fast connections, defer on slow
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    if (connection && connection.effectiveType && connection.effectiveType !== '2g' && connection.effectiveType !== 'slow-2g') {
      preloadVideo();
    } else {
      setTimeout(preloadVideo, 500);
    }
  } else {
    preloadVideo();
  }

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