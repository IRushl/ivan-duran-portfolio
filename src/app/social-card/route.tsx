import { ImageResponse } from 'next/og';
import { profile } from '@/data/profile';
import { socialImage } from '@/data/site';

export const dynamic = 'force-static';

export function GET() {
  return new ImageResponse(
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100%', background: '#101114', color: '#f5f4f0', padding: 88 }}>
      <div style={{ color: '#a3e635', fontSize: 30 }}>{profile.role}</div>
      <div style={{ fontSize: 115, fontWeight: 700, letterSpacing: -6, marginTop: 8 }}>{profile.name}</div>
      <div style={{ color: '#b8bdc7', fontSize: 34, marginTop: 24 }}>Portafolio de diseño de producto</div>
    </div>,
    { width: socialImage.width, height: socialImage.height },
  );
}
