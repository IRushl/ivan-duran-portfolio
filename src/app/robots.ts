import type { MetadataRoute } from 'next';
import { indexable, siteOrigin } from '@/data/site';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/home-preview', '/motion-lab'] },
    ...(indexable && { sitemap: new URL('/sitemap.xml', siteOrigin).href }),
  };
}
