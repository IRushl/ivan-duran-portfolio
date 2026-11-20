'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Gamepad2, Dumbbell, Cpu, BookOpen, Lightbulb, type LucideIcon } from 'lucide-react';
import home from '../home.module.css';
import styles from './refinements.module.css';

type InterestItem = { title: string; icon: LucideIcon; layout: string; detail: string; image?: { src: string; width: number; height: number; alt: string } };
const interests: InterestItem[] = [
  { title: 'Videojuegos.', icon: Gamepad2, layout: home.gaming, detail: 'Explorar mundos, sistemas e interacciones desde el otro lado de la pantalla.' },
  { title: 'Entrenamiento.', icon: Dumbbell, layout: home.training, detail: 'Un espacio para la disciplina, la constancia y el equilibrio.' },
  { title: 'Tecnología.', icon: Cpu, layout: home.technology, detail: 'Descubrir herramientas y explorar cómo convertirlas en experiencias útiles.' },
  { title: 'Aprendizaje continuo.', icon: BookOpen, layout: home.learning, detail: 'Aprender, probar y conectar perspectivas de distintas disciplinas.' },
  { title: 'Creatividad.', icon: Lightbulb, layout: home.creativity, detail: 'Dar forma a las ideas y explorar nuevas posibilidades.' },
];

function InterestArtwork({ item, index }: { item: InterestItem; index: number }) {
  const Icon = item.icon;
  return <div className={styles.interestArtwork}>{item.image ? <Image {...item.image} alt={item.image.alt} sizes="(max-width:650px) 45vw, 30vw"/> : <svg viewBox="0 0 300 150" fill="none" aria-hidden="true">
    <defs><radialGradient id={`interest-light-${index}`}><stop stopColor="currentColor" stopOpacity=".14"/><stop offset="1" stopColor="currentColor" stopOpacity="0"/></radialGradient></defs>
    <ellipse cx="150" cy="75" rx="145" ry="72" fill={`url(#interest-light-${index})`}/>
    {index === 0 ? <><path d="m35 113 54-58h122l54 58M35 113h230M89 55 80 113M211 55l9 58"/><circle cx="69" cy="38" r="3"/><circle cx="237" cy="36" r="2"/></> : index === 1 ? <><ellipse cx="150" cy="75" rx="107" ry="50"/><ellipse cx="150" cy="75" rx="74" ry="60" transform="rotate(-20 150 75)"/><circle cx="254" cy="64" r="3"/></> : index === 2 ? <><path d="M38 35h42v30h35M262 112h-42V85h-35M53 114h44V94h17M244 34h-38v25h-22"/><circle cx="38" cy="35" r="3"/><circle cx="262" cy="112" r="3"/><circle cx="53" cy="114" r="3"/><circle cx="244" cy="34" r="3"/></> : index === 3 ? <><path d="m62 42 88-18 88 18v80l-88-18-88 18Zm0 80 88 13 88-13M150 24v24M150 110v25"/><path d="m77 59 25-5m-25 19 21-5m105-8 20 5m-18 8 18 6"/></> : <><path d="M37 107c40-125 42 45 98-9s80-76 127-44M49 41c24-9 37-3 43 8m113 68c18 8 35 5 47-8"/><circle cx="37" cy="107" r="4"/><circle cx="262" cy="54" r="4"/></>}
    <Icon x={119} y={44} width={62} height={62} strokeWidth={1}/>
  </svg>}</div>;
}

function Interest({ item, index }: { item: typeof interests[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const open = hovered || expanded;
  return <li className={item.layout} data-open={open} onPointerEnter={event => { if (event.pointerType === 'mouse') setHovered(true); }} onPointerLeave={() => setHovered(false)}>
    <InterestArtwork item={item} index={index}/>
    <h3><button type="button" aria-expanded={open} aria-controls={`interest-${index}`} onClick={() => { setExpanded(!open); setHovered(false); }}><span>{item.title}</span><span className={styles.toggle} aria-hidden="true">{open ? '−' : '+'}</span></button></h3>
    <div id={`interest-${index}`} className={styles.reveal} aria-hidden={!open}><div><p>{item.detail}</p></div></div>
  </li>;
}

export function InterestCards() {
  return <ul className={`${home.personalBento} ${styles.affinities}`} aria-label="Intereses personales">{interests.map((item, index) => <Interest key={item.title} item={item} index={index}/>)}</ul>;
}
