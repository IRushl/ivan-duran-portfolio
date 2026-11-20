export type ShowcasePlaybackState = { enabled: boolean; running: boolean; reduced: boolean; waiting: boolean };

/** A single timeout; human selection, reading focus and reduced motion take priority. */
export function mountShowcasePlayback(root: HTMLElement, progress: HTMLElement, advance: () => void,
  onState: (state: ShowcasePlaybackState) => void, interval = 3000, idle = 3000) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let enabled = !reduced.matches, visible = false, hovered = false, disposed = false;
  let remaining = interval, deadline = 0, resumeAt = 0, running = false, lastState = '';
  let timer: ReturnType<typeof setTimeout> | undefined;
  const animation = progress.animate?.([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: interval, fill: 'both' });
  animation?.pause();
  function stop() {
    if (timer !== undefined) clearTimeout(timer);
    timer = undefined;
    if (running) remaining = Math.max(0, deadline - performance.now());
    running = false; animation?.pause();
  }
  function focused() {
    const target = document.activeElement;
    return target instanceof Element && target !== root && root.contains(target) && !target.closest('[data-showcase-playback]');
  }
  function update() {
    if (disposed) return;
    stop();
    const canRun = enabled && visible && !hovered && !focused() && !document.hidden && !reduced.matches;
    const waiting = canRun && performance.now() < resumeAt;
    if (waiting) timer = setTimeout(update, resumeAt - performance.now());
    else if (canRun) {
      running = true; deadline = performance.now() + remaining; animation?.play();
      timer = setTimeout(() => {
        timer = undefined; running = false; remaining = interval;
        advance(); if (animation) animation.currentTime = 0; update();
      }, remaining);
    }
    const state = { enabled, running, reduced: reduced.matches, waiting };
    const key = JSON.stringify(state);
    if (key !== lastState) { lastState = key; onState(state); }
  }
  function manual() { stop(); remaining = interval; resumeAt = performance.now() + idle; if (animation) animation.currentTime = 0; update(); }
  const insideCard = (target: EventTarget | null) => target instanceof Element && !!target.closest('[data-showcase-card]') && root.contains(target);
  function over(event: PointerEvent) { if (event.pointerType === 'mouse') { const next = insideCard(event.target); if (next !== hovered) { hovered = next; if (hovered) manual(); else update(); } } }
  function out(event: PointerEvent) { if (event.pointerType === 'mouse') { const next = insideCard(event.relatedTarget); if (hovered !== next) { hovered = next; resumeAt = performance.now() + idle; update(); } } }
  function blur() { resumeAt = performance.now() + idle; update(); }
  function preference() { if (reduced.matches) enabled = false; manual(); }
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting && entry.intersectionRatio >= .08; update(); }, { threshold: [0, .08] });
  observer.observe(root);
  root.addEventListener('pointerover', over); root.addEventListener('pointerout', out);
  root.addEventListener('showcaseinteraction', manual); root.addEventListener('focusin', update); root.addEventListener('focusout', blur);
  document.addEventListener('visibilitychange', update); reduced.addEventListener('change', preference);
  update();
  return { toggle() { enabled = !enabled && !reduced.matches; resumeAt = 0; remaining = interval; if (animation) animation.currentTime = 0; update(); }, dispose() {
    disposed = true; stop(); animation?.cancel(); observer.disconnect();
    root.removeEventListener('pointerover', over); root.removeEventListener('pointerout', out);
    root.removeEventListener('showcaseinteraction', manual); root.removeEventListener('focusin', update); root.removeEventListener('focusout', blur);
    document.removeEventListener('visibilitychange', update); reduced.removeEventListener('change', preference);
  } };
}
