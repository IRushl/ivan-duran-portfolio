import Link from 'next/link';
import { EvidenceLabel } from './evidence-label';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/projects';
import { auroraStart, auroraPeople, auroraPlans, auroraMobilePlans, auroraShot } from '@/data/aurora';
import { CaseReveal } from './case-reveal';
import { CursorParallax } from './cursor-parallax';
import { auroraMockups } from '@/data/aurora-mockups';
import { AuroraExplorer } from './aurora-explorer';
import { AuroraPresentation } from './aurora-visual';
import { AuroraMockup } from './aurora-mockup';
import { AuroraJourney } from './aurora-journey';
import styles from './aurora-case.module.css';

const figmaUrl = 'https://www.figma.com/design/PbI8RstoZhAILmhjxQ1BV3/Aurora-Seguros-%7C-UX-UI-Technical-Challenge?node-id=2-3&t=mbKPbNam3UXWqQiT-1';
const prototypeUrl = 'https://aurora-seguros-ux.vercel.app/#inicio';

const presentation = {
  summary: auroraShot('D01', 'Desktop', 'closure', 2880, 1956, 'Resumen demostrativo con plan elegido y aviso de que la selección no es una compra ni emite una póliza.'),
  summaryMobile: auroraShot('D01', 'Mobile', 'closure', 780, 2824, 'Resumen móvil con aviso de elección demostrativa, plan Plus y personas incluidas.'),
};

