'use client';
import { Localized } from '@/i18n/localized';
import Image from 'next/image';
import type { AuroraMockupAsset } from '@/data/aurora-mockups';
import styles from './aurora-case.module.css';

export function AuroraMockup({ image, title, priority = false, sizes = '(max-width: 760px) 90vw, 500px' }: { image: AuroraMockupAsset; title: string; priority?: boolean; sizes?: string }) {
  return <Localized>{<figure className={styles.mockup} data-aurora-mockup>
    <div className={styles.mockupImage} data-parallax-scene><Image src={image.src} width={image.width} height={image.height} alt={image.alt} sizes={sizes} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} /></div>
    <figcaption className={styles.mockupCaption}><strong>{title}</strong><p>{image.note}</p></figcaption>
  </figure>}</Localized>;
}
