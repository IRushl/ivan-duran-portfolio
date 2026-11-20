import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { indexable, siteOrigin } from '@/data/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!indexable || !siteOrigin) return [];

  return ['/', ...projects.map(({ slug }) => `/proyectos/${slug}`)].map(path => ({
    url: new URL(path, siteOrigin).href,
  }));
}
