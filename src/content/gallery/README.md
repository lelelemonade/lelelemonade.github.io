# Gallery content

Curated list of software worth recommending, rendered by [`src/pages/GalleryPage.tsx`](../../pages/GalleryPage.tsx).
Everything is static and lives in this repo — no runtime fetches, no external asset hosts.

```
src/content/gallery/
├── index.ts     ← the catalog (edit this)
├── types.ts     ← Software type + category / platform vocabularies
├── logos/       ← logo files, one per entry
└── README.md
```

## Adding software

1. **Drop the logo** in `logos/`, named after the entry `id` — e.g. `logos/vorssaint.svg`.
   SVG preferred; `.png`, `.jpg`, `.jpeg` and `.webp` also work. Keep it square-ish
   and under ~100 KB. Vite fingerprints and copies it at build time.
2. **Append an entry** to the `gallery` array in `index.ts`:

   ```ts
   {
     id: 'ripgrep',                                   // unique slug
     name: 'ripgrep',
     tagline: 'Recursively search directories for a regex pattern, fast.',
     category: 'developer-tools',                     // key of CATEGORIES in types.ts
     platforms: ['macos', 'linux', 'windows', 'cli'], // keys of PLATFORMS in types.ts
     upstream: 'https://github.com/BurntSushi/ripgrep', // prefer the GitHub repo
     website: 'https://example.com',                  // optional
     license: 'MIT',                                  // optional, SPDX id
     logo: 'ripgrep.svg',                             // optional, file in logos/
     features: [                                      // keep bullets short
       'Respects .gitignore by default',
       'Unicode-aware and multiline search',
     ],
     note: 'Why it made the list.',                   // optional
   }
   ```

3. Run `pnpm build` (or `pnpm dev`) — TypeScript catches unknown categories and platforms.

Entries render sorted by name, so the order in `index.ts` does not matter.

## Adding a category or platform

Add the key/label pair to `CATEGORIES` or `PLATFORMS` in `types.ts`. For a platform,
also add it to `PLATFORM_ORDER` (chip display order) and map an icon for it in
[`src/components/SoftwareCard.tsx`](../../components/SoftwareCard.tsx). Category filter
chips are derived automatically and only appear once a category has entries.

## Logos and trademarks

Logos belong to their projects and are used here only to identify the software.
Check the project's own trademark/brand terms before committing its logo, and drop
the `logo` field if the terms do not allow redistribution — the card then falls back
to a letter tile.
