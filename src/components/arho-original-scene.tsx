'use client';
import { Localized } from '@/i18n/localized';
import Image from 'next/image';
import { arhoScreens } from '@/data/arho';
import { ImageLightbox } from './image-lightbox';
import type { StudyImage } from './case-study-visual';
import styles from './arho-case.module.css';

export function ArhoScreenFrame({ image, device, expanded = false, priority = false }: { image: StudyImage; device: 'desktop' | 'mobile'; expanded?: boolean; priority?: boolean }) {
  const desktop = device === 'desktop';
  return <Localized>{<div className={desktop ? styles.originalDesktop : styles.originalPhone}>
    {desktop ? <div className={styles.windowBar} aria-hidden="true"><i /><i /><i /></div> : <div className={styles.phoneCamera} aria-hidden="true" />}
    <div data-arho-viewport={device} className={desktop ? `${styles.originalDesktopViewport} ${expanded ? styles.expandedPreview : ''}` : styles.originalPhoneViewport}>
      <Image src={image.src} width={image.width} height={image.height} alt={image.alt} sizes={desktop ? '(max-width: 600px) 90vw, 70vw' : '(max-width: 600px) 65vw, 280px'} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority && desktop ? 'high' : undefined} />
    </div>
  </div>}</Localized>;
}

export function ArhoOriginalScene({ screen, priority = false }: { screen: (typeof arhoScreens)[number]; priority?: boolean }) {
  return <Localized>{<figure className={styles.figure}>
    <div className={styles.originalComposition} data-parallax-scene>
      <ArhoScreenFrame image={screen.desktop} device="desktop" priority={priority} />
      <ArhoScreenFrame image={screen.mobile} device="mobile" priority={priority} />
    </div>
    <figcaption className={styles.caption}><div><strong>ARHO / {screen.label} · Desktop y móvil</strong><p>Capturas del diseño. Vista previa del inicio de cada pantalla.</p></div><div className={styles.originalActions}><span>Desktop <ImageLightbox image={screen.desktop} title={`${screen.label} · Desktop`} /></span><span>Móvil <ImageLightbox image={screen.mobile} title={`${screen.label} · Móvil`} /></span></div></figcaption>
  </figure>}</Localized>;
}
