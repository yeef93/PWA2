importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
  console.log(`Workbox berhasil dimuat`);
  workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/team.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/package.json', revision: '1' },
    { url: '/sw-register.js', revision: '1' },
    { url: '/push.js', revision: '1' },
    { url: '/pages/home.html', revision: '1' },
    { url: '/pages/lInggris.html', revision: '1' },
    { url: '/pages/saved.html', revision: '1' },
    { url: '/css/materialize.css', revision: '1' },
    { url: 'css/style.css', revision: '1' },
    { url: '/js/materialize.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/images/icon/icons-512.svg', revision: '1' },
    { url: '/images/icon/icons-512.png', revision: '1' },
    { url: '/images/icon/icons-192.svg', revision: '1' },
    { url: '/images/icon/icons-144.png', revision: '1' },
    { url: '/images/icon/icons-96.svg', revision: '1' },
    { url: '/images/icon/icons-72.svg', revision: '1' },
    { url: '/images/icon/icons-48.svg', revision: '1' },
    { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
    { url: 'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2', revision: '1' },
    { url: 'https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js', revision: '1' },
  ]);

  workbox.routing.registerRoute(
    /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
    workbox.strategies.cacheFirst({
      cacheName: 'images-cache',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        }),
        new workbox.expiration.Plugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ]
    })
  );


  workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/'),
    workbox.strategies.staleWhileRevalidate()
  )

  // Caching Google Fonts
  workbox.routing.registerRoute(
    /.*(?:googleapis|gstatic)\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    })
  );

  workbox.routing.registerRoute(
    /\.(?:js|css)$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'static-resources',
    })
  );

  workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'pages'
    })
  );

} else {
  console.log(`Workbox gagal dimuat`);
}


self.addEventListener('push', function (event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  const options = {
    body: body,
    icon: '/images/icon/icons-144.png',
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
