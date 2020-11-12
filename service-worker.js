const CACHE_NAME = "bebo-v1";
const urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/team.html",  
  "/manifest.json",
  "/package.json",
  "/sw-register.js",
  "/push.js",
  "/pages/home.html",
  "/pages/lInggris.html",
  "/pages/saved.html",
  "/css/materialize.css",
  "/js/materialize.js",  
  "/js/nav.js",
  "/js/api.js",
  "/js/db.js",
  "/js/idb.js",
  "/images/icon/icons-512.svg",
  "/images/icon/icons-512.png",
  "/images/icon/icons-192.svg",
  "/images/icon/icons-144.png",
  "/images/icon/icons-96.svg",
  "/images/icon/icons-72.svg",
  "/images/icon/icons-48.svg",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
  "https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js",
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  const base_url = "https://api.football-data.org/v2/";

  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(function(response) {
        return response || fetch (event.request);
      })
    )
  }
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'images/icons-144.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
