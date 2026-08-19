const CACHE='dany-v1';
const urls=['./','./index.html','./manifest.json','./icon.svg','./sw.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(urls)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(cs=>Promise.all(cs.map(c=>c!==CACHE?caches.delete(c):0))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(r=>{let rc=r.clone();caches.open(CACHE).then(c=>c.put(e.request,rc));return r}).catch(()=>new Response('Offline',{status:503}))))});