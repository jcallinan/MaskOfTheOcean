const cacheName = "University of Pittsburgh at Bradford-Mask of the Ocean - Global Game Jam 2026 Submission-0.1";
const contentToCache = [
    "Build/WebGL-Borti-Build.loader.js",
    "Build/WebGL-Borti-Build.framework.js.unityweb",
    "Build/WebGL-Borti-Build.data.unityweb",
    "Build/WebGL-Borti-Build.wasm.unityweb",
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
