const CACHE_NAME = 'fundtek-v1';
const STATIC_CACHE = 'fundtek-static-v1';
const DYNAMIC_CACHE = 'fundtek-dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.webmanifest',
  '/favicon.ico',
  '/favicon-circle.svg'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE)
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

  // Skip external requests
  if (url.origin !== location.origin) return;

  // API requests - network first with cache fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }

  // Static assets - cache first
  if (request.destination === 'image' || 
      request.destination === 'font' || 
      request.destination === 'style' ||
      request.destination === 'script') {
    event.respondWith(cacheFirstStrategy(request));
    return;
  }

  // Video and media assets - enhanced caching
  if (request.destination === 'video' || 
      url.pathname.includes('/attached_assets/') && 
      (url.pathname.endsWith('.webm') || url.pathname.endsWith('.mp4') || 
       url.pathname.endsWith('.jpg') || url.pathname.endsWith('.png') || 
       url.pathname.endsWith('.jpeg') || url.pathname.endsWith('.webp'))) {
    event.respondWith(enhancedMediaStrategy(request));
    return;
  }

  // HTML pages - stale while revalidate
  if (request.destination === 'document') {
    event.respondWith(staleWhileRevalidateStrategy(request));
    return;
  }

  // Default: network with cache fallback
  event.respondWith(networkWithCacheFallback(request));
});

// Network first strategy for API calls
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('Offline', { status: 503 });
  }
}

// Cache first strategy for static assets
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    return new Response('Asset not available offline', { status: 503 });
  }
}

// Stale while revalidate for HTML pages
async function staleWhileRevalidateStrategy(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => cachedResponse);
  
  return cachedResponse || fetchPromise || caches.match('/offline.html');
}

// Network with cache fallback
async function networkWithCacheFallback(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || caches.match('/offline.html');
  }
}

// Enhanced media caching strategy for videos and images
async function enhancedMediaStrategy(request) {
  const cache = await caches.open('media-cache-v1');
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Clone response for caching
      const responseToCache = networkResponse.clone();
      
      // Only cache media files under 10MB to prevent storage issues
      const contentLength = networkResponse.headers.get('content-length');
      if (!contentLength || parseInt(contentLength) < 10 * 1024 * 1024) {
        cache.put(request, responseToCache);
      }
    }
    
    return networkResponse;
  } catch (error) {
    // Return cached version or placeholder
    return cachedResponse || new Response('Media not available offline', { status: 503 });
  }
}

// Background sync for form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'form-submission') {
    event.waitUntil(syncFormSubmissions());
  }
});

// Sync cached form submissions when online
async function syncFormSubmissions() {
  const cache = await caches.open(DYNAMIC_CACHE);
  const requests = await cache.keys();
  
  const formRequests = requests.filter(request => 
    request.url.includes('/api/') && request.method === 'POST'
  );
  
  for (const request of formRequests) {
    try {
      await fetch(request);
      await cache.delete(request);
    } catch (error) {
      console.log('Failed to sync form submission:', error);
    }
  }
}