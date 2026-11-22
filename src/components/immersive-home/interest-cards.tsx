'use client';
import { Localized } from '@/i18n/localized';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { interestArtwork } from '@/data/home-artwork';
import { personalStories as interests } from '@/data/personal-stories';
import home from '../home.module.css';
import styles from './refinements.module.css';

export function InterestCards() {
  const [active,setActive]=useState<number|null>(null);
  const buttons=useRef<Array<HTMLButtonElement|null>>([]);
  const panel=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    if(active===null||!window.matchMedia('(max-width:650px)').matches)return;
    panel.current?.focus({preventScroll:true});
    panel.current?.scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  },[active]);
  const item=active===null?null:interests[active], image=active===null?null:interestArtwork[active];
  const close=()=>{ if(active!==null) buttons.current[active]?.focus(); setActive(null); };
  return <Localized><>
    <ul className={`${home.personalBento} ${styles.affinities}`} aria-label="Intereses personales">{interests.map((interest,index)=>{
      const artwork=interestArtwork[index];
      return <li key={interest.title} data-open={active===index}>
        <div className={styles.interestArtwork}><Image src={artwork.src} width={artwork.width} height={artwork.height} alt={artwork.alt} sizes="(max-width:480px) 90vw, (max-width:850px) 45vw, 300px" loading="lazy" style={{objectPosition:artwork.position}}/></div>
        <h3><button ref={element=>{buttons.current[index]=element}} id={`interest-trigger-${index}`} type="button" aria-expanded={active===index} aria-controls="interest-story" onClick={()=>setActive(value=>value===index?null:index)}><span>{interest.title}</span><span className={styles.toggle} aria-hidden="true">{active===index?'−':'+'}</span></button></h3>
      </li>;
    })}</ul>
    <div id="interest-story" ref={panel} tabIndex={-1} hidden={active===null} className={styles.storyPanel} role="region" aria-labelledby={active===null?undefined:`interest-trigger-${active}`} onKeyDown={event=>{if(event.key==='Escape'){event.preventDefault();close()}}}>
      {item&&image&&<div key={active} className={styles.storyLayout}>
        <div className={styles.storyImage}><Image src={image.src} width={image.width} height={image.height} alt={image.alt} sizes="(max-width:650px) 90vw, 360px" loading="lazy" style={{objectPosition:image.position}}/></div>
        <div className={styles.storyCopy}><button type="button" className={styles.closeStory} onClick={close}>Cerrar relato <span aria-hidden="true">×</span></button><h4>{item.heading}</h4>{item.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</div>
      </div>}
    </div>
    <p className={styles.artworkNote}>Las imágenes de estas tarjetas son ilustraciones conceptuales generadas con IA.</p>
  </></Localized>;
}
