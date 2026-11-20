import Image from 'next/image';
import type { StudyImage } from './case-study-visual';
import { ImageLightbox } from './image-lightbox';
import styles from './ritual-case.module.css';

export function RitualMedia({ image, title, caption, priority = false, parallax = false }: { image: StudyImage; title: string; caption: string; priority?: boolean; parallax?: boolean }) {
  return <figure className={styles.figure}><div className={styles.media} data-parallax-scene={parallax || undefined}><Image src={image.src} width={image.width} height={image.height} alt={image.alt} sizes="(max-width: 760px) 90vw, (max-width: 1100px) 85vw, 1100px" loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} /></div><figcaption className={styles.caption}><div><strong>{title}</strong><p>{caption}</p></div><ImageLightbox image={image} title={title} /></figcaption></figure>;
}
