// install service worker
self.addEventListener('install', (evt) => {
  console.log('serv worker has been installed');
});

// activate service wor
self.addEventListener('activate', (evt) => {
  console.log('service worker has been activated');
});

// fetch
self.addEventListener('fetch', (evt) => {
  console.log('fetch event', evt);
});
