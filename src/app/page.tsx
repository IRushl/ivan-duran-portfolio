import type { Metadata } from 'next';
import { HomeView } from '@/components/home-view';
import { siteOrigin } from '@/data/site';
import { getLocale, localizedMetadata } from '@/i18n/server';

const baseMetadata: Metadata = {
  title: { absolute: 'Iván Durán · Product Designer | UX/UI & Digital Experiences' },
  description: 'Conecto investigación UX, diseño de interfaces y prototipado digital. Explora siete casos de Product Design, UX/UI, estrategia de contenido y experiencias digitales.',
  ...(siteOrigin && { alternates: { canonical: '/' } }),
};
export async function generateMetadata(): Promise<Metadata> { return localizedMetadata(baseMetadata,await getLocale()); }
export default function Home() {
  return <HomeView />;
}
