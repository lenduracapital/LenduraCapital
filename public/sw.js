// Service Worker for FundTek Capital Group - Production Grade Caching
const CACHE_NAME = 'fundtek-v1.0.0';
const RUNTIME_CACHE = 'fundtek-runtime';

// Critical resources for immediate caching
const CRITICAL_ASSETS = [
  '/',
  '/solutions',
  '/contact',
  '/apply',
  '/manifest.json'
];

// API endpoints to cache with network-first strategy
const API_ENDPOINTS = [
  '/api/performance-alerts',
  '/health',
  '/sitemap.xml',
  '/robots.txt'
];

// Install event - Cache critical resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CRITICAL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => 
            cacheName !== CACHE_NAME && 
            cacheName !== RUNTIME_CACHE
          )
          .map(cacheName => caches.delete(cacheName))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - Advanced caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API requests with network-first strategy
  if (url.pathname.startsWith('/api/') || API_ENDPOINTS.includes(url.pathname)) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }

  // Handle HTML pages with cache-first strategy
  if (request.destination === 'document') {
    event.respondWith(cacheFirstStrategy(request));
    return;
  }

  // Handle static assets with stale-while-revalidate
  if (request.destination === 'script' || 
      request.destination === 'style' || 
      request.destination === 'image') {
    event.respondWith(staleWhileRevalidateStrategy(request));
    return;
  }

  // Default to network with cache fallback
  event.respondWith(networkWithCacheFallback(request));
});

// Network-first strategy for API calls
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('Network error', { status: 503 });
  }
}

// Cache-first strategy for HTML pages
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    // Update cache in background
    fetch(request).then(networkResponse => {
      if (networkResponse.ok) {
        caches.open(CACHE_NAME).then(cache => {
          cache.put(request, networkResponse);
        });
      }
    });
    
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    return new Response('Page not available offline', { 
      status: 503,
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

// Stale-while-revalidate for static assets
async function staleWhileRevalidateStrategy(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  });
  
  return cachedResponse || fetchPromise;
}

// Network with cache fallback
async function networkWithCacheFallback(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    return await caches.match(request) || 
           new Response('Resource not available', { status: 503 });
  }
}

// Background sync for form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'background-form-sync') {
    event.waitUntil(syncFormSubmissions());
  }
});

// Sync pending form submissions when online
async function syncFormSubmissions() {
  const cache = await caches.open(RUNTIME_CACHE);
  const pendingRequests = await cache.keys();
  
  for (const request of pendingRequests) {
    if (request.url.includes('/api/') && request.method === 'POST') {
      try {
        const response = await fetch(request);
        if (response.ok) {
          await cache.delete(request);
        }
      } catch (error) {
        // Keep in cache for next sync attempt
      }
    }
  }
}

// Push notification handling
self.addEventListener('push', event => {
  if (event.data) {
    const options = {
      body: event.data.text(),
      icon: '/favicon-192.png',
      badge: '/favicon-192.png',
      vibrate: [200, 100, 200],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        {
          action: 'explore',
          title: 'View Details',
          icon: '/favicon-192.png'
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/favicon-192.png'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification('FundTek Capital Group', options)
    );
  }
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Performance monitoring
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_CACHE_STATUS') {
    event.ports[0].postMessage({
      cacheNames: [CACHE_NAME, RUNTIME_CACHE],
      timestamp: Date.now()
    });
  }
});