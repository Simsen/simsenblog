/**
 * Lightbox for post images: click (or Enter) on an image to see it full size over a dimmed page.
 * ‹ › / arrow keys / swipe step through every enlargeable image in the post, gallery images included.
 * Esc, ✕ or a click outside the image closes it and puts focus back where it was.
 *
 * Images that already show at full size (icons, logos) and images inside links are left alone.
 */
export function initLightbox(root: HTMLElement | null = document.querySelector('.article-body')) {
  if (!root) return;
  const all = [...root.querySelectorAll<HTMLImageElement>('img')].filter((img) => !img.closest('a'));
  if (!all.length) return;

  const inGallery = (img: HTMLImageElement) => !!img.closest('.post-gallery');
  // Worth enlarging: gallery images, or images shown smaller than the file really is.
  const enlargeable = (img: HTMLImageElement) =>
    inGallery(img) || (img.complete && img.naturalWidth > 0 ? img.naturalWidth > img.clientWidth * 1.1 : !img.complete);

  function mark(img: HTMLImageElement) {
    const on = enlargeable(img);
    img.classList.toggle('zoomable', on);
    if (on && !inGallery(img)) {
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', `Enlarge image${img.alt ? `: ${img.alt}` : ''}`);
    } else if (!inGallery(img)) {
      img.removeAttribute('tabindex');
      img.removeAttribute('role');
      img.removeAttribute('aria-label');
    }
  }
  all.forEach((img) => {
    mark(img);
    if (!img.complete) img.addEventListener('load', () => mark(img), { once: true });
  });
  addEventListener('resize', () => all.forEach(mark), { passive: true });

  // The viewer: a modal <dialog> (traps focus, Esc closes, page behind is inert).
  const box = document.createElement('dialog');
  box.className = 'lightbox';
  box.setAttribute('aria-label', 'Image viewer');
  box.innerHTML = `
    <button type="button" class="lightbox-close" aria-label="Close">✕</button>
    <figure class="lightbox-figure">
      <img class="lightbox-img" alt="" />
      <figcaption class="lightbox-bar">
        <button type="button" class="lightbox-btn" data-step="-1" aria-label="Previous image">‹</button>
        <span class="lightbox-caption" aria-live="polite"></span>
        <span class="lightbox-count"></span>
        <button type="button" class="lightbox-btn" data-step="1" aria-label="Next image">›</button>
      </figcaption>
    </figure>`;
  document.body.append(box);
  const view = box.querySelector<HTMLImageElement>('.lightbox-img')!;
  const caption = box.querySelector<HTMLElement>('.lightbox-caption')!;
  const count = box.querySelector<HTMLElement>('.lightbox-count')!;

  let set: HTMLImageElement[] = [];
  let index = 0;
  let opener: HTMLElement | null = null;

  const captionFor = (img: HTMLImageElement) =>
    img.closest('figure')?.querySelector('figcaption')?.textContent?.trim() || img.alt.trim();

  function show(i: number) {
    index = (i + set.length) % set.length;
    const img = set[index];
    view.src = img.currentSrc || img.src;
    view.alt = img.alt;
    caption.textContent = captionFor(img);
    count.textContent = set.length > 1 ? `${index + 1} / ${set.length}` : '';
    box.classList.toggle('single', set.length < 2);
    // Fetch the neighbours now, so stepping is instant.
    for (const n of [index + 1, index - 1]) new Image().src = set[(n + set.length) % set.length].src;
  }

  function open(img: HTMLImageElement) {
    set = all.filter(enlargeable);
    if (!set.includes(img)) return;
    opener = (img.closest('.post-gallery') as HTMLElement) ?? img;
    show(set.indexOf(img));
    box.showModal();
    document.documentElement.classList.add('lightbox-open');
  }

  box.addEventListener('close', () => {
    document.documentElement.classList.remove('lightbox-open');
    // If the last image was in a gallery, leave that gallery on the same image.
    const last = set[index];
    last?.closest('.post-gallery')?.dispatchEvent(new CustomEvent('gallery:show', { detail: last }));
    opener?.focus({ preventScroll: true });
    view.removeAttribute('src');
  });

  root.addEventListener('click', (e) => {
    const img = (e.target as Element).closest<HTMLImageElement>('img.zoomable');
    if (img && all.includes(img)) open(img);
  });
  root.addEventListener('keydown', (e) => {
    const img = e.target as HTMLElement;
    if ((e.key === 'Enter' || e.key === ' ') && img instanceof HTMLImageElement && img.classList.contains('zoomable')) {
      e.preventDefault();
      open(img);
    }
  });
  // In a gallery, Enter on the focused gallery opens its current image.
  root.querySelectorAll<HTMLElement>('.post-gallery').forEach((g) =>
    g.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' || e.target !== g) return;
      const img = g.querySelector<HTMLImageElement>('figure:not([hidden]) img');
      if (img) { e.preventDefault(); open(img); }
    }),
  );

  box.addEventListener('click', (e) => {
    const t = e.target as Element;
    const step = t.closest<HTMLElement>('[data-step]');
    if (step) show(index + Number(step.dataset.step));
    else if (t.closest('.lightbox-close') || !t.closest('.lightbox-img, .lightbox-bar')) box.close();
  });
  box.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); show(index - 1); }
  });

  // Swipe on touch screens.
  let startX = 0, startY = 0, swiped = false;
  box.addEventListener('pointerdown', (e) => { startX = e.clientX; startY = e.clientY; swiped = false; });
  box.addEventListener('pointerup', (e) => {
    const dx = e.clientX - startX, dy = e.clientY - startY;
    if (set.length > 1 && Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) { swiped = true; show(index + (dx < 0 ? 1 : -1)); }
  });
  // A swipe that ends outside the image must not count as "click outside to close".
  box.addEventListener('click', (e) => { if (swiped) { e.stopImmediatePropagation(); swiped = false; } }, { capture: true });
}
