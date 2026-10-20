// Central image storage & upload utility for site-wide editable images
// Supports LocalStorage persistence, server-side persistence (/api/upload-image), and clipboard/drag-drop

export function getSiteImage(key: string, defaultSrc: string = ''): string {
  if (typeof window !== 'undefined') {
    try {
      const keys = [`site_img_${key}`, `amostra_${key}`, `peca_${key}`, key];
      for (const k of keys) {
        const val = localStorage.getItem(k);
        if (val && val.length > 50) {
          return val;
        }
      }
    } catch {}
  }
  return defaultSrc;
}

export function removeSiteImage(key: string) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(`site_img_${key}`);
      localStorage.removeItem(`amostra_${key}`);
      localStorage.removeItem(`bonus_${key}`);
      localStorage.removeItem(`depoimento_${key}`);
    } catch {}
    window.dispatchEvent(
      new CustomEvent('site-image-updated', {
        detail: { key, removed: true },
      })
    );
  }
}

export function saveSiteImage(key: string, filename: string, dataUrl: string) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(`site_img_${key}`, dataUrl);
      // Also save with specific legacy keys if needed
      localStorage.setItem(`amostra_${key}`, dataUrl);
      localStorage.setItem(`bonus_${key}`, dataUrl);
      localStorage.setItem(`depoimento_${key}`, dataUrl);
    } catch {}

    // Dispatch custom event for instant UI sync & toast notification
    window.dispatchEvent(
      new CustomEvent('site-image-updated', {
        detail: { key, filename, dataUrl },
      })
    );

    // Save to server in background
    fetch('/api/upload-image', {
      method: 'POST',
      headers: {
        'x-filename': encodeURIComponent(filename),
      },
      body: dataUrl,
    }).catch(() => {});
  }
}

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const res = e.target?.result as string;
      if (res) resolve(res);
      else reject(new Error('Falha ao ler arquivo'));
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
