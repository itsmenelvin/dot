// public/sw.js
importScripts('https://unpkg.com/streamsaver@2.0.6/StreamSaver.js');

// Minimal Service Worker: Do not intercept fetch requests
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  clients.claim();
});

// Optional: Handle messages from the main thread if needed
self.addEventListener('message', (event) => {
  // Handle messages
});
