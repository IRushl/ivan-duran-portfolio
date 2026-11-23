import { projects } from './projects';

export const homeContact = {
  name: 'Iván Camilo Durán Alba',
  email: 'duranivan555@gmail.com',
  linkedin: 'https://www.linkedin.com/in/iv%C3%A1n-dur%C3%A1n-b821442ab/',
  phones: [
    { label: '324 611 6804', href: 'tel:+573246116804' },
    { label: '312 427 9325', href: 'tel:+573124279325' },
  ],
  // Only publish verified, supplied channels. Add GitHub here when provided.
  github: '',
  cv: { href: '/cv/ivan-duran-2026.pdf', label: 'Descargar CV', detail: 'PDF · 2 páginas' },
};

const project = (slug: string) => {
  const match = projects.find(item => item.slug === slug);
  if (!match) throw new Error(`Missing Home project: ${slug}`);
  return match;
};

const homeProjectDetails = [
  {
    project: project('redeban'), tone: 'redeban',
    headline: 'Una transacción. Dos plataformas. Una experiencia conectada.',
    sector: 'Fintech',
    nature: 'Prueba técnica',
    synopsis: 'Rediseñé el flujo entre Android y Web para que el cobro, la verificación y los estados del proceso se entendieran como una sola experiencia.',
    contribution: 'Estrategia de producto, auditoría UX, diseño de flujos, interfaces y sistema de estados compartido.',
    image: { src: '/projects/redeban/mockups/redeban-hero-ecosistema.png', width: 1448, height: 1086, alt: 'Visualización editorial del prototipo Redeban en Android y Web.' },
    caption: 'Visualización editorial con IA. Capturas originales dentro del caso.',
  },
  {
    project: project('aurora-seguros'), tone: 'aurora',
    headline: 'Cotizar un seguro también puede ser claro.',
    sector: 'Insurtech',
    nature: 'Prueba técnica',
    synopsis: 'Rediseñé la experiencia de Salud Flex para hacer visible qué se necesita, a quién se incluye y cómo comparar opciones sin perder contexto.',
    contribution: 'Arquitectura del flujo, UX writing, prototipos, interfaz y narrativa del caso.',
    image: { src: '/projects/aurora-seguros/mockups/cotizacion-salud-flex-dispositivos.png', width: 1672, height: 941, alt: 'Presentación conceptual de Salud Flex en laptop y teléfono; las capturas originales se conservan en el caso.' },
    caption: 'Visualización editorial con IA. Capturas originales dentro del caso.',
  },
  {
    project: project('arho'), tone: 'arho',
    headline: 'Tradición ecuestre, presentada con una experiencia digital más clara.',
    sector: 'Ecuestre / E-commerce',
    nature: 'Proyecto comercial remunerado',
    synopsis: 'Organicé la experiencia web de una marca ecuestre para conectar su historia, catálogo, tienda y sus espacios en un recorrido coherente.',
    contribution: 'Estructura de contenido, jerarquía visual, recorrido digital y dirección de experiencia.',
    image: { src: '/projects/arho/mockups-approved/01-arho-catalogo-laptop-movil.png', width: 1448, height: 1086, alt: 'Composición editorial del catálogo de ARHO en laptop y teléfono.' },
    caption: 'Presentación editorial del diseño entregado.',
  },
  {
    project: project('paragon'), tone: 'paragon',
    headline: 'Cuando el contenido deja de ser solo lectura y empieza a crear comunidad.',
    sector: 'Comunidad / Engagement',
    nature: 'Proyecto académico en equipo',
    synopsis: 'Diseñé una propuesta editorial orientada a participación, nostalgia y permanencia, con el objetivo de convertir lectores pasivos en una comunidad más activa.',
    contribution: 'Investigación en equipo, auditoría comparativa y diseño UX/UI de la sección Comunidad.',
    image: { src: '/projects/paragon/01-mockups-premium/01-paragon-hero-ecosistema.png', width: 1586, height: 992, alt: 'Visualización conceptual de la bienvenida, el boletín y el contenido de Comunidad en Paragón.' },
    caption: 'Visualización conceptual. Evidencias originales dentro del caso.',
  },
  {
    project: project('tripflowapp'), tone: 'tripflow',
    headline: 'Viajar también necesita una buena experiencia.',
    sector: 'Traveltech',
    nature: 'Propuesta UX/UI móvil',
    synopsis: 'Diseñé una propuesta móvil para planificar viajes, registrar gastos y consultar el presupuesto de forma más simple, sin interrumpir el recorrido.',
    contribution: 'UX/UI, definición de flujos, pantallas clave y prototipado.',
    image: { src: '/projects/tripflow/mockups/01-tripflow-hero-ecosistema.png', width: 1586, height: 992, alt: 'Presentación conceptual de las interfaces móviles TripFlow; visualización editorial con IA.' },
    caption: 'Visualización conceptual',
  },
  {
    project: project('de-lo-largo-a-lo-corto'), tone: 'idp',
    headline: 'De contenido largo a un sistema de distribución más inteligente.',
    sector: 'Content Strategy / AI',
    nature: 'Proyecto de estrategia de contenido',
    synopsis: 'Diseñé un sistema de reutilización de contenido asistido por IA para transformar formatos largos en piezas cortas orientadas a visibilidad, conversión y retención.',
    contribution: 'Estrategia, sistema de distribución, diseño editorial y estructura del caso.',
    image: { src: '/projects/idp/mockups/01-idp-hero-ecosistema.png', width: 1586, height: 992, alt: 'Visualización conceptual con IA del ecosistema de contenido de Interfaz de Producto en distintos dispositivos.' },
    caption: 'Visualización editorial con IA',
  },
  {
    project: project('ritual-amarte'), tone: 'ritual',
    headline: 'De una idea de marca a una propuesta con forma, lenguaje y atmósfera.',
    sector: 'Brand & Digital Experience',
    nature: 'Propuesta conceptual',
    synopsis: 'A partir de la visión de su fundadora, ayudé a materializar una identidad visual más clara, con dirección de marca y exploración espacial de un showroom conceptual.',
    contribution: 'Identidad visual, narrativa de marca y dirección del showroom conceptual asistido por IA.',
    image: { src: '/projects/ritual-amarte/aplicaciones/07-brand-board.png', width: 1536, height: 1024, alt: 'Composición conceptual de identidad y aplicaciones de Ritual Amarte; no es un negocio construido.' },
    caption: 'Visualización conceptual',
  },
] as const;

