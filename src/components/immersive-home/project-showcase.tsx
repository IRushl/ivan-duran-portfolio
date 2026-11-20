'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { homeProjects } from '@/data/home';
import { immersiveMotion } from './config';
import styles from './project-showcase.module.css';
import { mountShowcasePlayback, type ShowcasePlaybackState } from './showcase-playback';

const summaries = [
  'Una propuesta que conecta el cobro en Android con su verificación en Web. Flujos simplificados y estados compartidos para explicar qué ocurrió y cómo continuar.',
  'Un recorrido que organiza requisitos, asegurados y comparación de planes. Validaciones y recuperación de errores para avanzar en la cotización con mayor claridad.',
  'Servicios, catálogo de caballos y comercio dentro de un mismo ecosistema ecuestre. Arquitectura de información y diseño responsive entregados en una semana.',
  'Del blog de juguetes a una experiencia de comunidad. Investigación en equipo y diseño de la sección Comunidad para facilitar el descubrimiento y la participación.',
  'Planificar el viaje, registrar gastos y consultar el presupuesto desde el móvil. Una propuesta UX/UI que reúne el seguimiento financiero sin interrumpir el recorrido.',
  'Un sistema que conecta una fuente de contenido con distintos formatos y canales. Estrategia y apoyo de IA para ordenar la producción y la distribución.',
  'De una visión de marca a sus aplicaciones visuales y digitales. Dirección de diseño y exploración de un showroom 3D con apoyo de IA, dentro de una propuesta conceptual.',
] as const;
const roles = ['Product Designer UX/UI', 'Product Designer UX/UI', 'Diseñador UX/UI', 'Investigación y diseño UX/UI · Comunidad', 'Diseñador UX/UI', 'Product Marketing · Estrategia de contenido', 'Dirección de diseño visual y digital'] as const;
const accents = ['#b8ed70', '#9bc6ff', '#d5ad87', '#b8cfff', '#ffb8d3', '#ffb29c', '#e8c48a'];
const names = ['Redeban', 'Aurora Seguros', 'ARHO', 'Paragón', 'TripFlowApp', 'Interfaz de Producto', 'Ritual Amarte'];

