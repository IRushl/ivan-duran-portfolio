/** Distances are fractions of viewport height per message, not wheel-event counts. */
export const homeStoryTiming = {
  narrative: { viewportPerStage: 1.6, textTravel: 24 },
  photo: { viewportPerStage: 2, textTravel: 1.08 },
  entrance: .2,
  hold: .6,
  exit: .2,
  photoCrossfade: 1,
} as const;
