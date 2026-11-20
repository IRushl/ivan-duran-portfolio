import type { ReactNode } from 'react';
import Link from 'next/link';
import { EvidenceLabel } from './evidence-label';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/projects';
import { CaseReveal } from './case-reveal';
import { CursorParallax } from './cursor-parallax';
import { CaseStudyVisual, type StudyImage } from './case-study-visual';
import { RedebanStory, RedebanStates } from './redeban-story';
import styles from './redeban-case.module.css';

const figmaUrl = 'https://www.figma.com/design/S0mHhsBRf7NWsoLzIketGL/Prueba_Tecnica_Product_Designer_Ivan_Duran_Redeban?node-id=0-1';
const prototypeUrl = 'https://proud-lyric-23940477.figma.site';

function capture(file: string, width: number, height: number, alt: string): StudyImage {
  return { src: `/projects/redeban/${file}.webp`, width, height, alt };
}

const shots = {
  home: capture('inicio-android', 374, 1402, 'Inicio de Android con la acción Nuevo cobro antes del listado de cobros recientes.'),
  amount: capture('monto-android', 376, 853, 'Monto y concepto diligenciados junto a los datos del comercio precargados.'),
  review: capture('resumen-cobro', 376, 1145, 'Resumen del monto y los datos de la operación antes de confirmar el cobro.'),
  processing: capture('procesando-cobro', 383, 853, 'Mensaje de procesamiento que pide esperar sin cerrar la aplicación ni repetir el cobro.'),
  approved: capture('cobro-aprobado', 376, 1177, 'Cobro aprobado con monto, comprobante y acciones para continuar.'),
  transactions: capture('transacciones-web', 1259, 874, 'Listado Web con búsqueda por ID, comercio o referencia, filtros y estados por fila.'),
  detail: capture('detalle-web', 1296, 2496, 'Panel lateral con el estado aprobado y el detalle de la transacción sobre el listado.'),
  swimlane: { ...capture('swimlane', 1920, 3545, 'Diagrama de seis fases con carriles para Android, Sistema y Web, desde la entrada hasta el registro de auditoría.'), original: '/projects/redeban/swimlane-original.png' },
  states: capture('estados-transaccionales', 930, 472, 'Etiquetas del sistema para aprobada, rechazada, pendiente, en revisión y procesando.'),
};

const mockups = {
  hero: {
    src: '/projects/redeban/mockups/redeban-hero-ecosistema.png',
    width: 1448, height: 1086,
    alt: 'Mockup del panel operativo Web en un monitor junto a la pantalla de inicio de Android en un teléfono.',
  },
  android: {
    src: '/projects/redeban/mockups/redeban-android-cobro-aprobado.png',
    width: 1122, height: 1402,
    alt: 'Mockup de un teléfono con el estado Cobro aprobado y el comprobante en Android.',
  },
  web: {
    src: '/projects/redeban/mockups/redeban-web-transacciones-laptop.png',
    width: 1448, height: 1086,
    alt: 'Mockup de una laptop con el listado de transacciones Web, sus filtros y estados.',
  },
} satisfies Record<string, StudyImage>;

const acts = [
  ['contexto', 'El conflicto', <>El cobro era solo <span>la primera mitad</span></>],
  ['diagnostico', 'Entender el problema', <>La fricción <span>cambiaba de forma</span></>],
  ['estrategia', 'Tomar decisiones', <>Cuatro decisiones para <span>aclarar el recorrido</span></>],
  ['solucion', 'Construir la experiencia', <>Del primer toque <span>al seguimiento</span></>],
  ['medicion', 'Reflexión y aprendizaje', <>Qué mediría y <span>qué validaría después</span></>],
] as const;

const briefMetrics = [
  { label: 'Android · Flujo de cobro', value: '58 %', description: 'de abandono en el flujo de cobro.' },
  { label: 'Web · Interpretación de estados', value: '42 %', description: 'de errores operativos asociados a la interpretación de estados transaccionales.' },
] as const;

