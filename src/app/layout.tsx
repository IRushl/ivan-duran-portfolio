import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { SiteFooter, SiteHeader } from '@/components/site-shell';
import { profile } from '@/data/profile';
import { indexable, siteOrigin, socialImage } from '@/data/site';
import './globals.css';

const title = `${profile.name} · ${profile.role}`;
const description = 'Portafolio de Iván Durán, Product Designer. Explora casos de UX/UI, diseño de producto, sistemas de diseño y prototipado.';

export const metadata: Metadata = {
  title: { default: title, template: `%s · ${profile.name}` },
  description,
  robots: { index: indexable, follow: true },
  ...(siteOrigin && { metadataBase: siteOrigin }),
  openGraph: { type: 'website', locale: 'es', siteName: title, title, description, ...(siteOrigin && { url: '/', images: [socialImage] }) },
  twitter: { card: siteOrigin ? 'summary_large_image' : 'summary', ...(siteOrigin && { images: [socialImage] }) },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <a className="skip-link" href="#contenido">Saltar al contenido</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
