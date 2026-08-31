---
name: gallery-add
description: Adds software to the Gallery section of this site (src/content/gallery/) — gathers the project's real metadata from its upstream GitHub repo, downloads its logo, appends a typed entry and verifies the build. Use this whenever the user wants to list, add, recommend, or feature a piece of software on the site, or mentions the Gallery at all: "add X to the gallery", "put Zed on my site", "I want to recommend this tool", "add these three apps", or when they simply paste a GitHub repo URL or an app name with the apparent intent of listing it. Also use it to fix or refresh an existing entry whose facts have gone stale. Prefer this over editing src/content/gallery/index.ts by hand — the entry's facts have to come from the upstream repo rather than from memory, and this skill is what enforces that.
---

# Adding software to the Gallery

The Gallery is a curated list on [zhongli.dev](https://zhongli.dev/#/gallery) of software worth
recommending. Each card carries the project's upstream link, the platforms it runs on, its main
features, a category, a license and a logo.

Two properties make this section worth doing carefully:

- **Everything is static and lives in this repo.** No runtime fetches, no external image hosts. So
  adding software means committing a data entry *and* a logo file.
- **The facts on the card are claims about someone else's project.** A wrong platform list or an
  invented feature makes the site less trustworthy, and nobody proofreads a personal site. So every
  field traces back to the upstream repo, not to what you remember about the tool.

Your job is to turn "add Zed" into a correct, committed entry that builds.

## Read these first

The vocabularies and the schema live in code, and code is the source of truth — do not rely on the
lists reproduced anywhere else, including in this file:

- `src/content/gallery/types.ts` — the `Software` type, plus the `CATEGORIES` and `PLATFORMS` keys
  you are allowed to use. Read it every time; categories get added.
- `src/content/gallery/index.ts` — the catalog. Match the field order and prose style of the
  entries already there.
- `src/content/gallery/README.md` — the human-facing version of this workflow, worth a skim if
  something in the layout surprises you.

## Workflow

### 1. Resolve the target to a GitHub repo

The user may give you a URL, an `owner/repo`, or just a name ("iina", "that lossless video cutter").

With a name, find the repo — `gh search repos <name> --limit 5 --json fullName,description,stargazerCount`
usually settles it, and star count plus description is enough to recognise the real project versus a
fork or a namesake. If two candidates are genuinely plausible, ask rather than guess; picking the
wrong `owner/repo` poisons every field downstream.

Some software has no single upstream repo (commercial apps, or projects like Telegram with one repo
per client). Pick the repo that best represents what the user would actually download, and say which
one you picked and why. If the project has no public repo at all, use its homepage as `upstream` and
tell the user the entry will not have a GitHub link.

### 2. Gather the facts

Run the bundled helper — it makes the four calls this step always needs and prints them together:

```bash
.claude/skills/gallery-add/scripts/gather.sh owner/repo
```

It reports repo metadata (description, homepage, license, **default branch**, topics, stars), the
README, and candidate logo assets with their sizes and paths.

From that output:

- **tagline** — the repo's own `description`, verbatim. It is the project's self-description, it is
  short by construction, and using it means the card cannot overstate what the software does. Only
  write your own if the description is empty or is pure marketing noise.
- **features** — from the README's own feature list, condensed to short bullets (4–6 is the sweet
  spot). Prefer what makes this software distinctive over what every tool in its category does.
- **platforms** — from what the README or release page actually claims. This is the field most often
  gotten wrong from memory: editors add Windows support, Mac-only apps stay Mac-only, and "it's
  Electron so it must be cross-platform" is not evidence. If the README does not say, check the
  releases (`gh release view --json assets`) and infer from the asset extensions.
- **license** — the SPDX id. `NOASSERTION` from the API means the repo has multiple or non-standard
  license files; look at what is actually in the repo root and write what you find, e.g.
  `GPL-3.0 / Apache-2.0`.
- **category** — one of the keys in `CATEGORIES`. If nothing fits, propose a new key to the user
  before adding it; a category with one member forever is worse than a slightly loose fit, and the
  filter chips only render categories that have entries.
