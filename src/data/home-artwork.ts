const illustration = (file: string, alt: string, position = '50% 50%') => ({ src: `/home/illustrations/${file}.webp`, width: 752, height: 1008, alt, position });

/** Supplied AI illustrations, never documentary photos or evidence of project work. */
export const capabilityArtwork = [
  illustration('01_product_thinking_ux_research', 'Ilustración conceptual generada con IA: notas, recorridos y wireframes sobre una mesa, sin personas.', '50% 47%'),
  illustration('02_ux_ui_interaction_design', 'Ilustración conceptual generada con IA: pantallas y flujos de interacción en dispositivos, sin personas.', '50% 43%'),
  illustration('03_design_systems_prototyping', 'Ilustración conceptual generada con IA: una pantalla con componentes y patrones de interfaz, sin personas.', '50% 42%'),
  illustration('04_ai_assisted_workflows', 'Ilustración conceptual generada con IA: un portátil y un diagrama de automatización, sin personas.', '50% 43%'),
] as const;
export const interestArtwork = [
  illustration('05_entrenamiento', 'Ilustración conceptual generada con IA: gimnasio vacío con pesas y equipamiento.', '50% 46%'),
  illustration('06_tecnologia', 'Ilustración conceptual generada con IA: dispositivos digitales sobre un escritorio, sin personas.', '50% 53%'),
  illustration('07_aprendizaje_continuo', 'Ilustración conceptual generada con IA: un espacio de estudio con libros y portátil, sin personas.', '50% 55%'),
  illustration('08_creatividad', 'Ilustración conceptual generada con IA: mesa con bocetos y materiales de diseño, sin personas.', '50% 58%'),
] as const;
