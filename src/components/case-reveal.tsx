'use client';
import { Localized } from '@/i18n/localized';

import { useEffect, useRef, type ReactNode } from 'react';
import { cancelCaseMotion, CASE_STAGGER, playCaseMotion } from './case-motion';

export function CaseReveal({ children }: { children: ReactNode }) {
  const article = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = article.current;
    if (!root) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const stop = () => cancelCaseMotion(root);

    root.querySelectorAll<HTMLElement>('[data-motion-hero]').forEach((target) => {
      const order = Number(target.dataset.motionHero);
      const kind = target.dataset.motionKind === 'image' ? 'image' : order === 1 ? 'heading' : 'copy';
      playCaseMotion(target, kind, order * CASE_STAGGER);
    });

    const observer = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting) continue;
        const kind = target.getAttribute('data-motion');
        if (kind === 'metrics') {
          target.querySelectorAll('dd').forEach((metric, index) => {
            playCaseMotion(metric.querySelector('strong'), 'heading', index * CASE_STAGGER);
            playCaseMotion(metric.querySelector('span'), 'copy', (index + 1) * CASE_STAGGER);
          });
        } else {
          playCaseMotion(target, kind === 'heading' ? 'heading' : kind === 'image' || target.tagName === 'FIGURE' ? 'image' : 'copy');
        }
        observer?.unobserve(target);
      }
    }, { threshold: .12 }) : null;
    root.querySelectorAll('[data-motion], [data-reveal], [data-motion-visual] > figure').forEach((target) => observer?.observe(target));
    preference.addEventListener('change', stop);
    window.addEventListener('beforeprint', stop);
    return () => {
      observer?.disconnect();
      preference.removeEventListener('change', stop);
      window.removeEventListener('beforeprint', stop);
      stop();
    };
  }, []);

  return <Localized>{<article ref={article}>{children}</article>}</Localized>;
}
