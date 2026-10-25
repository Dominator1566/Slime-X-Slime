const cacheName = "SomethingRandomStudios-SuperAwesomeSlimeGame-1.0";
const contentToCache = [
    "Build/1cf882ad73b24ec65b008aa43b150ad0.loader.js",
    "Build/caf7146eecc8cd5192af0eae59011204.framework.js",
    "Build/0be0131373e783154a3dfec3e54083ba.data",
    "Build/48956124fda1e8e110342be6c6e4229e.wasm",
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
