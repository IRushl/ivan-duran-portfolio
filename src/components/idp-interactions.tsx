'use client';

import { useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { idpFunnel, idpPipeline } from '@/data/idp';
import { playCaseMotion, cancelCaseMotion } from './case-motion';
import { IdpVisual } from './idp-visual';
import styles from './idp-case.module.css';

const subscribe = (callback: () => void) => { const query = window.matchMedia('(max-width: 760px)'); query.addEventListener('change', callback); return () => query.removeEventListener('change', callback); };
const isMobile = () => window.matchMedia('(max-width: 760px)').matches;
const serverMobile = () => false;

function useExplorer(count: number, vertical: boolean) {
  const [selected, setSelected] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const panel = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    const target = panel.current;
    if (target) target.querySelectorAll('[data-idp-part]').forEach((part, index) => playCaseMotion(part, 'copy', index * 55));
    return () => { if (target) cancelCaseMotion(target); };
  }, [selected]);
  function keyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const previous = vertical ? 'ArrowUp' : 'ArrowLeft';
    const next = vertical ? 'ArrowDown' : 'ArrowRight';
    if (event.altKey || event.ctrlKey || event.metaKey || ![previous, next, 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const value = event.key === 'Home' ? 0 : event.key === 'End' ? count - 1 : (index + (event.key === next ? 1 : -1) + count) % count;
    setSelected(value); buttons.current[value]?.focus();
  }
  return { selected, setSelected, buttons, panel, keyboard };
}

export function IdpPipeline() {
  const vertical = useSyncExternalStore(subscribe, isMobile, serverMobile);
  const { selected, setSelected, buttons, panel, keyboard } = useExplorer(idpPipeline.length, vertical);
  const id = useId();
  const active = idpPipeline[selected];
  return <div className={styles.pipeline}>
    <div className={styles.pipelineSteps} role="tablist" aria-label="Etapas del sistema de contenido" aria-orientation={vertical ? 'vertical' : 'horizontal'}>
      {idpPipeline.map((stage, index) => <button key={stage.label} type="button" role="tab" ref={el => { buttons.current[index] = el; }} id={`${id}-step-${index}`} aria-selected={selected === index} aria-controls={`${id}-panel`} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={event => keyboard(event, index)}><span>{String(index + 1).padStart(2, '0')}</span><strong>{stage.label}</strong>{index < idpPipeline.length - 1 && (vertical ? <ArrowDown size={13} aria-hidden="true" /> : <ArrowRight size={13} aria-hidden="true" />)}</button>)}
    </div>
    <div className={styles.pipelinePanel} ref={panel} role="tabpanel" tabIndex={0} id={`${id}-panel`} aria-labelledby={`${id}-step-${selected}`}>
      <div data-idp-part><p className="eyebrow">Transformación {String(selected + 1).padStart(2, '0')} / 07</p><h3>{active.title}</h3><dl className={styles.pipelineFacts}><div><dt>Entrada</dt><dd>{active.input}</dd></div><div><dt>Transformación</dt><dd>{active.transform}</dd></div><div><dt>Salida</dt><dd>{active.output}</dd></div><div><dt>Canal</dt><dd>{active.channel}</dd></div></dl></div>
      <div data-idp-part className={styles.pipelineOutput}><p className="eyebrow">Formato y escala</p><strong className={styles.outputQuantity}>{active.quantity}</strong><p className={styles.outputPurpose}>{active.purpose}</p><p className={styles.relationship}>{active.relationship}</p>{active.evidence && <details key={active.label} className={styles.pipelineEvidence}><summary>Ver recurso original de esta etapa</summary><IdpVisual image={active.evidence} title={active.evidenceTitle!} evidence sizes="(max-width: 760px) 85vw, 460px" /></details>}</div>
    </div>
    <p className={styles.note}>Los clips parten del video original; artículos y podcasts comparten los subtemas. Esta visualización explica el sistema, sin ejecutar procesos de IA.</p>
  </div>;
}

export function IdpFunnel() {
  const { selected, setSelected, buttons, panel, keyboard } = useExplorer(idpFunnel.length, true);
  const id = useId();
  const active = idpFunnel[selected];
  return <div className={styles.funnelExplorer}>
    <div className={styles.funnelSteps} role="tablist" aria-label="Etapas de la estrategia de distribución" aria-orientation="vertical">
      {idpFunnel.map((stage, index) => <button key={stage.label} type="button" role="tab" ref={el => { buttons.current[index] = el; }} id={`${id}-step-${index}`} aria-controls={`${id}-panel`} aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={event => keyboard(event, index)}><span>{String(index + 1).padStart(2, '0')}</span><strong>{stage.label}</strong><small>{stage.short}</small></button>)}
    </div>
    <div className={styles.funnelPanel} ref={panel} role="tabpanel" tabIndex={0} id={`${id}-panel`} aria-labelledby={`${id}-step-${selected}`}><div data-idp-part><h3>{active.title}</h3><p className={styles.formatLabel}>Formatos y canales</p><p>{active.formats}</p></div><div data-idp-part><p className={styles.formatLabel}>Función estratégica</p><p>{active.intent}</p><p className={styles.relationship}>{active.limit}</p></div></div>
  </div>;
}
