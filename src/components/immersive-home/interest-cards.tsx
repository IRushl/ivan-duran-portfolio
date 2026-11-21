'use client';
import { Localized } from '@/i18n/localized';
import { useState } from 'react';
import Image from 'next/image';
import { interestArtwork } from '@/data/home-artwork';
import { personalStories as interests } from '@/data/personal-stories';
import home from '../home.module.css';
import styles from './refinements.module.css';

function Interest({ item, index }: { item: typeof interests[number]; index:number }) {
  const [hovered,setHovered]=useState(false), [expanded,setExpanded]=useState(false);
  const open=hovered||expanded, image=interestArtwork[index];
  return <Localized>{<li data-open={open} onPointerEnter={event=>{if(event.pointerType==='mouse')setHovered(true)}} onPointerLeave={()=>setHovered(false)}>
    <div className={styles.interestArtwork}><Image src={image.src} width={image.width} height={image.height} alt={image.alt} sizes="(max-width:480px) 90vw, (max-width:850px) 45vw, 300px" loading="lazy" style={{objectPosition:image.position}}/></div>
    <h3><button type="button" aria-expanded={open} aria-controls={`interest-${index}`} onClick={()=>{setExpanded(value=>!value);setHovered(false)}}><span>{item.title}</span><span className={styles.toggle} aria-hidden="true">{open?'−':'+'}</span></button></h3>
    <div id={`interest-${index}`} className={styles.reveal} aria-hidden={!open}><div><h4>{item.heading}</h4>{item.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</div></div>
  </li>}</Localized>;
}
export function InterestCards() {
  return <Localized>{<><ul className={`${home.personalBento} ${styles.affinities}`} aria-label="Intereses personales">{interests.map((item,index)=><Interest key={item.title} item={item} index={index}/>)}</ul><p className={styles.artworkNote}>Las imágenes de estas tarjetas son ilustraciones conceptuales generadas con IA.</p></>}</Localized>;
}
