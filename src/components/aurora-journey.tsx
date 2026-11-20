'use client';

import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import styles from './aurora-case.module.css';

const steps = [
  { code: 'S01', name: 'Inicio', id: 'inicio' },
  { code: 'S02', name: 'Asegurados', id: 'asegurados' },
  { code: 'S03', name: 'Planes', id: 'planes' },
  { code: 'D01', name: 'Resumen', id: 'resumen' },
];

export function AuroraJourney() {
  const [current, setCurrent] = useState(-1);

  useEffect(() => {
    const sections = steps.map(step => document.getElementById(step.id));
    let frame = 0;
    const update = () => {
      frame = 0;
      const readingLine = window.innerHeight * .35;
      let next = -1;
      sections.forEach((section, index) => {
        if (section && section.getBoundingClientRect().top <= readingLine) next = index;
      });
      setCurrent(previous => previous === next ? previous : next);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(schedule) : null;
    sections.forEach(section => { if (section) observer?.observe(section); });
    schedule();
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      observer?.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return <nav className={styles.journey} aria-label="Etapas del caso Salud Flex">
    {steps.map(({ code, name, id }, index) => <a key={id} href={`#${id}`} aria-current={current === index ? 'step' : undefined} data-complete={index < current}>
      <span className="eyebrow">{code}</span><strong>{name}</strong><ArrowDown size={16} aria-hidden="true" />
    </a>)}
  </nav>;
}
