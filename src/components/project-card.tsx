import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/data/projects';

export function ProjectCover({ project, eager = false }: { project: Project; eager?: boolean }) {
  return (
    <div className="project-cover">
      <Image
        src={project.cover.src}
        alt={project.cover.alt}
        fill
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : undefined}
        sizes={eager ? '(max-width: 820px) 90vw, (max-width: 1380px) 42vw, 560px' : '(max-width: 760px) 90vw, (max-width: 1380px) 44vw, 610px'}
      />
      {project.cover.conceptual && <span className="cover-caption">Portada conceptual</span>}
    </div>
  );
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const titleId = `${project.slug}-title`;

  return (
    <article className="project-card" aria-labelledby={titleId}>
      <ProjectCover project={project} />
      <div className="project-copy">
        <p className="eyebrow project-kicker"><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span> {project.category}{project.type && ` · ${project.type}`}</p>
        <h3 id={titleId}>{project.name}{' '}<span>{project.title}</span></h3>
        <p className="project-description">{project.description}</p>
        <Link className="project-action" href={`/proyectos/${project.slug}`}>
          Ver caso<span className="sr-only"> de {project.name}</span><ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
