'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { localeCookie, localeStorageKey, translate, type Dictionary, type Locale } from './core';

type Language = { locale: Locale; dictionary: Dictionary; setLocale: (locale: Locale) => Promise<void>; t: (text: string) => string };
const LanguageContext = createContext<Language | null>(null);

export function LocaleProvider({ initialLocale, initialDictionary, children }: { initialLocale: Locale; initialDictionary: Dictionary; children: ReactNode }) {
  const router=useRouter();
  const [state,setState]=useState({locale:initialLocale,dictionary:initialDictionary});
  const setLocale=useCallback(async(next: Locale)=>{
    const dictionary=next==='en'?(await import('./en.json')).default:{};
    setState({locale:next,dictionary});
    try { localStorage.setItem(localeStorageKey,next); } catch {}
    document.cookie=`${localeCookie}=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
    document.documentElement.lang=next;
    router.refresh();
  },[router]);
  useEffect(()=>{
    let active=true;
    queueMicrotask(()=>{
      if(!active)return;
      try { const saved=localStorage.getItem(localeStorageKey); if((saved==='es'||saved==='en')&&saved!==initialLocale)void setLocale(saved); } catch {}
    });
    const sync=(event:StorageEvent)=>{if(event.key===localeStorageKey&&(event.newValue==='es'||event.newValue==='en'))void setLocale(event.newValue)};
    window.addEventListener('storage',sync);
    return()=>{active=false;window.removeEventListener('storage',sync)};
  },[initialLocale,setLocale]);
  useEffect(()=>{document.documentElement.lang=state.locale},[state.locale]);
  const value=useMemo(()=>({...state,setLocale,t:(text:string)=>translate(text,state.locale,state.dictionary)}),[state,setLocale]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
export function useLocale() {
  const context=useContext(LanguageContext);
  if(!context)throw new Error('LocaleProvider is required');
  return context;
}
