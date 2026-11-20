/** Stable world bands: travelling backwards restores the same 3D neighbourhood. */
export function createSpatialBand(band: number, count: number, length: number) {
  let seed = (Math.imul(band + 7321, 1597334677) ^ 9719) | 0;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) | 0; return (seed >>> 0) / 4294967296; };
  return Array.from({ length: count }, () => {
    const angle = random() * Math.PI * 2, radius = 2.8 + Math.pow(random(), .6) * 20;
    return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius * .53,
      worldZ: 16 - (band + random()) * length, phase: random() * Math.PI * 2,
      speed: .3 + random() * .65, size: 4 + random() * 5 };
  });
}
