'use client';

import { useCallback, useRef, useState, type ReactNode } from 'react';
import { SpatialSurface, useSpatialScene } from '../spatial-scene/surface';
import { clamp } from '../spatial-scene/trajectory';
import { immersiveMotion } from './config';
import styles from './immersive-home.module.css';

const ignoreSceneStatus = () => {};

export function ImmersiveHome({ hero, children }: { hero: ReactNode; children: ReactNode }) {
  const journey = useRef<HTMLDivElement>(null);
  const surface = useRef<HTMLDivElement>(null);
  const settings = useRef({ ...immersiveMotion });
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const getProgress = useCallback(() => {
    const root = journey.current;
    if (!root) return 0;
    return clamp(-root.getBoundingClientRect().top / Math.max(1, root.offsetHeight - window.innerHeight));
  }, []);
  const getOrbFrame = useCallback(() => {
    const root = journey.current;
    if (!root) return null;
    if (window.matchMedia('(max-width:650px)').matches) {
      const heading = root.querySelector('h1')?.getBoundingClientRect();
      if (!heading) return null;
      const width = Math.min(window.innerWidth * .82, 340);
      return new DOMRect((window.innerWidth - width) / 2, heading.bottom + 8, width, 220);
    }
    return root.querySelector('[data-orb-stage]')?.getBoundingClientRect() ?? null;
  }, []);
  useSpatialScene({ surface, journey, settings, paused: pausedRef, onStatus: ignoreSceneStatus, getProgress, getOrbFrame, profile: 'immersive' });
  return <div ref={journey} className={styles.root} data-home-immersive>
    <div className={styles.stage} aria-hidden="true"><SpatialSurface surface={surface}/><div className={styles.scrim}/></div>
    <div className={styles.hero}>
      {hero}
      <div className={styles.orbSpace} data-orb-stage aria-hidden="true"/>
      <button className={styles.pause} type="button" aria-pressed={paused} onClick={() => { pausedRef.current = !paused; setPaused(!paused); surface.current?.dispatchEvent(new Event('labsettings')); }}>{paused ? 'Reanudar movimiento' : 'Pausar movimiento'}</button>
    </div>
    {children}
  </div>;
}
