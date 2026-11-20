'use client';

import { useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent } from 'react';
import { tripflowArtworks, tripflowDecisions } from '@/data/tripflow';
import { cancelCaseMotion, playCaseMotion } from './case-motion';
import { TripflowVisual } from './tripflow-visual';
import styles from './tripflow-case.module.css';

const subscribeToLayout = (callback: () => void) => {
  const query = window.matchMedia('(max-width: 760px)');
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
};
const verticalLayout = () => window.matchMedia('(max-width: 760px)').matches;
const serverLayout = () => false;

export function TripflowExplorer() {
  const id = useId();
  const [selected, setSelected] = useState(0);
  const [presentation, setPresentation] = useState(true);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const panel = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const visual = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);
  const vertical = useSyncExternalStore(subscribeToLayout, verticalLayout, serverLayout);
  const active = tripflowDecisions[selected];

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    const root = panel.current;
    playCaseMotion(copy.current, 'copy');
    playCaseMotion(visual.current, 'image', 55);
    return () => { if (root) cancelCaseMotion(root); };
  }, [selected, presentation]);

  function keyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const previousKey = vertical ? 'ArrowUp' : 'ArrowLeft';
    const nextKey = vertical ? 'ArrowDown' : 'ArrowRight';
    if (event.altKey || event.ctrlKey || event.metaKey || ![previousKey, nextKey, 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tripflowDecisions.length - 1 : (index + (event.key === nextKey ? 1 : -1) + tripflowDecisions.length) % tripflowDecisions.length;
    setSelected(next);
    tabs.current[next]?.focus();
  }

  return <div className={styles.explorer}>
    <div className={styles.steps} role="tablist" aria-orientation={vertical ? 'vertical' : 'horizontal'} aria-label="Recorrido de TripFlow y decisiones de diseño">
      {tripflowDecisions.map((decision, index) => <button key={decision.label} type="button" role="tab" id={`${id}-tab-${index}`} aria-controls={`${id}-panel`} aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} ref={element => { tabs.current[index] = element; }} onClick={() => setSelected(index)} onKeyDown={event => keyboard(event, index)}>
        <span className="eyebrow">{decision.label}</span><strong>{decision.task}</strong><span>{decision.summary}</span>
      </button>)}
    </div>
    <div ref={panel} className={styles.decisionPanel} role="tabpanel" tabIndex={0} id={`${id}-panel`} aria-labelledby={`${id}-tab-${selected}`}>
      <div ref={copy} className={styles.decisionCopy} data-motion="copy"><p className="eyebrow">Decisión {active.label} / 03</p><h3>{active.title}</h3>
        <dl className={styles.reasoning}>
          <div><dt>Problema</dt><dd>{active.problem}</dd></div>
          <div><dt>Decisión</dt><dd>{active.decision}</dd></div>
          <div><dt>Justificación</dt><dd>{active.rationale}</dd></div>
          <div><dt>Beneficio esperado</dt><dd>{active.expected}</dd></div>
        </dl>
      </div>
      <div className={styles.decisionVisual}>
        <div className={styles.visualModes} role="group" aria-label="Formato de la imagen de la decisión">
          <button type="button" aria-pressed={presentation} aria-controls={`${id}-visual`} onClick={() => setPresentation(true)}>Presentación visual</button>
          <button type="button" aria-pressed={!presentation} aria-controls={`${id}-visual`} onClick={() => setPresentation(false)}>Ver captura original</button>
        </div>
        <div ref={visual} id={`${id}-visual`} className={presentation ? styles.artworkPreview : styles.originalPreview} data-motion="image">
          <TripflowVisual image={presentation ? tripflowArtworks[selected] : active.image} title={presentation ? `Decisión ${active.label} · Presentación conceptual` : active.caption} caption={presentation ? 'Visualización generada con IA; puede diferir del diseño. Consulta «Ver captura original» como referencia fiel.' : selected === 2 ? 'Valores, avisos y recompensas ilustrativos del diseño; no son registros de uso ni beneficios verificados.' : 'Interfaz original de la propuesta con datos de ejemplo.'} phone={!presentation} artwork={presentation} sizes={presentation ? '(max-width: 1050px) 85vw, 50vw' : undefined} />
        </div>
      </div>
    </div>
    <p className={styles.note}>Exploración visual de las pantallas originales. Los botones y campos dentro de las capturas no son controles de una aplicación funcional.</p>
  </div>;
}
