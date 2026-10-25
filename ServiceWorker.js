const cacheName = "SomethingRandomStudios-SuperAwesomeSlimeGame-1.0";
const contentToCache = [
    "Build/6c9885dcb7b70ada054df058e866378d.loader.js",
    "Build/bf4a1cff664203132e919fc857ffebdd.framework.js",
    "Build/a27fb0fa51f609af1129d5cf584df840.data",
    "Build/a72441f489615f1ea5e0d5fed3275a67.wasm",
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
