'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { useLocale } from '@/i18n/provider';
import { mountHomeStory } from './home-story-motion';

/** Progressive enhancement: every article remains readable without scripting or motion. */
export function ScrollNarrative({id,labelledBy,className,children,kind='narrative'}:{id:string;labelledBy:string;className:string;children:ReactNode;kind?:'narrative'|'photo'}) {
  const root=useRef<HTMLElement>(null);
  const {locale}=useLocale();
  useEffect(()=>{if(root.current)return mountHomeStory(root.current)},[locale]);
  return <section id={id} ref={root} aria-labelledby={labelledBy} className={className} data-scroll-narrative data-story-kind={kind}>{children}</section>;
}
