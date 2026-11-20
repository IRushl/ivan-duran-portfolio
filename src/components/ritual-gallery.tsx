'use client';

import Image from 'next/image';
import { useId, useRef, useState, type KeyboardEvent } from 'react';
import type { StudyImage } from './case-study-visual';
import { ImageLightbox } from './image-lightbox';
import styles from './ritual-case.module.css';

export type RitualGalleryItem = { label: string; title: string; note: string; image: StudyImage };

export function RitualGallery({ items, label, initial = 0 }: { items: RitualGalleryItem[]; label: string; initial?: number }) {
  const [selected, setSelected] = useState(initial);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const item = items[selected];
  function keyboard(event: KeyboardEvent<HTMLButtonElement>, position: number) {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (position + (event.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length;
    setSelected(next); tabs.current[next]?.focus();
  }
  return <div className={styles.gallery}>
    <div className={styles.tabs} role="tablist" aria-label={label}>{items.map((item,index)=><button key={item.label} ref={element=>{tabs.current[index]=element;}} id={`${id}-tab-${index}`} role="tab" type="button" aria-selected={selected===index} aria-controls={`${id}-panel`} tabIndex={selected===index?0:-1} onClick={()=>setSelected(index)} onKeyDown={event=>keyboard(event,index)}>{item.label}</button>)}</div>
    <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${selected}`} tabIndex={0} className={styles.galleryPanel}>
      <figure className={styles.figure}><div className={styles.galleryViewport}><Image key={item.image.src} src={item.image.src} width={item.image.width} height={item.image.height} alt={item.image.alt} sizes="(max-width: 760px) 85vw, 750px" /></div><figcaption className={styles.caption}><div><strong>{item.title}</strong><p>{item.note}</p></div><ImageLightbox key={item.image.src} image={item.image} title={item.title} /></figcaption></figure>
    </div>
  </div>;
}
