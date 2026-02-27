const CACHE_NAME = 'nexflix-cache-v1';
const urlsToCache = [
  '/',
  '/index.html', // homepage
  // অন্য important page/post add করতে পারো
];

// Install Service Worker
self.addEventListener('install', event => {
  self.skipWaiting(); // নতুন SW immediately activate
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Cache hit
      if (response) return response;

      // Else fetch from network & cache it
      return fetch(event.request).then(networkResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          // Only cache GET requests
          if(event.request.method === 'GET') {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        });
      }).catch(() => {
        // Optional: offline fallback page
        if(event.request.mode === 'navigate') {
          return caches.match('/offline.html'); 
        }
      });
    })
  );
});

// Activate Service Worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
