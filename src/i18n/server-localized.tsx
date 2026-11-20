import type { ReactNode } from 'react';
import { getLocale, getDictionary } from './server';
import { translate } from './core';
import { localizeTree } from './tree';
export async function Localized({children}:{children:ReactNode}) { const locale=await getLocale();return localizeTree(children,text=>translate(text,locale,getDictionary(locale)),locale); }
