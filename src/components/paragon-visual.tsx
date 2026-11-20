import Image from 'next/image';
import type { StudyImage } from './case-study-visual';
import { ImageLightbox } from './image-lightbox';
import styles from './paragon-case.module.css';

export function ParagonVisual({ image, title, caption, priority = false, evidence = false, sizes = '(max-width: 760px) 90vw, 60vw', parallax = false }: {
  image: StudyImage; title: string; caption?: string; priority?: boolean; evidence?: boolean; sizes?: string; parallax?: boolean;
}) {
  return <figure className={`${styles.figure} ${evidence ? styles.evidenceFigure : ''}`}>
    <div className={styles.imageSurface} data-parallax-scene={parallax || undefined}><Image src={image.src} width={image.width} height={image.height} alt={image.alt} sizes={sizes} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} /></div>
    <figcaption className={styles.caption}><div><strong>{title}</strong>{caption && <p>{caption}</p>}</div><ImageLightbox image={image} title={title} /></figcaption>
  </figure>;
}
