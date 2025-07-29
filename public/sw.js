// FundTek Capital Group - Service Worker for Performance Optimization
const CACHE_NAME = 'fundtek-v2-performance';
const CRITICAL_ASSETS = [
  '/',
  '/attached_assets/ChatGPT Image Jun 5, 2025, 12_13_54 PM_1752722086552.png',
  '/attached_assets/pexels-mikhail-nilov-6963857 (1)_1752762912598.jpg',
  '/public/fundtek-icon.svg'
];

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(CRITICAL_ASSETS).catch(err => {
        console.log('Cache addAll failed:', err);
        // Continue without failing the service worker install
        return Promise.resolve();
      });
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip non-HTTP requests
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }
      
      return fetch(event.request).catch(() => {
        // Return offline page or empty response for failed requests
        return new Response('', { status: 200 });
      });
    })
  );
});