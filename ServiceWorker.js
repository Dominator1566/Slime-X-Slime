const cacheName = "SomethingRandomStudios-SuperAwesomeSlimeGame-1.0";
const contentToCache = [
    "Build/800044f929126c866a4d430c195b81df.loader.js",
    "Build/caf7146eecc8cd5192af0eae59011204.framework.js",
    "Build/73cafee32489982cb1a886e0166ec5ec.data",
    "Build/7da539c9e8341e077d541919b452920d.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