const decisions = [
  {
    title: 'Poner el nuevo cobro a la vista',
    problem: 'La acción principal era difícil de encontrar.',
    action: 'Llevé «Nuevo cobro» al inicio de Android.',
    why: 'Generar un cobro es el punto de partida del recorrido. Un acceso directo evita buscarlo entre opciones secundarias.',
    image: shots.home, visual: 'Acción principal en el inicio', phone: true, preview: true,
  },
  {
    title: 'Pedir solo lo que cambia',
    problem: 'El comercio repetía datos que ya estaban en su perfil.',
    action: 'Precargué esos datos y dejé editables el monto y el concepto opcional.',
    why: 'El comercio necesita comprobar a qué perfil corresponde el cobro. Mostrar esos datos en modo de solo lectura conserva esa referencia.',
    image: shots.amount, visual: 'Datos del comercio precargados', phone: true,
  },
  {
    title: 'Acompañar la espera',
    problem: 'Faltaba feedback durante el procesamiento y los mensajes de resultado eran ambiguos.',
    action: 'Incorporé un resumen antes de confirmar y un aviso mientras se procesa el cobro.',
    why: 'Antes de confirmar, la persona puede revisar el monto. Después, el mensaje le explica la espera y le pide evitar un segundo intento.',
    image: shots.processing, visual: 'Feedback durante el procesamiento', phone: true,
  },
  {
    title: 'Unificar el significado de los estados',
    problem: 'Android y Web usaban estados inconsistentes. En Web aparecían códigos técnicos.',
    action: 'Definí un vocabulario compartido con etiquetas, iconos y colores semánticos.',
    why: 'El mismo estado debe orientar la lectura en ambas plataformas. Web puede conservar el motivo y la referencia técnica para el seguimiento.',
    image: shots.states, visual: 'Etiquetas del sistema de estados', phone: false,
  },
] as const;

const transactionStates = [
  { name: 'Aprobada', file: 'estado-aprobada', height: 1177, meaning: 'El cobro fue completado correctamente.', action: 'Consultar el comprobante o el detalle.' },
  { name: 'Rechazada', file: 'estado-rechazada', height: 1391, meaning: 'El cobro no se completó. El motivo debe quedar claro antes de volver a intentarlo.', action: 'Consultar el motivo. La captura ofrece intentar con otro medio de pago o contactar soporte.' },
  { name: 'Pendiente', file: 'estado-pendiente', height: 1394, meaning: 'La operación espera confirmación.', action: 'Consultar el estado más adelante desde el historial. Evitar repetir el cobro hasta que el estado se actualice.' },
  { name: 'En revisión', file: 'estado-en-revision', height: 1390, meaning: 'La transacción requiere validación adicional.', action: 'Consultar el estado y dar seguimiento desde Web. Si no cambia, la captura indica contactar soporte con la referencia.' },
] as const;

const journey = [
  { title: 'El comercio inicia el cobro', navLabel: 'Iniciar', platform: 'Android', text: 'Desde el inicio, el comercio selecciona «Nuevo cobro».', image: shots.home, phone: true },
  { title: 'Ingresa el monto y confirma', navLabel: 'Confirmar', platform: 'Android', text: 'Ingresa el monto y revisa el resumen antes de confirmar.', image: shots.review, phone: true },
  { title: 'El sistema comunica el resultado', navLabel: 'Resultado', platform: 'Android · Sistema', text: 'Después del procesamiento, consulta el resultado y el comprobante.', image: shots.approved, phone: true },
  { title: 'La operación se consulta desde Web', navLabel: 'Consultar', platform: 'Web', text: 'El equipo operativo encuentra la transacción mediante búsqueda o filtros.', image: shots.transactions, phone: false },
  { title: 'El detalle orienta el seguimiento', navLabel: 'Verificar', platform: 'Web', text: 'Abre el detalle para revisar estado, motivo y referencia de la operación.', image: shots.detail, phone: false },
] as const;

function Act({ index, children }: { index: 0 | 1 | 2 | 3 | 4; children: ReactNode }) {
  const [id, label, title] = acts[index];
  return (
    <section id={id} tabIndex={-1} aria-labelledby={`${id}-titulo`} className={styles.act}>
      <header className={styles.actHeading} data-motion="heading">
        <p className="eyebrow"><span>0{index + 1}</span> / {label}</p>
        <h2 id={`${id}-titulo`}>{title}</h2>
      </header>
      {children}
    </section>
  );
}

