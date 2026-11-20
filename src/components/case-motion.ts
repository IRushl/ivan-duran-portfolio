type MotionKind = 'heading' | 'image' | 'copy' | 'panel';

export const CASE_STAGGER = 70;

const activeAnimations = new WeakMap<Element, Animation>();
const frames: Record<MotionKind, Keyframe[]> = {
  heading: [{ opacity: .55, transform: 'translateY(24px)' }, { opacity: 1, transform: 'none' }],
  image: [{ opacity: .65, transform: 'translateY(16px) scale(.975)' }, { opacity: 1, transform: 'none' }],
  copy: [{ opacity: .7, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }],
  panel: [{ opacity: .78, transform: 'translateX(8px)' }, { opacity: 1, transform: 'none' }],
};

export function playCaseMotion(target: Element | null, kind: MotionKind = 'copy', delay = 0) {
  if (!target || typeof target.animate !== 'function' || typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('print').matches) return;

  activeAnimations.get(target)?.cancel();
  const style = window.getComputedStyle(target);
  const animation = target.animate(frames[kind], {
    duration: Number.parseFloat(style.getPropertyValue(`--case-motion-${kind}`)) || 480,
    easing: style.getPropertyValue('--case-motion-ease').trim() || 'ease-out',
    delay,
    // The base content remains visible before hydration and after playback.
    // Even the first animated frame is readable in an early screenshot.
    fill: 'backwards',
  });
  activeAnimations.set(target, animation);
  return animation;
}

export function cancelCaseMotion(root: Element) {
  root.getAnimations?.({ subtree: true }).forEach((animation) => animation.cancel());
}
