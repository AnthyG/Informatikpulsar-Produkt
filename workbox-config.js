module.exports = {
    "globDirectory": "serve/",
    "globPatterns": [
        "**/*.{css,html,ico,js}"
    ],
    "swDest": "serve\\sw.js",

    // Define runtime caching rules.
    runtimeCaching: [{
        // Match any request ends with .png, .jpg, .jpeg or .svg.
        urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

        // Apply a cache-first strategy.
        handler: 'cacheFirst',

        options: {
            cacheName: 'images',

            // Only cache 15 images.
            expiration: {
                maxEntries: 10,
            },
        },
    }, {
        urlPattern: /\.(?:md)$/,
        handler: 'cacheFirst',
        options: {
            cacheName: 'articles',

            expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 1
            }
        }
    }]
};