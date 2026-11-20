'use client';
import { useLocale } from './provider';
import styles from './language-switcher.module.css';

export function LanguageSwitcher() {
  const {locale,setLocale,t}=useLocale();
  return <div className={styles.languages} role="group" aria-label={t('Idioma del sitio')}>
    <button type="button" aria-label={t('Ver el sitio en español')} aria-pressed={locale==='es'} onClick={()=>void setLocale('es')}>ES</button>
    <span aria-hidden="true">|</span>
    <button type="button" aria-label={t('Ver el sitio en inglés')} aria-pressed={locale==='en'} onClick={()=>void setLocale('en')}>EN</button>
  </div>;
}
