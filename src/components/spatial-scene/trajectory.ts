export type LabSettings = {
  depth: number;
  camera: number;
  ambient: number;
  mouse: number;
  density: number;
};

export const defaults: LabSettings = { depth: 64, camera: 1, ambient: 1, mouse: 1, density: 600 };
export const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));
const smooth = (value: number) => { const t = clamp(value); return t * t * (3 - 2 * t); };

// Absolute progress, rather than accumulated scroll deltas, makes the path reversible.
export function cameraPose(progress: number, intensity: number, depth: number) {
  const travel = smooth((progress - .2) / .65);
  const distance = depth * .57 * intensity;
  const bend = Math.sin(travel * Math.PI);
  return {
    x: -bend * 3.6 * intensity,
    y: 1.1 + Math.sin(travel * Math.PI * 1.25) * 1.1 * intensity,
    z: 16 - distance * travel,
    targetX: -Math.sin(travel * Math.PI * 1.4) * 1.8 * intensity,
    targetY: -.4 + travel * .7,
    fade: 1 - smooth((progress - .85) / .15),
  };
}

export function phaseAt(progress: number) {
  return progress < .2 ? '01 / Ambiente' : progress < .6 ? '02 / Inmersión' : progress < .85 ? '03 / Profundidad' : '04 / Salida';
}
