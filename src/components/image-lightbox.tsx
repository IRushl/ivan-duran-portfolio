'use client';
import { Localized } from '@/i18n/localized';

import { useId, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Maximize2, X } from 'lucide-react';
import type { StudyImage } from './case-study-visual';
import styles from './case-study-visual.module.css';

export function ImageLightbox({ image, title }: { image: StudyImage; title: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLAnchorElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const [opened, setOpened] = useState(false);
  const original = image.original ?? image.src;

  return <Localized>{(
    <>
      <a ref={trigger} className={styles.trigger} href={original} aria-haspopup="dialog" onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !dialog.current?.showModal) return;
        event.preventDefault();
        dialog.current.showModal();
        setOpened(true);
        closeButton.current?.focus();
      }}>
        <Maximize2 size={15} aria-hidden="true" /> Ampliar <span className="sr-only">{title}</span>
      </a>
      <dialog ref={dialog} className={styles.dialog} aria-labelledby={titleId} onClose={() => {
        setOpened(false);
        trigger.current?.focus();
      }}>
        <div className={styles.dialogBar}>
          <h2 id={titleId}>{title}</h2>
          <button ref={closeButton} type="button" className={styles.close} onClick={() => dialog.current?.close()}>
            <X size={20} aria-hidden="true" /><span className="sr-only">Cerrar imagen</span>
          </button>
        </div>
        <a className={styles.original} href={original} target="_blank" rel="noopener noreferrer">
          Abrir archivo original <ArrowUpRight size={15} aria-hidden="true" />
          <span className="sr-only"> (abre en una pestaña nueva)</span>
        </a>
        {opened && <Image src={image.src} width={image.width} height={image.height} alt={image.alt} unoptimized className={styles.fullImage} />}
      </dialog>
    </>
  )}</Localized>;
}