export function AuroraCase({ nextProject }: { nextProject: Project }) {
  return <main id="contenido" data-cursor-parallax="aurora" tabIndex={-1} className={styles.case}><CursorParallax rootSelector={'[data-cursor-parallax="aurora"]'} /><CaseReveal>
    <header className={styles.hero}>
      <nav aria-label="Ruta de navegación"><ol className="case-breadcrumb"><li><Link className="back-link" href="/#proyectos">Volver a proyectos</Link></li><li aria-current="page"><span aria-hidden="true">/</span> Aurora Seguros</li></ol></nav>
      <p className={`eyebrow ${styles.kicker}`} data-motion-hero="0">Aurora Seguros · Salud Flex / Insurtech · Prueba técnica</p>
      <div className={styles.heroGrid}>
        <div><h1 data-motion-hero="1">Elegir un seguro no debería comenzar con <span>incertidumbre.</span></h1><p className={styles.lead} data-motion-hero="2">Una propuesta de Product Design para hacer más claros los requisitos, la configuración de asegurados y la comparación de planes.</p><a className="back-link" href="#conflicto">Explorar la propuesta <ArrowDown size={16} aria-hidden="true" /></a></div>
        <div className={styles.heroVisual} data-motion-hero="3" data-motion-kind="image"><AuroraMockup image={auroraMockups.hero} title="Salud Flex · Una experiencia entre dispositivos" priority sizes="(max-width: 760px) 85vw, (max-width: 1250px) 82vw, 1024px" /></div>
      </div>
      <dl className={styles.facts}><div><dt>Mi rol y entregables</dt><dd>Product Design UX/UI · recorrido, interfaces y estados de interacción.</dd></div><div><dt>Alcance</dt><dd>Inicio → Asegurados → Planes → Resumen demostrativo.</dd></div><div><dt>Prototipo</dt><dd>Desarrollado con apoyo de IA. Sin pruebas con usuarios reales ni impacto comercial validado.</dd></div></dl>
    </header>

    <section id="conflicto" className={styles.section} aria-labelledby="aurora-conflicto">
      <p className="eyebrow">01 / El conflicto</p><div className={styles.introGrid}><h2 id="aurora-conflicto" data-motion="heading">Antes de elegir un plan,<br />hay que poder <span className={styles.headingAccent}>avanzar.</span></h2><div className={styles.prose}><p>El reto no comenzaba en las coberturas. Comenzaba al intentar iniciar una cotización: comprender qué datos se necesitan, qué impide continuar y cómo retomar el recorrido cuando algo falla.</p><p>Mi propuesta aborda tres momentos conectados: corregir los datos de entrada, configurar a quiénes incluir y comparar alternativas sin perder el contexto de la elección.</p></div></div>
      <dl className={styles.metrics} aria-label="Indicadores iniciales del brief">
        <div><dt><EvidenceLabel kind="brief" />Inicio → siguiente etapa</dt><dd><strong className={styles.metricValue}>1.120</strong><span className={styles.metricContext}>→ 240</span><p>Registros agregados del brief. La diferencia relativa es del 78,6 %; no confirma abandono individual ni una causa.</p></dd></div>
        <div><dt><EvidenceLabel kind="brief" />CTA deshabilitado</dt><dd><strong className={styles.metricValue}>88</strong><span className={styles.metricContext}>intentos de clic</span><p>Una señal para revisar la comprensión del siguiente paso. No demuestra por sí sola por qué se intentó continuar.</p></dd></div>
        <div><dt><EvidenceLabel kind="brief" />LCP reportado</dt><dd><strong className={styles.metricValue}>10,6</strong><span className={styles.metricContext}>segundos</span><p>Indicador inicial del brief. Falta el contexto de medición para atribuir causas o comparar mejoras.</p></dd></div>
      </dl>
      <p className={styles.note}>Evidencia inicial del ejercicio, no resultados de esta propuesta. Para confirmar el recorrido hacen falta eventos por sesión, periodo, definición de cada registro y condiciones de medición del LCP.</p>
    </section>

    <section className={styles.section} aria-labelledby="aurora-decisiones">
      <p className="eyebrow">02 / Criterio de diseño</p><h2 id="aurora-decisiones" data-motion="heading">Hacer <span className={styles.headingAccent}>visible</span> lo que permite continuar.</h2>
      <div className={styles.decisions}>{[
        ['Validar con orientación', 'Identificar el campo y explicar cómo corregirlo.', 'Un resumen de errores y mensajes específicos acompañan la acción de cotizar.'],
        ['Recuperar el recorrido', 'Conservar el contexto cuando algo cambia o falla.', 'Los avisos de corrección, retorno y actualización explican qué ocurrió y qué revisar.'],
        ['Configurar por persona', 'Asociar cada edad con quien corresponde.', 'Bloques numerados separan los asegurados y hacen localizables los errores.'],
        ['Comparar y confirmar', 'Distinguir explorar, elegir y contratar.', 'Tarjetas equivalentes, detalle progresivo y un cierre explícitamente demostrativo.'],
      ].map(([title, intention, evidence], i) => <div key={title} data-motion="copy"><span className="eyebrow">0{i + 1}</span><h3>{title}</h3><p>{intention}</p><p className={styles.note}>{evidence}</p></div>)}</div>
    </section>

    <AuroraJourney />

    <section id="inicio" className={styles.section} aria-labelledby="aurora-inicio"><p className="eyebrow">S01 / Inicio</p><h2 id="aurora-inicio" data-motion="heading">Del error a una <span className={styles.headingAccent}>acción concreta.</span></h2><p className={styles.sectionLead}>El formulario no termina al detectar un error. También debe ayudar a resolverlo y reconocer la corrección.</p><AuroraExplorer label="Inicio de la cotización" moments={auroraStart} showcase={auroraMockups.start} /></section>

    <section id="asegurados" className={`${styles.section} ${styles.warmSection}`} aria-labelledby="aurora-asegurados"><p className="eyebrow">S02 / Asegurados</p><h2 id="aurora-asegurados" data-motion="heading">Un grupo se configura <span className={styles.headingAccent}>persona a persona.</span></h2><p className={styles.sectionLead}>Cantidad, edades y cambios del grupo se presentan como decisiones revisables, antes de entrar a los planes.</p><AuroraExplorer label="Configuración de asegurados" moments={auroraPeople} showcase={auroraMockups.people} reverse /></section>

    <section id="planes" className={`${styles.section} ${styles.plansSection}`} aria-labelledby="aurora-planes"><p className="eyebrow">S03 / Planes</p><h2 id="aurora-planes" data-motion="heading">Comparar sin perder de vista <span className={styles.headingAccent}>la elección.</span></h2><p className={styles.sectionLead}>Una estructura común permite recorrer las alternativas. El detalle se despliega cuando se necesita y la selección queda identificada.</p><AuroraExplorer label="Comparación de planes" moments={auroraPlans} showcase={auroraMockups.plans} mobileImages={auroraMobilePlans} /></section>

    <section id="resumen" className={styles.section} aria-labelledby="aurora-resumen"><div className={styles.introGrid}><div><p className="eyebrow">D01 / Resumen demostrativo</p><h2 id="aurora-resumen" data-motion="heading">Elegir <span className={styles.headingAccent}>no equivale</span> a contratar.</h2></div><div className={styles.prose}><p>El cierre reúne el plan y las personas incluidas. El aviso explica que la elección se guarda en esa pestaña, no compromete a contratar y no emite una póliza.</p><p>Esta separación define el límite del prototipo: muestra una elección comprensible, no una contratación comercial ni una cotización con reglas reales de aseguramiento.</p></div></div><div className={styles.summaryVisual} data-motion="image"><AuroraPresentation image={presentation.summary} mobileImage={presentation.summaryMobile} mockup={auroraMockups.summary} title="La elección reunida en un cierre demostrativo" /></div></section>

    <section className={styles.section} aria-labelledby="aurora-reflexion"><p className="eyebrow">03 / Reflexión y siguientes pasos</p><h2 id="aurora-reflexion" data-motion="heading">La claridad diseñada aún debe comprobarse.</h2><div className={styles.closing}><div><h3>Qué deja la propuesta</h3><p>La recuperación necesita tanta intención como el recorrido ideal: indicar qué pasó, conservar el contexto y explicar cómo continuar. Las capturas muestran cómo se traduce ese criterio en la interfaz.</p><p>Mi decisión central fue diseñar la corrección como parte del recorrido, junto con configurar, comparar y confirmar.</p></div><div><h3>Qué falta validar</h3><p>Falta comprobar si las personas localizan los errores, entienden cómo corregirlos y distinguen la selección de una contratación.</p><p>El LCP también requiere una medición bajo condiciones definidas; la cifra del brief no permite evaluar el rendimiento de esta propuesta.</p></div><div><h3>Cómo seguir</h3><p>Proponer tareas de inicio, corrección y comparación; observar si las personas entienden los mensajes y distinguir selección de contratación. Después, definir eventos por sesión y medir el rendimiento bajo condiciones comparables.</p><p>La medición debería separar comprensión, finalización y rendimiento para saber qué iterar.</p></div></div>
      <div id="recursos" className={styles.resources}>
        <h3>Recursos del proyecto</h3>
        <p>Este caso utiliza las capturas originales de Salud Flex.</p>
        <div className="hero-actions">
          <a className="button button-primary" href={prototypeUrl} target="_blank" rel="noopener noreferrer">Abrir prototipo <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (abre en una pestaña nueva)</span></a>
          <a className="button button-quiet" href={figmaUrl} target="_blank" rel="noopener noreferrer">Ver diseño en Figma <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (abre en una pestaña nueva)</span></a>
        </div>
      </div>
    </section>
    <Link className="case-next" href={`/proyectos/${nextProject.slug}`}><div><span className="eyebrow">Siguiente proyecto</span><strong>{nextProject.name}</strong></div><ArrowRight size={26} aria-hidden="true" /></Link>
  </CaseReveal></main>;
}
