const staticCacheName = 'site-static-v4';
const dynamicCacheName = 'site-dynamic-v3';
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
  '/pages/fallback.html',
];

// install service worker
self.addEventListener ('install', evt => {
  evt.waitUntil (
    caches.open (staticCacheName).then (cache => {
      console.log ('caching');
      cache.addAll (assets);
    })
  );
});

// activate service worкer
self.addEventListener ('activate', evt => {
  evt.waitUntil (
    caches.keys ().then (keys => {
      return Promise.all (
        keys
          .filter (key => key !== staticCacheName && key !== dynamicCacheName)
          .map (key => caches.delete (key))
      );
    })
  );
});

// cache size limit function
const limtCacheSize = (name, size) => {
  caches.open (name).then (cache => {
    cache.keys ().then (keys => {
      if (keys.length > size) {
        cache.delete (keys[0]).then (limtCacheSize (name, size));
      }
    });
  });
};

// fetch
self.addEventListener ('fetch', evt => {

  if (evt.request.url.indexOf ('firestore.googleapis.com') === -1) {
    evt.respondWith (
      caches
        .match (evt.request)
        .then (cacheRes => {
          return (
            cacheRes ||
            fetch (evt.request).then (fetchRes => {
              return caches.open (dynamicCacheName).then (cache => {
                cache.put (evt.request.url, fetchRes.clone ());
                limtCacheSize (dynamicCacheName, 15);
                return fetchRes;
              });
            })
          );
        })
        .catch (() => {
          if (evt.request.url.indexOf ('.html') > -1) {
            return caches.match ('/pages/fallback.html');
          }
        })
    );
  }

});