- **note** — optional, and this is the one field that is allowed to be opinionated, because it is
  the user's voice: why this made the list. Write a draft in their register (the existing notes are
  dry, specific, first-person) and let them redo it.

Where a project's story has a caveat a reader would want — a proprietary server behind open-source
clients, an account requirement, a license that is not what people assume — put it in the `note`.
The Gallery is a recommendation, not an advertisement, and the existing entries do this.

### 3. Pick and download the logo

The helper lists candidate assets. Choose on these grounds, in order:

1. **Square.** The card renders the logo in a 56×56 tile with `objectFit: contain`, so a wordmark
   sitting in a square box looks like a mistake. App icons and brandmarks beat README banners.
2. **Vector, or 256–512px raster.** SVGs under ~4 KB get inlined into the bundle by Vite, which is
   ideal. Above that, a 256px PNG is plenty for a 56px tile.
3. **Reasonably small.** Under ~100 KB. Some repos only ship a 1024px icon — take it and note the
   size to the user, or downscale with `sips -Z 512 <file>`.

Downloading a file into the user's repo is their call, so **ask before you fetch**, naming the file,
its source path, and its size. If they decline, drop the `logo` field from the entry — the card
falls back to a letter tile, which is a deliberate, decent-looking fallback rather than a broken
image.

Save it as `src/content/gallery/logos/<id>.<ext>` where `<id>` is the entry's `id`.

Two things reliably go wrong here:

- **`raw.githubusercontent.com` 404s on the wrong branch.** Many repos are not on `main` —
  Insomnia is `develop`, Telegram Desktop is `dev`. Use the default branch the helper printed.
- **Logos carry trademark terms even when the code is open source.** Identifying software in a list
  is ordinary nominative use, but if the project's own terms restrict redistributing its logo, say
  so to the user and let them decide; dropping `logo` is always a safe out.

### 4. Write the entry

Append to the `gallery` array in `src/content/gallery/index.ts`, matching the field order used by
the entries above it. Array order does not matter — the page sorts by name — so appending is fine
and keeps the diff clean.

The `id` is a lowercase slug, unique in the file, and it is what the logo file is named after.

### 5. Verify

```bash
pnpm build && pnpm lint
```

The build is a real check here, not a formality: `CategoryId` and `PlatformId` are string-literal
unions, so a mistyped category or platform fails compilation rather than rendering something wrong.

The build cannot catch a logo that silently failed to resolve, though — a filename that does not
match the `logo` field just yields a letter tile. Confirm the logo made it into the bundle:

```bash
pnpm build 2>&1 | grep -E "<id>|data:image/svg"
```

A PNG shows up as an emitted asset; a small SVG is inlined and will not appear as a file, so grep
the bundle for it instead (`grep -c "data:image/svg" dist/assets/src-*.js`).

If you can drive a browser, loading `/#/gallery` and looking at the card is the fastest way to catch
a logo that renders badly — a dark icon on a dark tile, or a wordmark squeezed into a square.

### 6. Report

Summarize as a table: name, category, platforms, license, logo source. Then state plainly which
facts came from where, and flag any judgment call you made — a chosen repo among several, a new
category, a caveat you put in the note, a logo bigger than you wanted. The user is the one
committing this; they should not have to re-derive your reasoning to review it.

## Handling several at once

"Add these six" is a common ask. Gather metadata for all of them first, then present one batched
permission request for all the logo downloads with sources and sizes listed, then write all the
entries and build once. Six sequential ask-download-build cycles is a worse experience than one
pass, and the build is the same cost for one entry or six.

## What not to do

- **Do not fill fields from memory.** You probably do know what ripgrep does. The failure mode is
  not ignorance, it is confident staleness — Zed shipped Windows, Insomnia changed its storage
  model, licenses get relaunched. Read the repo.
- **Do not pad the feature list.** Six sharp bullets beat ten that include "cross-platform" and
  "actively maintained".
- **Do not hotlink a logo.** The whole section is static by design; a remote `<img src>` breaks that
  and rots.
- **Do not invent a category to avoid asking.** Adding a key to `CATEGORIES` changes the site's
  taxonomy, which is the user's call.
