/**
 * Types and vocabularies for the Gallery — a curated list of software I think is
 * really good. Everything here is static: edit `index.ts`, drop a logo in
 * `logos/`, commit.
 */

// Categories. Add a new one here and it shows up as a filter automatically.
export const CATEGORIES = {
  utilities: 'Utilities',
  'developer-tools': 'Developer Tools',
  efficiency: 'Efficiency',
  media: 'Media',
  communication: 'Communication',
  security: 'Security & Privacy',
  terminal: 'Terminal & Shell',
} as const;

export type CategoryId = keyof typeof CATEGORIES;

// Supported platforms. Add a new one here and to PLATFORM_ORDER below.
export const PLATFORMS = {
  macos: 'macOS',
  windows: 'Windows',
  linux: 'Linux',
  ios: 'iOS',
  android: 'Android',
  web: 'Web',
  cli: 'CLI',
} as const;

export type PlatformId = keyof typeof PLATFORMS;

// Display order for platform chips, independent of how entries list them.
export const PLATFORM_ORDER: PlatformId[] = [
  'macos',
  'windows',
  'linux',
  'ios',
  'android',
  'web',
  'cli',
];

export interface Software {
  /** Stable slug, unique across the catalog. Used as the React key. */
  id: string;
  name: string;
  /** One-liner shown under the name. Prefer the project's own wording. */
  tagline: string;
  category: CategoryId;
  platforms: PlatformId[];
  /** Official upstream — a GitHub repo whenever the project has one. */
  upstream: string;
  /** Homepage, when it differs from the upstream repo. */
  website?: string;
  /** SPDX identifier, or a short label like "Proprietary". */
  license?: string;
  /** Bullet list of the main features. Keep each one short. */
  features: string[];
  /**
   * File name inside `src/content/gallery/logos/` (e.g. `vorssaint.svg`).
   * Omit it and the card falls back to a letter tile.
   */
  logo?: string;
  /** Why it made the list. Optional personal note. */
  note?: string;
}
