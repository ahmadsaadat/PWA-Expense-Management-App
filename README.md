# Progressive Web Application (PWA): Expense Management Application

PWA Proof Of Concept coupled with:
- Firebase SDK for Authentication Service
- Firebase SDK for Firestore NoSQL Service
- AWS SDK for S3 (Object Storage)

<img src="https://github.com/ahmadsaadat/PWA-Expense-Management-App/blob/master/PWA-Architecture.png" alt="App Structure" />


# Watch a video of me in Action!

[Click me!](https://youtu.be/v61A6vyIoI0)


## Making it PWA

PWA enabling necessitates two files
1. the manifest.json
>The manifest usually contains starting URL, an app’s
full and short name, links to icons and icons’ sizes, type, and location.

manifest.json
```{
    "name": "Expense Management App",
    "short_name": "Expense Mgmt",
    "start_url": "/index.html",
    "display": "standalone",
    "background_color": "rgb(99, 124, 167)",
    "theme_color": "rgb(99, 124, 167)",
    "orientation": "portrait-primary",
    "icons":[
    {
        "src": "img/XpenseMgmtApp512x512.png",
        "type": "image/png",
        "sizes": "512x512"
    },
    {
        "src": "img/XpenseMgmtApp192x192.png",
        "type": "image/png",
        "sizes": "192x192"
    },    
    {
        "src": "img/XpenseMgmtApp144x144.png",
        "type": "image/png",
        "sizes": "144x144"
    },
    {
        "src": "img/XpenseMgmtApp72x72.png",
        "type": "image/png",
        "sizes": "72x72"
    }
]
}
```


2. the sw.js (stands for Service Worker)
>is the heart of the PWA, it supports the main features of progressive web applications — you can enable offline
work mode, background syncs, and push notifications which are typical for native apps.
In our case we have configured it for static as well as dynamic caching.

In our project, we have another javascript function called app.js which registers the service worker as soon as serviceWorker is found in the navigator window property.

app.js
```
if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js')
    .then((reg)=> console.log("service worker registered", reg))
    .catch((err) => console.log("service worker not registered", err));
}
```
sw.js
```
const staticCacheName = 'site-static-v4';
const dynamicCacheName = 'site-dynamic-v2';
const assets = [
    '/' //etc...
    
    ];

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

```


## PWA Tip

PWA does not necessarily make your front end responsive, therefore make sure to take up the task of app responsiveness, this will make your app look even more user friendly, especially on mobile devices!


## How to make this app work!

1) You need to create a user role in AWS and enter the credentials into the javascript files where it contains the various S3 functions. for example, here:

upload.js

```AWS.config.update({
        accessKeyId : 'XXXXXXXXXXXXXXXX',
        secretAccessKey : 'XXXXXXXXXXXXXXXXXXXX'
    });
var bucket = new AWS.S3({
    params: {
        Bucket: XXXXXXXXX
    }
});
```
2) When creating the S3 bucket, make sure to have permissions set to public
2) Configure your Firebase and firestore credentials. For example, here:

auth.js

```
var firebaseConfig = {
    apiKey: "XXXXXXXXXXXXXXXX",
    authDomain: "XXXXXXXXXXXXXXXX",
    databaseURL: "XXXXXXXXXXXXXXXX",
    projectId: "XXXXXXXXXXXXXXXX",
    storageBucket: "XXXXXXXXXXXXXXXX",
    messagingSenderId: "XXXXXXXXXXXXXXXX",
    appId: "XXXXXXXXXXXXXXXX",
    measurementId: "XXXXXXXXXXXXXXXX"
    };
```

If you have any questions please do reach out to me!

