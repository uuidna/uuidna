// uuidna service worker — offline-capable PWA. Network-first for page navigations (fresh content when online, the
// cached page or the app shell when offline), cache-first for the hashed/immutable build assets. Only same-origin
// GETs are handled: the trial CRUD (POST/DELETE /trials…) and any cross-origin request pass straight through, so
// nothing dynamic or private is ever cached. Bump CACHE to invalidate on deploy.
const CACHE = 'uuidna-v1'
const SHELL = ['/', '/offline.html']

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return // POST/DELETE (e.g. the trial CRUD) go straight to the network — never cached
  const url = new URL(req.url)
  if (url.origin !== self.location.origin) return // cross-origin (e.g. a book fetch) is not our concern

  if (req.mode === 'navigate') {
    // Pages: network-first, fall back to the cached page, then to the offline shell.
    event.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return res })
        .catch(() => caches.match(req).then((r) => r || caches.match('/offline.html'))),
    )
    return
  }

  // Assets: cache-first (content-hashed, safe to serve from cache), populate the cache on first miss.
  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).then((res) => {
      if (res.ok && res.type === 'basic') { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)) }
      return res
    })),
  )
})
