'use client';

import { useEffect, useRef } from 'react';
import { useLocale } from '@/i18n/provider';
import { motionPreferenceEvent, readMotionPreference } from '@/lib/motion-preference';
import styles from './ambient-kinetic-typography.module.css';

// Five fixed lanes prevent random collisions. Each pair shares a lane and cross-fades.
const lanes=[['UX Research','Product Marketing'],['Interaction Design','Design Systems'],['Diseño','Prototipado'],['Product Design','Marketing'],['UX']];

export function AmbientKineticTypography() {
  const root=useRef<HTMLDivElement>(null);
  const {t}=useLocale();
  useEffect(()=>{
    const layer=root.current,hero=layer?.parentElement;
    if(!layer||!hero)return;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible=false;
    const sync=()=>{
      layer.dataset.running=String(visible&&!document.hidden&&!reduced.matches&&!readMotionPreference());
      layer.dataset.static=String(reduced.matches||readMotionPreference());
    };
    // The transparent exclusion follows the existing orb's reserved area. No WebGL
    // objects or render loops are added; words never paint over its facets.
    const frame=hero.querySelector<HTMLElement>('[data-orb-stage]');
    const measure=()=>{
      const area=hero.getBoundingClientRect(),orb=frame?.getBoundingClientRect();
      if(!orb)return;
      layer.style.setProperty('--orb-x',`${orb.left-area.left+orb.width/2}px`);
      layer.style.setProperty('--orb-y',`${orb.top-area.top+orb.height/2}px`);
      layer.style.setProperty('--orb-safe',`${Math.min(orb.width,orb.height)*.31+18}px`);
    };
    const resize=typeof ResizeObserver!=='undefined'?new ResizeObserver(measure):null;
    resize?.observe(hero);if(frame)resize?.observe(frame);measure();
    const observer=typeof IntersectionObserver!=='undefined'?new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync()}):null;
    observer?.observe(hero);if(!observer)visible=true;
    document.addEventListener('visibilitychange',sync);
    document.addEventListener(motionPreferenceEvent,sync);
    reduced.addEventListener('change',sync);sync();
    return()=>{observer?.disconnect();resize?.disconnect();document.removeEventListener('visibilitychange',sync);document.removeEventListener(motionPreferenceEvent,sync);reduced.removeEventListener('change',sync)};
  },[]);
  return <div ref={root} className={styles.layer} aria-hidden="true" data-ambient-typography data-running="false">
    {lanes.map((terms,index)=><div className={styles.lane} data-depth={index%3} key={index}><div className={styles.drift}>
      {terms.map(term=><span className={styles.word} key={term}>{t(term)}</span>)}
    </div></div>)}
  </div>;
}
