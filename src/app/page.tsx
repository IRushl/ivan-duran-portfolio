import type { Metadata } from 'next';
import { HomeView } from '@/components/home-view';
import { siteOrigin } from '@/data/site';

export const metadata: Metadata = {
  title: { absolute: 'Iván Durán · Product Designer | UX/UI & Digital Experiences' },
  description: 'Conecto investigación UX, diseño de interfaces y prototipado digital. Explora siete casos de Product Design, UX/UI, estrategia de contenido y experiencias digitales.',
  ...(siteOrigin && { alternates: { canonical: '/' } }),
};
export default function Home() {
  return <HomeView />;
}
