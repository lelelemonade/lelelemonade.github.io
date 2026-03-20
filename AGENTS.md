# Agent / AI context — lelelemonade.github.io

Concise orientation for coding assistants working in this repository.

## What this is

Personal site for **Zhongli** ([zhongli.dev](https://zhongli.dev)), deployed as a **static** GitHub Pages site from the `gh-pages` branch. Human-oriented overview lives in [README.md](./README.md).

## Stack

| Area | Choice |
|------|--------|
| UI | React 19, TypeScript |
| Build | Vite 6 (`@vitejs/plugin-react`) |
| Styling / components | MUI v7 (`@mui/material`, Emotion) |
| Routing | `react-router-dom` v7 |
| Animations | Framer Motion |
| Markdown | `react-markdown`, `remark-gfm`, `rehype-raw` |
| Stickers / uploads | AWS SDK v3 (S3) — see below |

## Commands

- **Dev:** `npm run dev` (Vite default, typically `http://localhost:5173`)
- **Production build:** `npm run build` → output in `dist/`
- **Preview build:** `npm run preview`
- **Lint:** `npm run lint`

CI uses **Node 20** and `npm ci` (see `.github/workflows/deploy.yml`).

## Routing and hosting

- The app uses **`HashRouter`**, not `BrowserRouter` (`src/main.tsx`). URLs look like `/#/blog`, `/#/news`, etc. This avoids GitHub Pages path issues on user/organization sites.
- Vite **`base` is `'./'`** (`vite.config.ts`) so asset URLs work when the site is served from a subpath or relative hosting.

## Entry points and layouts

Vite is configured with **two HTML entry points** (`vite.config.ts` → `rollupOptions.input`):

1. **`index.html`** → `src/main.tsx`, root `#root`. Full site; **service workers are unregistered** on load (see `main.tsx`).
2. **`stickers.html`** → `src/stickers-main.tsx`, root `#stickers-root`. On load, empty hash is forced to `#/stickers`. **Registers** `stickers-sw.js` for PWA-style behavior.

Both mount the same **`App`** and router tree; only bootstrap and SW behavior differ.

## Source map (where to edit)

| Path | Role |
|------|------|
| `src/App.tsx` | Route table: `/`, `blog`, `blog/:id`, `news`, `news/:id`, `stickers`, catch-all |
| `src/layouts/MainLayout.tsx` | Shared chrome around pages |
| `src/pages/*.tsx` | Page components |
| `src/components/*.tsx` | Reusable UI (e.g. `MarkdownRenderer`, `StickerCard`, `UploadDialog`) |
| `src/hooks/useTheme.ts` | Theme / light–dark behavior |
| `src/context/AnalyticsContext.tsx` | Analytics wiring |
| `src/index.css`, `src/App.css` | Global / app styles |
| `src/utils/markdownLoader.ts` | Blog/news: `import.meta.glob` over markdown, YAML frontmatter |
| `src/utils/s3Service.ts` | S3 list/upload for stickers (temporary creds from HTTP API) |
| `src/utils/stickerLoader.ts` | Sticker loading helpers |
| `src/content/blogs/*.md` | Blog posts (filename = post `id` in routes) |
| `src/content/news/*.md` | News posts (same idea) |
| `public/` | Static assets served as-is |

## Content (blog / news)

- Markdown files under `src/content/blogs/` and `src/content/news/`.
- **Frontmatter** at the top (`---` … `---`) is parsed in `markdownLoader.ts`; fields like `title`, `date`, `excerpt` are expected.
- Post **slug** in the URL is the **file name without `.md`**.

## Stickers and AWS

- `src/utils/s3Service.ts` defines bucket name, key prefix, region, and a **public credentials endpoint** (POST). Upload/list flows depend on that API returning short-lived keys.
- Do **not** commit AWS secrets into the repo; the app is designed around **fetched temporary credentials**, not env files checked into git.
- When changing S3 or API behavior, keep error handling and caching behavior in `s3Service.ts` consistent with existing patterns.

## Deployment

- Push to **`main`** triggers GitHub Actions: build, `touch dist/.nojekyll`, deploy **`dist/`** to **`gh-pages`** via `JamesIves/github-pages-deploy-action@v4`.

## Conventions for changes

- Match existing **MUI + Framer** patterns and component structure in nearby files.
- Prefer **focused diffs**; avoid unrelated refactors or new docs unless requested.
- After substantive UI or route changes, run **`npm run build`** locally to catch TypeScript/Vite errors.
