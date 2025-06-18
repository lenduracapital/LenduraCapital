// Service Worker for Enhanced Performance Caching
const CACHE_NAME = 'fundtek-v1.2';
const STATIC_CACHE = 'fundtek-static-v1.2';
const DYNAMIC_CACHE = 'fundtek-dynamic-v1.2';

// Critical resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/src/main.tsx',
  '/src/index.css',
  '/src/components/hero-section.tsx',
  '/src/components/header.tsx',
  '/src/components/footer.tsx',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
];

// Network-first resources (dynamic content)
const DYNAMIC_ROUTES = [
  '/solutions',
  '/about',
  '/contact',
  '/qualified-industries'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        return cache.addAll(STATIC_ASSETS);
      })
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
            .filter(cacheName => 
              cacheName !== STATIC_CACHE && 
              cacheName !== DYNAMIC_CACHE &&
              cacheName.startsWith('fundtek-')
            )
            .map(cacheName => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Handle static assets (cache-first)
  if (STATIC_ASSETS.some(asset => request.url.includes(asset))) {
    event.respondWith(
      caches.match(request)
        .then(response => {
          return response || fetch(request)
            .then(fetchResponse => {
              const responseClone = fetchResponse.clone();
              caches.open(STATIC_CACHE)
                .then(cache => cache.put(request, responseClone));
              return fetchResponse;
            });
        })
    );
    return;
  }

  // Handle API requests (network-first)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE)
            .then(cache => cache.put(request, responseClone));
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
    return;
  }

  // Handle navigation requests (stale-while-revalidate)
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match(request)
        .then(response => {
          const fetchPromise = fetch(request)
            .then(fetchResponse => {
              const responseClone = fetchResponse.clone();
              caches.open(DYNAMIC_CACHE)
                .then(cache => cache.put(request, responseClone));
              return fetchResponse;
            });

          return response || fetchPromise;
        })
    );
    return;
  }

  // Handle images and media (cache-first with fallback)
  if (request.destination === 'image' || request.destination === 'video') {
    event.respondWith(
      caches.match(request)
        .then(response => {
          return response || fetch(request)
            .then(fetchResponse => {
              // Only cache successful responses
              if (fetchResponse.status === 200) {
                const responseClone = fetchResponse.clone();
                caches.open(STATIC_CACHE)
                  .then(cache => cache.put(request, responseClone));
              }
              return fetchResponse;
            })
            .catch(() => {
              // Return fallback image if available
              return caches.match('/fallback-image.svg');
            });
        })
    );
    return;
  }

  // Default: network-first for everything else
  event.respondWith(
    fetch(request)
      .catch(() => caches.match(request))
  );
});

// Background sync for offline functionality
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Handle offline form submissions or data sync
  return new Promise(resolve => {
    // Implementation for background sync
    resolve();
  });
}

// Push notifications (future enhancement)
self.addEventListener('push', event => {
  if (event.data) {
    const options = {
      body: event.data.text(),
      icon: '/favicon-192x192.png',
      badge: '/favicon-192x192.png'
    };
    event.waitUntil(
      self.registration.showNotification('FundTek Capital Group', options)
    );
  }
});