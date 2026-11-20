import type { StudyImage } from '@/components/case-study-visual';
import heroArtwork from '../../public/projects/tripflow/mockups/01-tripflow-hero-ecosistema.png';
import planArtwork from '../../public/projects/tripflow/mockups/02-tripflow-crear-viaje.png';
import expenseArtwork from '../../public/projects/tripflow/mockups/03-tripflow-registrar-gasto.png';
import dashboardArtwork from '../../public/projects/tripflow/mockups/04-tripflow-dashboard.png';
import closingArtwork from '../../public/projects/tripflow/mockups/05-tripflow-showcase-final.png';

function shot(file: string, width: number, height: number, alt: string): StudyImage {
  return { src: `/projects/tripflow/${file}.png`, width, height, alt };
}

function artwork(image: { src: string; width: number; height: number }, alt: string): StudyImage {
  return { src: image.src, width: image.width, height: image.height, alt };
}

export const tripflowImages = {
  hero: artwork(heroArtwork, 'Visualización conceptual generada con IA de tres dispositivos TripFlow: planificación, dashboard y registro de gastos en un entorno de viaje.'),
  plan: shot('ui-original/01-nuevo-viaje', 412, 820, 'Planificación con destino, fechas, presupuesto total, moneda y asignación por categorías antes de Crear Viaje.'),
  trips: shot('ui-original/02-viajes', 412, 1348, 'Mis Viajes con un viaje en curso, próximos viajes y viajes completados, junto al presupuesto de cada uno.'),
  expense: shot('ui-original/03-nuevo-gasto', 412, 820, 'Formulario de gasto con descripción, monto, fecha, categoría y campos opcionales de nota y comprobante.'),
  dashboard: shot('ui-original/04-dashboard', 412, 1348, 'Dashboard original con resumen del viaje, alertas, presupuesto restante y gastos por categoría.'),
  flow: shot('investigacion-referencia/01-journey-flow', 4320, 4256, 'Diagrama original del recorrido entre acceso, creación del viaje, registro del gasto y consulta del dashboard.'),
  closing: artwork(closingArtwork, 'Visualización conceptual generada con IA de los tres momentos de TripFlow junto a una ventana de avión.'),
};

export const tripflowArtworks = [
  artwork(planArtwork, 'Visualización conceptual generada con IA de la planificación del viaje en dos dispositivos, junto a un pasaporte y una brújula.'),
  artwork(expenseArtwork, 'Visualización conceptual generada con IA del registro de gastos, con un dashboard de fondo y objetos de viaje.'),
  artwork(dashboardArtwork, 'Visualización conceptual generada con IA del dashboard de TripFlow con presupuesto, categorías y avisos en un dispositivo.'),
];

export type TripflowDecision = {
  label: string;
  task: string;
  title: string;
  summary: string;
  problem: string;
  decision: string;
  rationale: string;
  expected: string;
  image: StudyImage;
  caption: string;
};

export const tripflowDecisions: TripflowDecision[] = [
  {
    label: '01', task: 'Crear viaje', title: 'Planificar sin perderse entre configuraciones.',
    summary: 'Destino, fechas y presupuesto en una misma secuencia.',
    problem: 'La planificación exigía organizar datos y repetir configuraciones antes de empezar el viaje.',
    decision: 'Reuní destino, fechas, presupuesto y moneda; después, la distribución por categorías permite revisar la asignación antes de crear el viaje.',
    rationale: 'El total, lo asignado y lo restante conviven con categorías como vuelos, alojamiento, comida, transporte y ocio. La persona puede revisar su plan sin cambiar de contexto.',
    expected: 'Llegar al inicio del viaje con una referencia financiera comprensible. La facilidad de configuración debe comprobarse con tareas de planificación.',
    image: tripflowImages.plan, caption: 'Nuevo viaje · Captura original',
  },
  {
    label: '02', task: 'Registrar gasto', title: 'Registrar un gasto sin interrumpir el viaje.',
    summary: 'Datos esenciales primero; detalles adicionales, después.',
    problem: 'Registrar gastos exigía demasiados pasos y procesos repetitivos.',
    decision: 'Organicé descripción, monto y fecha al inicio del formulario, seguidos por categoría. Nota y comprobante se identifican como opcionales.',
    rationale: 'La jerarquía separa el registro del gasto de la información complementaria. El botón de cierre queda después de los datos, dentro de una misma pantalla.',
    expected: 'Reducir la atención que requiere registrar un gasto. El ahorro de tiempo y pasos sigue siendo una hipótesis por validar.',
    image: tripflowImages.expense, caption: 'Nuevo gasto · Captura original',
  },
  {
    label: '03', task: 'Consultar presupuesto', title: 'Entender el presupuesto de un vistazo.',
    summary: 'Una lectura general antes de entrar al detalle por categoría.',
    problem: 'La falta de claridad en el presupuesto dificultaba interpretar rápidamente el estado financiero del viaje.',
    decision: 'Presenté el viaje activo y su presupuesto en la parte superior, seguidos por avisos, una visualización del restante y el desglose por categorías.',
    rationale: 'El resumen ofrece contexto y las categorías permiten profundizar. El diseño combina texto, cifras e indicadores visuales para orientar la consulta.',
    expected: 'Comprender qué se ha gastado y qué queda disponible. Aún hay que revisar la consistencia de los valores de ejemplo y validar la interpretación de los avisos.',
    image: tripflowImages.dashboard, caption: 'Dashboard · Captura original',
  },
];

export const tripflowTargets = [
  { value: '−59 %', label: 'Reducir el tiempo de interacción', note: 'Reducción propuesta; requiere una tarea y una línea base comparables.' },
  { value: '−40 %', label: 'Reducir los pasos por tarea', note: 'Objetivo de simplificación, pendiente de contrastar con el recorrido original.' },
  { value: '+25 %', label: 'Aumentar la retención', note: 'Proyección que requiere seguimiento de uso en el tiempo.' },
  { value: '85 %', label: 'Satisfacción objetivo', note: 'Meta cuyo instrumento y criterio de evaluación aún deben definirse.' },
];
