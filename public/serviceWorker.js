var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  'index.html',
  'offline.html'
];

const self= this;

// Install SW

self.addEventListener('install',(event)=>{
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache)=>{

            console.log('Cache checked--open');
            return cache.addAll(urlsToCache);

        })
    )

});

//Listen for requests

self.addEventListener('fetch',(event)=>{

    event.respondWith(
        caches.match(event.request)
        .then(()=>{
            return fetch(event.request)
            .catch(()=> caches.match('offline.html'))
        })
    )
});


//Activate the SW

self.addEventListener('activate',(event)=>{

    const cacheWhiteList=[];
    cacheWhiteList.push(CACHE_NAME);
    event.waitUntil(
        caches.keys()
        .then((cacheNames)=>{
            Promise.all(
             cacheNames.map((cacheName) => {
                if(!cacheWhiteList.includes(cacheName)) 
                {
                  return caches.delete(cacheName);  
                } 
            })
           )
        })
    )
})