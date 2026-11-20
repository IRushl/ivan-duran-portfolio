'use client';

import { useId, useState } from 'react';
import { ArrowUpRight, Box, X } from 'lucide-react';
import { ritualDemo, ritualImages } from '@/data/ritual-amarte';
import { RitualGallery } from './ritual-gallery';
import styles from './ritual-case.module.css';

const views = [
  { label:'Plano 2D', title:'Distribución conceptual', note:'Planta del escenario ideal. No es un plano constructivo.', image:ritualImages.plan },
  { label:'Vista superior', title:'El conjunto desde arriba', note:'Captura documentada del showroom web conceptual.', image:ritualImages.top },
  { label:'Perspectiva', title:'La distribución en tres dimensiones', note:'Captura documentada del modelo tridimensional.', image:ritualImages.perspective },
  { label:'Fachada', title:'Una referencia para el acceso', note:'Referencia conceptual de fachada del prototipo.', image:ritualImages.prototypeFacade },
];

export function RitualShowroom() {
  const [live,setLive]=useState(false);
  const id=useId();
  return <div className={styles.showroom}>
    <div className={styles.showroomBar}><div><span className={styles.kicker}>Escenario ideal / 96 m² hipotéticos</span><h3>Explorar antes de construir.</h3></div><button type="button" className={styles.primary} aria-controls={`${id}-viewer`} aria-expanded={live} onClick={()=>setLive(!live)}>{live?<X size={18} aria-hidden="true"/>:<Box size={18} aria-hidden="true"/>}{live?'Volver a las capturas':'Activar showroom 3D'}</button></div>
    <div id={`${id}-viewer`}>
      {live ? <div className={styles.liveViewer}><p className={styles.viewerNote}>Demo interactiva externa. Usa sus controles para cambiar de vista. Puedes volver a las capturas con el botón superior.</p><iframe src={ritualDemo} title="Showroom 3D conceptual de Ritual Amarte" loading="eager" sandbox="allow-scripts allow-same-origin" allow="fullscreen" referrerPolicy="no-referrer" /></div> : <RitualGallery items={views} label="Vistas documentadas del showroom" initial={2} />}
    </div>
    <div className={styles.demoFooter}><p>Las capturas conservan la versión documentada. La demo puede incorporar iteraciones posteriores.</p><a href={ritualDemo} target="_blank" rel="noopener noreferrer">Abrir demo en otra pestaña <ArrowUpRight size={16} aria-hidden="true"/><span className="sr-only"> (abre en una pestaña nueva)</span></a></div>
  </div>;
}
