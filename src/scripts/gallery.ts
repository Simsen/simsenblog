/**
 * Step-by-step image galleries in posts (migrated from the WordPress NextGEN image browser).
 * Markdown holds a plain <div class="post-gallery"> with one <figure> per image. Without JavaScript
 * every image shows; with it, one image at a time with ‹ ›, a counter, arrow keys and swipe.
 */
export function initGalleries(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('.post-gallery:not(.is-ready)').forEach((gallery) => {
    const figures = [...gallery.querySelectorAll<HTMLElement>(':scope > figure')];
    if (figures.length < 2) return;

    // Size the stage for the tallest image, so the page doesn't jump when you step through.
    const ratio = Math.max(
      ...figures.map((f) => {
        const img = f.querySelector('img')!;
        return Number(img.getAttribute('height')) / Number(img.getAttribute('width')) || 0.6;
      }),
    );
    const stage = document.createElement('div');
    stage.className = 'gallery-stage';
    stage.style.setProperty('--gallery-ratio', String(Math.min(ratio, 1.2)));
    figures.forEach((f) => stage.append(f));

    const bar = document.createElement('div');
    bar.className = 'gallery-bar';
    bar.innerHTML = `
      <button type="button" class="gallery-btn" data-step="-1" aria-label="Previous image">‹</button>
      <p class="gallery-caption" aria-live="polite"></p>
      <span class="gallery-count"></span>
      <button type="button" class="gallery-btn" data-step="1" aria-label="Next image">›</button>`;
    gallery.append(stage, bar);
    gallery.tabIndex = 0;
    gallery.classList.add('is-ready');

    const caption = bar.querySelector<HTMLElement>('.gallery-caption')!;
    const count = bar.querySelector<HTMLElement>('.gallery-count')!;
    let index = 0;

    function show(i: number) {
      index = (i + figures.length) % figures.length;
      figures.forEach((f, n) => (f.hidden = n !== index));
      const cap = figures[index].querySelector('figcaption')?.textContent?.trim() ?? '';
      caption.textContent = cap;
      count.textContent = `${index + 1} / ${figures.length}`;
      // Load the neighbours now, so the next click is instant.
      for (const n of [index + 1, index - 1]) figures[(n + figures.length) % figures.length].querySelector('img')!.loading = 'eager';
    }

    bar.addEventListener('click', (e) => {
      const btn = (e.target as Element).closest<HTMLButtonElement>('[data-step]');
      if (btn) show(index + Number(btn.dataset.step));
    });
    gallery.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); show(index - 1); }
    });

    // Swipe on touch screens. A swipe isn't a click, so it doesn't open the lightbox.
    let startX = 0, startY = 0, swiped = false;
    stage.addEventListener('pointerdown', (e) => { startX = e.clientX; startY = e.clientY; swiped = false; });
    stage.addEventListener('pointerup', (e) => {
      const dx = e.clientX - startX, dy = e.clientY - startY;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) { swiped = true; show(index + (dx < 0 ? 1 : -1)); }
    });
    stage.addEventListener('click', (e) => { if (swiped) { e.stopPropagation(); swiped = false; } }, { capture: true });

    // The lightbox (scripts/lightbox.ts) leaves the gallery on the image you last looked at.
    gallery.addEventListener('gallery:show', (e) => {
      const i = figures.findIndex((f) => f.contains((e as CustomEvent<Element>).detail));
      if (i >= 0) show(i);
    });

    show(0);
  });
}