export function RedebanCase({ project, nextProject }: { project: Project; nextProject: Project }) {
  return (
    <main id="contenido" data-cursor-parallax="redeban" tabIndex={-1} className={`shell ${styles.page}`}>
      <CursorParallax rootSelector={'[data-cursor-parallax="redeban"]'} /><CaseReveal>
        <header className={styles.hero}>
          <nav aria-label="Ruta de navegación">
            <ol className="case-breadcrumb">
              <li><Link className="back-link" href="/#proyectos">Volver a proyectos</Link></li>
              <li aria-current="page"><span aria-hidden="true">/</span>{project.name}</li>
            </ol>
          </nav>
          <div className={styles.heroIntro}>
            <div>
              <p className="eyebrow case-kicker" data-motion-hero="0">{project.category} / Android + Web · Prueba técnica</p>
              <h1 data-motion-hero="1">{project.name}</h1>
              <p className={styles.heroStatement} data-motion-hero="1">Cobrar debería ser sencillo. <span>Verificar también.</span></p>
            </div>
            <div className={styles.heroAside} data-motion-hero="2">
              <p>Una propuesta de Product Design para reducir la fricción en cobros Android y facilitar la interpretación de transacciones en Web.</p>
              <a className="button button-primary" href="#contexto">Explorar el caso <ArrowDown size={16} aria-hidden="true" /></a>
            </div>
          </div>
          <dl className={styles.facts}><div><dt>Mi rol</dt><dd>Product Designer UX/UI · estrategia, auditoría, flujos e interfaces Android y Web.</dd></div><div><dt>Entregables</dt><dd>Flujo Cobrar y Verificar, sistema de estados, diseño de alta fidelidad y prototipo asistido por IA.</dd></div><div><dt>Estado</dt><dd>Prueba técnica. Sin pruebas con usuarios reales ni implementación comercial.</dd></div></dl>
          <div data-motion-hero="3" data-motion-kind="image">
            <CaseStudyVisual
              parallax
              image={mockups.hero}
              title="Ecosistema Android + Web"
              caption="Visualización conceptual del prototipo con apoyo de IA. Las cifras mostradas son ilustrativas."
              sizes="(max-width: 1380px) 90vw, 1248px"
              priority
            />
          </div>
        </header>

        <nav className={styles.index} aria-label="Actos del caso Redeban" data-motion-hero="4">
          <ol>{acts.map(([id, label], index) => <li key={id}><a href={`#${id}`}><span aria-hidden="true">0{index + 1}</span> {label}</a></li>)}</ol>
        </nav>

        <Act index={0}>
          <div id="resumen" className={styles.split} data-motion="copy">
            <p className={styles.lede}>Una transacción. Dos plataformas. Una experiencia que debía ser más clara.</p>
            <div className={styles.prose}>
              <p>En Android, un comercio necesita iniciar un cobro y saber cómo terminó. En Web, un administrador o agente de soporte necesita encontrar esa operación, entender su estado y decidir si requiere seguimiento.</p>
              <p>El reto de la prueba técnica era conectar ambos momentos sin pedir al comercio que repitiera información ni obligar al equipo de soporte a interpretar códigos internos.</p>
            </div>
          </div>
          <dl className={styles.metrics} data-motion="metrics">
            {briefMetrics.map((metric) => <div key={metric.label}><dt className="eyebrow"><EvidenceLabel kind="brief" />{metric.label}</dt><dd><strong>{metric.value}</strong><span>{metric.description}</span></dd></div>)}
          </dl>
          <p className={styles.note}>Cifras proporcionadas por el ejercicio como punto de partida. El impacto de la propuesta quedó pendiente de medir.</p>
        </Act>

        <Act index={1}>
          <p className={styles.editorial}>El problema no terminaba cuando se generaba un cobro. También era necesario comprender qué había ocurrido con él.</p>
          <div className={styles.diagnosis}>
            <div className={styles.diagnosisHead} aria-hidden="true"><span>Momento</span><span>Qué decía el brief</span><span>Mi lectura como diseñador</span></div>
            <dl>
              <div data-reveal><dt><span>01 / Android</span> Iniciar</dt><dd><span className={styles.diagnosisLabel}>Según el brief. </span>El acceso a un nuevo cobro tenía poca visibilidad. El formulario era extenso y pedía repetir datos del comercio.</dd><dd><span className={styles.diagnosisLabel}>Mi lectura. </span>Encontrar el acceso y volver a escribir información añadía pasos antes de ingresar el monto.</dd></div>
              <div data-reveal><dt><span>02 / Android</span> Esperar</dt><dd><span className={styles.diagnosisLabel}>Según el brief. </span>No había feedback durante el procesamiento y los mensajes de resultado eran ambiguos.</dd><dd><span className={styles.diagnosisLabel}>Mi lectura. </span>Sin una señal clara, era difícil decidir si esperar, reintentar o consultar el resultado.</dd></div>
              <div data-reveal><dt><span>03 / Web</span> Verificar</dt><dd><span className={styles.diagnosisLabel}>Según el brief. </span>Web mostraba estados técnicos y el lenguaje variaba entre plataformas.</dd><dd><span className={styles.diagnosisLabel}>Mi lectura. </span>Si el mismo estado cambia de nombre o apariencia, el equipo de soporte debe interpretarlo antes de actuar.</dd></div>
            </dl>
          </div>
          <details className={styles.disclosure}>
            <summary>Qué documenté en la prueba</summary>
            <p>El encuadre de negocio, el Product Pre-Brief y el PRD delimitaron el ejercicio. La auditoría UX y el benchmark funcional informaron las hipótesis, los flujos, el sistema de estados y el diseño de alta fidelidad. Documenté la justificación de las decisiones y propuse un plan de investigación y uno de medición. La investigación con usuarios quedó pendiente.</p>
          </details>
        </Act>

        <Act index={2}>
          <p className={styles.lede}>Prioricé la entrada al cobro, la captura del monto y la respuesta del sistema. Después alineé el lenguaje que conecta esos momentos con la verificación en Web.</p>
          <RedebanStory label="Cuatro decisiones de Product Design" steps={decisions.map((decision) => ({
            title: decision.title,
            phone: decision.phone,
            content: (
              <dl>
                <div><dt>Problema</dt><dd>{decision.problem}</dd></div>
                <div><dt>Decisión</dt><dd>{decision.action}</dd></div>
                <div><dt>Criterio de diseño</dt><dd>{decision.why}</dd></div>
              </dl>
            ),
            visual: (
              <CaseStudyVisual image={decision.image} title={decision.visual} device={decision.phone ? 'phone' : undefined} sizes={decision.phone ? '192px' : '(max-width: 700px) 90vw, 480px'} preview={'preview' in decision && decision.preview} loading="eager" />
            ),
          }))} />
        </Act>

        <Act index={3}>
          <div className={styles.split} data-motion="copy">
            <p className={styles.lede}>Android guía el cobro. Web permite verificarlo. El sistema traduce y registra lo que ocurre entre ambos.</p>
            <p>El flujo une la acción del comercio con la consulta del equipo operativo. Cada plataforma muestra el nivel de detalle que necesita para su tarea.</p>
          </div>

          <section aria-labelledby="continuidad-titulo" className={styles.subsection}>
            <div className={styles.momentHeading} data-motion="heading">
              <p className="eyebrow">Una transacción / Dos plataformas</p>
              <h3 id="continuidad-titulo">El cobro continúa <span>al otro lado de la pantalla</span></h3>
              <p>Este recorrido de la propuesta conecta las capturas de Android y Web. La continuidad entre plataformas describe el flujo diseñado en el prototipo.</p>
            </div>
            <RedebanStory compact label="Del inicio del cobro a la verificación en Web" steps={journey.map((step) => ({
              title: step.title,
              phone: step.phone,
              navLabel: step.navLabel,
              imageRatio: step.phone ? 376 / 853 : step.image.width / step.image.height,
              content: <><p className={styles.journeyPlatform}>{step.platform}</p><p>{step.text}</p></>,
              visual: <CaseStudyVisual image={step.image} title={step.title} caption={step.phone ? 'Vista previa. Amplía para ver la captura completa.' : undefined} device={step.phone ? 'phone' : 'desktop'} preview={step.phone} sizes={step.phone ? '160px' : '(max-width: 780px) 80vw, 500px'} loading="eager" />,
            }))} />
          </section>

          <div id="flujo" className={styles.subsection} data-motion="image">
            <CaseStudyVisual image={shots.swimlane} title="Swimlane original · Cobrar y Verificar" caption="Vista previa de las primeras fases. Amplía el diagrama para recorrerlo completo." sizes="(max-width: 900px) 90vw, 1240px" preview loading="eager" />
            <details className={styles.disclosure}>
              <summary>Leer el recorrido por plataforma</summary>
              <div className={styles.flow}>
                <div><h3>Android · Cobrar</h3><p>Iniciar → ingresar monto → revisar y confirmar → procesar → mostrar el resultado.</p></div>
                <div><h3>Sistema · Registrar</h3><p>Validar, normalizar el estado y guardar la referencia para consulta y auditoría.</p></div>
                <div><h3>Web · Verificar</h3><p>Buscar o filtrar → leer el estado y el motivo → abrir el detalle → dar seguimiento si aplica.</p></div>
              </div>
            </details>
          </div>

          <section id="android" className={styles.subsection} aria-labelledby="android-titulo">
            <div className={styles.momentHeading} data-motion="heading">
              <p className="eyebrow">A / Android</p>
              <h3 id="android-titulo">Del monto <span>a la confirmación</span></h3>
              <p>El comercio captura el monto, revisa la operación y recibe una señal mientras el cobro se procesa.</p>
            </div>
            <details className={styles.disclosure}>
              <summary>Explorar las tres capturas de Android</summary>
              <div className={styles.phoneGrid} data-motion-visual>
              <CaseStudyVisual image={shots.amount} title="01 · Ingresar monto" device="phone" sizes="(max-width: 520px) 220px, (max-width: 900px) 27vw, 235px" />
              <CaseStudyVisual image={shots.review} title="02 · Revisar y confirmar" device="phone" sizes="(max-width: 520px) 220px, (max-width: 900px) 27vw, 235px" preview />
              <CaseStudyVisual image={shots.processing} title="03 · Esperar el resultado" device="phone" sizes="(max-width: 520px) 220px, (max-width: 900px) 27vw, 235px" />
              </div>
            </details>
          </section>

          <section id="web" className={styles.subsection} aria-labelledby="web-titulo">
            <div className={styles.momentHeading} data-motion="heading">
              <p className="eyebrow">B / Web</p>
              <h3 id="web-titulo">Encontrar la operación <span>y saber qué sigue</span></h3>
              <p>La búsqueda y los filtros ayudan a localizar el cobro. El listado muestra el estado y su motivo. El panel lateral conserva el contexto mientras el equipo verifica los datos de la transacción.</p>
            </div>
            <details className={styles.disclosure}>
              <summary>Explorar el listado y el detalle Web</summary>
              <div className={styles.webGrid} data-motion-visual>
              <CaseStudyVisual image={shots.transactions} title="Consulta de transacciones" device="desktop" sizes="(max-width: 780px) 90vw, 730px" />
              <CaseStudyVisual image={shots.detail} title="Detalle de la transacción" caption="Vista previa del panel lateral." device="desktop" sizes="(max-width: 780px) 90vw, 450px" preview />
              </div>
            </details>
          </section>

          <section id="estados" className={styles.subsection} aria-labelledby="estados-titulo">
            <div className={styles.momentHeading} data-motion="heading">
              <p className="eyebrow">C / Consistencia</p>
              <h3 id="estados-titulo">El estado <span>conserva su significado</span></h3>
              <p>El resultado que ve el comercio en Android orienta el seguimiento en Web. Las etiquetas y los iconos refuerzan el significado del color.</p>
            </div>
            <RedebanStates states={transactionStates.map((state) => ({
              name: state.name,
              meaning: state.meaning,
              action: state.action,
              visual: <CaseStudyVisual image={{ src: `/projects/redeban/states/${state.file}.png`, width: 376, height: state.height, alt: `Captura original Android del estado ${state.name.toLowerCase()}, con su mensaje, detalle y acciones de seguimiento.` }} title={`Android · ${state.name}`} caption="Vista previa editorial." device="phone" preview sizes="192px" loading="eager" />,
            }))} />
          </section>

          <section id="experiencia-en-contexto" className={styles.subsection} aria-labelledby="experiencia-titulo">
            <div className={styles.momentHeading} data-motion="heading">
              <p className="eyebrow">D / Presentación de producto</p>
              <h3 id="experiencia-titulo">La experiencia <span>en contexto</span></h3>
              <p>Dos plataformas, una misma operación. Estas visualizaciones editoriales con apoyo de IA presentan el prototipo en contexto; las capturas originales anteriores documentan la interfaz diseñada.</p>
            </div>
            <div className={styles.mockupSeries}>
              <div className={styles.mockupRow} data-motion-visual>
                <div className={styles.mockupCopy}>
                  <p className="eyebrow">01 / Android</p>
                  <h4>Un cobro que comunica su resultado.</h4>
                </div>
                <CaseStudyVisual parallax image={mockups.android} title="Android · Cobro aprobado" caption="Visualización editorial del diseño." sizes="(max-width: 780px) 90vw, (max-width: 1380px) 51vw, 690px" loading="eager" />
              </div>
              <div className={styles.mockupRow} data-motion-visual>
                <div className={styles.mockupCopy}>
                  <p className="eyebrow">02 / Web</p>
                  <h4>Una operación que puede comprenderse y verificarse.</h4>
                </div>
                <CaseStudyVisual parallax image={mockups.web} title="Web · Transacciones" caption="Visualización editorial del diseño." sizes="(max-width: 780px) 90vw, (max-width: 1380px) 60vw, 780px" loading="eager" />
              </div>
            </div>
          </section>
        </Act>

        <Act index={4}>
          <div className={styles.split} data-motion="copy">
            <p className={styles.lede}>Diseñar las dos plataformas juntas me ayudó a separar el estado que orienta una acción de la información técnica que necesita soporte.</p>
            <div className={styles.prose}>
              <p>Por eso prioricé un acceso visible al cobro y un estado legible al verificarlo. Cada decisión responde a una fricción del brief que se puede evaluar por separado.</p>
              <p>El ejercicio fue una prueba técnica. Elaboré una propuesta de diseño y un prototipo con apoyo de IA. No se realizaron pruebas con usuarios reales ni se verificó una implementación comercial.</p>
            </div>
          </div>
          <div className={styles.measurement} data-reveal>
            <EvidenceLabel kind="target" label="Plan de medición · sin resultados" /><h3>Indicadores propuestos</h3>
            <dl className={styles.definitionList}>
              <div><dt>Abandono del cobro</dt><dd>Proporción de intentos iniciados en Android que terminan antes de confirmar. Primero habría que acordar cómo distinguir una salida de un fallo técnico.</dd></div>
              <div><dt>Errores de interpretación</dt><dd>Proporción de tareas de verificación en las que se confunde el estado o se elige un siguiente paso incorrecto.</dd></div>
              <div><dt>Tiempo de verificación</dt><dd>Tiempo desde que se busca la transacción hasta que se identifica su estado y el siguiente paso.</dd></div>
            </dl>
          </div>
          <p><strong>Próxima validación.</strong> Probar el inicio del cobro y la verificación de estados con comercios y personal de soporte. Las tareas permitirían observar dónde dudan, qué entienden por cada estado y cuándo intentarían cobrar de nuevo.</p>
          <div id="recursos" className={styles.resourceLinks}>
            <a className="button button-primary" href={prototypeUrl} target="_blank" rel="noopener noreferrer" aria-label="Abrir prototipo (abre en una pestaña nueva)">Abrir prototipo <ArrowUpRight size={18} aria-hidden="true" /></a>
            <a className="button button-quiet" href={figmaUrl} target="_blank" rel="noopener noreferrer" aria-label="Ver diseño en Figma (abre en una pestaña nueva)">Ver diseño en Figma <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
        </Act>
      </CaseReveal>

      <Link className="case-next" href={`/proyectos/${nextProject.slug}`}>
        <div><span className="eyebrow">Siguiente proyecto</span><strong>{nextProject.name}</strong></div>
        <ArrowRight size={26} aria-hidden="true" />
      </Link>
    </main>
  );
}

