'use client';
import { Localized } from '@/i18n/localized';
import Image from 'next/image';
import { homeProjects } from '@/data/home';
import styles from './home-projects.module.css';

export type HomeProject = (typeof homeProjects)[number];
export const projectName = (item: HomeProject) => item.project.slug === 'de-lo-largo-a-lo-corto' ? 'Interfaz de Producto' : item.project.name;

export function ProjectIdentity({ item }: { item: HomeProject }) {
  return <Localized>{<><p className={styles.name}>{projectName(item)}</p><p className={styles.context}><span>{item.sector}</span><span>{item.nature}</span></p></>}</Localized>;
}

export function ProjectSummary({ item }: { item: HomeProject }) {
  return <Localized>{<div className={styles.summary}><p>{item.synopsis}</p><p className={styles.contribution}><span>Mi contribución</span>{item.contribution}</p></div>}</Localized>;
}

export function ProjectArtwork({ item, motion=false, caption=true, sizes }: { item: HomeProject; motion?: boolean; caption?: boolean; sizes: string }) {
  return <Localized>{<figure className={styles.artwork} data-home-scene={motion ? '' : undefined}>
    <div className={styles.ambient} data-home-ambient aria-hidden="true"/>
    <div className={styles.scrollLayer} data-home-scroll><div className={styles.pointerLayer} data-home-pointer>
      <Image src={item.image.src} alt={item.image.alt} width={item.image.width} height={item.image.height} sizes={sizes}/>
    </div></div>
    {caption && <figcaption>{item.caption}</figcaption>}
  </figure>}</Localized>;
}
