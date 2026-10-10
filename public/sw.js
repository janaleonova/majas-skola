// Mājas skola — Service Worker pamats (PWA atbalsts)
const CACHE_NAME = 'majas-skola-shell-v2';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/public/bundle.js',
  '/public/icon.svg',
  '/public/dragon-world.svg',
  '/public/garden-world.svg',
  '/public/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_URLS).catch(err => {
        console.warn('[SW] Precache daļa resursu vēl nav gatava:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Network-first for API requests, Firebase identity and auth requests
  if (url.pathname.startsWith('/api/') || url.origin.includes('googleapis.com') || url.origin.includes('firebaseio.com')) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  // Fetch the latest page and JS bundle first: old cached code must not hide UI fixes.
  if (url.pathname === '/' || url.pathname === '/index.html' || url.pathname === '/public/bundle.js') {
    event.respondWith(fetch(event.request).then(response => {
      if (response && response.ok) {
        const copy=response.clone();
        event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.put(event.request,copy)));
      }
      return response;
    }).catch(() => caches.match(event.request)));
    return;
  }

  // Cache-first / stale-while-revalidate for unchanged visual assets
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        // Fetch in background to update cache
        fetch(event.request).then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          }
        }).catch(() => {});
        return cached;
      }
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
        return response;
      });
    })
  );
});
