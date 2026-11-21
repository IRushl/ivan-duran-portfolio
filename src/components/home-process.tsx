'use client';

import { useEffect, useRef } from 'react';
import { Localized } from '@/i18n/localized';
import { useLocale } from '@/i18n/provider';
import { mountProcessStory } from './home-process-motion';
import styles from './home-process.module.css';

const stages=[
  {phase:'Comprender',title:'Primero, comprender el problema.',body:'Antes de diseñar, necesito entender a las personas, su contexto y lo que realmente se quiere resolver.'},
  {phase:'Diseñar',title:'Después, diseñar con intención.',body:'Convierto hallazgos en decisiones, recorridos e interfaces que hacen más clara la experiencia.'},
  {phase:'Materializar',title:'Finalmente, hacer tangible la idea.',body:'Prototipo, exploro alternativas e itero con tecnología, sin perder el criterio de diseño.'},
];

/** Abstract process diagrams, not screenshots or evidence of completed client work. */
function ProcessDrawing({step}:{step:number}) {
  return <svg viewBox="0 0 400 330" fill="none" aria-hidden="true" focusable="false">
    {step===0?<><circle cx="200" cy="165" r="110" opacity=".17"/><circle cx="200" cy="165" r="72" opacity=".3"/><path d="M200 55 105 220 295 220Z" opacity=".45"/><path d="m200 165 0-110m0 110-95 55m95-55 95 55" opacity=".5"/>{[[200,55],[105,220],[295,220],[200,165]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={i===3?13:7} className={styles.node}/>)}</>:step===1?<><path d="M60 80h100c35 0 30 165 75 165h105M160 80c40 0 45 85 80 85h100" opacity=".55"/><rect x="34" y="54" width="52" height="52" rx="10"/><rect x="207" y="137" width="60" height="56" rx="10"/><rect x="310" y="219" width="56" height="52" rx="10"/><circle cx="338" cy="165" r="8" className={styles.node}/><path d="m330 241 8 8 13-16M225 166h25"/><path d="M60 135v138M60 273h212" strokeDasharray="3 8" opacity=".2"/></>:<><rect x="57" y="57" width="214" height="176" rx="12" opacity=".2"/><rect x="84" y="83" width="214" height="176" rx="12" opacity=".4"/><rect x="111" y="109" width="214" height="176" rx="12"/><path d="M133 137h52m-52 24h160m-160 21h104m-104 21h160" opacity=".5"/><rect x="133" y="226" width="80" height="32" rx="6" className={styles.filled}/><circle cx="305" cy="76" r="7" className={styles.node}/><path d="m295 64 18-27m6 40 24-8" opacity=".5"/></>}
  </svg>;
}

export function HomeProcessInterlude() {
  const root=useRef<HTMLElement>(null);
  const {locale}=useLocale();
  useEffect(()=>{if(root.current)return mountProcessStory(root.current)},[locale]);
  return <Localized><section id="como-diseno" ref={root} className={`shell ${styles.section}`} aria-labelledby="home-process-title" data-process-story>
    <h2 className="sr-only" id="home-process-title">Del recorrido a mi forma de diseñar.</h2>
    <div className={styles.frame} data-story-frame>
      <div className={styles.header} aria-hidden="true"><span>Mi forma de trabajar</span><span className={styles.counter}><span data-story-counter>01</span><span> / 03</span></span></div>
      <div className={styles.panels}>{stages.map((stage,index)=><article key={stage.phase} className={styles.panel} data-story-panel aria-labelledby={`process-stage-${index}`}>
        <div className={styles.copy}><p className={styles.phase}>{stage.phase}</p><h3 id={`process-stage-${index}`}>{stage.title}</h3><p className={styles.body}>{stage.body}</p></div>
        <div className={styles.visual} aria-hidden="true"><div className={styles.halo}/><div className={styles.drawing}><ProcessDrawing step={index}/></div><span className={styles.visualCaption}>Esquema conceptual del proceso</span></div>
      </article>)}</div>
    </div>
  </section></Localized>;
}
