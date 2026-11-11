// 반발경도 강도산정 - 오프라인 캐시. 화면을 고쳐 다시 올릴 때 VERSION 을 바꾸세요.
const VERSION="goeng-rebound-1.0-20261111";
const FILES=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","icon-maskable-512.png","apple-touch-icon.png"];
self.addEventListener("install",e=>{ e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())); });
self.addEventListener("activate",e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
// 인터넷이 되면 새 파일, 안 되면 저장해 둔 파일
self.addEventListener("fetch",e=>{ if(e.request.method!=="GET") return;
  e.respondWith(fetch(e.request).then(r=>{ const cp=r.clone(); caches.open(VERSION).then(c=>c.put(e.request,cp)); return r; }).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match("index.html")))); });
