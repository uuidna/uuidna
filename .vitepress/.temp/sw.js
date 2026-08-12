// uuidna service worker — deliberately CONSERVATIVE so it can never break asset loading. It intercepts ONLY page
// navigations (to give an offline fallback); every other request — CSS, JS, fonts, images, the manifest, the trial
// CRUD POSTs — passes straight to the browser's native loading, untouched by the worker. A service worker that
// wraps asset fetches and lets respondWith reject will brick the whole page on a single transient failure (the
// earlier bug: "FetchEvent.respondWith received an error: Load failed"); this version cannot, because it never
// touches those requests. Bump CACHE to force-replace an older worker.
const CACHE = 'uuidna-v2'

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    try { const c = await caches.open(CACHE); await c.add('/offline.html') } catch { /* offline shell is best-effort */ }
    await self.skipWaiting()
  })())
})

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys()
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))) // clear any older (broken) cache
    await self.clients.claim()
  })())
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  // Only same-origin page NAVIGATIONS get a fallback. Assets, fonts, scripts, the manifest and every non-GET
  // (the trial CRUD) are left entirely alone — the SW returns without calling respondWith, so the browser loads
  // them normally and the worker can never be the reason an asset fails.
  if (req.method !== 'GET' || req.mode !== 'navigate') return
  if (new URL(req.url).origin !== self.location.origin) return
  event.respondWith((async () => {
    try {
      return await fetch(req) // online: always serve fresh pages
    } catch {
      return (await caches.match('/offline.html')) || new Response('Offline', { status: 503, headers: { 'content-type': 'text/plain; charset=utf-8' } })
    }
  })())
})
