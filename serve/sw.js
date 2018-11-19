/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "css/highlight-atom-one-light.css",
    "revision": "3f9c7dcab0b31d9be9a2a2f3b83b8012"
  },
  {
    "url": "css/main.css",
    "revision": "352e45660c3b8359173f5735a31dd8d8"
  },
  {
    "url": "errors/404.html",
    "revision": "32707491c1d8f5d900523b6cb92059b5"
  },
  {
    "url": "errors/index.html",
    "revision": "92a216e693b97319cf3d418f2a9c5dad"
  },
  {
    "url": "favicon.ico",
    "revision": "5c90ef9b5cf658ef8f44ae1f9048dfa3"
  },
  {
    "url": "index.html",
    "revision": "311ed8c5c7e8bae27400b0a485a78efe"
  },
  {
    "url": "js/highlight.pack.js",
    "revision": "d20df3cd17d1214478ca4709ebc741ca"
  },
  {
    "url": "js/main.js",
    "revision": "d9def3bb29bfaac5204d152f6eaf447d"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|svg)$/, workbox.strategies.cacheFirst({ "cacheName":"images", plugins: [new workbox.expiration.Plugin({"maxEntries":10,"purgeOnQuotaError":false})] }), 'GET');
workbox.routing.registerRoute(/\.(?:md)$/, workbox.strategies.cacheFirst({ "cacheName":"articles", plugins: [new workbox.expiration.Plugin({"maxEntries":10,"maxAgeSeconds":3600,"purgeOnQuotaError":false})] }), 'GET');
