'use client';
import type { ReactNode } from 'react';
import { useLocale } from './provider';
import { localizeTree } from './tree';
export { localizeTree } from './tree';
export function Localized({ children }: { children: ReactNode }) { const {locale,t}=useLocale(); return localizeTree(children,t,locale); }
