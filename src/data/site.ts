import { profile } from './profile';

const configuredUrl = process.env.SITE_URL?.trim() || profile.siteUrl;
const parsedUrl = URL.canParse(configuredUrl) ? new URL(configuredUrl) : undefined;

export const siteOrigin = parsedUrl?.protocol === 'https:' && !parsedUrl.username && !parsedUrl.password
  ? new URL(parsedUrl.origin)
  : undefined;

export const indexable = Boolean(siteOrigin && process.env.VERCEL_ENV !== 'preview');

export const socialImage = {
  url: '/social-card',
  width: 1200,
  height: 630,
  alt: `${profile.name} · ${profile.role}`,
};
