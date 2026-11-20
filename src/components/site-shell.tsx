import { Localized } from '@/i18n/server-localized';
import Link from 'next/link';
import { navigation, profile } from '@/data/profile';
import { LanguageSwitcher } from '@/i18n/language-switcher';
import { MotionPreferences } from './motion-preferences';

function Brand() {
  return <Localized>{(
    <Link className="brand" href="/">
      <span className="brand-mark" aria-hidden="true" />
      <span>{profile.name}<span className="sr-only">, inicio</span></span>
    </Link>
  )}</Localized>;
}

export function SiteHeader() {
  return <Localized>{(
    <header className="site-header">
      <div className="shell header-inner">
        <Brand />
        <nav className="header-nav" aria-label="Navegación principal">
          {navigation.map(({ label, href }) => (
            <Link key={href} href={href} className={href === '/#contacto' ? 'header-contact' : undefined}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-tools"><LanguageSwitcher/><MotionPreferences/></div>
      </div>
    </header>
  )}</Localized>;
}

export function SiteFooter() {
  return <Localized>{(
    <footer className="site-footer">
      <div className="shell footer-inner">
        <Brand />
        <nav aria-label="Navegación al pie de página">
          {navigation.map(({ label, href }) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
      </div>
    </footer>
  )}</Localized>;
}

export function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return <Localized>{<p className="eyebrow section-label"><span aria-hidden="true">{index}</span><span className="label-divider" aria-hidden="true" />{children}</p>}</Localized>;
}
