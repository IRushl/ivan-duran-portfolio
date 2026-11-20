'use client';

import { useEffect, useRef } from 'react';
import styles from './home.module.css';

type WorldNode = { u:number; v:number; phase:number; depth:number; speed:number; x:number; y:number; ox:number; oy:number; fade:number };
const clamp = (value:number, min=0, max=1) => Math.max(min, Math.min(max,value));
function seeded(value:number) {
  value = Math.imul(value ^ (value >>> 16), 0x45d9f3b);
  value = Math.imul(value ^ (value >>> 16), 0x45d9f3b);
  return ((value ^ (value >>> 16)) >>> 0) / 4294967296;
}
/** A band is reproducible after eviction, so reversing scroll restores the same field. */
export function createWorldBand(band:number, count:number): WorldNode[] {
  const rows = Math.ceil(count / 6);
  return Array.from({length:count},(_,i) => {
    const seed = Math.imul(band,1597334677) ^ Math.imul(i + 1,3812015801);
    return { u:.05 + ((i % 6 + .15 + seeded(seed) * .7) / 6) * .9,
      v:(Math.floor(i / 6) + .15 + seeded(seed + 71) * .7) / rows,
      phase:seeded(seed + 137) * Math.PI * 2, depth:.45 + seeded(seed + 307) * .55, speed:.8 + seeded(seed + 419) * .48,
      x:0,y:0,ox:0,oy:0,fade:0 };
  });
}

