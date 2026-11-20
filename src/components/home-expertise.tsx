'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { homeExpertise } from '@/data/home';
import styles from './home.module.css';

export function HomeExpertise() {
  const [active,setActive]=useState<number | null>(0);
  const root=useRef<HTMLDivElement>(null);
  const keyboard=(event: KeyboardEvent<HTMLButtonElement>,index:number) => {
    const next=event.key==='ArrowDown' ? (index+1)%homeExpertise.length : event.key==='ArrowUp' ? (index+homeExpertise.length-1)%homeExpertise.length : event.key==='Home' ? 0 : event.key==='End' ? homeExpertise.length-1 : null;
    if (next !== null) { event.preventDefault(); root.current?.querySelectorAll<HTMLButtonElement>('h3 button')[next].focus(); }
  };
  return <section id="expertise" tabIndex={-1} className={`shell ${styles.expertise}`} aria-labelledby="home-expertise-title">
    <header className={styles.sectionIntro}><p className={styles.sectionLabel}>Del problema al prototipo</p><h2 id="home-expertise-title">Cuatro capacidades.<br/><span>Una forma de diseñar.</span></h2><p>Un proceso que une comprensión, decisiones y materialización.</p></header>
    <div ref={root} className={styles.disciplines}>{homeExpertise.map((item,index) => {
      const open=active===index,trigger=`home-discipline-${index}`,panel=`home-discipline-panel-${index}`;
      return <div key={item.title} className={styles.discipline} data-open={open}>
        <h3><button type="button" id={trigger} aria-expanded={open} aria-controls={panel} onClick={() => setActive(open?null:index)} onKeyDown={event => keyboard(event,index)}><span className={styles.disciplineNumber} aria-hidden="true">{String(index+1).padStart(2,'0')}</span><span lang="en">{item.title}</span><span className={styles.disciplineIcon} aria-hidden="true">{open?'−':'+'}</span></button></h3>
        <div id={panel} role="region" aria-labelledby={trigger} aria-hidden={!open} inert={!open} className={styles.disciplinePanel}><div><div className={styles.disciplineBody}><p>{item.detail}</p><p className={styles.disciplineExample}><span>En práctica</span><Link href={item.href}>{item.example}</Link></p></div></div></div>
      </div>;
    })}</div>
  </section>;
}
