/** Home-only palette. Project identities and case-study palettes remain independent. */
export const homePalette = {
  accent: '#25dceb', bright: '#a5f6fa', soft: '#8bdae3', dim: '#4d8290',
  border: '#426671', surface: '#142026', muted: '#bed1d7',
  emphasis: '#b6e5eb', fog: '#071015', background: '#080e12',
  orbFaces: '#315e6c', orbEmission: '#174553', key: '#c1f6fc', rim: '#40b7d8',
} as const;

export const homeThemeVariables = Object.fromEntries(Object.entries(homePalette).map(([key,value])=>[`--home-${key.replace(/[A-Z]/g,letter=>`-${letter.toLowerCase()}`)}`,value]));
