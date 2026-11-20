import type { StudyImage } from '@/components/case-study-visual';

export type AuroraMockupAsset = StudyImage & { note: string };

function mockup(file: string, alt: string, note: string, width = 1122, height = 1402): AuroraMockupAsset {
  return { src: `/projects/aurora-seguros/mockups/${file}.png`, width, height, alt, note };
}

export const auroraMockups = {
  hero: mockup('cotizacion-salud-flex-dispositivos', 'Composición conceptual de Salud Flex en laptop y teléfono, sobre un escenario teal.', 'Visualización conceptual con IA. Los detalles de interfaz pueden diferir del prototipo.', 1672, 941),
  start: mockup('aurora-salud-flex-mobile-inicio', 'Presentación conceptual de un teléfono con el inicio de la cotización Salud Flex.', 'Visualización editorial del diseño; las capturas originales documentan la interfaz.'),
  people: mockup('aurora-salud-flex-mobile-asegurados', 'Presentación conceptual de un teléfono con la configuración de un grupo de asegurados.', 'Visualización editorial de la configuración de asegurados.'),
  plans: mockup('aurora-salud-flex-desktop-planes', 'Composición conceptual de una laptop con tarjetas de planes de salud.', 'Visualización editorial: precios y coberturas difieren del prototipo; no es una oferta comercial.'),
  summary: mockup('aurora-salud-flex-desktop-resumen', 'Presentación conceptual de un resumen de selección en una laptop.', 'La contratación representada es conceptual: el prototipo termina en una selección demostrativa.'),
};
