import type { StudyImage } from '@/components/case-study-visual';
import hero from '../../public/projects/paragon/01-mockups-premium/01-paragon-hero-ecosistema.png';
import welcome from '../../public/projects/paragon/01-mockups-premium/02-paragon-bienvenida-comunidad.png';
import participation from '../../public/projects/paragon/01-mockups-premium/03-paragon-gamificacion-faq.png';
import returnVisit from '../../public/projects/paragon/01-mockups-premium/04-paragon-newsletter-articulo.png';
import closing from '../../public/projects/paragon/01-mockups-premium/05-paragon-showcase-final.png';

function artwork(image: { src: string; width: number; height: number }, alt: string): StudyImage {
  return { src: image.src, width: image.width, height: image.height, alt };
}
function original(file: string, width: number, height: number, alt: string): StudyImage {
  return { src: `/projects/paragon/${file}`, width, height, alt };
}

export const paragonImages = {
  hero: artwork(hero, 'Presentación conceptual de Paragón: tres dispositivos muestran bienvenida, boletín y contenido de la Comunidad.'),
  welcome: artwork(welcome, 'Mockup conceptual de la bienvenida a Comunidad y su llamada a explorar, sobre un fondo de colores primarios.'),
  participation: artwork(participation, 'Mockup conceptual de la propuesta de ranking y preguntas frecuentes de Comunidad.'),
  returnVisit: artwork(returnVisit, 'Mockup conceptual de dos dispositivos con suscripción al boletín y un artículo de juguetes retro.'),
  closing: artwork(closing, 'Cierre conceptual de Paragón con bienvenida, ranking y contenido en tres dispositivos sobre plataformas de colores.'),
  annotated: original('03-evidencia-del-caso/06-mockup-annotado-comunidad.jpg', 1920, 1080, 'Composición original anotada que señala la invitación a explorar Comunidad, el registro y la suscripción al boletín.'),
  ranking: original('02-originales-seleccionados/02-original-ranking-faq.png', 1920, 1440, 'Composición original con ranking de participantes y preguntas sobre registro, contenidos, recompensas y reglas.'),
  content: original('02-originales-seleccionados/01-original-tres-pantallas.png', 1920, 1440, 'Composición original de bienvenida, suscripción al boletín y artículo destacado del blog Sorpresa.'),
  flow: original('03-evidencia-del-caso/01-mapa-de-flujo-o-estructura.png', 921, 795, 'Mapa original que conecta Home y navegación con Comunidad, registro, suscripción e interacción tras iniciar sesión.'),
};

export const paragonDecisions = [
  {
    id: 'descubrir', number: '01', label: 'Facilitar el descubrimiento',
    title: 'La Comunidad necesita una puerta de entrada visible.',
    problem: 'Publicar artículos no explica por sí solo qué se puede hacer con otras personas dentro del blog.',
    decision: 'Diseñé una bienvenida que presenta la Comunidad y una acción explícita: «Explora la Comunidad». La propuesta convive con el acceso de registro.',
    rationale: 'La invitación aparece antes de pedir participación. Primero comunica el propósito del espacio; después ofrece una forma de entrar.',
    expected: 'Que el lector identifique la Comunidad como parte del recorrido. Su descubrimiento y la comprensión del CTA deben comprobarse en tareas de navegación.',
    image: paragonImages.welcome, evidence: paragonImages.annotated, evidenceTitle: 'Llamadas a la acción · Original anotado',
  },
  {
    id: 'participar', number: '02', label: 'Crear oportunidades para participar',
    title: 'Participar requiere una invitación y reglas comprensibles.',
    problem: 'La síntesis de investigación describe lectores que quieren interacción y reconocimiento, pero necesitan entender cómo involucrarse.',
    decision: 'La propuesta reúne un ranking visible con preguntas frecuentes sobre registro, contenido, recompensas y normas de la Comunidad.',
    rationale: 'El ranking hace visible la participación; las preguntas frecuentes explican las condiciones para dar el siguiente paso. La motivación y la claridad se trabajan juntas.',
    expected: 'Reducir dudas al participar. El reconocimiento es una hipótesis de motivación cuyo efecto sobre la actividad y el retorno requiere evaluación.',
    image: paragonImages.participation, evidence: paragonImages.ranking, evidenceTitle: 'Ranking y preguntas frecuentes · Original',
  },
  {
    id: 'regresar', number: '03', label: 'Dar razones para regresar',
    title: 'El regreso comienza con algo que vale la pena descubrir.',
    problem: 'Una visita a un artículo puede terminar sin que la persona encuentre una continuidad con sus intereses.',
    decision: 'Conecté la propuesta de Comunidad con contenido de nostalgia y una suscripción al boletín para dar continuidad a la lectura.',
    rationale: 'El artículo ofrece una afinidad temática y el boletín una opción para seguir las novedades. Son caminos de continuidad, cuya eficacia no está demostrada.',
    expected: 'Favorecer exploración y visitas posteriores. La suscripción no equivale a retención: habría que observar el regreso y la participación en el tiempo.',
    image: paragonImages.returnVisit, evidence: paragonImages.content, evidenceTitle: 'Bienvenida, boletín y contenido · Original',
  },
];

export const paragonTargets = [
  { value: '+30 %', label: 'Participación activa', detail: 'Proyección de crecimiento; requiere definir actividad y una línea base.' },
  { value: '15–20 %', label: 'Conversión en CTAs', detail: 'Meta para acciones clave; falta definir eventos y denominadores.' },
  { value: '>80 %', label: 'Satisfacción', detail: 'Objetivo declarado; requiere concretar instrumento y criterio de evaluación.' },
  { value: '<35 %', label: 'Rebote', detail: 'Meta del ejercicio; requiere una definición de sesión y medición comparable.' },
];
