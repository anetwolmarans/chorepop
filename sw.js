/* ChorePop service worker — offline app shell for Android install */
const CACHE = 'chorepop-v5'
const BASE = '/chorepop'
const SHELL = [
  `${BASE}/`,
  `${BASE}/manifest.webmanifest`,
  `${BASE}/icons/icon-192.png`,
  `${BASE}/icons/icon-512.png`,
  `${BASE}/icons/maskable-512.png`,
  `${BASE}/icons/icon-180.png`,
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(SHELL))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  // Never cache API responses — data must be fresh when online
  if (url.pathname.startsWith(`${BASE}/api/`)) return

  // App navigations: network first, fall back to cached shell when offline
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone()
          caches.open(CACHE).then((cache) => cache.put(`${BASE}/`, copy))
          return res
        })
        .catch(() => caches.match(`${BASE}/`)),
    )
    return
  }

  // Static assets: stale-while-revalidate — instant from cache, refreshed
  // in the background so content-hashed or rebuilt bundles never go stale.
  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(request)
      const network = fetch(request)
        .then((res) => {
          if (res.ok) cache.put(request, res.clone())
          return res
        })
        .catch(() => cached)
      return cached || network
    }),
  )
})
