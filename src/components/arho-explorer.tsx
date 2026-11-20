'use client';
import { Localized } from '@/i18n/localized';

import { useId, useState } from 'react';
import { arhoScreens } from '@/data/arho';
import { ArhoScreenFrame } from './arho-original-scene';
import { ImageLightbox } from './image-lightbox';
import styles from './arho-case.module.css';

export function ArhoExplorer() {
  const [selected, setSelected] = useState('home');
  const [device, setDevice] = useState('compare');
  const id = useId();
  const screen = arhoScreens.find(screen => screen.id === selected) ?? arhoScreens[0];
  return <Localized>{<div className={styles.explorer}>
    <div className={styles.controls}>
      <label htmlFor={`${id}-screen`}>Explorar una sección<select id={`${id}-screen`} value={selected} onChange={event => setSelected(event.target.value)}>{arhoScreens.map(screen => <option key={screen.id} value={screen.id}>{screen.label}</option>)}</select></label>
      <fieldset><legend>Vista de las interfaces</legend><div className={styles.viewChoices}>{[['compare','Comparar'],['desktop','Desktop'],['mobile','Móvil']].map(([value,label]) => <label key={value}><input type="radio" name={`${id}-device`} value={value} checked={device === value} onChange={() => setDevice(value)} /><span>{label}</span></label>)}</div></fieldset>
    </div>
    <p className={styles.previewNote}>Vista previa del inicio de cada pantalla. «Ampliar» permite recorrer el diseño completo.</p>
    <div className={`${styles.comparison} ${device === 'compare' ? '' : styles.single}`} aria-label={`Interfaces de ${screen.label}`} key={`${selected}-${device}`}>
      {device !== 'mobile' && <figure className={styles.desktopEvidence}><span className={styles.deviceLabel}>Desktop / {screen.label}</span><ArhoScreenFrame image={screen.desktop} device="desktop" expanded /><figcaption className={styles.caption}><strong>{screen.label} · Desktop</strong><ImageLightbox image={screen.desktop} title={`${screen.label} · Desktop`} /></figcaption></figure>}
      {device !== 'desktop' && <figure className={styles.mobileEvidence}><span className={styles.deviceLabel}>Móvil / {screen.label}</span><ArhoScreenFrame image={screen.mobile} device="mobile" /><figcaption className={styles.caption}><strong>{screen.label} · Móvil</strong><ImageLightbox image={screen.mobile} title={`${screen.label} · Móvil`} /></figcaption></figure>}
    </div>
  </div>}</Localized>;
}
