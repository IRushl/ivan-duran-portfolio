'use client';
import { Localized } from '@/i18n/localized';

import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { capabilityArtwork } from '@/data/home-artwork';
import { homePalette } from '@/data/home-palette';
import { homeExpertise } from '@/data/home';
import home from '../home.module.css';
import cards from './project-showcase.module.css';
import styles from './capability-cards.module.css';

const titles = ['Product thinking + UX research', 'UX, UI + interaction design', 'Design systems + prototyping', 'AI-assisted design workflows'];
const accents = [homePalette.accent, homePalette.soft, homePalette.bright, homePalette.soft];
const labels = ['Preguntas y contexto', 'Recorridos y estados', 'Patrones y componentes', 'Exploración y revisión'];

export function CapabilityCards() {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  function keyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? (index + 1) % 4 : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? (index + 3) % 4 : event.key === 'Home' ? 0 : event.key === 'End' ? 3 : null;
    if (next !== null) { event.preventDefault(); setActive(next); buttons.current[next]?.focus(); }
  }
  return <Localized>{<section id="expertise" tabIndex={-1} className={`shell ${home.expertise} ${styles.root}`} aria-labelledby="home-expertise-title" data-capability-cards style={{ '--capability-accent': accents[active] } as CSSProperties}>
    <header className={home.sectionIntro}><p className={home.sectionLabel}>Del problema al prototipo</p><h2 id="home-expertise-title">Cuatro capacidades.<br/><span>Una forma de diseñar.</span></h2><p>Un proceso que une comprensión, decisiones y materialización.</p></header>
    <div className={styles.deck}>{homeExpertise.map((item, index) => <article key={item.title} className={`${cards.card} ${styles.card}`} data-capability-card data-active={active === index} onPointerEnter={event => { if (event.pointerType === 'mouse') setActive(index); }} onFocus={() => setActive(index)} style={{ '--card-accent': accents[index], '--angle': `${(index - 1.5) * .7}deg`, '--lift': `${Math.abs(index - 1.5) * 3}px`, '--card-duration': '280ms' } as CSSProperties}>
      <button className={styles.visual} ref={element => { buttons.current[index] = element; }} type="button" aria-label={`Destacar ${titles[index]}`} aria-pressed={active === index} onClick={() => setActive(index)} onKeyDown={event => keyboard(event,index)}><span className={cards.number}>0{index + 1}</span><Image className={styles.artwork} src={capabilityArtwork[index].src} width={capabilityArtwork[index].width} height={capabilityArtwork[index].height} alt={capabilityArtwork[index].alt} sizes="(max-width:560px) 90vw, (max-width:1050px) 45vw, 300px" loading="lazy" style={{ objectPosition: capabilityArtwork[index].position }}/><span className={styles.label}>{labels[index]}</span></button>
      <div className={styles.body}><p className={styles.category} lang="en">{titles[index]}</p><h3>{item.headline}</h3><p>{item.detail}</p><Link href={item.href}><span>{item.example}</span><span aria-hidden="true">↗</span></Link></div>
    </article>)}</div><p className={styles.artworkNote}>Ilustraciones editoriales generadas con IA. Las evidencias originales están en los casos enlazados.</p>
  </section>}</Localized>;
}
