import type { ProjectSlug } from './projects';

type LabeledText = { label: string; text: string };
type Decision = { title: string; question: string; rationale?: string };
type Deliverable = {
  title: string;
  note: string;
  media?: { src: string; alt: string; width: number; height: number; caption: string };
};

export type CaseStudy = {
  summary: string;
  context: string;
  problem: string;
  objective: string;
  contribution: { individual: string; team: string };
  diagram: { center: string; nodes: [LabeledText, LabeledText, LabeledText] };
  decisions: Decision[];
  deliverables: Deliverable[];
  prototype?: { url: string; label: string; authorized: boolean };
  outcomes: { measured: string; expected: string; learnings: string };
  evidence: LabeledText[];
};

export const caseStudies: Record<ProjectSlug, CaseStudy | null> = {
  'ritual-amarte': null,
  arho: null,
  redeban: null,
  'aurora-seguros': {
    summary: 'Un reto técnico para diseñar la cotización de un seguro de salud. Mi trabajo abarcó la definición del problema, el flujo, el sistema de diseño y un prototipo funcional para el handoff.',
    context: 'Salud Flex era el producto de salud en torno al cual se planteó el reto técnico de Product Design.',
    problem: 'El encargo se centró en la experiencia de cotización. Queda por precisar qué dificultad debía resolver el cotizador, para quién y bajo qué reglas del seguro.',
    objective: 'Diseñar y prototipar un flujo de cotización de Salud Flex y preparar su entrega para implementación.',
    contribution: {
      individual: 'Definición del problema, flujos, arquitectura de información, wireframes, sistema de diseño, prototipo funcional y handoff.',
      team: 'La participación de otras personas y la autoría de las reglas de cotización quedan por confirmar.',
    },
    diagram: {
      center: 'Cotizador Salud Flex',
      nodes: [
        { label: 'Estructura', text: 'Flujos y arquitectura de información' },
        { label: 'Interfaz', text: 'Wireframes y sistema de diseño' },
        { label: 'Entrega', text: 'Prototipo funcional y handoff' },
      ],
    },
    decisions: [
      { title: 'Orden de la cotización', question: '¿Qué datos era imprescindible pedir para calcular la cotización y qué se podía posponer? La comparación debe mostrar cómo se eligieron los pasos.' },
      { title: 'Presentación del resultado', question: '¿Qué información sobre precio, cobertura y condiciones debía verse al obtener la cotización? Falta la razón detrás de la jerarquía elegida.' },
    ],
    deliverables: [
      { title: 'Flujo y wireframes', note: 'Material mencionado en el reto. Falta una exportación que muestre la secuencia y sus bifurcaciones.' },
      { title: 'Sistema de diseño', note: 'Falta una lámina con los componentes y estados utilizados en el cotizador.' },
      { title: 'Prototipo y handoff', note: 'Falta un recorrido autorizado del flujo y una muestra de las anotaciones entregadas.' },
    ],
    outcomes: {
      measured: 'Sin mediciones aportadas sobre finalización, errores o comprensión de la cotización.',
      expected: 'Hipótesis por comprobar. La persona podría completar los pasos y entender qué incluye su cotización.',
      learnings: 'Falta registrar qué cambió entre el primer flujo y el prototipo final, y qué motivó el cambio.',
    },
    evidence: [
      { label: 'Problema y reglas', text: 'Comparte el enunciado del reto o un extracto anonimizado que identifique a la persona que cotiza, la dificultad inicial, los datos obligatorios y las reglas de cálculo o elegibilidad.' },
      { label: 'Autoría', text: 'Indica quién definió las reglas del seguro, quién revisó el reto y qué piezas del handoff elaboraste tú.' },
      { label: 'Decisiones y material', text: 'Aporta el flujo con bifurcaciones, un wireframe inicial y la versión elegida con el motivo del cambio, una lámina del sistema y una muestra de handoff. Si se puede compartir, añade el enlace de solo lectura al prototipo y confirma el permiso.' },
      { label: 'Resultados y aprendizaje', text: 'Si hubo evaluación, aporta tarea, método, fecha, participantes o fuente y resultados. Para el aprendizaje, basta un cambio entre versiones con la observación o restricción que lo motivó.' },
    ],
  },
  tripflowapp: {
    summary: 'Una experiencia móvil para ayudar a los viajeros a gestionar sus gastos y consultar cuánto han gastado mientras el viaje sigue en curso.',
    context: 'El caso combina la experiencia de viaje con el control financiero durante el recorrido.',
    problem: 'El seguimiento de gastos es la necesidad planteada. Falta precisar en qué situación surge, quién la experimenta y cómo la resuelve hoy.',
    objective: 'Diseñar una experiencia que permita hacer seguimiento de los gastos durante un viaje.',
    contribution: {
      individual: 'El trabajo descrito cubre el diseño de la experiencia. Falta detallar qué partes y entregables desarrollé personalmente.',
      team: 'Queda por confirmar si el caso fue individual o si hubo aportes de otras personas.',
    },
    diagram: {
      center: 'Gastos durante el viaje',
      nodes: [
        { label: 'Contexto', text: 'Viaje en curso' },
        { label: 'Objeto', text: 'Gastos del viaje' },
        { label: 'Necesidad', text: 'Seguimiento financiero' },
      ],
    },
    decisions: [
      { title: 'Momento de registro', question: 'Si el flujo incluye registrar gastos, ¿cuándo debía hacerlo la persona y qué datos mínimos eran necesarios en ese momento?' },
      { title: 'Vista del gasto', question: '¿Qué consulta debía resolverse primero durante el viaje? Falta justificar la agrupación elegida, por ejemplo por fecha o por categoría, si se exploraron esas opciones.' },
    ],
    deliverables: [
      { title: 'Experiencia de seguimiento', note: 'Falta el flujo o storyboard que muestre cuándo se consulta el gasto durante el viaje.' },
      { title: 'Vistas del caso', note: 'Faltan pantallas anotadas que muestren qué información financiera aparece y dónde.' },
    ],
    outcomes: {
      measured: 'Sin mediciones aportadas sobre registro, consulta o comprensión de gastos.',
      expected: 'Hipótesis por comprobar. La persona podría identificar cuánto ha gastado durante el viaje cuando necesita consultarlo.',
      learnings: 'Falta documentar qué supuesto sobre el seguimiento de gastos cambió al desarrollar el caso.',
    },
    evidence: [
      { label: 'Situación de viaje', text: 'Describe un escenario concreto, la persona, el momento del viaje y el método que ya usa para llevar sus gastos. Identifica si parte de una observación, una fuente o una hipótesis de diseño.' },
      { label: 'Autoría', text: 'Confirma si fue individual. Si hubo colaboración, identifica quién definió el problema y quién produjo flujos, pantallas y prototipo.' },
      { label: 'Decisiones y material', text: 'Aporta un flujo o storyboard y dos o tres pantallas anotadas. Si el registro, las monedas o los gastos compartidos formaron parte del alcance, señala cómo se resolvieron y por qué.' },
      { label: 'Resultados y aprendizaje', text: 'Si hubo evaluación, aporta la tarea, las observaciones y el método. Si el aprendizaje fue de diseño, comparte el supuesto original y la versión del flujo que cambió.' },
    ],
  },
  paragon: {
    summary: 'Una propuesta de rediseño para el blog de juguetes de Paragón, orientada a facilitar el descubrimiento de contenido y fomentar la participación y la interacción entre lectores.',
    context: 'El proyecto se centró en el contenido y los mecanismos de interacción del blog de juguetes de Paragón.',
    problem: 'La propuesta aborda la lectura y la interacción. Falta identificar qué obstáculo se observó en el blog original y qué acción necesitaba mayor claridad.',
    objective: 'Proponer mejoras a la lectura y el descubrimiento de contenido, y facilitar la participación y la interacción entre lectores.',
    contribution: {
      individual: 'El alcance descrito corresponde a una propuesta UX/UI. Falta identificar qué decisiones y piezas concretas elaboré personalmente.',
      team: 'Queda por confirmar si hubo aportes de edición, contenido, marca o desarrollo, y quién los realizó.',
    },
    diagram: {
      center: 'Experiencia del blog',
      nodes: [
        { label: 'Contenido', text: 'El artículo como pieza central' },
        { label: 'Lectura', text: 'Experiencia de leer el blog' },
        { label: 'Interacción', text: 'Acciones asociadas al contenido' },
      ],
    },
    decisions: [
      { title: 'Jerarquía de lectura', question: '¿Qué elementos del artículo cambiaron de orden, tamaño o posición? Falta explicar qué dificultad de lectura resolvía ese cambio.' },
      { title: 'Interacciones del blog', question: '¿Qué acción concreta se priorizó y en qué momento de la lectura debía aparecer? Falta mostrar la relación entre la acción y la intención del lector.' },
    ],
    deliverables: [
      { title: 'Propuesta de lectura', note: 'Falta una comparación autorizada entre una página original del blog y la propuesta.' },
      { title: 'Mecanismos de interacción', note: 'Faltan vistas anotadas de las acciones incluidas y de sus estados, si se diseñaron.' },
    ],
    outcomes: {
      measured: 'Sin datos aportados sobre lectura o uso de las interacciones propuestas.',
      expected: 'Hipótesis por comprobar. La persona podría seguir el artículo y reconocer las acciones disponibles al leerlo.',
      learnings: 'Falta registrar qué cambió al equilibrar la jerarquía del artículo con la visibilidad de las acciones.',
    },
    evidence: [
      { label: 'Punto de partida', text: 'Aporta una captura autorizada o una descripción del blog original, el tipo de artículo revisado y el indicio concreto del problema de lectura o interacción.' },
      { label: 'Autoría', text: 'Indica qué diseñaste tú y quién aportó contenido, lineamientos editoriales o implementación. Aclara si el alcance terminó en propuesta.' },
      { label: 'Decisiones y material', text: 'Comparte el mismo artículo antes y después, con anotaciones en los cambios de jerarquía. Identifica las interacciones rediseñadas, su ubicación y el criterio que definió la solución.' },
      { label: 'Resultados y aprendizaje', text: 'Si se evaluó el rediseño, indica qué aspecto de la lectura o interacción se observó, con método y fuente. Si hubo iteración, aporta un cambio y la restricción editorial o de diseño que lo motivó.' },
    ],
  },
  'de-lo-largo-a-lo-corto': null,
};
