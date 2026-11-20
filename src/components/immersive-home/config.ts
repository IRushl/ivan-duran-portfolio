/** Parameters for proposal C only. A, B and Motion Lab retain their settings. */
export const immersiveMotion = {
  depth: 78,
  camera: .9,
  ambient: .85,
  mouse: 1.1,
  density: 560,
  cameraTravel: 220, // World units across the entire Home, not a repeated screen texture.
  orbMouseRotation: .13, // Radians; local cursor response, never a full spin.
  orbMouseOffset: .13, // World units; the HTML layout reserves its own visual area.
  cardTransitionMs: 280,
  showcaseIntervalMs: 3000,
  showcaseIdleMs: 3000,
  showcaseColourMs: 600,
} as const;
