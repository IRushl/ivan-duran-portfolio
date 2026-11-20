import Image from 'next/image';
import type { StudyImage } from './case-study-visual';
import { ImageLightbox } from './image-lightbox';
import styles from './arho-case.module.css';

export function ArhoVisual({ image, title, priority = false }: { image: StudyImage; title: string; priority?: boolean }) {
  return <figure className={styles.figure}>
    <div className={styles.artwork} data-parallax-scene><Image src={image.src} width={image.width} height={image.height} alt={image.alt} sizes="(max-width: 760px) 90vw, (max-width: 1100px) 88vw, 1200px" loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} /></div>
    <figcaption className={styles.caption}><div><strong>{title}</strong><p>Visualización editorial del diseño. Consulta el comparador para revisar los textos y detalles originales.</p></div><ImageLightbox image={image} title={title} /></figcaption>
  </figure>;
}
