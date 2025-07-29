const CACHE_NAME = 'fundtek-v1';
const urlsToCache = [
  '/',
  '/offline.html',
  '/manifest.webmanifest'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then((response) => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Cache strategy based on request type
          if (event.request.destination === 'image' || 
              event.request.destination === 'font' ||
              event.request.url.includes('.css') ||
              event.request.url.includes('.js')) {
            // Cache-first for static assets
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
          }

          return response;
        }).catch(() => {
          // Network failed, serve offline page for HTML requests
          if (event.request.destination === 'document') {
            return caches.match('/offline.html');
          }
        });
      })
  );

  // Track fetch errors for analytics
  if (event.request.url.includes('google-analytics.com')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        // Log SW fetch errors via gtag once per session
        if (self.registration.active && !self.fetchErrorLogged) {
          self.fetchErrorLogged = true;
          self.clients.matchAll().then(clients => {
            clients.forEach(client => {
              client.postMessage({
                type: 'SW_FETCH_ERROR',
                url: event.request.url
              });
            });
          });
        }
        return new Response();
      })
    );
  }
});