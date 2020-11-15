
const staticCacheName = "captains-log";

self.addEventListener("install", (event: any) => {
    event.waitUntil(
        caches.open(staticCacheName).then((cache) =>  {
            return cache.addAll([
                "/",
                "/index.html",
                "/css/bootstrap.min.css",
                "/css/fontawesome.css",
                "/css/style.css",
                "/webfonts/fa-solid-900.woff2",
                "/frontend-bundle.js",
                "/js/bootstrap.min.js",
                "/js/jquery-3.3.1.slim.min.js",
                "/js/popper.min.js",
                "/images/icon.png",
                "/images/icon192x192.png",
                "/images/icon512x512.png",
                "/images/maskable_icon.png",
                "/manifest.json",
            ]);
        }),
    );
});

self.addEventListener("fetch",  (event: any) => {
    console.log(event.request.url);

    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        }),
    );
});
