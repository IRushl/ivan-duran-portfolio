'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import styles from './home-about.module.css';

/** One short reveal; the base content stays visible without JavaScript. */
export function HomeAboutReveal({children,className=styles.layout}:{children:ReactNode;className?:string}) {
  const root=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const container=root.current;
    if(!container||!('IntersectionObserver' in window))return;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
    const animations:Animation[]=[];
    const stop=()=>{animations.forEach(animation=>animation.cancel())};
    const observer=new IntersectionObserver(entries=>{
      for(const entry of entries) {
        if(!entry.isIntersecting)continue;
        observer.unobserve(entry.target);
        if(reduced.matches||typeof entry.target.animate!=='function')continue;
        animations.push(entry.target.animate([{opacity:.7,transform:'translateY(10px)'},{opacity:1,transform:'none'}],{duration:480,easing:'cubic-bezier(.2,.65,.3,1)',fill:'backwards'}));
      }
    },{threshold:.12});
    container.querySelectorAll('[data-about-reveal]').forEach(element=>observer.observe(element));
    reduced.addEventListener('change',stop);
    return()=>{observer.disconnect();reduced.removeEventListener('change',stop);stop()};
  },[]);
  return <div ref={root} className={className}>{children}</div>;
}
