export type Project = {
  slug: string;
  name: string;
  title: string;
  category: string;
  type: string | null;
  description: string;
  focus: string;
  cover: { src: string; alt: string; conceptual: boolean };
};

export const projects = [
  {
    slug: 'redeban',
    name: 'Redeban',
    title: 'Optimización de la experiencia transaccional',
    category: 'Product Design / Fintech',
    type: 'Prueba técnica',
    description: 'Propuesta de optimización del flujo «Cobrar y Verificar», conectando la generación de cobros en Android con la consulta, trazabilidad y verificación de transacciones desde Web.',
    focus: 'Estrategia de producto, auditoría UX, arquitectura de flujos, diseño de interfaces, sistemas de estados y métricas de producto.',
    cover: { src: '/proyectos/redeban.svg', alt: 'Dos nodos unidos por un trazado que representa el paso del cobro a la verificación.', conceptual: true },
  },
  {
    slug: 'aurora-seguros',
    name: 'Aurora Seguros',
    title: 'Cotizador Salud Flex',
    category: 'Product Design / Insurtech',
    type: 'Prueba técnica',
    description: 'Diseño de una experiencia digital para cotizar seguros de salud mediante un proceso claro, estructurado y orientado a la toma de decisiones.',
    focus: 'UX Strategy, arquitectura de información, user flows, wireframes, UI Design, Design System y prototipado funcional.',
    cover: { src: '/proyectos/aurora.svg', alt: 'Composición conceptual en azul con anillos concéntricos y una cruz de salud.', conceptual: true },
  },
  {
    slug: 'arho',
    name: 'ARHO',
    title: 'Un universo ecuestre. Una experiencia digital.',
    category: 'UX/UI Design / Responsive Web',
    type: null,
    description: 'Diseño de una experiencia responsive para conectar servicios ecuestres, catálogo de caballos, tienda y espacios en una propuesta digital coherente.',
    focus: 'Arquitectura de información, jerarquía visual, interfaces desktop y móvil y consistencia de componentes.',
    cover: { src: '/projects/arho/mockups-approved/01-arho-catalogo-laptop-movil.png', alt: 'Catálogo de caballos ARHO presentado en laptop y smartphone.', conceptual: true },
  },
  {
    slug: 'paragon',
    name: 'Paragón',
    title: 'Comunidad y nostalgia digital',
    category: 'UX/UI Design / Engagement',
    type: null,
    description: 'Rediseño de la experiencia de un blog sobre juguetes, orientado a mejorar la participación, el descubrimiento de contenido y la interacción entre usuarios.',
    focus: 'Experiencia de usuario, arquitectura de contenido, interacción y engagement.',
    cover: { src: '/proyectos/paragon.svg', alt: 'Composición conceptual violeta con páginas desplegadas y líneas de texto abstractas.', conceptual: true },
  },
  {
    slug: 'tripflowapp',
    name: 'TripFlowApp',
    title: 'Viajar sin estrés financiero',
    category: 'UX/UI Design / Traveltech',
    type: null,
    description: 'Diseño de una experiencia para ayudar a los viajeros a gestionar sus gastos y mantener el control financiero durante sus viajes.',
    focus: 'Investigación UX, diseño de interacciones, visualización de información y experiencia móvil.',
    cover: { src: '/proyectos/tripflow.svg', alt: 'Composición conceptual en azul petróleo con una ruta trazada entre puntos.', conceptual: true },
  },
  {
    slug: 'de-lo-largo-a-lo-corto',
    name: 'De lo largo a lo corto',
    title: 'El poder de escalar contenido',
    category: 'Growth / Content Strategy / AI',
    type: null,
    description: 'Diseño de una estrategia de reutilización de contenido mediante inteligencia artificial para transformar formatos extensos en piezas digitales adaptadas a diferentes canales.',
    focus: 'Growth Marketing, automatización, distribución de contenido y optimización de conversiones.',
    cover: { src: '/proyectos/de-lo-largo-a-lo-corto.svg', alt: 'Una banda larga se ramifica en tres piezas de distintas longitudes.', conceptual: true },
  },
  {
    slug: 'ritual-amarte',
    name: 'Ritual Amarte',
    title: 'Antes de abrir sus puertas',
    category: 'Brand Experience / Prototipado 3D',
    type: 'Design Lead — Brand & Digital Experience',
    description: 'Liderazgo de diseño integral para conectar la identidad visual, las aplicaciones de marca y la experiencia espacial de un nail studio con un showroom web 3D conceptual.',
    focus: 'Identidad visual, aplicaciones de marca, experiencia espacial y dirección del prototipado web 3D asistido por IA. Aura Cristina Pineda: creadora de la idea, fundadora y autora académica.',
    cover: { src: '/projects/ritual-amarte/aplicaciones/08-espacio-conceptual.png', alt: 'Visualización conceptual de Ritual Amarte; no es un establecimiento construido.', conceptual: true },
  },
] as const satisfies readonly Project[];

export type ProjectSlug = (typeof projects)[number]['slug'];

/** The registry order drives both the Home carousel and the linear case-study journey. */
export function getNextProject(slug: ProjectSlug): Project | undefined {
  const index=projects.findIndex(project=>project.slug===slug);
  return index<0 ? undefined : projects[index+1];
}
