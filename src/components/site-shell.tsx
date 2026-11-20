import Link from 'next/link';
import { navigation, profile } from '@/data/profile';

function Brand() {
  return (
    <Link className="brand" href="/">
      <span className="brand-mark" aria-hidden="true" />
      <span>{profile.name}<span className="sr-only">, inicio</span></span>
    </Link>
  );
}

export function SiteHeader() {
  return (
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
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <Brand />
        <nav aria-label="Navegación al pie de página">
          {navigation.map(({ label, href }) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
      </div>
    </footer>
  );
}

export function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return <p className="eyebrow section-label"><span aria-hidden="true">{index}</span><span className="label-divider" aria-hidden="true" />{children}</p>;
}
