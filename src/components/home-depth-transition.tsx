'use client';

import { useCallback, useRef, useState, type ReactNode } from 'react';
import { SpatialSurface, useSpatialScene } from './spatial-scene/surface';
import { clamp, defaults } from './spatial-scene/trajectory';
import styles from './home-depth-transition.module.css';

/** A single renderer behind real, server-rendered Home content. */
export function HomeDepthTransition({ hero, children }: { hero: ReactNode; children: ReactNode }) {
  const journey = useRef<HTMLDivElement>(null);
  const surface = useRef<HTMLDivElement>(null);
  const settings = useRef({ ...defaults, camera: .95, density: 520 });
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [status, setStatus] = useState('Preparando escena tridimensional');
  const getProgress = useCallback(() => {
    const root = journey.current;
    const hero = root?.querySelector<HTMLElement>('[data-home-hero]');
    const projects = root?.querySelector<HTMLElement>('[data-home-exhibition]');
    if (!root || !hero || !projects) return 0;
    const headerHeight = document.querySelector('.site-header')?.getBoundingClientRect().height ?? 74;
    const heroRect = hero.getBoundingClientRect();
    const travel = projects.getBoundingClientRect().top - heroRect.top + window.innerHeight * .12;
    return clamp((headerHeight - heroRect.top) / Math.max(1, travel));
  }, []);
  useSpatialScene({ surface, journey, settings, paused: pausedRef, onStatus: setStatus, getProgress, profile: 'home' });

  return <div className={styles.journey} ref={journey} data-home-cinematic>
    <div className={styles.stage} aria-hidden="true"><SpatialSurface surface={surface}/><div className={styles.scrim}/></div>
    <div className={styles.content}>
      {hero}
      <div className={styles.passage} aria-hidden="true"><span/><span/><span/></div>
      <div className={styles.projects}>{children}</div>
    </div>
    <div className={styles.motionControl}>
      <button type="button" aria-pressed={paused} onClick={() => { pausedRef.current = !paused; setPaused(!paused); surface.current?.dispatchEvent(new Event('labsettings')); }}>{paused ? 'Reanudar escena 3D' : 'Pausar escena 3D'}</button>
      <span className={styles.srOnly} role="status">{status}</span>
    </div>
  </div>;
}
