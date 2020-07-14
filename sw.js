const staticCacheName = 'site-static-v1';
const dynamicCache = 'site-dynamic-v1';
const assets = [
  '/',
  'app.js',
  'main.js',
  '/libs/materialize.min.js',
  '/style.css',
  '/libs/materialize.min.css',
  '/images/dish.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
];

// install service worker
self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching');
      cache.addAll(assets);
    })
  );
});

// activate service worкer
self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// fetch
self.addEventListener('fetch', (evt) => {
  // console.log('fetch event', evt);

  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      return (
        cacheRes ||
        fetch(evt.request).then((fetchRes) => {
          return caches.open(dynamicCache).then((cache) => {
            cache.put(evt.request.url, fetchRes.clone());
            return fetchRes; 
          });
        })
      );
    })
  );
});
