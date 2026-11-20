'use client';
import { Localized } from '@/i18n/localized';
import Image from 'next/image';
import type { StudyImage } from './case-study-visual';
import { ImageLightbox } from './image-lightbox';
import styles from './tripflow-case.module.css';

export function TripflowVisual({ image, title, caption, phone = false, diagram = false, priority = false, artwork = false, sizes }: { image: StudyImage; title: string; caption?: string; phone?: boolean; diagram?: boolean; priority?: boolean; artwork?: boolean; sizes?: string }) {
  const screenshot = <Image src={image.src} width={image.width} height={image.height} alt={image.alt} sizes={sizes ?? (phone ? '(max-width: 420px) 75vw, 280px' : '(max-width: 760px) 90vw, 1100px')} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} />;
  return <Localized>{<figure className={`${styles.figure} ${phone ? styles.phoneFigure : ''} ${artwork ? styles.artworkFigure : ''}`}>
    {phone ? <div className={styles.phoneScene}><div className={styles.phone}>
      <div className={styles.bezel} aria-hidden="true"><span /><i /></div>
      <div key={image.src} className={styles.phoneViewport} role="region" tabIndex={0} aria-label={`Vista previa móvil de ${title}. Desplazable.`}>{screenshot}</div>
    </div></div> : diagram ? <div className={styles.diagramViewport} role="region" tabIndex={0} aria-label="Vista previa desplazable del recorrido original">{screenshot}</div> : <div className={styles.showcase} data-parallax-scene={artwork || undefined}>{screenshot}</div>}
    <figcaption className={styles.caption}><div><strong>{title}</strong>{caption && <p>{caption}</p>}{phone && <p>{image.height / image.width > 820 / 412 ? 'Vista previa desde el inicio · Desplázate para explorar.' : 'Vista original dentro del dispositivo · Amplía para revisar los detalles.'}</p>}</div><ImageLightbox image={image} title={title} /></figcaption>
  </figure>}</Localized>;
}
