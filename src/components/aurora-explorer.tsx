'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import type { AuroraMoment } from '@/data/aurora';
import type { StudyImage } from './case-study-visual';
import { cancelCaseMotion, playCaseMotion } from './case-motion';
import { AuroraVisual } from './aurora-visual';
import { useAuroraMobile } from './aurora-viewport';
import type { AuroraMockupAsset } from '@/data/aurora-mockups';
import { AuroraMockup } from './aurora-mockup';
import styles from './aurora-case.module.css';

export function AuroraExplorer({ label, moments, showcase, mobileImages, reverse = false }: { label: string; moments: AuroraMoment[]; showcase: AuroraMockupAsset; mobileImages?: StudyImage[]; reverse?: boolean }) {
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const panel = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const visual = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);
  // Presentation is separate from the original evidence, within the same compact panel.
  const [selected, setSelected] = useState(-1);
  const [device, setDevice] = useState<'mobile' | 'desktop' | null>(null);
  const isSmall = useAuroraMobile();
  const mobile = device ? device === 'mobile' : isSmall;
  const presenting = selected === -1;
  const active = moments[Math.max(0, selected)];
  const options = [{ label: 'Presentación', index: -1 }, ...moments.map((moment, index) => ({ label: moment.label, index }))];
  const select = (index: number) => {
    setSelected(index);
  };
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    const root = panel.current;
    playCaseMotion(copy.current, 'copy');
    playCaseMotion(visual.current, 'image', 45);
    return () => { if (root) cancelCaseMotion(root); };
  }, [selected, mobile]);
  const keyboard = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const position = index + 1;
    const next = event.key === 'Home' ? -1 : event.key === 'End' ? moments.length - 1 : (position + (event.key === 'ArrowRight' ? 1 : -1) + options.length) % options.length - 1;
    select(next);
    tabs.current[next + 1]?.focus();
  };
  const image = mobile && mobileImages ? mobileImages[Math.max(0, selected)] : active.image;
  const phone = image.width === 780;
  return <div className={`${styles.explorer} ${mobileImages ? styles.plansExplorer : ''} ${reverse ? styles.reverse : ''}`}>
    <div className={styles.tabs} role="tablist" aria-label={label}>
      {options.map(({ label: optionLabel, index }, position) => <button key={optionLabel} ref={el => { tabs.current[position] = el; }} type="button" role="tab" id={`${id}-tab-${index}`} aria-controls={`${id}-panel`} aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} onClick={() => select(index)} onKeyDown={event => keyboard(event, index)}>{optionLabel}</button>)}
    </div>
    {mobileImages && !presenting && <div className={styles.deviceSwitch} role="group" aria-label="Dispositivo de las capturas de planes"><button type="button" aria-pressed={!mobile} onClick={() => setDevice('desktop')}>Escritorio</button><button type="button" aria-pressed={mobile} onClick={() => setDevice('mobile')}>Móvil</button></div>}
    <div ref={panel} role="tabpanel" tabIndex={0} id={`${id}-panel`} aria-labelledby={`${id}-tab-${selected}`} className={`${styles.panel} ${presenting ? styles.showcasePanel : ''}`}>
      <div ref={copy} className={styles.momentCopy} data-motion="copy">
        <p className="eyebrow">{presenting ? 'Presentación conceptual' : `Captura original · ${String(selected + 1).padStart(2, '0')} / ${String(moments.length).padStart(2, '0')}`}</p>
        <h3>{active.title}</h3><p>{presenting ? active.rationale : active.description}</p>
        {!presenting && <>
        <div className={styles.rationale}><strong>La decisión detrás de la interfaz</strong><p>{active.rationale}</p></div>
        <p className={styles.note}>Exploración de capturas del prototipo. Los campos y botones de la imagen no son un formulario activo.</p>
        </>}
        {presenting && <button type="button" className={styles.evidenceButton} onClick={() => { select(0); tabs.current[1]?.focus(); }}>Ver capturas originales <span aria-hidden="true">→</span></button>}
      </div>
      <div ref={visual} className={styles.momentVisual} data-motion="image">{presenting ? <AuroraMockup image={showcase} title={`${label} · Visualización conceptual`} /> : <AuroraVisual image={image} title={`${label} · ${active.label}`} phone={phone} />}</div>
    </div>
  </div>;
}
