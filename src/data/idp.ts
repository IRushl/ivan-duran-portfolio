import type { StudyImage } from '@/components/case-study-visual';
import hero from '../../public/projects/idp/mockups/01-idp-hero-ecosistema.png';
import context from '../../public/projects/idp/mockups/02-idp-contexto-reto.png';
import growth from '../../public/projects/idp/mockups/03-idp-metricas-crecimiento.png';
import funnel from '../../public/projects/idp/mockups/04-idp-funnel-estrategia.png';
import closing from '../../public/projects/idp/mockups/05-idp-showcase-final.png';

function artwork(image: { src: string; width: number; height: number }, alt: string): StudyImage {
  return { src: image.src, width: image.width, height: image.height, alt };
}
function original(file: string, width: number, height: number, alt: string): StudyImage {
  return { src: `/projects/idp/originals/${file}.png`, width, height, alt };
}

export const idpImages = {
  hero: artwork(hero, 'Visualización conceptual generada con IA del ecosistema IDP: video, artículo y analítica en distintos dispositivos.'),
  context: artwork(context, 'Mockup conceptual generado con IA de un artículo, el canal de YouTube y la estrategia de distribución.'),
  growth: artwork(growth, 'Mockup conceptual generado con IA de pantallas de analítica y del canal de IDP, con cifras ilustrativas.'),
  funnel: artwork(funnel, 'Mockup conceptual generado con IA del funnel, los objetivos de contenido y sus puntos de contacto digitales.'),
  closing: artwork(closing, 'Visualización conceptual generada con IA que reúne contenido, canales y medición en el ecosistema IDP.'),
  subscribers: original('image (1)', 834, 526, 'Captura original de YouTube con 1.552 suscriptores y el periodo visible del 29 de julio al 25 de agosto de 2025.'),
  youtube: original('image (5)', 921, 537, 'Captura original de la página de videos del canal Interfaz de Producto.'),
  podcast: original('image (7)', 921, 324, 'Captura original del reproductor de un episodio titulado El portafolio es una carta de amor.'),
  article: original('908shots_so', 1920, 1440, 'Composición original de un artículo en Substack con acceso a audio y episodios relacionados.'),
  realtime: original('image (8)', 452, 714, 'Captura original de YouTube en tiempo real: 1.552 suscriptores y 559 visualizaciones en las últimas 48 horas, sin fecha de captura visible.'),
  funnelOriginal: original('image (4)', 921, 690, 'Diagrama original que asigna contenido y canales a Awareness, Consideración, Conversión y Retención.'),
};

export type IdpStage = {
  label: string; title: string; quantity: string; input: string; transform: string;
  output: string; channel: string; purpose: string; relationship: string;
  evidence?: StudyImage; evidenceTitle?: string;
};

