---
name: new-news-post
description: Scaffold a new news / timeline entry under src/content/news/ with the project's frontmatter format. Use when the user asks to "add a news item", "post an update", "log a life event", or similar short-form entry.
---

# new-news-post

Create a new news entry — these are the short, dated items that appear on the news / timeline page.

## Where the file goes

- Path: `src/content/news/<Slug>.md`
- The **filename without `.md` is the URL slug** — route is `/#/news/<Slug>`.
- The new file is auto-discovered by `src/utils/markdownLoader.ts` (no registry edit needed).

## Required frontmatter

Mirror the existing news files (e.g. `src/content/news/JoinedTrivago.md`):

```markdown
---
layout: post
title: <Short title>
date: YYYY-MM-DD HH:MM:SS-ZZZZ
inline: true
related_posts: false
---

<Short body — markdown + raw HTML allowed (rehype-raw is enabled)>
```

Notes:
- `date` must be `new Date(...)`-parseable; posts are sorted newest-first.
- `inline: true` and `related_posts: false` are conventions kept across existing news entries — preserve them unless the user explicitly wants different behavior.
- The loader truncates the excerpt to ~20 chars when `description` is missing, so news items don't need a `description` field.
- For embedded video, use the same responsive `<iframe>` wrapper used in `JoinedTrivago.md`.

## Steps

1. Confirm the slug if not obvious; check `src/content/news/` for collisions.
2. Create the file with frontmatter above and the user's content.
3. Do **not** edit `App.tsx`, `markdownLoader.ts`, or any list page.
4. Tell the user the resulting URL: `/#/news/<Slug>`.

## Don't

- Don't add a long-form essay here — those belong in `src/content/blogs/`. If the user's content runs more than a few paragraphs, ask whether they meant a blog post instead.
