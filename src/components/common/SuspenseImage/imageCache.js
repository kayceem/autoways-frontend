// Image cache for Suspense-based image loading
const imageCache = new Map();

export function preloadImage(src) {
  if (!src) return;

  if (!imageCache.has(src)) {
    const promise = new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        imageCache.set(src, { status: 'loaded', src });
        resolve(src);
      };
      img.onerror = () => {
        // On error, still mark as loaded but with original src
        // This prevents throwing and lets the browser show broken image
        imageCache.set(src, { status: 'loaded', src });
        resolve(src);
      };
      img.src = src;
    });
    imageCache.set(src, { status: 'loading', promise });
  }
}

export function loadImage(src) {
  if (!src) return src;

  if (!imageCache.has(src)) {
    preloadImage(src);
  }

  const cached = imageCache.get(src);

  if (cached.status === 'loading') {
    throw cached.promise;
  }

  return cached.src;
}

export function clearImageCache() {
  imageCache.clear();
}

export function removeFromCache(src) {
  imageCache.delete(src);
}
