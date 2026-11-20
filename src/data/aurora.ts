import type { StudyImage } from '@/components/case-study-visual';

export function auroraShot(step: string, device: string, file: string, width: number, height: number, alt: string): StudyImage {
  return { src: `/projects/aurora-seguros/${step}/${device}/${file}.png`, width, height, alt };
}

export type AuroraMoment = { label: string; title: string; description: string; rationale: string; image: StudyImage };

export const auroraStart: AuroraMoment[] = [
  { label: 'Inicio', title: 'Pedir datos con una razón visible.', description: 'Nombre, correo y celular abren el recorrido. El texto explica para qué se solicitan y la ayuda queda disponible junto al formulario.', rationale: 'La propuesta hace explícito qué se necesita antes de continuar; la comprensión de estos requisitos todavía debe validarse.', image: auroraShot('S01', 'Mobile', 'initial', 780, 2606, 'Formulario inicial con nombre, correo electrónico, celular y acción Cotizar.') },
  { label: 'Error', title: 'El error señala dónde actuar.', description: 'Un resumen identifica el correo y el mensaje junto al campo muestra un ejemplo de formato. Los demás datos siguen visibles.', rationale: 'La indicación combina texto y color: la persona puede localizar la corrección sin interpretar únicamente un borde rojo.', image: auroraShot('S01', 'Mobile', 'invalid', 780, 2906, 'Resumen Revisa los campos indicados y correo alex@ con un ejemplo de formato válido.') },
  { label: 'Corrección', title: 'Corregir también necesita confirmación.', description: '«Datos corregidos» confirma el cambio e indica que ya se puede pulsar Cotizar. La captura conserva los datos del formulario.', rationale: 'Cerrar el ciclo del error busca dar certeza sobre el siguiente paso; no supone una mejora de conversión demostrada.', image: auroraShot('S01', 'Mobile', 'corrected', 780, 2810, 'Confirmación Datos corregidos, correo completo y botón Cotizar.') },
];

export const auroraPeople: AuroraMoment[] = [
  { label: 'Configurar', title: 'Una persona, una edad identificable.', description: 'La cantidad del grupo y los bloques numerados organizan la captura de edades. Agregar y eliminar personas son acciones explícitas.', rationale: 'Cada edad queda asociada a una persona. Los límites que muestra esta demo no son reglas reales de elegibilidad del seguro.', image: auroraShot('S02', 'Mobile', 'setup', 780, 2882, 'Cantidad de personas, bloques Persona 1 y Persona 2 y campos de edad.') },
  { label: 'Revisar edades', title: 'Orientar la recuperación por persona.', description: 'El resumen nombra las edades pendientes y cada campo muestra «Escribe la edad». La corrección tiene un lugar concreto.', rationale: 'La intención es evitar que un error del grupo se convierta en una búsqueda campo por campo.', image: auroraShot('S02', 'Mobile', 'error', 780, 3254, 'Aviso Revisa las edades indicadas y errores asociados a las personas 1 y 2.') },
  { label: 'Datos completos', title: 'Dejar visible qué grupo continuará.', description: 'Las edades diligenciadas quedan dentro de sus bloques, antes de la acción «Ver planes disponibles».', rationale: 'La configuración puede revisarse antes de pasar a comparar. En esta demostración las edades no modifican el cálculo ilustrativo.', image: auroraShot('S02', 'Mobile', 'complete', 780, 2882, 'Dos personas con edades diligenciadas antes de continuar a planes.') },
  { label: 'Cambio de grupo', title: 'Cambiar asegurados exige revisar la elección.', description: '«Personas actualizadas» explica que el grupo cambió y pide revisar los planes y elegir de nuevo.', rationale: 'El mensaje evita presentar una selección anterior como si siguiera correspondiendo al nuevo grupo.', image: auroraShot('S02', 'Mobile', 'changed', 780, 3142, 'Aviso Personas actualizadas que solicita revisar los planes y elegir de nuevo.') },
];

export const auroraPlans: AuroraMoment[] = [
  { label: 'Comparar', title: 'Leer las alternativas bajo el mismo criterio.', description: 'Esencial, Plus y Premium se presentan con una jerarquía común. El grupo de asegurados sigue visible para dar contexto a la comparación.', rationale: 'Las tarjetas hacen comparables los atributos mostrados. Precios y servicios pertenecen a la demostración, no a una oferta comercial.', image: auroraShot('S03', 'Desktop', 'compare', 2880, 2284, 'Tres tarjetas de planes de ejemplo: Esencial, Plus y Premium, con estructura equivalente.') },
  { label: 'Seleccionar', title: 'La elección debe poder reconocerse.', description: 'Plus aparece marcado como seleccionado. Un resumen superior conserva el plan elegido y ofrece ver el resumen de la selección.', rationale: 'La confirmación se apoya en etiqueta, contorno y resumen; la diferencia no depende solo del color.', image: auroraShot('S03', 'Desktop', 'selected', 2880, 2644, 'Plan Plus seleccionado con etiqueta, borde destacado y resumen de la elección.') },
  { label: 'Ver detalle', title: 'Mostrar más solo cuando hace falta.', description: 'El detalle expandido permite profundizar en una alternativa sin convertir la primera vista en una lista extensa de condiciones.', rationale: 'La divulgación progresiva busca equilibrar comparación y profundidad. La comprensión de las coberturas aún requiere evaluación.', image: auroraShot('S03', 'Desktop', 'detailsExpanded', 2880, 2724, 'Detalle expandido de un plan junto a las otras alternativas de la comparación.') },
];

export const auroraMobilePlans = [
  auroraShot('S03', 'Mobile', 'compare', 780, 4824, 'Comparación móvil de planes de ejemplo con tarjetas apiladas.'),
  auroraShot('S03', 'Mobile', 'selected', 780, 5300, 'Resumen móvil de Plus seleccionado y tarjetas de planes.'),
  auroraShot('S03', 'Mobile', 'detailsExpanded', 780, 4412, 'Tarjeta de plan en móvil con su detalle expandido.'),
];
