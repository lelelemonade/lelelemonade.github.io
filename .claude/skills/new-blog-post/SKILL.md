---
name: new-blog-post
description: Scaffold a new blog post markdown file under src/content/blogs/ with the project's frontmatter format. Use when the user asks to "add a blog post", "write a new blog", "create a new article", or similar.
---

# new-blog-post

Create a new blog post for this site.

## Where the file goes

- Path: `src/content/blogs/<Slug>.md`
- The **filename without `.md` is the URL slug** — it appears in the route `/#/blog/<Slug>`. Use PascalCase or kebab-case, no spaces.
- A new file is the only thing required; `src/utils/markdownLoader.ts` picks it up via `import.meta.glob` at build time. Do **not** edit any registry.

## Required frontmatter

Match the existing posts in `src/content/blogs/`. The parser in `markdownLoader.ts` reads simple `key: value` lines (no nested YAML).

```markdown
---
layout: post
title: <Human readable title>
date: YYYY-MM-DD HH:MM:SS
description: <One-sentence summary used as the excerpt>
---

<Body in GitHub-flavored markdown>
```

Notes:
- `date` must parse with `new Date(...)` — posts are sorted newest-first by this field.
- If `description` is omitted the loader falls back to the first ~150 chars of the body, but always include it.
- Raw HTML inside the body works (rendered via `rehype-raw`) — useful for embedded iframes (see existing news posts).

## Steps

1. Confirm the slug with the user if it's not obvious from the request.
2. Check `src/content/blogs/` to make sure the slug isn't already taken.
3. Create the file with the frontmatter above and the user's content (or a placeholder body if they only gave a title).
4. Do **not** modify `App.tsx`, `markdownLoader.ts`, or any list page — the new post will appear automatically.
5. Mention the resulting URL: `/#/blog/<Slug>`.

## Don't

- Don't run `npm run build` just to "register" the post — the glob picks it up at dev/build time on its own.
- Don't add fields the loader doesn't read (e.g. `tags`, `categories`) unless the user asks; they'll be silently dropped.
