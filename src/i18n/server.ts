import 'server-only';
import { cookies } from 'next/headers';
import { cache } from 'react';
import type { Metadata } from 'next';
import english from './en.json';
import { localeCookie, translate, type Locale } from './core';

export const getLocale=cache(async():Promise<Locale>=>(await cookies()).get(localeCookie)?.value==='en'?'en':'es');
export const getDictionary=(locale:Locale)=>locale==='en'?english:{};

export function localizedMetadata(metadata: Metadata, locale: Locale): Metadata {
  const t=(text:string)=>translate(text,locale,getDictionary(locale));
  function visit(value:unknown,key=''):unknown {
    if(typeof value==='string')return ['title','absolute','default','description','siteName','alt'].includes(key)?t(value):key==='locale'?locale:value;
    if(Array.isArray(value))return value.map(item=>visit(item,key));
    if(value&&typeof value==='object'&&!(value instanceof URL))return Object.fromEntries(Object.entries(value).map(([name,item])=>[name,visit(item,name)]));
    return value;
  }
  return visit(metadata) as Metadata;
}
