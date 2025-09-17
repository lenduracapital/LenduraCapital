// Enhanced service worker registration for aggressive caching

const SW_URL = '/service-worker.js';

export interface CacheStrategy {
  cacheName: string;
  strategy: 'cache-first' | 'network-first' | 'stale-while-revalidate';
  maxEntries?: number;
  maxAgeSeconds?: number;
}

class ServiceWorkerManager {
  private registration: ServiceWorkerRegistration | null = null;
  private isSupported: boolean;

  constructor() {
    this.isSupported = 'serviceWorker' in navigator;
  }

  async register(): Promise<boolean> {
    if (!this.isSupported || import.meta.env.DEV) {
      console.log('Service Worker not supported or in development mode');
      return false;
    }

    try {
      // Check if SW already registered to avoid conflicts
      const existingRegistration = await navigator.serviceWorker.getRegistration('/');
      if (existingRegistration) {
        this.registration = existingRegistration;
        console.log('Service Worker already registered');
        return true;
      }

      this.registration = await navigator.serviceWorker.register(SW_URL, {
        scope: '/',
        updateViaCache: 'none'
      });

      console.log('Service Worker registered successfully');
      
      // Handle updates
      this.registration.addEventListener('updatefound', () => {
        this.handleUpdate();
      });

      return true;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return false;
    }
  }

  private handleUpdate() {
    if (!this.registration?.installing) return;

    const newWorker = this.registration.installing;
    
    newWorker.addEventListener('statechange', () => {
      if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
        // New content available, show update notification
        this.showUpdateNotification();
      }
    });
  }

  private showUpdateNotification() {
    // Show a subtle notification for updates
    const notification = document.createElement('div');
    notification.className = 'sw-update-notification';
    notification.innerHTML = `
      <div class="fixed top-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50">
        <p class="mb-2">New content available!</p>
        <button onclick="window.location.reload()" class="bg-white text-blue-600 px-3 py-1 rounded text-sm">
          Refresh
        </button>
        <button onclick="this.parentElement.remove()" class="ml-2 text-white/70 hover:text-white text-sm">
          Later
        </button>
      </div>
    `;
    document.body.appendChild(notification);

    // Auto-hide after 10 seconds
    setTimeout(() => {
      notification.remove();
    }, 10000);
  }

  async unregister(): Promise<boolean> {
    if (!this.registration) return false;
    return await this.registration.unregister();
  }

  // Precache critical blog/guides content
  async precacheContent(urls: string[]) {
    if (!this.registration || !this.registration.active) return;

    // Send message to service worker to precache content
    this.registration.active.postMessage({
      type: 'PRECACHE_CONTENT',
      urls: urls
    });
  }
}

// Service worker script content for aggressive caching
export const SERVICE_WORKER_SCRIPT = `
const CACHE_NAME = 'lendura-capital-v1';
const STATIC_CACHE = 'static-assets-v1';
const DYNAMIC_CACHE = 'dynamic-content-v1';
const IMAGE_CACHE = 'images-v1';
const FONT_CACHE = 'fonts-v1';

// Assets to precache
const PRECACHE_ASSETS = [
  '/',
  '/blog',
  '/guides',
  '/manifest.json',
  // Critical CSS and JS will be added dynamically
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && 
              cacheName !== STATIC_CACHE && 
              cacheName !== DYNAMIC_CACHE &&
              cacheName !== IMAGE_CACHE &&
              cacheName !== FONT_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Handle different resource types with appropriate strategies
  if (url.pathname.startsWith('/api/')) {
    // API requests - network first
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
  } else if (request.destination === 'image') {
    // Images - cache first with long TTL
    event.respondWith(cacheFirst(request, IMAGE_CACHE, { maxAge: 30 * 24 * 60 * 60 })); // 30 days
  } else if (url.pathname.includes('fonts') || request.destination === 'font') {
    // Fonts - cache first with very long TTL
    event.respondWith(cacheFirst(request, FONT_CACHE, { maxAge: 365 * 24 * 60 * 60 })); // 1 year
  } else if (url.pathname.includes('unsplash.com')) {
    // External images - cache first with medium TTL
    event.respondWith(cacheFirst(request, IMAGE_CACHE, { maxAge: 7 * 24 * 60 * 60 })); // 7 days
  } else if (url.pathname.match(/\\.(js|css)$/)) {
    // Static assets - stale while revalidate
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
  } else if (url.pathname.startsWith('/blog') || url.pathname.startsWith('/guides')) {
    // Blog and guides - stale while revalidate for faster loading
    event.respondWith(staleWhileRevalidate(request, DYNAMIC_CACHE));
  } else {
    // Other requests - network first
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
  }
});

// Cache strategies
async function cacheFirst(request, cacheName, options = {}) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    // Check if cache is still valid
    const dateHeader = cachedResponse.headers.get('date');
    const maxAge = options.maxAge || 24 * 60 * 60; // 1 day default
    
    if (dateHeader) {
      const age = (Date.now() - new Date(dateHeader).getTime()) / 1000;
      if (age < maxAge) {
        return cachedResponse;
      }
    } else {
      return cachedResponse;
    }
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return cachedResponse || new Response('Offline', { status: 503 });
  }
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    return cachedResponse || new Response('Offline', { status: 503 });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = cache.match(request);
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  });
  
  return (await cachedResponse) || fetchPromise;
}

// Handle messages from main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'PRECACHE_CONTENT') {
    const urls = event.data.urls;
    caches.open(DYNAMIC_CACHE).then((cache) => {
      cache.addAll(urls);
    });
  }
});
`;

// Initialize service worker manager
export const serviceWorkerManager = new ServiceWorkerManager();

// Register service worker and precache blog/guides content
export async function initServiceWorker() {
  const registered = await serviceWorkerManager.register();
  
  if (registered) {
    // Precache critical blog and guides content
    const criticalContent = [
      '/blog',
      '/guides', 
      '/blog/sba-loan-changes-2025',
      '/guides/complete-sba-loan-guide-2025',
      '/guides/restaurant-financing-complete-guide'
    ];
    
    setTimeout(() => {
      serviceWorkerManager.precacheContent(criticalContent);
    }, 2000);
  }
}

// Write service worker file to public directory
export function writeServiceWorkerFile() {
  // This would typically be done at build time
  // For now, we'll create it dynamically
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    const blob = new Blob([SERVICE_WORKER_SCRIPT], { type: 'application/javascript' });
    const sw = URL.createObjectURL(blob);
    
    // Store reference for registration
    (window as any).__SW_URL = sw;
  }
}