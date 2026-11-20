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
  return {
    title,
    description: project.description,
    openGraph: { title, description: project.description, type: 'website', locale: 'es', siteName: `${profile.name} · ${profile.role}`, ...(siteOrigin && { url: path, images: [socialImage] }) },
    ...(siteOrigin && { alternates: { canonical: path } }),
  };
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const nextProject = projects[(index + 1) % projects.length];

  if (project.slug === 'redeban') return <RedebanCase project={project} nextProject={nextProject} />;
  if (project.slug === 'aurora-seguros') return <AuroraCase nextProject={nextProject} />;
  if (project.slug === 'tripflowapp') return <TripflowCase nextProject={nextProject} />;
  if (project.slug === 'paragon') return <ParagonCase nextProject={nextProject} />;
  if (project.slug === 'de-lo-largo-a-lo-corto') return <IdpCase />;
  if (project.slug === 'arho') return <ArhoCase />;
  if (project.slug === 'ritual-amarte') return <RitualCase />;

  notFound();
}