/** Presentational details follow the canonical project registry, never a second order. */
export const homeProjects = projects.map(project => {
  const details=homeProjectDetails.find(item=>item.project.slug===project.slug);
  if(!details)throw new Error('Missing Home presentation: '+project.slug);
  return details;
});

export const homeExperience = [
  { role: 'UX/UI Designer', company: 'Imaginamos S.A.S.', period: 'Ene — May 2026', detail: 'Interfaces web, arquitectura de información, prototipos responsive y colaboración con producto, marketing y desarrollo.' },
  { role: 'Product Marketing Designer', company: 'Interfaz de Producto', period: '2025', detail: 'Sistema de reutilización de contenido, distribución multiformato y flujos de contenido con apoyo de IA.' },
  { role: 'Diseñador UX/UI y Marketing Digital', company: 'GAO Tek', period: '2024 — 2025', detail: 'Flujos y prototipos B2B, análisis de indicadores y colaboración en experiencias digitales.' },
];

export const homeExpertise = [
  { title:'Product Thinking & UX Research', headline:'Entiendo el problema antes de diseñar la solución.', detail:'Delimito preguntas, reviso evidencia y conecto necesidades de las personas con objetivos de negocio.', example:'Redeban: encuadre del problema y auditoría UX del flujo Cobrar y Verificar.', href:'/proyectos/redeban' },
  { title:'UX/UI & Interaction Design', headline:'Diseño recorridos que ayudan a avanzar.', detail:'Organizo flujos, estados e interfaces para que cada decisión tenga contexto y continuidad.', example:'Aurora Seguros: validaciones y recuperación de errores durante la cotización.', href:'/proyectos/aurora-seguros' },
  { title:'Design Systems & Prototyping', headline:'Convierto criterios en consistencia escalable.', detail:'Conecto patrones, componentes y prototipos para validar y construir con mayor claridad.', example:'Redeban: un sistema de estados con el mismo significado en Android y Web.', href:'/proyectos/redeban' },
  { title:'AI-Assisted Design Workflows', headline:'Uso IA para acelerar, no para delegar el criterio.', detail:'La IA me ayuda a explorar, sintetizar y prototipar más rápido, mientras la dirección y la revisión siguen siendo responsabilidad mía.', example:'Ritual Amarte: exploración de un showroom 3D asistido por IA.', href:'/proyectos/ritual-amarte' },
] as const;
