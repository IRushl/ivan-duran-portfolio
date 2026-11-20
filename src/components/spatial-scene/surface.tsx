'use client';
import { Localized } from '@/i18n/localized';

import { useEffect, type RefObject } from 'react';
import type { LabSettings } from './trajectory';
import styles from './surface.module.css';
import { homePalette } from '@/data/home-palette';

type Binding = {
  surface: RefObject<HTMLDivElement | null>;
  journey: RefObject<HTMLDivElement | null>;
  settings: RefObject<LabSettings>;
  paused: RefObject<boolean>;
  onStatus: (text: string) => void;
  onTelemetry?: (text: string) => void;
  getProgress?: () => number;
  profile?: 'lab' | 'home' | 'immersive';
  getOrbFrame?: () => DOMRect | null;
};
const noop = () => {};

/** Both routes share the renderer, lifecycle and accessible static alternative. */
export function useSpatialScene({ surface, journey, settings, paused, onStatus, onTelemetry = noop, getProgress, getOrbFrame, profile = 'lab' }: Binding) {
  useEffect(() => {
    let cancelled = false;
    let dispose: (() => void) | undefined;
    import('./scene').then(({ createMotionScene }) => {
      if (cancelled || !surface.current || !journey.current) return;
      dispose = createMotionScene({ mount: surface.current, journey: journey.current,
        getSettings: () => settings.current, isPaused: () => paused.current,
        onStatus, onTelemetry, getProgress, getOrbFrame, profile,
      });
    }).catch(() => { if (!cancelled) onStatus('Vista estática · no se pudo iniciar la escena 3D'); });
    return () => { cancelled = true; dispose?.(); };
  }, [surface, journey, settings, paused, onStatus, onTelemetry, getProgress, getOrbFrame, profile]);
}

export function SpatialSurface({ surface, className = '', cyan = false }: { surface: RefObject<HTMLDivElement | null>; className?: string; cyan?: boolean }) {
  return <Localized>{<div ref={surface} className={`${styles.surface} ${className}`} data-cyan={cyan || undefined} aria-hidden="true">
    <svg className={styles.fallback} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice"><defs><radialGradient id="spatial-glow"><stop stopColor={cyan?homePalette.accent:"#a3e635"} stopOpacity=".13"/><stop offset="1" stopColor={cyan?homePalette.background:"#060b09"} stopOpacity="0"/></radialGradient></defs><ellipse cx="800" cy="420" rx="550" ry="380" fill="url(#spatial-glow)"/><g fill="none" stroke={cyan?homePalette.accent:"#a3e635"} strokeOpacity=".25">{Array.from({ length: 10 }, (_, i) => <ellipse key={i} cx="810" cy="400" rx={65 + i * 27} ry={80 + i * 18} transform={`rotate(${i * 18} 810 400)`}/>)}</g><g fill={cyan?homePalette.bright:"#bbf370"}>{Array.from({ length: 42 }, (_, i) => <circle key={i} cx={(i * 163 + 71) % 1200} cy={(i * 127 + 81) % 800} r={i % 4 === 0 ? 2.5 : 1}/>)}</g></svg>
  </div>}</Localized>;
}
