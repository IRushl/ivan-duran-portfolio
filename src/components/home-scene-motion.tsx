'use client';

import { useEffect } from 'react';

export function scrollSceneOffset(top: number, height: number, viewport: number) {
  return Math.max(-36, Math.min(36, (viewport / 2 - top - height / 2) / viewport * 72));
}

type Scene = {
  element: HTMLElement; scroll: HTMLElement; pointer: HTMLElement; ambient: HTMLElement | null;
  x: number; y: number; sy: number; tx: number; ty: number; tsy: number;
};

/** A single demand-driven loop; scroll and cursor use separate nested surfaces. */
export function mountHomeSceneMotion(root: HTMLElement) {
  const media = window.matchMedia('(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  const scenes: Scene[] = [...root.querySelectorAll<HTMLElement>('[data-home-scene]')].flatMap(element => {
    const scroll = element.querySelector<HTMLElement>('[data-home-scroll]');
    const pointer = element.querySelector<HTMLElement>('[data-home-pointer]');
    return scroll && pointer ? [{ element, scroll, pointer, ambient: element.querySelector<HTMLElement>('[data-home-ambient]'), x:0, y:0, sy:0, tx:0, ty:0, tsy:0 }] : [];
  });
  const visible = new Set<Scene>();
  const reveals = new Set<Element>();
  let frame = 0, geometry = true, active: Scene | null = null;
  let point: { x:number; y:number } | null = null;
  const cancel = () => { if (frame) cancelAnimationFrame(frame); frame = 0; };
  const clear = (scene: Scene) => {
    scene.x = scene.y = scene.sy = scene.tx = scene.ty = scene.tsy = 0;
    scene.scroll.style.removeProperty('--home-scroll-y');
    scene.pointer.style.removeProperty('--home-pointer-x'); scene.pointer.style.removeProperty('--home-pointer-y');
    scene.ambient?.style.removeProperty('--home-ambient-y');
  };
  const render = () => {
    frame = 0;
    if (!media.matches || document.hidden) return;
    let pending = false;
    for (const scene of visible) {
      if (geometry || active === scene) {
        const rect = scene.element.getBoundingClientRect();
        if (geometry) scene.tsy = scrollSceneOffset(rect.top, rect.height, window.innerHeight);
        if (active === scene && point) {
          const distance = Math.max(12, Math.min(18, rect.width / 45));
          scene.tx = Math.max(-1, Math.min(1, (point.x - rect.left) / rect.width * 2 - 1)) * distance;
          scene.ty = Math.max(-1, Math.min(1, (point.y - rect.top) / rect.height * 2 - 1)) * distance;
        }
      }
      for (const [value,target] of [['x','tx'],['y','ty'],['sy','tsy']] as const) {
        const delta = scene[target] - scene[value];
        scene[value] = Math.abs(delta) < .05 ? scene[target] : scene[value] + delta * .2;
        if (Math.abs(scene[target] - scene[value]) >= .05) pending = true;
      }
      scene.scroll.style.setProperty('--home-scroll-y', `${scene.sy.toFixed(3)}px`);
      scene.pointer.style.setProperty('--home-pointer-x', `${scene.x.toFixed(3)}px`);
      scene.pointer.style.setProperty('--home-pointer-y', `${scene.y.toFixed(3)}px`);
      scene.ambient?.style.setProperty('--home-ambient-y', `${(-scene.sy * .4).toFixed(3)}px`);
    }
    geometry = false;
    if (pending) frame = requestAnimationFrame(render);
  };
  const schedule = () => { if (media.matches && !document.hidden && !frame && visible.size) frame = requestAnimationFrame(render); };
  const release = () => { if (active) active.tx = active.ty = 0; active = null; point = null; schedule(); };
  const scroll = () => { geometry = true; schedule(); };
  const move = (event: PointerEvent) => {
    if (!media.matches || event.pointerType !== 'mouse' || event.buttons || !(event.target instanceof Element)) { release(); return; }
    const next = scenes.find(scene => scene.element.contains(event.target as Node)) ?? null;
    if (next !== active) { release(); active = next; }
    if (!active) return;
    point = { x:event.clientX, y:event.clientY }; schedule();
  };
  const preference = () => { cancel(); release(); if (!media.matches) { scenes.forEach(clear); root.getAnimations?.({subtree:true}).forEach(a=>a.cancel()); } else scroll(); };
  const visibility = () => { if (document.hidden) { cancel(); root.getAnimations?.({subtree:true}).forEach(a=>a.cancel()); } else scroll(); };
  const key = (event: KeyboardEvent) => { if (event.key === 'Tab' || event.key === 'Escape') release(); };
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const scene = scenes.find(scene => scene.element === entry.target);
      if (scene) {
        if (entry.isIntersecting) visible.add(scene);
        else { visible.delete(scene); clear(scene); if (active === scene) release(); }
      }
      if (!entry.isIntersecting) entry.target.getAnimations?.().forEach(animation => animation.cancel());
      if (entry.isIntersecting && entry.target.hasAttribute('data-home-reveal') && !reveals.has(entry.target)) {
        reveals.add(entry.target);
        if (media.matches && !document.hidden && typeof entry.target.animate === 'function') entry.target.animate([{ opacity:.82, transform:'translateY(18px)' },{ opacity:1, transform:'none' }], { duration:520, easing:'cubic-bezier(.22,1,.36,1)', fill:'backwards' });
      }
    }
    geometry = true; schedule();
    if (!visible.size) cancel();
  }, { rootMargin:'100px 0px', threshold:0 });
  scenes.forEach(scene => observer.observe(scene.element));
  root.querySelectorAll('[data-home-reveal]').forEach(el => observer.observe(el));
  root.addEventListener('pointermove',move,{ passive:true }); root.addEventListener('pointerleave',release);
  root.addEventListener('focusin',release); root.addEventListener('click',release);
  window.addEventListener('scroll',scroll,{ passive:true }); window.addEventListener('resize',scroll,{ passive:true });
  document.addEventListener('visibilitychange',visibility); document.addEventListener('keydown',key);
  media.addEventListener('change',preference);
  return () => {
    cancel(); observer.disconnect(); scenes.forEach(clear);
    root.getAnimations?.({ subtree:true }).forEach(animation => animation.cancel());
    root.removeEventListener('pointermove',move); root.removeEventListener('pointerleave',release);
    root.removeEventListener('focusin',release); root.removeEventListener('click',release);
    window.removeEventListener('scroll',scroll); window.removeEventListener('resize',scroll);
    document.removeEventListener('visibilitychange',visibility); document.removeEventListener('keydown',key);
    media.removeEventListener('change',preference);
  };
}

export function HomeSceneMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-home-exhibition]');
    if (root) return mountHomeSceneMotion(root);
  }, []);
  return null;
}
