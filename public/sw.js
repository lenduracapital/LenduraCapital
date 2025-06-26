// Service Worker for invisible performance optimization
const CACHE_NAME = 'fundtek-v1';
const STATIC_CACHE = 'fundtek-static-v1';

// Precache critical assets (exclude main video)
const PRECACHE_URLS = [
  '/',
  '/js/analytics-client.js',
  '/fonts/inter-var.woff2',
  // CSS and JS will be added dynamically
];

// Install event - precache critical resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE)
            .map(cacheName => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - cache strategy
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip analytics and form submissions
  if (url.pathname.startsWith('/api/') || request.method !== 'GET') {
    return;
  }

  // Cache-first for static assets
  if (request.destination === 'script' || 
      request.destination === 'style' || 
      request.destination === 'font' ||
      request.destination === 'image') {
    
    event.respondWith(
      caches.open(STATIC_CACHE)
        .then(cache => cache.match(request))
        .then(response => {
          if (response) {
            return response;
          }
          return fetch(request).then(fetchResponse => {
            // Don't cache main video files
            if (!request.url.includes('.mp4') && !request.url.includes('.webm')) {
              cache.put(request, fetchResponse.clone());
            }
            return fetchResponse;
          });
        })
        .catch(() => {
          // Offline fallback for images
          if (request.destination === 'image') {
            return new Response('<svg width="200" height="150" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="150" fill="#f0f0f0"/><text x="100" y="75" text-anchor="middle" fill="#999">Image unavailable</text></svg>', {
              headers: { 'Content-Type': 'image/svg+xml' }
            });
          }
        })
    );
    return;
  }

  // Network-first for HTML pages
  if (request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache successful responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(request, responseClone));
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache
          return caches.match(request)
            .then(response => {
              if (response) {
                return response;
              }
              // Ultimate fallback - offline page
              return caches.match('/offline.html');
            });
        })
    );
  }
});