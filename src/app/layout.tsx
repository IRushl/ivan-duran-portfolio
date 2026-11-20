import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { SiteFooter, SiteHeader } from '@/components/site-shell';
import { profile } from '@/data/profile';
import { indexable, siteOrigin, socialImage } from '@/data/site';
import './globals.css';
import '@/components/home-theme.css';
import { homeThemeVariables } from '@/data/home-palette';
import type { CSSProperties } from 'react';
import { LocaleProvider } from '@/i18n/provider';
import { Localized } from '@/i18n/localized';
import { getDictionary, getLocale, localizedMetadata } from '@/i18n/server';

const title = `${profile.name} · ${profile.role}`;
const description = 'Portafolio de Iván Durán, Product Designer. Explora casos de UX/UI, diseño de producto, sistemas de diseño y prototipado.';

const baseMetadata: Metadata = {
  title: { default: title, template: `%s · ${profile.name}` },
  description,
  robots: { index: indexable, follow: true },
  ...(siteOrigin && { metadataBase: siteOrigin }),
  openGraph: { type: 'website', locale: 'es', siteName: title, title, description, ...(siteOrigin && { url: '/', images: [socialImage] }) },
  twitter: { card: siteOrigin ? 'summary_large_image' : 'summary', ...(siteOrigin && { images: [socialImage] }) },
};

export async function generateMetadata(): Promise<Metadata> { return localizedMetadata(baseMetadata,await getLocale()); }

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale=await getLocale();
  return (
    <html lang={locale} className={`${GeistSans.variable} ${GeistMono.variable}`} style={homeThemeVariables as CSSProperties}>
      <body>
        <LocaleProvider initialLocale={locale} initialDictionary={getDictionary(locale)}><Localized>
        <a className="skip-link" href="#contenido">Saltar al contenido</a>
        <SiteHeader />
        {children}
        <SiteFooter />
        </Localized></LocaleProvider>
      </body>
    </html>
  );
}
