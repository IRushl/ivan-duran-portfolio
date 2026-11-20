'use client';

import { useEffect } from 'react';
import styles from './cursor-parallax.module.css';

/** Enhances marked media only, without wrappers or React updates on pointer movement. */
export function CursorParallax({ rootSelector, intensity = 16, enabled = true }: { rootSelector: string; intensity?: number; enabled?: boolean }) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(rootSelector);
    if (!root || !enabled) return;
    const capability = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const amount = Number.isFinite(intensity) ? Math.max(0, Math.min(20, intensity)) : 16;
    let active: HTMLElement | null = null;
    let frame = 0;
    let x = 0;
    let y = 0;

    const reset = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      if (active) {
        active.removeAttribute('data-parallax-active');
        active.style.removeProperty('--parallax-x');
        active.style.removeProperty('--parallax-y');
      }
      active = null;
    };
    const render = () => {
      frame = 0;
      if (!active || !capability.matches || !active.isConnected) { reset(); return; }
      // The figure stays fixed; its image surface translates independently of captions.
      const reference = active.parentElement;
      if (!reference) { reset(); return; }
      const bounds = reference.getBoundingClientRect();
      const height = active.offsetHeight;
      if (!bounds.width || !height) { reset(); return; }
      // 12px for compact scenes, 16px at 800px wide, up to 20px for large scenes.
      const distance = Math.min(20, amount * Math.max(.75, Math.min(1.25, bounds.width / 800)));
      const top = bounds.top + active.offsetTop;
      const nx = Math.max(-1, Math.min(1, (x - bounds.left) / bounds.width * 2 - 1));
      const ny = Math.max(-1, Math.min(1, (y - top) / height * 2 - 1));
      active.style.setProperty('--parallax-x', `${(nx * distance).toFixed(3)}px`);
      active.style.setProperty('--parallax-y', `${(ny * distance).toFixed(3)}px`);
      active.setAttribute('data-parallax-active', 'true');
    };
    const move = (event: PointerEvent) => {
      if (!capability.matches || !amount || event.pointerType !== 'mouse' || event.buttons || !(event.target instanceof Element) || event.target.closest('dialog')) { reset(); return; }
      let candidate = event.target.closest<HTMLElement>('[data-parallax-scene]');
      if (candidate && root.contains(candidate)) {
        // Use a single outer layer even if future markup accidentally nests scenes.
        let parent = candidate.parentElement?.closest<HTMLElement>('[data-parallax-scene]');
        while (parent && root.contains(parent)) { candidate = parent; parent = candidate.parentElement?.closest<HTMLElement>('[data-parallax-scene]'); }
        if (candidate.dataset.parallaxScene === 'false' || candidate.closest('[inert], [aria-hidden="true"]')) candidate = null;
      } else candidate = null;
      if (candidate !== active) { reset(); active = candidate; }
      if (!active) return;
      x = event.clientX; y = event.clientY;
      if (!frame) frame = requestAnimationFrame(render);
    };
    const out = (event: PointerEvent) => { if (active && (!(event.relatedTarget instanceof Element) || !active.contains(event.relatedTarget))) reset(); };
    const key = (event: KeyboardEvent) => { if (['Tab', 'Escape'].includes(event.key)) reset(); };
    const focus = (event: FocusEvent) => { if (event.target instanceof Element && event.target.matches(':focus-visible')) reset(); };
    const click = (event: MouseEvent) => { if (event.target instanceof Element && event.target.closest('a, button, summary')) reset(); };
    const visibility = () => { if (document.hidden) reset(); };
    root.classList.add(styles.root);
    root.addEventListener('pointermove', move, { passive: true });
    root.addEventListener('pointerout', out);
    root.addEventListener('pointerleave', reset);
    root.addEventListener('pointercancel', reset);
    root.addEventListener('focusin', focus);
    root.addEventListener('click', click);
    document.addEventListener('keydown', key);
    document.addEventListener('visibilitychange', visibility);
    window.addEventListener('blur', reset);
    window.addEventListener('resize', reset, { passive: true });
    capability.addEventListener('change', reset);
    return () => {
      reset();
      root.classList.remove(styles.root);
      root.removeEventListener('pointermove', move);
      root.removeEventListener('pointerout', out);
      root.removeEventListener('pointerleave', reset);
      root.removeEventListener('pointercancel', reset);
      root.removeEventListener('focusin', focus);
      root.removeEventListener('click', click);
      document.removeEventListener('keydown', key);
      document.removeEventListener('visibilitychange', visibility);
      window.removeEventListener('blur', reset);
      window.removeEventListener('resize', reset);
      capability.removeEventListener('change', reset);
    };
  }, [rootSelector, intensity, enabled]);
  return null;
}
