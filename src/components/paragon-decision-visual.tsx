'use client';
import { Localized } from '@/i18n/localized';

import { useEffect, useId, useRef, useState } from 'react';
import type { StudyImage } from './case-study-visual';
import { playCaseMotion, cancelCaseMotion } from './case-motion';
import { ParagonVisual } from './paragon-visual';
import styles from './paragon-case.module.css';

export function ParagonDecisionVisual({ image, evidence, number, evidenceTitle }: { image: StudyImage; evidence: StudyImage; number: string; evidenceTitle: string }) {
  const [original, setOriginal] = useState(false);
  const id = useId();
  const visual = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    const target = visual.current;
    playCaseMotion(target, 'image');
    return () => { if (target) cancelCaseMotion(target); };
  }, [original]);

  return <Localized>{<div className={styles.decisionVisual}>
    <div className={styles.formatSwitch} role="group" aria-label={`Formato visual de la decisión ${number}`}>
      <button type="button" aria-pressed={!original} aria-controls={id} onClick={() => setOriginal(false)}>Presentación visual</button>
      <button type="button" aria-pressed={original} aria-controls={id} onClick={() => setOriginal(true)}>Ver capturas originales</button>
    </div>
    <div id={id} ref={visual} data-motion="image" className={styles.visualStage}>
      <ParagonVisual image={original ? evidence : image} title={original ? evidenceTitle : `Decisión ${number} · Visualización conceptual`} caption={original ? 'Vista original del diseño. Los elementos de la imagen no son controles interactivos.' : 'Visualización editorial; consulta las capturas originales para revisar el diseño.'} evidence={original} parallax={!original} />
    </div>
  </div>}</Localized>;
}
