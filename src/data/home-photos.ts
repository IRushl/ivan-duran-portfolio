/** Supplied photographs selected for integration by the owner; originals stay outside public/. */
export const homePhotos = {
  industrial: { src: '/about/formacion-diseno-industrial.webp', width: 1200, height: 1600, alt: 'Fotografía de graduación de Diseño Industrial junto a un acompañante, con el diploma.' },
  marketing: { src: '/about/formacion-mercadotecnia.webp', width: 1200, height: 1600, alt: 'Fotografía de graduación de la especialización junto a una acompañante, con el diploma.' },
  collaboration: { src: '/about/colaboracion.webp', width: 1280, height: 960, alt: 'Un grupo de cuatro compañeros frente a un tablero con notas.' },
  personal: { src: '/about/momento-personal.webp', width: 1080, height: 1352, alt: 'Un momento personal junto a un perro, en un espacio interior.' },
} as const;
export type HomePhoto = (typeof homePhotos)[keyof typeof homePhotos];
