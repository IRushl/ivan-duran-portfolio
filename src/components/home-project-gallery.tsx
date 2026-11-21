'use client';
import { Localized } from '@/i18n/localized';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { homeProjects } from '@/data/home';
import { ProjectArtwork, ProjectIdentity, ProjectSummary, projectName } from './home-project-content';
import { mountProjectGallery } from './home-gallery-controller';
import { mountGalleryAutoplay, type AutoplayState } from './home-gallery-autoplay';
import styles from './home-projects.module.css';

export function HomeProjectGallery() {
  const [active, setActive] = useState(0);
  const [playback, setPlayback] = useState<AutoplayState>({enabled:true,running:false,reduced:false});
  const root = useRef<HTMLElement>(null), viewport = useRef<HTMLDivElement>(null), visual = useRef<HTMLDivElement>(null);
  const activeIndex = useRef(0);
  const controller = useRef<ReturnType<typeof mountProjectGallery> | null>(null);
  const autoplay = useRef<ReturnType<typeof mountGalleryAutoplay> | null>(null);
  useEffect(() => {
    if (!viewport.current || !root.current || !visual.current) return;
    const mounted = mountProjectGallery(viewport.current, index => { activeIndex.current=index; setActive(index); autoplay.current?.reset(); }, true);
    controller.current = mounted;
    const rotation = mountGalleryAutoplay(root.current,visual.current,null,() => mounted.select((activeIndex.current+1)%homeProjects.length),setPlayback);
    autoplay.current = rotation;
    return () => { rotation.dispose(); mounted.dispose(); autoplay.current=null; controller.current=null; };
  }, []);
  const select = (index:number, instant=false) => { autoplay.current?.manual(); controller.current?.select(index,instant); };
  const keyboard = (event:KeyboardEvent) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const next = event.key==='ArrowRight' ? active+1 : event.key==='ArrowLeft' ? active-1 : event.key==='Home' ? 0 : event.key==='End' ? homeProjects.length-1 : null;
    if (next !== null) {
      event.preventDefault(); select(next);
      if (event.target instanceof HTMLButtonElement) event.currentTarget.querySelectorAll<HTMLButtonElement>('button')[((next % homeProjects.length) + homeProjects.length) % homeProjects.length]?.focus();
    }
  };
  const item = homeProjects[active];
  return <Localized>{<section ref={root} className={styles.gallery} aria-labelledby="home-gallery-title" aria-roledescription="carrusel" data-project-tone={item.tone} data-autoplay-enabled={playback.enabled} data-autoplay-running={playback.running}>
    <header className={`shell ${styles.galleryHeader}`}><div><p className={styles.eyebrow}>Proyectos · Distintos contextos</p><h2 id="home-gallery-title">Diferentes desafíos.<br/><span>Una misma mirada de producto.</span></h2></div><p>Explora cómo la investigación, el diseño y la tecnología se conectan en proyectos de fintech, insurtech, ecommerce, contenidos y marca.</p></header>
    <div className={`shell ${styles.selectors}`} role="group" aria-label="Seleccionar proyecto" onKeyDown={keyboard}>{homeProjects.map((project,index) => <button key={project.project.slug} type="button" aria-pressed={active===index} aria-controls="home-gallery-viewport" onClick={() => select(index)}>{projectName(project)}</button>)}</div>
    <p className="sr-only" id="home-gallery-help">Usa las flechas izquierda y derecha, Inicio o Fin para explorar. También puedes deslizar horizontalmente o seleccionar un nombre. El avance se pausa al interactuar. Puedes pausarlo o reanudarlo desde las preferencias de movimiento de la navegación.</p>
    <div className={styles.visual} ref={visual}>
      <div id="home-gallery-viewport" ref={viewport} className={styles.viewport} tabIndex={0} role="group" aria-label="Paneles de proyectos" aria-describedby="home-gallery-help" onKeyDown={keyboard}>
        {homeProjects.map((project,index) => <article key={project.project.slug} className={styles.slide} data-gallery-slide data-project-tone={project.tone} data-active={active===index} role="group" aria-label={`${index+1} de 7: ${projectName(project)}`} aria-roledescription="diapositiva">
          <Link href={`/proyectos/${project.project.slug}`} aria-label={`Ver caso de ${projectName(project)}`} onFocus={() => select(index,true)}>
            <ProjectArtwork item={project} caption={false} sizes="(max-width: 650px) 86vw, (max-width: 1400px) 68vw, 900px"/>
            <p className={styles.panelName}>{projectName(project)}<span>{project.sector}</span></p>
          </Link>
        </article>)}
      </div>
      <button type="button" className={`${styles.visualArrow} ${styles.previous}`} onClick={() => select(active-1)} aria-label="Proyecto anterior" aria-controls="home-gallery-viewport"><ChevronLeft aria-hidden="true" size={24}/></button>
      <button type="button" className={`${styles.visualArrow} ${styles.next}`} onClick={() => select(active+1)} aria-label="Proyecto siguiente" aria-controls="home-gallery-viewport"><ChevronRight aria-hidden="true" size={24}/></button>
    </div>
    <div className={`shell ${styles.carouselControls}`}>
      <div className={styles.dots} role="group" aria-label="Elegir proyecto" onKeyDown={keyboard}>{homeProjects.map((project,index) => <button key={project.tone} type="button" aria-label={`Ver proyecto ${index+1}: ${projectName(project)}`} aria-pressed={active===index} aria-controls="home-gallery-viewport" onClick={() => select(index)}><span/></button>)}</div>
    </div>
    <div key={item.project.slug} className={`shell ${styles.galleryDetail}`} data-gallery-detail data-project-tone={item.tone}>
      <div><ProjectIdentity item={item}/><h3>{item.headline}</h3></div>
      <div><ProjectSummary item={item}/><p className={styles.caption}>{item.caption}</p><Link className={styles.caseLink} href={`/proyectos/${item.project.slug}`}>Ver caso de estudio <span className="sr-only">de {projectName(item)}</span></Link></div>
    </div>
    <p className="sr-only" role="status" aria-live={playback.enabled?'off':'polite'} aria-atomic="true">Proyecto {active+1} de 7: {projectName(item)}.</p>
  </section>}</Localized>;
}
