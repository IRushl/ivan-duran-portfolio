import { Localized } from '@/i18n/server-localized';
import Link from 'next/link';
import { EvidenceLabel } from './evidence-label';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/projects';
import { tripflowImages, tripflowTargets } from '@/data/tripflow';
import { CaseReveal } from './case-reveal';
import { CursorParallax } from './cursor-parallax';
import { TripflowVisual } from './tripflow-visual';
import { TripflowExplorer } from './tripflow-explorer';
import styles from './tripflow-case.module.css';

export function TripflowCase({ nextProject }: { nextProject: Project }) {
  return <Localized>{<main id="contenido" data-cursor-parallax="tripflow" tabIndex={-1} className={`shell ${styles.case}`}><CursorParallax rootSelector={'[data-cursor-parallax="tripflow"]'} /><CaseReveal>
    <header className={styles.hero}>
      <nav aria-label="Ruta de navegación"><ol className="case-breadcrumb"><li><Link className="back-link" href="/#proyectos">Volver a proyectos</Link></li><li aria-current="page"><span aria-hidden="true">/</span> TripFlowApp</li></ol></nav>
      <div className={styles.heroGrid}>
        <div><p className={`eyebrow ${styles.kicker}`} data-motion-hero="0">TripFlowApp / Product Design · Traveltech</p><h1 data-motion-hero="1">Tu viaje no debería detenerse para <span>registrar un gasto.</span></h1><p className={styles.lead} data-motion-hero="2">Una propuesta de Product Design para simplificar la planificación financiera, el registro de gastos y el seguimiento del presupuesto durante un viaje.</p><div className="hero-actions" data-motion-hero="3"><a className="button button-primary" href="#decisiones">Explorar las decisiones <ArrowDown size={16} aria-hidden="true" /></a><a className="back-link" href="#conflicto">Entender el problema</a></div></div>
        <div className={styles.heroVisual} data-motion-hero="3" data-motion-kind="image"><TripflowVisual image={tripflowImages.hero} title="TripFlowApp · Presentación del concepto" caption="Visualización generada con IA; los detalles pueden diferir del diseño original. No es una implementación comercial." priority artwork sizes="(max-width: 1050px) 90vw, 55vw" /></div>
      </div>
      <dl className={styles.facts}><div><dt>El reto</dt><dd>Reducir la atención que exige gestionar el dinero durante un viaje.</dd></div><div><dt>Mi rol y entregables</dt><dd>Diseño UX/UI móvil · análisis del recorrido, benchmark, flujos, interfaces y prototipo.</dd></div><div><dt>Alcance del caso</dt><dd>Propuesta UX/UI móvil. Las proyecciones de impacto están pendientes de validar.</dd></div></dl>
    </header>

    <nav className={styles.contents} aria-label="Recorrido del caso TripFlow"><a href="#conflicto"><span>01</span> El conflicto</a><a href="#friccion"><span>02</span> Entender la fricción</a><a href="#decisiones"><span>03</span> Tres decisiones</a><a href="#validacion"><span>04</span> Qué falta validar</a></nav>

    <section id="conflicto" className={styles.section} aria-labelledby="tripflow-conflicto"><p className="eyebrow">01 / El conflicto</p><div className={styles.split}><h2 id="tripflow-conflicto" data-motion="heading">Viajar debería ser una experiencia para <span>disfrutar.</span></h2><div className={styles.prose}><p className={styles.editorial}>No una sucesión de formularios y cálculos.</p><p>El recorrido de registro acumulaba pasos, repetición de datos y dificultad para interpretar el presupuesto. La gestión del gasto competía con la experiencia de viajar.</p><p>El reto de diseño fue conectar la preparación del viaje con el registro cotidiano y una lectura financiera más clara.</p></div></div>
      <div className={styles.frictionStrip}>{[['Registrar', 'Demasiados pasos antes de guardar un gasto.'], ['Repetir', 'Procesos que vuelven a pedir atención.'], ['Interpretar', 'Un presupuesto difícil de leer rápidamente.']].map(([title, text]) => <div key={title}><h3>{title}</h3><p>{text}</p></div>)}</div>
      <p className={styles.note}>El diagnóstico orientó la propuesta; la frecuencia de estas fricciones y su impacto requieren validación.</p>
    </section>

    <section id="friccion" className={styles.section} aria-labelledby="tripflow-friccion"><p className="eyebrow">02 / Entender la fricción</p><h2 id="tripflow-friccion" data-motion="heading">Elegir mejor las referencias cambió <span>el foco del análisis.</span></h2>
      <div className={styles.researchGrid}><div className={styles.prose}><p>Durante el proceso corregí mi selección inicial de referencias competitivas para concentrarme en productos comparables por sus tareas financieras, no solo por su relación con los viajes.</p><p>El benchmark tomó como referentes Trail Wallet, TravelBank y Splitwise. Lo relevante era contrastar registro, seguimiento y organización del gasto para orientar la propuesta.</p><div className={styles.references} aria-label="Referentes del benchmark"><span>Trail Wallet</span><span>TravelBank</span><span>Splitwise</span></div><h3>Del análisis a la prioridad</h3><p>El recorrido permitió separar tres momentos: preparar el presupuesto, registrar lo que ocurre y entender el estado del viaje. Esos momentos guiaron la priorización del diseño.</p><p className={styles.note}>El benchmark es una referencia de diseño. No se presenta como una evaluación independiente de los productos ni como validación de la solución.</p></div>
        <div className={styles.researchVisual} data-motion="image"><TripflowVisual image={tripflowImages.flow} title="Mapa del recorrido original" caption="Diagrama del flujo diseñado, no un registro de comportamiento observado. Amplía para revisar la secuencia completa." diagram /></div>
      </div>
    </section>

    <section id="decisiones" className={styles.section} aria-labelledby="tripflow-decisiones"><p className="eyebrow">03 / Decisiones y experiencia del producto</p><h2 id="tripflow-decisiones" data-motion="heading">Tres decisiones para <span>no interrumpir el viaje.</span></h2><p className={styles.sectionLead}>Crear viaje → Registrar gasto → Consultar presupuesto. Explora cómo cada momento responde a una fricción y qué beneficio busca aportar.</p><TripflowExplorer />
      <details className={styles.supporting}><summary>Ver cómo se organizan los viajes</summary><div className={styles.supportingGrid}><div className={styles.prose}><h3>El viaje conserva su contexto.</h3><p>La vista Mis Viajes distingue un viaje en curso, próximos viajes y viajes completados. Cada uno conserva una referencia de presupuesto.</p><p>La captura es una maqueta con valores de ejemplo; no documenta ahorros ni resultados reales.</p></div><TripflowVisual image={tripflowImages.trips} title="Mis Viajes · Captura original" phone /></div></details>
    </section>

    <section id="validacion" className={`${styles.section} ${styles.validation}`} aria-labelledby="tripflow-validacion"><p className="eyebrow">04 / Impacto esperado</p><div className={styles.split}><h2 id="tripflow-validacion" data-motion="heading">Objetivos de validación.<br /><span>No resultados medidos.</span></h2><div className={styles.prose}><p>Las cifras siguientes son objetivos de validación; su impacto sigue pendiente de medir.</p><p>Primero habría que definir tareas comparables y una línea base; después, observar registro y comprensión del presupuesto. Retención y satisfacción necesitan una medición específica.</p></div></div>
      <dl className={styles.targets}>{tripflowTargets.map(({ value, label, note }) => <div key={label}><dt><EvidenceLabel kind="target" />{label}</dt><dd><strong>{value}</strong><span>{note}</span></dd></div>)}</dl>
    </section>

    <div className={styles.closingVisual} data-motion="image"><TripflowVisual image={tripflowImages.closing} title="TripFlowApp · Cierre del recorrido" caption="Visualización editorial del diseño. Las capturas originales están disponibles en las decisiones." artwork sizes="(max-width: 1050px) 90vw, 944px" /></div>

    <section className={styles.section} aria-labelledby="tripflow-reflexion"><p className="eyebrow">Reflexión / Lo que me llevo</p><h2 id="tripflow-reflexion" data-motion="heading">Diseñar menos interrupciones,<br /><span>no más funcionalidades.</span></h2><p className={styles.reflectionLead}>Diseñar TripFlow no consistía simplemente en agregar funcionalidades, sino en reducir la atención que la gestión financiera exige durante un viaje.</p><div className={styles.learnings}><div><h3>Comparar con criterio</h3><p>Revisar el benchmark ayudó a concentrar la exploración en tareas realmente comparables.</p></div><div><h3>Priorizar el recorrido</h3><p>Planificar, registrar y consultar dan continuidad a la propuesta; añadir opciones no garantiza una experiencia más simple.</p></div><div><h3>Conectar eficiencia y confianza</h3><p>Un registro breve debe convivir con información financiera comprensible. La coherencia de los indicadores, el contraste de los avisos y el impacto proyectado aún deben validarse.</p></div></div>
      <div className={styles.resources}><h3>Recursos y alcance</h3><p>Explora el diseño y el prototipo del recorrido.</p><div className="hero-actions"><a className="button button-primary" href="https://filled-row-01691768.figma.site" target="_blank" rel="noopener noreferrer" aria-label="Abrir prototipo (abre en una pestaña nueva)">Abrir prototipo <ArrowUpRight size={16} aria-hidden="true" /></a><a className="button button-quiet" href="https://www.figma.com/design/kk0av7CRVeOllZLiPXsf30/Tripflow-App?node-id=0-1&t=7yIgYepOvc7Fglhi-1" target="_blank" rel="noopener noreferrer" aria-label="Ver diseño en Figma (abre en una pestaña nueva)">Ver diseño en Figma <ArrowUpRight size={16} aria-hidden="true" /></a></div></div>
    </section>
    <Link className="case-next" href={`/proyectos/${nextProject.slug}`}><div><span className="eyebrow">Siguiente proyecto</span><strong>{nextProject.name}</strong></div><ArrowRight size={26} aria-hidden="true" /></Link>
  </CaseReveal></main>}</Localized>;
}
