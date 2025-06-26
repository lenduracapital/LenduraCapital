// Service Worker Registration - External Script
(function() {
  'use strict';
  
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js')
        .then(function(registration) {
          // Service worker registered successfully
        })
        .catch(function(error) {
          // Service worker registration failed
        });
    });
  }
})();