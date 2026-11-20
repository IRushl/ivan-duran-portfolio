export type AutoplayState = { enabled:boolean; running:boolean; reduced:boolean };

/** The timer and GPU progress animation share a clock; React only receives state changes. */
export function mountGalleryAutoplay(root: HTMLElement, visual: HTMLElement, progress: HTMLElement | null, advance: () => void, onState: (state: AutoplayState) => void) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let enabled = !reduced.matches, visible = false, hovered = root.matches(':hover'), focused = root.contains(document.activeElement), touching = false;
  const interval = 3000;
  let remaining = interval, deadline = 0, running = false, disposed = false, lastState = '';
  let timer: ReturnType<typeof setTimeout> | undefined;
  const animation = progress?.animate?.([{ transform:'scaleX(0)' }, { transform:'scaleX(1)' }], { duration:interval, fill:'both' });
  animation?.pause();
  const stop = () => {
    if (timer !== undefined) { remaining = Math.max(0,deadline-performance.now()); clearTimeout(timer); timer = undefined; }
    animation?.pause(); running = false;
  };
  const update = () => {
    if (disposed) return;
    const next = enabled && visible && !hovered && !focused && !touching && !document.hidden && !reduced.matches;
    if (!next) stop();
    else if (!running) {
      running = true; deadline = performance.now() + remaining; animation?.play();
      timer = setTimeout(() => { timer = undefined; running = false; remaining = 0; advance(); },remaining);
    }
    const state = { enabled,running,reduced:reduced.matches }, key = JSON.stringify(state);
    if (key !== lastState) { lastState = key; onState(state); }
  };
  const reset = () => { stop(); remaining = interval; if (animation) animation.currentTime = 0; update(); };
  const manual = () => { enabled = false; reset(); };
  const enter = (event: PointerEvent) => { if (event.pointerType === 'mouse') { hovered = true; update(); } };
  const leave = (event: PointerEvent) => { if (event.pointerType === 'mouse') { hovered = false; update(); } };
  const focus = () => { focused = true; update(); };
  const blur = (event: FocusEvent) => { focused = event.relatedTarget instanceof Node && root.contains(event.relatedTarget); update(); };
  const touch = (event: PointerEvent) => { if (event.pointerType !== 'mouse') { touching = true; manual(); } };
  const release = () => { touching = false; update(); };
  const wheel = (event: WheelEvent) => { if (Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey) manual(); };
  const preference = () => { if (reduced.matches) enabled = false; reset(); };
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting && entry.intersectionRatio >= .15; update(); }, { threshold:[0,.15] });
  observer.observe(visual);
  root.addEventListener('pointerenter',enter); root.addEventListener('pointerleave',leave);
  root.addEventListener('focusin',focus); root.addEventListener('focusout',blur);
  root.addEventListener('pointerdown',touch,{passive:true}); root.addEventListener('wheel',wheel,{passive:true});
  document.addEventListener('pointerup',release); document.addEventListener('pointercancel',release);
  document.addEventListener('visibilitychange',update); reduced.addEventListener('change',preference);
  update();
  return { reset, manual, toggle() { enabled = !enabled && !reduced.matches; if (enabled) reset(); else update(); }, dispose() {
    disposed = true; stop(); animation?.cancel(); observer.disconnect();
    root.removeEventListener('pointerenter',enter); root.removeEventListener('pointerleave',leave);
    root.removeEventListener('focusin',focus); root.removeEventListener('focusout',blur);
    root.removeEventListener('pointerdown',touch); root.removeEventListener('wheel',wheel);
    document.removeEventListener('pointerup',release); document.removeEventListener('pointercancel',release);
    document.removeEventListener('visibilitychange',update); reduced.removeEventListener('change',preference);
  } };
}
