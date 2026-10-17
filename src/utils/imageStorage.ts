// Helper for finding uploaded or imported images
// Supports Vite dynamic glob imports across all relevant image folders

const allModules = import.meta.glob([
  '/src/imagens/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}',
  '/src/images/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}',
  '/src/amostras/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}',
  '/src/bonus/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}',
  '/CAFE_LITERARIO_AMOSTRAS_COMPLETAS/**/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}',
], {
  eager: true,
  import: 'default',
}) as Record<string, string>;

export function getAmostraImage(id: string, filePrefix: string): string | null {
  // 1. LocalStorage
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(`amostra_${id}`);
    if (saved) return saved;
  }

  // 2. Check glob modules
  const prefixLower = filePrefix.toLowerCase();
  const idLower = id.toLowerCase();
  for (const [path, url] of Object.entries(allModules)) {
    const filename = path.split('/').pop()?.toLowerCase() || '';
    if (filename.includes(prefixLower) || (filename.startsWith(idLower + '_') || filename.startsWith(idLower + '-'))) {
      return url;
    }
  }

  // 3. Fallbacks to public directories
  return `/imagens/${filePrefix}.png`;
}

export function getBonusImage(id: string, filePrefix: string): string | null {
  // 1. LocalStorage
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(`bonus_${id}`);
    if (saved) return saved;
  }

  // 2. Check glob modules
  const prefixLower = filePrefix.toLowerCase();
  for (const [path, url] of Object.entries(allModules)) {
    const filename = path.split('/').pop()?.toLowerCase() || '';
    if (filename.includes(prefixLower)) {
      return url;
    }
  }

  // 3. Fallbacks
  return `/imagens/${filePrefix}.png`;
}

export function saveAmostraImage(id: string, dataUrl: string) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(`amostra_${id}`, dataUrl);
    } catch {
      // ignore
    }
  }
}

export function saveBonusImage(id: string, dataUrl: string) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(`bonus_${id}`, dataUrl);
    } catch {
      // ignore
    }
  }
}
