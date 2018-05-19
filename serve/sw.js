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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "css/bootstrap.min.css",
    "revision": "a7022c6fa83d91db67738d6e3cd3252d"
  },
  {
    "url": "css/highlight-atom-one-light.css",
    "revision": "3f9c7dcab0b31d9be9a2a2f3b83b8012"
  },
  {
    "url": "css/main.css",
    "revision": "352e45660c3b8359173f5735a31dd8d8"
  },
  {
    "url": "enorde.php",
    "revision": "8b4e6ef1da137c28623579266fc0bf89"
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
    "url": "images/alltagski/digitale-sprachassistenten-alexa-von-amazon-und-google-home1.png",
    "revision": "261831e6e392a4029cf6641d4f01ee8b"
  },
  {
    "url": "images/alltagski/hanson_robotics_sophia.jpg",
    "revision": "4156df68cb2b9a2b3ef57bfef9567969"
  },
  {
    "url": "images/alltagski/ibm_watson.png",
    "revision": "b7fd8f954af9ecebd73e7b74f6ae8c14"
  },
  {
    "url": "images/autoautos/autoausstattung1.jpeg",
    "revision": "2df30392157a14ceee2c0c2283b69902"
  },
  {
    "url": "images/autoautos/autoausstattung2.jpeg",
    "revision": "4d7149ba2e01d31a391869b86b3c03d7"
  },
  {
    "url": "images/autoautos/autosonar.jpeg",
    "revision": "f6bfa5cb9948eb989ab764b84d8f7a84"
  },
  {
    "url": "images/mainpic.jpg",
    "revision": "7554a05987cadc7b2b0b6619c0263339"
  },
  {
    "url": "images/quantenpcs/quantenpc1.jpg",
    "revision": "ea1e24af3573fef8ab95d2c26f12600f"
  },
  {
    "url": "images/quantenpcs/quantenpc2.jpg",
    "revision": "63d9cae7df60f681b64e1c5de70a13a9"
  },
  {
    "url": "images/webdesign/Startseite_0.png",
    "revision": "3665c3c645454aef1c25af42818130d1"
  },
  {
    "url": "images/webdesign/Startseite_1.png",
    "revision": "7c8f3c84905321c4c01e8b36e8390416"
  },
  {
    "url": "images/webdesign/Startseite_2.png",
    "revision": "7026d05476ec4868c4d8db9364918e7b"
  },
  {
    "url": "images/webdesign/Startseite_3.png",
    "revision": "91d2ac9766993054cfb063f25a88deb5"
  },
  {
    "url": "index.html",
    "revision": "3d964cbfdb92db7f47be63a2b0ad3128"
  },
  {
    "url": "js/bootstrap.min.js",
    "revision": "eb5fac582a82f296aeb74900b01a2fa3"
  },
  {
    "url": "js/highlight.pack.js",
    "revision": "d20df3cd17d1214478ca4709ebc741ca"
  },
  {
    "url": "js/jquery.min.js",
    "revision": "8dfaa50c6ab82bbf8407db22fdd4834a"
  },
  {
    "url": "js/main.js",
    "revision": "b55227daab803f35ee258478a2a6c50c"
  },
  {
    "url": "js/marked.min.js",
    "revision": "91d0d720e90d2adefc509b11f12ea75c"
  },
  {
    "url": "oskarscryptormod.py",
    "revision": "7f542af8afaeca196f783aa7402d6fcc"
  },
  {
    "url": "pages/about.md",
    "revision": "d274e51a55861d0dedb5c5207997ceb3"
  },
  {
    "url": "pages/alltagski_old.md",
    "revision": "449b09615553b43f2c71f5edb3afab59"
  },
  {
    "url": "pages/alltagski.md",
    "revision": "eae9b01ddc66d68f06ef311309f359a7"
  },
  {
    "url": "pages/autoautos.md",
    "revision": "f9de26b340be78bb82e98d7db5e8f3b7"
  },
  {
    "url": "pages/enandde.md",
    "revision": "3ef9ae2c0b2ca6e6d1c7f1bc7ea8e0e1"
  },
  {
    "url": "pages/main.md",
    "revision": "d28cc48347244df7120b9656223f51f9"
  },
  {
    "url": "pages/quantenpcs.md",
    "revision": "f8180ac6eee14a49934b385f0eda388c"
  },
  {
    "url": "pages/webdesign.md",
    "revision": "2d41e7cbd8a0b58b5bc78a53a33763f5"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
