// Service Worker Install Event
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Service Worker Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Baki Workbox code nicher moto thakbe...
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');
// ... (Apnar baki code)
