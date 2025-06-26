// Invisible 2KB analytics client - no visual impact
(function() {
  'use strict';
  
  let sessionId = generateSessionId();
  let eventQueue = [];
  let isBeingSent = false;
  
  function generateSessionId() {
    return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
  
  function sendBatch() {
    if (isBeingSent || eventQueue.length === 0) return;
    
    isBeingSent = true;
    const batch = [...eventQueue];
    eventQueue = [];
    
    fetch('/api/analytics/batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ events: batch }),
      keepalive: true
    }).catch(() => {
      // Silently fail - don't impact user experience
    }).finally(() => {
      isBeingSent = false;
    });
  }
  
  function trackEvent(type, elementId = null) {
    eventQueue.push({
      session_id: sessionId,
      page_path: window.location.pathname,
      event_type: type,
      element_id: elementId,
      ts: Date.now()
    });
    
    if (eventQueue.length >= 10) {
      sendBatch();
    }
  }
  
  // Track page start
  fetch('/api/analytics/session/start', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      session_id: sessionId,
      entry_page: window.location.pathname
    }),
    keepalive: true
  }).catch(() => {});
  
  // Track clicks on elements with data-track-id
  document.addEventListener('click', function(e) {
    const trackId = e.target.getAttribute('data-track-id') || 
                   e.target.closest('[data-track-id]')?.getAttribute('data-track-id');
    if (trackId) {
      trackEvent('click', trackId);
    }
  });
  
  // Track Core Web Vitals
  if ('web-vital' in window) {
    window.addEventListener('load', function() {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        trackEvent('performance', JSON.stringify({
          lcp: navigation.loadEventEnd - navigation.loadEventStart,
          fcp: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          cls: 0 // Will be updated by real CLS measurement
        }));
      }
    });
  }
  
  // Send batch every 5 seconds
  setInterval(sendBatch, 5000);
  
  // Track page exit
  window.addEventListener('beforeunload', function() {
    fetch('/api/analytics/session/end', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: sessionId,
        exit_page: window.location.pathname
      }),
      keepalive: true
    }).catch(() => {});
    
    sendBatch();
  });
  
  // Track SPA navigation
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  
  history.pushState = function() {
    originalPushState.apply(history, arguments);
    trackEvent('navigation');
  };
  
  history.replaceState = function() {
    originalReplaceState.apply(history, arguments);
    trackEvent('navigation');
  };
  
  window.addEventListener('popstate', function() {
    trackEvent('navigation');
  });
})();