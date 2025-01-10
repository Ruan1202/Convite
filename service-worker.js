// service-worker.js

const CACHE_NAME = 'meu-site-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/Irmao1.png',
  '/Irmao2.png',
  '/Chapeleiro.png',
  '/Copas.png',
  '/chapeu.png', // Imagem adicional
  // Adicione aqui outros arquivos que você deseja que sejam armazenados em cache
];

// Instalar o Service Worker e adicionar arquivos ao cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Ativar o Service Worker e limpar caches antigos
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar requisições e servir conteúdo do cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Retorna a resposta do cache se existir, senão faz a requisição normal
        return cachedResponse || fetch(event.request);
      })
  );
});
