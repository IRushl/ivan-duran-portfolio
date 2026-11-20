import type { Metadata } from 'next';
import { MotionLab } from '@/components/motion-lab/motion-lab';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Motion Lab · Profundidad espacial',
  description: 'Laboratorio aislado de cámara, partículas y profundidad tridimensional.',
  robots: { index: false, follow: false },
};

export default function MotionLabPage() {
  if (process.env.ENABLE_INTERNAL_LABS !== 'true') notFound();
  return <MotionLab />;
}
