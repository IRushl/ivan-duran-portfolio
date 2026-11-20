'use client';

import { useEffect } from 'react';
import styles from './home.module.css';

export function HomeNavigation() {
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add(styles.smoothRoot);
    const header = document.querySelector<HTMLElement>('.site-header');
    const measure = () => html.style.setProperty('--home-header-height', `${header?.offsetHeight ?? 74}px`);
    const observer = new ResizeObserver(measure);
    if (header) observer.observe(header);
    measure();
    const navigate = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>('a[href]');
      if (!link || link.hasAttribute('download') || link.target) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname !== '/' || !url.hash) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      if (location.hash !== url.hash) history.pushState(null, '', url.hash);
      target.focus({ preventScroll:true });
      target.scrollIntoView({ behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block:'start' });
    };
    document.addEventListener('click', navigate, true);
    return () => {
      observer.disconnect(); document.removeEventListener('click', navigate, true);
      html.classList.remove(styles.smoothRoot); html.style.removeProperty('--home-header-height');
    };
  }, []);
  return null;
}
