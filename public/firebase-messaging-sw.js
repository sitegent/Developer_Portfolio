// Firebase Cloud Messaging Service Worker
// Auto-configured via window.__FCM__ from app.blade.php

importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Config will be passed via a postMessage from the main thread
let messaging;

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'FIREBASE_CONFIG') {
        const config = event.data.config;
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        messaging = firebase.messaging();

        messaging.onBackgroundMessage((payload) => {
            const { title, body, icon, url } = payload.notification || payload.data || {};
            self.registration.showNotification(title || 'New Notification', {
                body: body || '',
                icon: icon || '/favicon.ico',
                badge: '/favicon.ico',
                data: { url: url || '/' },
            });
        });
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const url = event.notification.data?.url || '/';
    event.waitUntil(clients.openWindow(url));
});
