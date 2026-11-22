'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import { useLocale } from '@/i18n/provider';
import { motionPreferenceEvent, readMotionPreference } from '@/lib/motion-preference';
import styles from './ambient-kinetic-typography.module.css';
import { ambientExclusion } from './ambient-typography-exclusion';

// Seven reserved lanes keep the reading area clear; staggered cycles avoid a visible loop.
const lanes=[['UX','UX/UI'],['UX Research','Product Thinking'],['Product Design','Product Marketing'],['Marketing','Estrategia'],['Interaction Design','Diseño de interfaces'],['Design Systems','Prototipado'],['Arquitectura de información','Experiencia de usuario','IA aplicada','Creative Technology']];
const cycles=[34,43,37,47,41,39,52];
const phases=[3,17,8,28,12,21,5];

export function AmbientKineticTypography() {
  const root=useRef<HTMLDivElement>(null);
  const {t,locale}=useLocale();
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
      const content=hero.querySelector<HTMLElement>('[data-home-hero] > .shell');
      if(content) {
        const protectedElements=[...content.querySelectorAll('h1,p,a')];
        const identity=content.firstElementChild?.querySelector('span');if(identity)protectedElements.push(identity);
        const rects=protectedElements.map(element=>{
          const r=element.getBoundingClientRect();
          return {left:r.left-area.left,top:r.top-area.top,right:r.right-area.left,bottom:r.bottom-area.top};
        });
        layer.style.setProperty('clip-path',ambientExclusion(area.width,area.height,rects));
      }
    };
    const resize=typeof ResizeObserver!=='undefined'?new ResizeObserver(measure):null;
    resize?.observe(hero);if(frame)resize?.observe(frame);
    const content=hero.querySelector<HTMLElement>('[data-home-hero] > .shell');if(content)resize?.observe(content);
    measure();
    const observer=typeof IntersectionObserver!=='undefined'?new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync()}):null;
    observer?.observe(hero);if(!observer)visible=true;
    document.addEventListener('visibilitychange',sync);
    document.addEventListener(motionPreferenceEvent,sync);
    reduced.addEventListener('change',sync);sync();
    return()=>{observer?.disconnect();resize?.disconnect();document.removeEventListener('visibilitychange',sync);document.removeEventListener(motionPreferenceEvent,sync);reduced.removeEventListener('change',sync)};
  },[locale]);
  return <div ref={root} className={styles.layer} aria-hidden="true" data-ambient-typography data-running="false">
    {lanes.map((terms,index)=><div className={styles.lane} data-depth={index%3} data-terms={terms.length} key={index}><div className={styles.drift}>
      {terms.map((term,word)=><span className={styles.word} key={term} style={{'--word-cycle':`${cycles[index]}s`,'--word-delay':`${-phases[index]-word*cycles[index]/terms.length}s`} as CSSProperties}>{t(term)}</span>)}
    </div></div>)}
  </div>;
}
