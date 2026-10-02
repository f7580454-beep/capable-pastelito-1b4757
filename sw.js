const CACHE='baccarat-install-v2';
const ASSETS=['/icon-192.png','/icon-512.png','/apple-touch-icon.png','/favicon.svg','/manifest.webmanifest','/offline.html'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('baccarat-install-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==self.location.origin)return;if(ASSETS.includes(url.pathname)){event.respondWith(caches.open(CACHE).then(async cache=>{const cached=await cache.match(event.request);return cached||fetch(event.request);}));return;}if(event.request.mode==='navigate'){event.respondWith(fetch(event.request).catch(()=>caches.match('/offline.html')));}});
