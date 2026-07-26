const CACHE = "apd-bookkeeping-v9";
const ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./favicon.png", "./icon-192.png", "./icon-512.png", "./logo_white.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).catch(()=>{})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  // Navigation requests (loading the app page itself) and index.html:
  // always try the network first, so a fresh deploy is picked up
  // immediately. Only fall back to the cached copy if offline.
  const isPageRequest = event.request.mode === "navigate" || event.request.url.endsWith("index.html") || event.request.url.endsWith("/apdbookkeeping/") || event.request.url.endsWith("/apdbookkeeping");
  if (isPageRequest) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Everything else (icons, manifest, etc.): cache-first, refresh in background
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetchPromise = fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