/** One fixed Canvas projects deterministic world bands through a scrolling camera. */
export function mountHeroNetwork(canvas: HTMLCanvasElement, home: HTMLElement) {
  const context = canvas.getContext('2d', { alpha:true });
  if (!context) return () => {};
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  let width=1,height=1,frame=0,intersecting=false,disposed=false,elapsed=0,previousTime=0;
  let pointer: {x:number;y:number} | null = null;
  const bands = new Map<number,WorldNode[]>();
  const animated = () => !reduced.matches && fine.matches && width > 550;
  const stop = () => { if (frame) cancelAnimationFrame(frame); frame=0; previousTime=0; };
  const draw = (time:number) => {
    frame=0;
    if (disposed) return;
    const moving=animated();
    if (moving) { if (previousTime) elapsed += clamp(time - previousTime,0,40) * 1.3; previousTime=time; }
    const perBand = moving ? (width > 1000 ? 27 : width > 700 ? 22 : 16) : 10;
    const camera = reduced.matches ? 0 : (window.scrollY || 0) * .45;
    const bandHeight = height / 2;
    const first = Math.floor((camera - 64) / bandHeight), last = Math.floor((camera + height + 64) / bandHeight);
    for (const band of bands.keys()) if (band < first || band > last || bands.get(band)?.length !== perBand) bands.delete(band);
    const visible:WorldNode[] = [];
    for (let band=first;band<=last;band++) {
      if (!bands.has(band)) bands.set(band,createWorldBand(band,perBand));
      for (const node of bands.get(band)!) {
        const amplitude=12 + node.depth * 18;
        const ax=moving ? Math.sin(elapsed * .00022 * node.speed + node.phase) * amplitude + Math.sin(elapsed * .00011 + node.phase * .7) * 5 : 0;
        const ay=moving ? Math.cos(elapsed * .00017 * node.speed + node.phase) * amplitude * .8 + Math.sin(elapsed * .00029 + node.phase) * 5 : 0;
        const bx=node.u * width + ax, by=(band + node.v) * bandHeight - camera + ay;
        let tx=0,ty=0;
        if (moving && pointer) {
          const dx=bx - pointer.x,dy=by - pointer.y,distance=Math.hypot(dx,dy);
          if (distance > 0 && distance < 140) { const force=(1-distance/140) ** 2 * 22 * node.depth; tx=dx/distance*force; ty=dy/distance*force; }
        }
        node.ox=moving ? node.ox + (tx-node.ox)*.1 : 0; node.oy=moving ? node.oy + (ty-node.oy)*.1 : 0;
        node.x=bx+node.ox; node.y=by+node.oy;
        node.fade=clamp(Math.min((node.y+32)/100,(height+32-node.y)/100));
        if (node.fade > 0) visible.push(node);
      }
    }
    context.clearRect(0,0,width,height);
    const reach=Math.min(180,width*.25);
    for (let a=0;a<visible.length;a++) {
      const node=visible[a];
      for (let b=a+1;b<visible.length;b++) {
        const other=visible[b],distance=Math.hypot(node.x-other.x,node.y-other.y);
        if (distance < reach) {
          context.strokeStyle=`rgba(163,230,53,${.22*(1-distance/reach)*Math.min(node.fade,other.fade)})`;
          context.lineWidth=.7; context.beginPath(); context.moveTo(node.x,node.y); context.lineTo(other.x,other.y); context.stroke();
        }
      }
      const brightness=.45 + (moving ? Math.sin(elapsed*.00065+node.phase)*.12 : 0);
      context.fillStyle=node.depth>.9 ? `rgba(163,230,53,${(brightness+.3)*node.fade})` : `rgba(179,194,163,${brightness*node.depth*node.fade})`;
      context.beginPath(); context.arc(node.x,node.y,(node.depth>.9 ? 2.5 : 1.8)*node.depth,0,Math.PI*2); context.fill();
    }
    if (moving && intersecting && !document.hidden) frame=requestAnimationFrame(draw);
  };
  const sync = () => {
    stop(); pointer=null;
    if (disposed) return;
    if (animated() && intersecting && !document.hidden) frame=requestAnimationFrame(draw); else draw(0);
  };
  const resize = () => {
    const rect=canvas.getBoundingClientRect(); width=Math.max(1,rect.width); height=Math.max(1,rect.height);
    const dpr=Math.min(window.devicePixelRatio || 1,1.75);
    canvas.width=Math.round(width*dpr); canvas.height=Math.round(height*dpr);
    context.setTransform(dpr,0,0,dpr,0,0); bands.clear(); sync();
  };
  const move = (event:PointerEvent) => {
    if (!animated() || event.pointerType !== 'mouse') return;
    const rect=canvas.getBoundingClientRect(); pointer={x:event.clientX-rect.left,y:event.clientY-rect.top};
  };
  const leave = () => { pointer=null; };
  const scroll = () => {
    // Touch devices redraw only when the document moves; no continuous mobile loop.
    if (!animated() && !reduced.matches && intersecting && !document.hidden && !frame) frame=requestAnimationFrame(draw);
  };
  const visibility = () => { if (document.hidden) stop(); else sync(); };
  const viewport=new IntersectionObserver(([entry]) => { intersecting=entry.isIntersecting; sync(); },{threshold:0});
  const sizing=new ResizeObserver(resize);
  viewport.observe(home); sizing.observe(canvas);
  reduced.addEventListener('change',sync); fine.addEventListener('change',sync);
  document.addEventListener('visibilitychange',visibility);
  window.addEventListener('scroll',scroll,{passive:true});
  home.addEventListener('pointermove',move,{passive:true}); home.addEventListener('pointerleave',leave);
  resize();
  return () => {
    disposed=true; stop(); bands.clear(); viewport.disconnect(); sizing.disconnect();
    reduced.removeEventListener('change',sync); fine.removeEventListener('change',sync);
    document.removeEventListener('visibilitychange',visibility);
    window.removeEventListener('scroll',scroll);
    home.removeEventListener('pointermove',move); home.removeEventListener('pointerleave',leave);
  };
}

export function HeroNetwork() {
  const canvas=useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const target=canvas.current,home=target?.closest<HTMLElement>('main');
    if (target && home) return mountHeroNetwork(target,home);
  },[]);
  return <canvas ref={canvas} className={styles.network} aria-hidden="true"/>;
}
