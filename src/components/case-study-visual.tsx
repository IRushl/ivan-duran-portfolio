'use client';
import { Localized } from '@/i18n/localized';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { ImageLightbox } from './image-lightbox';
import styles from './case-study-visual.module.css';

export type StudyImage = { src: string; width: number; height: number; alt: string; original?: string };

function PhoneMockup({ children }: { children: ReactNode }) {
  return <Localized>{<div className={styles.phone}><div className={styles.screen}>{children}</div></div>}</Localized>;
}

function DesktopMockup({ children }: { children: ReactNode }) {
  return <Localized>{(
    <div className={styles.desktop}>
      <div className={styles.chrome} aria-hidden="true"><i /><i /><i /></div>
      <div className={styles.screen}>{children}</div>
    </div>
  )}</Localized>;
}

export function CaseStudyVisual({ image, title, caption, device, sizes, preview = false, priority = false, loading = 'lazy', parallax = false }: {
  image: StudyImage;
  title: string;
  caption?: string;
  device?: 'phone' | 'desktop';
  sizes: string;
  preview?: boolean;
  priority?: boolean;
  loading?: 'eager' | 'lazy';
  parallax?: boolean;
}) {
  const shot = (
    <div className={preview ? styles.preview : undefined}>
      <Image src={image.src} width={image.width} height={image.height} alt={image.alt} sizes={sizes} loading={priority ? 'eager' : loading} fetchPriority={priority ? 'high' : undefined} className={styles.image} />
    </div>
  );

  return <Localized>{(
    <figure className={styles.figure}>
      {device === 'phone' ? <PhoneMockup>{shot}</PhoneMockup> : device === 'desktop' ? <DesktopMockup>{shot}</DesktopMockup> : <div className={styles.flat} data-parallax-scene={parallax || undefined}>{shot}</div>}
      <figcaption className={styles.caption}>
        <div><strong>{title}</strong>{caption && <p>{caption}</p>}</div>
        <ImageLightbox image={image} title={title} />
      </figcaption>
    </figure>
  )}</Localized>;
}
