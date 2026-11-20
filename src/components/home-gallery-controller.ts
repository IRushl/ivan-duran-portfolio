/** Native horizontal scrolling: touch, trackpad and links work without a custom gesture layer. */
export function mountProjectGallery(viewport: HTMLElement, onChange: (index: number) => void, loop = false) {
  const slides = [...viewport.querySelectorAll<HTMLElement>('[data-gallery-slide]')];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0, pending: number | null = null, frame = 0, travel = 0;
  let previousSnap = '';
  let previousOpacity = '';
  let settle: ReturnType<typeof setTimeout> | undefined;
  const change = (index: number) => { if (current !== index) { current = index; onChange(index); } };
  const measure = () => {
    frame = 0;
    if (travel) return;
    const bounds = viewport.getBoundingClientRect();
    const center = bounds.left + bounds.width / 2;
    const distances = slides.map(slide => { const rect = slide.getBoundingClientRect(); return Math.abs(rect.left + rect.width / 2 - center); });
    const nearest = distances.indexOf(Math.min(...distances));
    if (pending !== null && distances[pending] > 2) return;
    pending = null; change(nearest);
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
  const cancelTravel = () => {
    if (travel) { cancelAnimationFrame(travel); travel = 0; viewport.style.scrollSnapType = previousSnap; viewport.style.opacity = previousOpacity; }
  };
  const interrupt = () => { cancelTravel(); pending = null; schedule(); };
  const end = () => { if (!travel) { pending = null; schedule(); } };
  const scroll = () => { schedule(); clearTimeout(settle); settle = setTimeout(end, 160); };
  const select = (index: number, instant = false) => {
    cancelTravel();
    index = loop ? ((index % slides.length) + slides.length) % slides.length : Math.max(0, Math.min(slides.length - 1, index));
    const crossfade = Math.abs(index-current) > 1;
    const rect = slides[index].getBoundingClientRect(), bounds = viewport.getBoundingClientRect();
    pending = index; change(index);
    const from = viewport.scrollLeft, to = from + rect.left + rect.width / 2 - bounds.left - bounds.width / 2;
    if (instant || reduced.matches || Math.abs(to-from) < 1) { viewport.scrollTo({ left:to, behavior:'instant' }); pending = null; return; }
    previousSnap = viewport.style.scrollSnapType; previousOpacity = viewport.style.opacity; viewport.style.scrollSnapType = 'none';
    const started = performance.now();
    let relocated = false;
    const animate = (time: number) => {
      const progress = Math.min(1,Math.max(0,(time-started)/750));
      const eased = progress < .5 ? 4*progress**3 : 1-(-2*progress+2)**3/2;
      if (crossfade) {
        viewport.style.opacity = String(.15 + Math.abs(progress-.5)*1.7);
        if (progress >= .5 && !relocated) { viewport.scrollTo({ left:to, behavior:'instant' }); relocated=true; }
      } else viewport.scrollTo({ left:from+(to-from)*eased, behavior:'instant' });
      if (progress < 1) travel = requestAnimationFrame(animate);
      else { travel = 0; viewport.style.scrollSnapType = previousSnap; viewport.style.opacity = previousOpacity; pending = null; schedule(); }
    };
    travel = requestAnimationFrame(animate);
  };
  const preference = () => { if (reduced.matches) select(current, true); };
  const visibility = () => { if (document.hidden) select(current, true); };
  const resize = new ResizeObserver(() => select(current, true));
  resize.observe(viewport);
  viewport.addEventListener('scroll', scroll, { passive:true });
  viewport.addEventListener('scrollend', end);
  viewport.addEventListener('pointerdown', interrupt, { passive:true });
  viewport.addEventListener('wheel', interrupt, { passive:true });
  reduced.addEventListener('change', preference);
  document.addEventListener('visibilitychange', visibility);
  return { select, dispose() {
    resize.disconnect(); cancelTravel(); if (frame) cancelAnimationFrame(frame); clearTimeout(settle);
    viewport.removeEventListener('scroll', scroll); viewport.removeEventListener('scrollend', end);
    viewport.removeEventListener('pointerdown', interrupt); viewport.removeEventListener('wheel', interrupt);
    reduced.removeEventListener('change', preference);
    document.removeEventListener('visibilitychange', visibility);
  } };
}
