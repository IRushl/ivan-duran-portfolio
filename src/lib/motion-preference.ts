export const motionPreferenceKey='portfolio-motion';
export const motionPreferenceEvent='portfolio-motion-change';
export function readMotionPreference() { try { return localStorage.getItem(motionPreferenceKey)==='paused'; } catch { return false; } }
