const CACHE = 'quintiliano-v0.22.0-r1';
const SHELL = [
  './', './index.html', './manifest.webmanifest',
  './css/theme.css', './css/style.css',
  './js/main.js', './js/router.js', './js/state.js', './js/api.js', './js/editorial.js', './js/wordnet.js',
  './components/text-viewer.js', './components/exercise-engine.js', './components/editorial-note.js',
  './data/texts.json', './data/guided-readings.json', './data/editorial-sources.json', './data/authors.json', './data/etymology.json', './data/wordnet.json',
  './assets/icon-192.svg', './assets/icon-512.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => Promise.allSettled(SHELL.map(asset => cache.add(asset)))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE).then(cache => cache.put(event.request, copy));
    return response;
  })));
});
