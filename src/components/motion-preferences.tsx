'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { SlidersHorizontal } from 'lucide-react';
import { useLocale } from '@/i18n/provider';
import { motionPreferenceEvent, motionPreferenceKey, readMotionPreference } from '@/lib/motion-preference';
import styles from './motion-preferences.module.css';

export function MotionPreferences() {
  const pathname=usePathname(), {t}=useLocale();
  const [paused,setPaused]=useState(false), [reduced,setReduced]=useState(false);
  useEffect(()=>{
    const media=window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync=()=>{setPaused(readMotionPreference());setReduced(media.matches)};
    queueMicrotask(sync);media.addEventListener('change',sync);document.addEventListener(motionPreferenceEvent,sync);
    return()=>{media.removeEventListener('change',sync);document.removeEventListener(motionPreferenceEvent,sync)};
  },[]);
  if(pathname!=='/')return null;
  return <details className={styles.preferences}><summary aria-label={t('Preferencias de movimiento')} title={t('Preferencias de movimiento')}><SlidersHorizontal aria-hidden="true" size={16}/></summary><div className={styles.panel}><label><input type="checkbox" checked={paused||reduced} disabled={reduced} onChange={event=>{const value=event.target.checked;try{localStorage.setItem(motionPreferenceKey,value?'paused':'full')}catch{}setPaused(value);document.dispatchEvent(new Event(motionPreferenceEvent))}}/><span>{t('Pausar animaciones automáticas')}</span></label>{reduced&&<p>{t('Se respeta tu preferencia de movimiento reducido.')}</p>}</div></details>;
}
