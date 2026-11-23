import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RedebanCase } from '@/components/redeban-case';
import { AuroraCase } from '@/components/aurora-case';
import { TripflowCase } from '@/components/tripflow-case';
import { ParagonCase } from '@/components/paragon-case';
import { IdpCase } from '@/components/idp-case';
import { ArhoCase } from '@/components/arho-case';
import { RitualCase } from '@/components/ritual-case';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { siteOrigin, socialImage } from '@/data/site';
import { getLocale, localizedMetadata } from '@/i18n/server';

type CasePageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();

  const title = `${project.name} — ${project.title}`;
  const path = `/proyectos/${slug}`;
  return localizedMetadata({
    title,
    description: project.description,
    openGraph: { title, description: project.description, type: 'website', locale: 'es', siteName: `${profile.name} · ${profile.role}`, ...(siteOrigin && { url: path, images: [socialImage] }) },
    ...(siteOrigin && { alternates: { canonical: path } }),
  },await getLocale());
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();

  if (project.slug === 'redeban') return <RedebanCase project={project} />;
  if (project.slug === 'aurora-seguros') return <AuroraCase />;
  if (project.slug === 'tripflowapp') return <TripflowCase />;
  if (project.slug === 'paragon') return <ParagonCase />;
  if (project.slug === 'de-lo-largo-a-lo-corto') return <IdpCase />;
  if (project.slug === 'arho') return <ArhoCase />;
  if (project.slug === 'ritual-amarte') return <RitualCase />;

  notFound();
}
