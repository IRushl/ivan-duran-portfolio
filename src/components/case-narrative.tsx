import { ArrowUpRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import type { ReactNode } from 'react';
import type { CaseStudy } from '@/data/case-studies';

const sections = [
  { id: 'contexto', index: '01', title: 'Contexto y problema' },
  { id: 'rol', index: '02', title: 'Contribución y equipo' },
  { id: 'decisiones', index: '03', title: 'Decisiones de UX' },
  { id: 'solucion', index: '04', title: 'Entregables' },
  { id: 'resultados', index: '05', title: 'Resultados y aprendizajes' },
] as const;

function CaseSection({ section, children }: { section: (typeof sections)[number]; children: ReactNode }) {
  const { id, index, title } = section;

  return (
    <section className="case-section" id={id} tabIndex={-1} aria-labelledby={`${id}-titulo`}>
      <h2 id={`${id}-titulo`}><span className="eyebrow" aria-hidden="true">{index}</span>{title}</h2>
      {children}
    </section>
  );
}

function ScopeDiagram({ diagram }: { diagram: CaseStudy['diagram'] }) {
  return (
    <figure id="proceso" className="case-diagram">
      <figcaption className="eyebrow">Esquema editorial del alcance</figcaption>
      <div className="diagram-root">{diagram.center}</div>
      <ul className="diagram-branches">
        {diagram.nodes.map(({ label, text }) => (
          <li key={label}><span className="eyebrow">{label}</span>{text}</li>
        ))}
      </ul>
    </figure>
  );
}

function Disclosure({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <details id={id} className="case-disclosure">
      <summary>{title}<ChevronDown size={19} aria-hidden="true" /></summary>
      {children}
    </details>
  );
}

function CaseDeliverables({ deliverables, prototype }: Pick<CaseStudy, 'deliverables' | 'prototype'>) {
  const visuals = deliverables.filter(({ media }) => media);
  const canShowPrototype = prototype?.authorized && prototype.url.startsWith('https://') && URL.canParse(prototype.url);

  return (
    <>
      {visuals.length ? (
        <div className="case-media-list">
          {visuals.map(({ title, media }) => media && (
            <figure key={title}>
              <Image src={media.src} alt={media.alt} width={media.width} height={media.height} sizes="(max-width: 760px) 90vw, 810px" />
              <figcaption><strong>{title}</strong><p>{media.caption}</p></figcaption>
            </figure>
          ))}
        </div>
      ) : <p>Las piezas originales se incorporarán cuando estén disponibles para compartir.</p>}
      <Disclosure title="Ver inventario de entregables">
        <dl className="case-detail-list">
          {deliverables.map(({ title, note }) => (
            <div key={title}><dt>{title}</dt><dd>{note}</dd></div>
          ))}
        </dl>
      </Disclosure>
      {canShowPrototype && (
        <a className="button button-quiet case-prototype" href={prototype.url}>
          {prototype.label}<ArrowUpRight size={17} aria-hidden="true" />
        </a>
      )}
    </>
  );
}

export function CaseNarrative({ study }: { study: CaseStudy | null }) {
  if (!study) {
    return (
      <section className="case-section" id="detalle" tabIndex={-1} aria-labelledby="detalle-titulo">
        <h2 id="detalle-titulo">Secciones pendientes</h2>
        <dl className="case-brief">
          {sections.map(({ id, title }) => (
            <div key={id}><dt>{title}</dt><dd>Por documentar.</dd></div>
          ))}
        </dl>
      </section>
    );
  }

  const { contribution, outcomes } = study;

  return (
    <div className="case-body">
      <nav className="case-index" aria-label="Índice del caso de estudio">
        <p className="eyebrow">En este caso</p>
        <ol>
          {sections.map(({ id, index, title }) => (
            <li key={id}><a href={`#${id}`}><span className="eyebrow" aria-hidden="true">{index}</span>{title}</a></li>
          ))}
        </ol>
      </nav>

      <div className="case-story">
        <CaseSection section={sections[0]}>
          <p>{study.context}</p>
          <dl className="case-brief">
            <div id="problema"><dt>Problema</dt><dd>{study.problem}</dd></div>
            <div id="objetivo"><dt>Objetivo de diseño</dt><dd>{study.objective}</dd></div>
          </dl>
          <ScopeDiagram diagram={study.diagram} />
        </CaseSection>

        <CaseSection section={sections[1]}>
          <dl className="case-brief case-ownership">
            <div><dt>Mi contribución</dt><dd>{contribution.individual}</dd></div>
            <div><dt>Trabajo del equipo</dt><dd>{contribution.team}</dd></div>
          </dl>
        </CaseSection>

        <CaseSection section={sections[2]}>
          <ul className="case-decisions">
            {study.decisions.map(({ title, question, rationale }) => (
              <li key={title}>
                <p className="eyebrow decision-status">{rationale ? 'Razonamiento' : 'Criterio por documentar'}</p>
                <h3>{title}</h3>
                <p>{rationale ?? question}</p>
              </li>
            ))}
          </ul>
        </CaseSection>

        <CaseSection section={sections[3]}>
          <CaseDeliverables deliverables={study.deliverables} prototype={study.prototype} />
        </CaseSection>

        <CaseSection section={sections[4]}>
          <dl className="case-outcomes">
            <div><dt>Resultados medidos</dt><dd>{outcomes.measured}</dd></div>
            <div><dt>Resultados esperados</dt><dd>{outcomes.expected}</dd></div>
            <div><dt>Aprendizajes</dt><dd>{outcomes.learnings}</dd></div>
          </dl>
          <Disclosure id="evidencia" title="Ver la evidencia que falta aportar">
            <dl className="case-detail-list">
              {study.evidence.map(({ label, text }) => (
                <div key={label}><dt>{label}</dt><dd>{text}</dd></div>
              ))}
            </dl>
          </Disclosure>
        </CaseSection>
      </div>
    </div>
  );
}
