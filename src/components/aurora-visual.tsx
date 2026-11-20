'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import type { StudyImage } from './case-study-visual';
import { ImageLightbox } from './image-lightbox';
import { useAuroraMobile } from './aurora-viewport';
import type { AuroraMockupAsset } from '@/data/aurora-mockups';
import { AuroraMockup } from './aurora-mockup';
import { cancelCaseMotion, playCaseMotion } from './case-motion';
import styles from './aurora-case.module.css';

function PhonePreview({ children, title }: { children: ReactNode; title: string }) {
  return <div className={styles.phone}>
    <div className={styles.phoneBezel} aria-hidden="true"><span className={styles.phoneSpeaker} /><span className={styles.phoneCamera} /></div>
    <div className={styles.phoneViewport} tabIndex={0} role="region" aria-label={`Vista previa móvil de ${title}. Desplazable.`}>{children}</div>
  </div>;
}

function DesktopPreview({ children, title }: { children: ReactNode; title: string }) {
  return <div className={styles.capture}>
    <div className={styles.browserBar} aria-hidden="true"><span className={styles.browserControls}><i /><i /><i /></span><span>Salud Flex · Prototipo</span></div>
    <div className={styles.desktopViewport} tabIndex={0} role="region" aria-label={`Vista previa de escritorio de ${title}. Desplazable.`}>{children}</div>
  </div>;
}

function AuroraVisualFrame({ children, phone }: { children: ReactNode; phone: boolean }) {
  return <div className={`${styles.visualStage} ${phone ? styles.phoneStage : ''}`}>{children}</div>;
}

export function AuroraVisual({ image, title, phone = false, priority = false }: { image: StudyImage; title: string; phone?: boolean; priority?: boolean }) {
  const screenshot = <Image src={image.src} width={image.width} height={image.height} alt={image.alt} sizes={phone ? '(max-width: 360px) 70vw, 290px' : '(max-width: 760px) 85vw, 900px'} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} />;

  return <figure className={styles.figure}>
    <AuroraVisualFrame phone={phone}>{phone ? <PhonePreview key={image.src} title={title}>{screenshot}</PhonePreview> : <DesktopPreview key={image.src} title={title}>{screenshot}</DesktopPreview>}</AuroraVisualFrame>
    <figcaption className={styles.caption}><span>{title}<small>{phone ? 'Captura original · Vista previa desplazable desde el inicio' : 'Captura original · Escritorio · Vista previa desplazable'}</small></span><ImageLightbox image={image} title={title} /></figcaption>
  </figure>;
}

export function AuroraPresentation({ image, mobileImage, title, mockup }: { image: StudyImage; mobileImage: StudyImage; title: string; mockup: AuroraMockupAsset }) {
  const mobile = useAuroraMobile();
  const [original, setOriginal] = useState(false);
  const visual = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    const root = visual.current;
    playCaseMotion(root, 'image');
    return () => { if (root) cancelCaseMotion(root); };
  }, [original, mobile]);
  return <div className={styles.summaryPresentation}>
    <div className={styles.deviceSwitch} role="group" aria-label="Presentación del resumen"><button type="button" aria-pressed={!original} onClick={() => setOriginal(false)}>Presentación conceptual</button><button type="button" aria-pressed={original} onClick={() => setOriginal(true)}>Ver captura original</button></div>
    <div ref={visual} className={styles.summaryContent}>{original ? <AuroraVisual image={mobile ? mobileImage : image} title={title} phone={mobile} /> : <AuroraMockup image={mockup} title="D01 · Presentación conceptual del resumen" />}</div>
  </div>;
}