export const idpPipeline: IdpStage[] = [
  { label: 'Video largo', title: 'Partir del conocimiento que ya existía.', quantity: '1–1,5 h', input: 'Un video educativo extenso de YouTube.', transform: 'Seleccionar una pieza de origen para reutilizar su contenido.', output: 'Un video fuente para las distintas adaptaciones.', channel: 'YouTube · origen del sistema', purpose: 'Aprovechar la profundidad del contenido existente sin iniciar cada pieza desde cero.', relationship: 'Este video alimenta tanto la transcripción como la rama de clips.', evidence: idpImages.youtube, evidenceTitle: 'Canal de origen · Captura original' },
  { label: 'Transcripción', title: 'Convertir la conversación en material editable.', quantity: 'Audio → texto', input: 'El video largo seleccionado.', transform: 'Transcribir con apoyo de IA para trabajar el contenido en texto.', output: 'Una transcripción como base editorial.', channel: 'Proceso interno · sin publicación independiente', purpose: 'Convertir el contenido del video en una base editable para desarrollar nuevas piezas.', relationship: 'El texto permite identificar ideas y organizar subtemas para las siguientes adaptaciones.' },
  { label: 'Superartículo', title: 'Construir una pieza que organice el tema.', quantity: '1 pieza base', input: 'La transcripción del video.', transform: 'Estructurar el contenido en un superartículo con apoyo de IA y criterio editorial.', output: 'Un superartículo completo sobre el tema de origen.', channel: 'Base editorial para el contenido escrito', purpose: 'Conservar una referencia común al desarrollar los formatos derivados.', relationship: 'La siguiente transformación descompone esta pieza en cinco subtemas.' },
  { label: 'Subtemas', title: 'Dar una entrada específica a cada idea.', quantity: '5 artículos', input: 'El superartículo.', transform: 'Dividirlo en cinco subtemas clave y desarrollar cada uno como artículo independiente.', output: 'Cinco artículos especializados.', channel: 'Substack · artículos', purpose: 'Ofrecer contenido enfocado que permita profundizar por interés.', relationship: 'Estos mismos subtemas también orientan la adaptación a audio.', evidence: idpImages.article, evidenceTitle: 'Artículo en Substack · Composición original' },
  { label: 'Podcasts', title: 'Llevar los subtemas a una experiencia de audio.', quantity: '5 × 8–15 min', input: 'Los cinco subtemas del contenido base.', transform: 'Adaptar cada subtema a podcast, con ajustes de voz y producción ligera.', output: 'Cinco podcasts de ocho a quince minutos.', channel: 'Substack · audio', purpose: 'Ampliar las formas de consumir y seguir el contenido.', relationship: 'Los podcasts derivan de los subtemas; no son la fuente de los clips cortos.', evidence: idpImages.podcast, evidenceTitle: 'Podcast publicado · Captura original' },
  { label: 'Clips cortos', title: 'Abrir otras puertas al contenido de origen.', quantity: '3–10 clips', input: 'El video largo original, en una rama paralela.', transform: 'Generar clips de 30–90 segundos mediante la edición con IA de Riverside.', output: 'De tres a diez clips por video en el modelo de reutilización.', channel: 'TikTok · YouTube Shorts', purpose: 'Explorar alcance y descubrimiento en formatos cortos.', relationship: 'Esta rama adapta el video original, no los podcasts.' },
  { label: 'Distribución', title: 'Conectar las piezas con un siguiente paso.', quantity: '1 secuencia de correos', input: 'Artículos, podcasts y clips adaptados.', transform: 'Publicar por canal, acompañar con correos y vincular las piezas con CTAs hacia academia y comunidad.', output: 'Distribución multiformato acompañada por una secuencia de correos.', channel: 'Substack · correo · TikTok · Shorts · comunidad IDP', purpose: 'Relacionar el descubrimiento con el seguimiento y las oportunidades de conversión.', relationship: 'Las cantidades corresponden al modelo por video, no al total acumulado de publicaciones.' },
];

export const idpFunnel = [
  { label: 'Descubrimiento', short: 'Ser descubierto', title: 'Un primer contacto en formato corto.', formats: 'Clips de 30–90 segundos en TikTok y YouTube Shorts.', intent: 'Llevar temas educativos a personas que aún no siguen el contenido largo.', limit: 'Las visualizaciones por pieza no prueban por sí solas registros ni ventas.' },
  { label: 'Consideración', short: 'Profundizar en el tema', title: 'Dar continuidad al interés.', formats: 'Artículos y podcasts en Substack, acompañados por correo.', intent: 'Ofrecer profundidad y una relación recurrente con el contenido.', limit: 'Aperturas, clics y avance hacia el registro quedan por evaluar.' },
  { label: 'Conversión', short: 'Encontrar el siguiente paso', title: 'Conectar contenido y propuesta de valor.', formats: 'Llamadas a la acción en artículos, boletines y páginas de destino hacia academia y comunidad.', intent: 'Orientar el recorrido a registros y suscripciones pagas.', limit: 'Es una función estratégica propuesta; el +25 % de usuarios pagos es una meta sin resultado acreditado.' },
  { label: 'Retención', short: 'Mantener el vínculo', title: 'Construir una relación que continúe.', formats: 'Boletín recurrente, comunidad IDP y contenidos de la academia.', intent: 'Dar continuidad al aprendizaje y a la participación.', limit: 'El efecto sobre la retención sigue pendiente de validar. El piloto de embajadores no alcanzó la participación esperada.' },
];
