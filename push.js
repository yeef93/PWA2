var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BGCfZXgOGgWAJUFjBYNr2vyh7J8siwj-eVxjJGPAp7yQ0BmvgMoUUCxlCa2cFR0wVJUnx78apTduDMw0-QLg_S8",
   "privateKey": "KnSUqrOSTHCcgpHCwL3AmSaFY_VFqUhXvVGOUswwTs4"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/eHUWU-S8CZA:APA91bGWRxuMzbl995tEZY4l0MZ8KjvPTngIA5xUyd1qSlKvNoI1S_VK7uYYnFIDyCdZYtxM30O-Y-sd5Yorq-MC0MKowlr0-CkhW5KVYg3uBWmx4xvLnEWEh6NOSsCS4SAuJP6SPiWz",
   "keys": {
       "p256dh": "BLXG46Jtb2nKKgDcaNMKlzHySU/BaXIejAdCgT5ANnU9cMuwmeSFw0aWgASOR4GycAL/lUqh107Lr1evZWO9Uok=",
       "auth": "79PdiU41gZJH1OprqgPB+g=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '258443339909',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);