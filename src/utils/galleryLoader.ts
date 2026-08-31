/**
 * Resolves the static Gallery catalog and its bundled logo assets.
 */

import { gallery } from '../content/gallery';
import { CATEGORIES, CategoryId, PLATFORM_ORDER, Software } from '../content/gallery/types';

// Vite fingerprints and copies every file in logos/ at build time, so logos stay
// local to the repo instead of being fetched from a third party at runtime.
const logoModules = import.meta.glob('/src/content/gallery/logos/*.{svg,png,jpg,jpeg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const logoUrls: Record<string, string> = Object.fromEntries(
  Object.entries(logoModules).map(([path, url]) => [path.split('/').pop() as string, url])
);

export interface GallerySoftware extends Software {
  /** Resolved, build-time URL of the logo — undefined when there is no file. */
  logoUrl?: string;
}

export function getGallery(): GallerySoftware[] {
  return gallery
    .map((item) => ({
      ...item,
      platforms: PLATFORM_ORDER.filter((platform) => item.platforms.includes(platform)),
      logoUrl: item.logo ? logoUrls[item.logo] : undefined,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Categories that actually have entries, with their counts, in catalog order. */
export function getCategories(items: GallerySoftware[]): { id: CategoryId; label: string; count: number }[] {
  return (Object.keys(CATEGORIES) as CategoryId[])
    .map((id) => ({
      id,
      label: CATEGORIES[id],
      count: items.filter((item) => item.category === id).length,
    }))
    .filter((category) => category.count > 0);
}
