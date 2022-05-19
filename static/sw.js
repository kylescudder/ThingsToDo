
const staticCacheName = 'site-static'
const assets = [
	'/',
	'./icons/apple-touch-icon.png',
	'./icons/apple-touch-icon_144x144.png',
	'./icons/apple-touch-icon_152x152.png',
	'./icons/maskable_icon_x128.png',
	'./icons/maskable_icon_x192.png',
	'./icons/maskable_icon_x384.png',
	'./icons/maskable_icon_x512.png',
	'./icons/maskable_icon_x72.png',
	'./icons/maskable_icon_x96.png',
	'./checklist.png',
	'./favicon.png'
];
self.addEventListener('install', (evt) => {
	evt.waitUntil(
		caches.open(staticCacheName)
		.then((cache) => {
			console.log('Caching shell assets')
			cache.addAll(assets)
		})
	)
})
self.addEventListener('activate', (evt) => {
	console.log('Service worker has been activated')
})
self.addEventListener('fetch', (evt) => {
	evt.respondWith(
		caches.match(evt.request)
			.then((response) => {
				return response || fetch(evt.request)
			})
	)
})
