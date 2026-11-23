import { CaseNext } from './case-next';
import { Localized } from '@/i18n/server-localized';
import Link from 'next/link';
import { EvidenceLabel } from './evidence-label';
import { ArrowDown } from 'lucide-react';
import { paragonDecisions, paragonImages, paragonTargets } from '@/data/paragon';
import { CaseReveal } from './case-reveal';
import { CursorParallax } from './cursor-parallax';
import { ParagonVisual } from './paragon-visual';
import { ParagonDecisionVisual } from './paragon-decision-visual';
import styles from './paragon-case.module.css';

export function ParagonCase() {
  return <Localized>{<main id="contenido" data-cursor-parallax="paragon" tabIndex={-1} className={`shell ${styles.case}`}><CursorParallax rootSelector={'[data-cursor-parallax="paragon"]'} /><CaseReveal>
    <header className={styles.hero}>
      <nav aria-label="Ruta de navegación"><ol className="case-breadcrumb"><li><Link className="back-link" href="/#proyectos">Volver a proyectos</Link></li><li aria-current="page"><span aria-hidden="true">/</span> Paragón</li></ol></nav>
      <div className={styles.heroGrid}>
        <div><p className="eyebrow" data-motion-hero="0">Paragón / Blog «Sorpresa» · UX/UI Design</p><h1 data-motion-hero="1">Los recuerdos nos atraen.<br /><span>La comunidad nos hace volver.</span></h1><p className={styles.lead} data-motion-hero="2">Una propuesta de UX/UI para transformar un blog de juguetes y coleccionismo en una experiencia de descubrimiento, participación y pertenencia.</p><a className="button button-primary" href="#decisiones" data-motion-hero="3">Explorar la propuesta <ArrowDown size={16} aria-hidden="true" /></a></div>
        <div data-motion-hero="3" data-motion-kind="image"><ParagonVisual parallax image={paragonImages.hero} title="Paragón · Comunidad en contexto" caption="Visualización conceptual del diseño; no representa una implementación comercial." priority /></div>
      </div>
      <dl className={styles.facts}><div><dt>Mi rol y entregables</dt><dd>Investigación, auditoría comparativa y diseño UX/UI de Comunidad. La arquitectura general del blog fue trabajo del equipo.</dd></div><div><dt>Trabajo en equipo</dt><dd>Proyecto académico con un equipo de 11 personas, en dos sprints durante 30 días.</dd></div><div><dt>Alcance</dt><dd>Propuesta de diseño. Las cifras de impacto son objetivos, no resultados comerciales medidos.</dd></div></dl>
    </header>

    <nav className={styles.chapters} aria-label="Recorrido del caso Paragón"><a href="#desafio">01 / El desafío</a><a href="#investigacion">02 / Entender a las personas</a><a href="#decisiones">03 / Diseñar la participación</a><a href="#impacto">04 / Qué falta comprobar</a></nav>

    <section id="desafio" className={styles.section} aria-labelledby="paragon-desafio"><p className="eyebrow">01 / Del contenido al vínculo</p><div className={styles.contextGrid}><div><h2 id="paragon-desafio" data-motion="heading">Leer algo interesante<br /><span>no garantiza volver.</span></h2><p className={styles.editorial}>El reto no terminaba en publicar artículos: había que dar un lugar a quienes los leían.</p><p className={styles.prose}>«Sorpresa» nació alrededor de los juguetes, la nostalgia y el coleccionismo. Mi trabajo se concentró en la sección Comunidad: hacer visible ese espacio, explicar cómo participar y conectar la lectura con una relación más continua.</p></div><aside className={styles.contextMetric} aria-label="Referencia contextual del ejercicio"><EvidenceLabel kind="brief" label="Dato inicial del ejercicio" /><strong>55 %</strong><h3>Referencia de abandono del ejercicio.</h3><p>Punto de partida para el reto de participación, no una medición propia de Paragón ni una línea base validada.</p></aside></div></section>

    <section id="investigacion" className={`${styles.section} ${styles.research}`} aria-labelledby="paragon-investigacion"><p className="eyebrow">02 / Entender a las personas</p><div className={styles.sectionIntro}><h2 id="paragon-investigacion" data-motion="heading">La afinidad atrae.<br /><span>Participar necesita algo más.</span></h2><p className={styles.prose}>La investigación del equipo combinó entrevistas semiestructuradas y card sorting con 20 participantes de 25 a 40 años. La síntesis del equipo señaló interés por interactuar, recibir reconocimiento y encontrar contenido relacionado con la nostalgia.</p></div>
      <div className={styles.methods}><div><span>Escuchar</span><h3>Entrevistas</h3><p>Las entrevistas señalaron interés por interactuar más allá de la lectura pasiva.</p></div><div><span>Organizar</span><h3>Card sorting</h3><p>El ejercicio se utilizó para priorizar y agrupar secciones de contenido y Comunidad.</p></div><div><span>Comparar</span><h3>Benchmark</h3><p>Reddit, HubSpot Community, Shopify y LoL Boards sirvieron como referencias de participación, reconocimiento y navegación.</p></div></div>
      <div className={styles.researchLearning}><h3>Cambiar las referencias cambió la pregunta.</h3><p>En la auditoría inicial elegí sitios poco alineados con el objetivo. Con orientación del equipo, revisé comunidades digitales para observar patrones de interacción y justificar la propuesta más allá de su apariencia.</p></div>
      <p className={styles.note}>Estos hallazgos orientaron la propuesta; no demuestran por sí solos mejoras de participación o retorno.</p>
      <details className={styles.flowDetails}><summary>Ver el recorrido hacia Comunidad</summary><div className={styles.flowGrid}><div><h3>De descubrir a participar.</h3><p>El mapa conecta la navegación del blog con Comunidad, registro, suscripción e interacción tras iniciar sesión. Es un flujo de diseño, no una implementación comercial.</p></div><ParagonVisual image={paragonImages.flow} title="Recorrido hacia Comunidad · Diagrama original" evidence sizes="(max-width: 760px) 85vw, 520px" /></div></details>
    </section>

    <section id="decisiones" className={styles.decisions} aria-labelledby="paragon-decisiones"><div className={styles.decisionHeading}><p className="eyebrow">03 / Decisiones de Product Design</p><h2 id="paragon-decisiones" data-motion="heading">Encontrar un lugar.<br /><span>Participar. Querer regresar.</span></h2><p className={styles.prose}>Tres ejes para conectar el interés por los juguetes con una propuesta de Comunidad. Cada uno responde a una fricción y plantea un beneficio que aún necesita comprobarse.</p></div>
      {paragonDecisions.map((decision, index) => <section key={decision.id} className={`${styles.decision} ${index === 1 ? styles.reverse : ''}`} aria-labelledby={`paragon-${decision.id}`}>
        <div className={styles.decisionCopy} data-motion="copy"><p className="eyebrow">{decision.number} / {decision.label}</p><h3 id={`paragon-${decision.id}`}>{decision.title}</h3><dl><div><dt>Problema</dt><dd>{decision.problem}</dd></div><div><dt>Decisión</dt><dd>{decision.decision}</dd></div><div><dt>Criterio de diseño</dt><dd>{decision.rationale}</dd></div></dl></div>
        <ParagonDecisionVisual image={decision.image} evidence={decision.evidence} number={decision.number} evidenceTitle={decision.evidenceTitle} />
      </section>)}
    </section>

    <section id="impacto" className={`${styles.section} ${styles.impact}`} aria-labelledby="paragon-impacto"><p className="eyebrow">04 / Objetivos, no resultados</p><div className={styles.sectionIntro}><h2 id="paragon-impacto" data-motion="heading">La intención es clara.<br /><span>El impacto queda por medir.</span></h2><p className={styles.prose}>La señal principal es la actividad mensual en Comunidad. Las cifras siguientes son metas del proyecto, no mejoras medidas.</p></div><dl className={styles.targets}>{paragonTargets.map(target => <div key={target.label}><dt><EvidenceLabel kind="target" />{target.label}</dt><dd><strong>{target.value}</strong><p>{target.detail}</p></dd></div>)}</dl><p className={styles.note}>La satisfacción es una meta pendiente de evaluar con un instrumento definido. No representa una puntuación SUS obtenida ni un porcentaje derivado de esa escala.</p></section>

    <div className={styles.closing} data-motion="image"><ParagonVisual parallax image={paragonImages.closing} title="Una propuesta de Comunidad, de la bienvenida al contenido" caption="Visualización editorial de Comunidad. Las composiciones originales se conservan en cada decisión." sizes="(max-width: 1050px) 90vw, 960px" /></div>

    <section className={`${styles.section} ${styles.reflection}`} aria-labelledby="paragon-reflexion"><p className="eyebrow">Reflexión / Aprendizajes y límites</p><h2 id="paragon-reflexion" data-motion="heading">La nostalgia abre la puerta.<br /><span>El vínculo se diseña después.</span></h2><div className={styles.learnings}><div><h3>Investigar con una pregunta</h3><p>Corregir el benchmark me ayudó a buscar patrones que respondieran al reto de participación, no solo referencias visuales atractivas.</p></div><div><h3>Equilibrar motivación y claridad</h3><p>Una invitación, un ranking o un boletín necesitan explicar su propósito. Hacer visible una acción no garantiza que las personas quieran realizarla.</p></div><div><h3>Separar propuesta e impacto</h3><p>El siguiente paso es contrastar descubrimiento, comprensión de las reglas y participación con tareas observables; después, medir retorno y actividad con eventos definidos.</p></div></div><div className={styles.scope}><h3>Qué queda por comprobar</h3><p>La evaluación debería separar encontrar Comunidad, entender sus reglas y participar. Definir éxito por tarea permitiría priorizar la siguiente iteración.</p><p>Mi alcance fue Comunidad. El blog y su arquitectura general pertenecen al trabajo del equipo.</p></div></section>

    <CaseNext slug="paragon" />
  </CaseReveal></main>}</Localized>;
}
