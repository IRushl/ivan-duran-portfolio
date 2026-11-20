'use client';
import { Localized } from '@/i18n/localized';

import { useEffect, useRef } from 'react';
import { homeExperience } from '@/data/home';
import styles from './home.module.css';

export function mountTimelineProgress(root: HTMLElement) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0, visible = false;
  const cancel = () => { if (frame) cancelAnimationFrame(frame); frame = 0; };
  const draw = () => {
    frame = 0;
    const rect = root.getBoundingClientRect();
    const value = reduced.matches ? 1 : Math.max(0,Math.min(1,(window.innerHeight*.75-rect.top)/rect.height));
    root.style.setProperty('--timeline-progress',value.toFixed(4));
  };
  const schedule = () => { if (visible && !document.hidden && !reduced.matches && !frame) frame=requestAnimationFrame(draw); };
  const preference = () => { cancel(); if (reduced.matches) draw(); else schedule(); };
  const visibility = () => { if (document.hidden) cancel(); else schedule(); };
  const observer = new IntersectionObserver(([entry]) => { visible=entry.isIntersecting; if (visible) schedule(); else cancel(); });
  observer.observe(root); if (reduced.matches) draw();
  window.addEventListener('scroll',schedule,{passive:true}); window.addEventListener('resize',schedule,{passive:true});
  document.addEventListener('visibilitychange',visibility); reduced.addEventListener('change',preference);
  return () => {
    cancel(); observer.disconnect(); root.style.removeProperty('--timeline-progress');
    window.removeEventListener('scroll',schedule); window.removeEventListener('resize',schedule);
    document.removeEventListener('visibilitychange',visibility); reduced.removeEventListener('change',preference);
  };
}

export function HomeTimeline() {
  const root=useRef<HTMLOListElement>(null);
  useEffect(() => { if (root.current) return mountTimelineProgress(root.current); },[]);
  return <Localized>{<section className={`shell ${styles.experience}`} aria-labelledby="home-experience-title">
    <header className={styles.smallIntro}><p className={styles.sectionLabel}>Experiencia seleccionada</p><h2 id="home-experience-title">Diseño en contextos reales.</h2><p>Interfaces, producto y contenido: una trayectoria que conecta disciplinas.</p></header>
    <ol ref={root} className={styles.timelineList}>{homeExperience.map(job => <li key={job.company}>
      <p className={styles.timelinePeriod}>{job.period}</p><div><p className={styles.timelineCompany}>{job.company} <span>· Remoto</span></p><h3>{job.role}</h3><p className={styles.timelineDetail}>{job.detail}</p></div>
    </li>)}</ol>
  </section>}</Localized>;
}
