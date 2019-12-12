const staticCacheName = 'site-static-v1';
const dynamicCacheName = 'site-dynamic-v1';
const assets = [
    '/',
    '/js/app.js',
    '/js/auth.js',
    '/js/dashboard.js',
    '/js/getList.js',
    '/js/navbar.js',
    '/js/signin.js',
    '/js/signup.js',
    '/js/textract.js',
    '/js/upload.js',
    '/sw.js',
    '/dashboard.html',
    '/index.html',
    '/signin.html',
    '/signup.html',
    '/css/styles.css',
    '/img/XpenseMgmtApp72x72.png',
    '/img/XpenseMgmtApp144x144.png',
    '/img/XpenseMgmtApp192x192.png',
    '/img/XpenseMgmtApp512x512.png',
    '/manifest.json',
    'https://fonts.googleapis.com/css?family=Montserrat:200&display=swap',
    '/fallback.html'
    
    ];

// cache size limit function

// const limitCacheSize = (name, size) => {
//     caches.open(name).then(cache => {
//         cache.keys().then(keys => {
//             if(keys.length > size){
//                 cache.delete(keys[0]).then()
//             }
//         })
//     })
// };

// install service worker

self.addEventListener('install', evt =>{

    console.log('service worker has been installed')
    this
    evt.waitUntil(
    caches.open(staticCacheName).then( cache => {
        console.log('caching shell assets');
        cache.addAll(assets)
    })
    );


});

// activate event
// delete old cache

self.addEventListener('activate', (evt) => {
    // console.log('service worker has been activated');

    evt.waitUntil(
        caches.keys().then(keys => {

            return Promise.all(keys.filter(key => key !== staticCacheName && key !== dynamicCacheName)
            .map(key => caches.delete(key)))

        })
    )
    
});

// fetch event

self.addEventListener('fetch', (evt) => {
    // console.log('fetch event', evt)

    this
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    return fetchRes;
                });
            });
        }).catch(() => {
            if(evt.request.url.indexOf('.html') > -1){
                return caches.match('/fallback.html');  
            }
        })
    );
});