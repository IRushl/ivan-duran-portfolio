'use client';

import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { homeExpertise } from '@/data/home';
import home from '../home.module.css';
import cards from './project-showcase.module.css';
import styles from './capability-cards.module.css';

const titles = ['Product thinking + UX research', 'UX, UI + interaction design', 'Design systems + prototyping', 'AI-assisted design workflows'];
const accents = ['#b8ed70', '#9bc6ff', '#bcb2f3', '#86d8c0'];
const labels = ['Preguntas y contexto', 'Recorridos y estados', 'Patrones y componentes', 'Exploración y revisión'];

/** Abstract editorial diagrams; replaceable independently from the card content. */
function CapabilityVisual({ index }: { index: number }) {
  return <svg viewBox="0 0 240 170" fill="none" aria-hidden="true" className={styles.diagram}>
    <defs><radialGradient id={`capability-glow-${index}`}><stop stopColor="currentColor" stopOpacity=".18"/><stop offset="1" stopColor="currentColor" stopOpacity="0"/></radialGradient></defs>
    <ellipse cx="120" cy="85" rx="110" ry="80" fill={`url(#capability-glow-${index})`}/>
    {index === 0 ? <>
      <path d="M54 45 119 83 191 41M119 83 183 132M119 83 51 128M119 83 121 22" className={styles.connection}/>
      <circle cx="119" cy="83" r="27" className={styles.surface}/><circle cx="119" cy="83" r="9" className={styles.node}/>
      {[[54,45],[191,41],[183,132],[51,128],[121,22]].map(([cx,cy]) => <g key={cx}><circle cx={cx} cy={cy} r="12" className={styles.surface}/><circle cx={cx} cy={cy} r="3" className={styles.node}/></g>)}
    </> : index === 1 ? <>
      <path d="M45 80H93M143 80H193M121 105V141H193V104" className={styles.connection}/>
      <rect x="23" y="55" width="43" height="50" rx="8" className={styles.surface}/><path d="m120 53 27 27-27 27-27-27Z" className={styles.surface}/>
      <rect x="172" y="55" width="43" height="50" rx="8" className={styles.surface}/><path d="m185 80 6 6 12-14M36 69h17M36 80h12M36 91h17" className={styles.connection}/>
      <circle cx="121" cy="80" r="4" className={styles.node}/>
    </> : index === 2 ? <>
      {[0,1,2].map(row => [0,1,2].map(col => <rect key={`${row}-${col}`} x={44+col*54} y={21+row*45} width="44" height="34" rx={row===0?17:6} className={row===1&&col===1?styles.selected:styles.surface}/>))}
      <path d="M44 153h152M98 72h42" className={styles.connection}/><circle cx="120" cy="83" r="4" className={styles.node}/>
    </> : <>
      <path d="M44 85h39m35-33V25h76v34m-76 60v26h76v-34m-51-26h34" className={styles.connection}/>
      <rect x="25" y="66" width="38" height="38" rx="8" className={styles.surface}/><path d="m118 47 33 38-33 38-33-38Z" className={styles.surface}/>
      <circle cx="194" cy="85" r="24" className={styles.surface}/><path d="m183 85 8 8 15-18" className={styles.connection}/>
      <path d="m118 71 4 10 10 4-10 4-4 10-4-10-10-4 10-4Z" className={styles.node}/>
    </>}
  </svg>;
}

export function CapabilityCards() {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  function keyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? (index + 1) % 4 : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? (index + 3) % 4 : event.key === 'Home' ? 0 : event.key === 'End' ? 3 : null;
    if (next !== null) { event.preventDefault(); setActive(next); buttons.current[next]?.focus(); }
  }
  return <section id="expertise" tabIndex={-1} className={`shell ${home.expertise} ${styles.root}`} aria-labelledby="home-expertise-title" data-capability-cards style={{ '--capability-accent': accents[active] } as CSSProperties}>
    <header className={home.sectionIntro}><p className={home.sectionLabel}>Del problema al prototipo</p><h2 id="home-expertise-title">Cuatro capacidades.<br/><span>Una forma de diseñar.</span></h2><p>Un proceso que une comprensión, decisiones y materialización.</p></header>
    <div className={styles.deck}>{homeExpertise.map((item, index) => <article key={item.title} className={`${cards.card} ${styles.card}`} data-capability-card data-active={active === index} onPointerEnter={event => { if (event.pointerType === 'mouse') setActive(index); }} onFocus={() => setActive(index)} style={{ '--card-accent': accents[index], '--angle': `${(index - 1.5) * .7}deg`, '--lift': `${Math.abs(index - 1.5) * 3}px`, '--card-duration': '280ms' } as CSSProperties}>
      <button className={styles.visual} ref={element => { buttons.current[index] = element; }} type="button" aria-label={`Destacar ${titles[index]}`} aria-pressed={active === index} onClick={() => setActive(index)} onKeyDown={event => keyboard(event,index)}><span className={cards.number}>0{index + 1}</span><CapabilityVisual index={index}/><span className={styles.label}>{labels[index]}</span></button>
      <div className={styles.body}><p className={styles.category} lang="en">{titles[index]}</p><h3>{item.headline}</h3><p>{item.detail}</p><Link href={item.href}><span>{item.example}</span><span aria-hidden="true">↗</span></Link></div>
    </article>)}</div>
  </section>;
}
