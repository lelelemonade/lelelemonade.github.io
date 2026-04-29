---
name: dev-preview
description: Start the Vite dev server in the background so the site can be exercised in a browser, and report the URL for both entry points (main app and stickers). Use when the user asks to "run the site", "start dev", "preview my changes", or after a UI change that needs visual verification.
---

# dev-preview

Bring up the local dev server and tell the user where to look.

## What to run

- `npm run dev` — starts Vite. Default URL is `http://localhost:5173/`.
- The repo has **two HTML entry points** (see `vite.config.ts` and `AGENTS.md`):
  - `http://localhost:5173/` → main app (root `#root`, full site, service workers unregistered on load)
  - `http://localhost:5173/stickers.html` → stickers PWA-style entry (registers `stickers-sw.js`)
- The app uses `HashRouter`, so deep links look like `http://localhost:5173/#/blog`, `/#/news`, `/#/stickers`.

## Steps

1. Start the dev server in the background (don't block on it):
   - Use `Bash` with `run_in_background: true` so the user can continue interacting.
2. Wait briefly for the server to be ready, then report:
   - The base URL (`http://localhost:5173/`)
   - Any specific deep link relevant to the change (e.g. `/#/blog/<NewSlug>` if a blog post was just added)
   - The stickers URL only if the change touches stickers
3. If the port is taken, Vite picks the next free one — read the background process output to get the actual URL before reporting it.
4. When the user is done, kill the background process. **Don't leave dev servers running across sessions.**

## When NOT to use

- Don't start the dev server just to "check" something that `verify-build` would catch (TypeScript / lint errors). Use `verify-build` first; only spin up dev when the user actually needs to see the page render.
- Don't start it for purely content edits to existing markdown files unless the user asked for a visual check.

## Don't

- Don't run `npm run preview` instead — that serves a built `dist/`, which requires a fresh `npm run build` and is rarely what the user wants while iterating.
- Don't suggest opening URLs you haven't confirmed from the dev server's own output.