export function ProjectShowcase() {
  const [{ active, previous }, setSelection] = useState({ active: 0, previous: 0 });
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const [playback, setPlayback] = useState<ShowcasePlaybackState>({ enabled: true, running: false, reduced: false, waiting: false });
  const root = useRef<HTMLElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const player = useRef<ReturnType<typeof mountShowcasePlayback> | null>(null);
  useEffect(() => {
    if (!root.current || !progress.current) return;
    const controller = mountShowcasePlayback(root.current, progress.current, () => setSelection(state => ({ active: (state.active + 1) % homeProjects.length, previous: state.active })), setPlayback, immersiveMotion.showcaseIntervalMs, immersiveMotion.showcaseIdleMs);
    player.current = controller;
    return () => { controller.dispose(); player.current = null; };
  }, []);
  function select(index: number) {
    setSelection(state => state.active === index ? state : { active: index, previous: state.active });
    root.current?.dispatchEvent(new Event('showcaseinteraction'));
  }
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  function keyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % homeProjects.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + homeProjects.length - 1) % homeProjects.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = homeProjects.length - 1;
    else return;
    event.preventDefault(); select(next); buttons.current[next]?.focus();
  }
  const selected = homeProjects[active];
  const next = (active + 1) % homeProjects.length;
  return <section ref={root} id="proyectos" tabIndex={-1} className={styles.showcase} data-immersive-showcase data-project-tone={selected.tone} data-autoplay-running={playback.running} aria-labelledby="showcase-title" style={{ '--card-duration': `${immersiveMotion.cardTransitionMs}ms`, '--colour-duration': `${immersiveMotion.showcaseColourMs}ms`, '--project-accent': accents[active] } as CSSProperties}>
    <div className={styles.environment} aria-hidden="true">{accents.map((accent, index) => <div key={accent} data-active={active === index} style={{ '--halo-colour': accent } as CSSProperties}/>)}</div>
    <div className={`shell ${styles.heading}`}><div><p className={styles.label}>Siete proyectos / distintas perspectivas</p><h2 id="showcase-title">Explora el desafío.<br/><span>Descubre las decisiones.</span></h2></div><p>Selecciona una carta para explorar su enfoque y mi contribución en el panel superior.</p></div>
    <div id="showcase-detail" className={`shell ${styles.detail}`} style={{ '--card-accent': accents[active] } as CSSProperties}>
      <figure className={styles.detailVisual}><div className={styles.detailArtwork}>{Array.from(new Set([previous, active, next])).map(index => <Image key={homeProjects[index].project.slug} src={homeProjects[index].image.src} alt={homeProjects[index].image.alt} width={homeProjects[index].image.width} height={homeProjects[index].image.height} sizes="(max-width: 760px) 90vw, 45vw" loading="eager" data-visible={index === active ? loaded[active] : index === previous && !loaded[active]} aria-hidden={index !== active} onLoad={() => setLoaded(state => state[index] ? state : { ...state, [index]: true })}/>)}</div><figcaption>{selected.caption}</figcaption></figure>
      <div className={styles.synopsis}><p className={styles.detailIndex}>0{active + 1} / 07</p><h3>{names[active]}</h3><p className={styles.type}><span>{selected.sector}</span><span>{selected.nature}</span></p><p className={styles.short}>{summaries[active]}</p><p className={styles.roleLine}><span>Mi rol</span>{roles[active]}</p><Link href={`/proyectos/${selected.project.slug}`}>Ver caso completo <span aria-hidden="true">↗</span></Link></div>
    </div>
    <div className={`shell ${styles.deck}`}>
      {homeProjects.map((item, index) => <article key={item.project.slug} className={styles.card} data-showcase-card data-active={active === index} onPointerEnter={event => { if (event.pointerType === 'mouse') select(index); }} onFocus={() => select(index)} style={{ '--card-accent': accents[index], '--angle': `${index - 3}deg`, '--lift': `${Math.abs(index - 3) * 4}px` } as CSSProperties}>
        <button ref={element => { buttons.current[index] = element; }} type="button" aria-label={`Explorar ${names[index]}`} aria-pressed={active === index} aria-controls="showcase-detail" onClick={() => select(index)} onKeyDown={event => keyboard(event, index)}>
          <span className={styles.number}>0{index + 1}<span aria-hidden="true">↗</span></span>
          <span className={styles.cover}><Image src={item.image.src} width={item.image.width} height={item.image.height} alt={item.image.alt} sizes="(max-width: 650px) 43vw, (max-width: 1050px) 28vw, 200px"/></span>
          <span className={styles.cardName}>{names[index]}</span><span className={styles.sector}>{item.sector}</span><span className={styles.role}>{roles[index]}</span>
        </button>
        <Link className={styles.cardDirect} href={`/proyectos/${item.project.slug}`}>Ver caso <span aria-hidden="true">↗</span></Link>
        <div className={styles.mobileDetail}><p>{item.nature}</p><p><strong>Rol</strong> {roles[index]}</p><p>{summaries[index]}</p><Link href={`/proyectos/${item.project.slug}`}>Ver caso completo <span aria-hidden="true">↗</span></Link></div>
      </article>)}
    </div>
    <div className={`shell ${styles.playback}`} data-showcase-playback>
      <button type="button" disabled={playback.reduced} onClick={() => player.current?.toggle()}>{playback.enabled ? 'Pausar secuencia' : 'Reproducir secuencia'}</button>
      <span>0{active + 1} / 07</span><span className={styles.progress} aria-hidden="true"><span ref={progress}/></span>
      <span>{playback.reduced ? 'Movimiento reducido' : playback.running ? 'Avance automático' : playback.enabled ? 'En pausa mientras exploras' : 'Selección manual'}</span>
    </div>
    <p className={styles.srOnly} role="status">Proyecto seleccionado: {names[active]}.</p>
  </section>;
}
