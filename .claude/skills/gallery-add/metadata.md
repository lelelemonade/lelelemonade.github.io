# gallery-add

## Overview

| Information |  |
| ----------------|---------------------- |
| **Version:** | 1.0.0 |
| **Original Author:** | ZhongLi Shen |
| **Last Updated:** | August 31, 2026 |
| **Last Updated By:** | ZhongLi Shen |

---

## Project Details

| Attribute | Value |
|-----------|-------|
| **Development Time** | ~1 hour |
| **Complexity** | Low |
| **Impact** | Medium |
| **Token Cost** | — |

---

## AI Business Case

The Gallery section of [zhongli.dev](https://zhongli.dev) recommends software, and every card makes
factual claims about someone else's project: which platforms it runs on, what it does, whether it is
free. Adding an entry by hand means looking those facts up in the upstream repo, finding and
downloading a logo, and fitting the result to a typed schema — tedious enough that the tempting
shortcut is to fill the fields from memory. That shortcut is exactly what produces a site full of
quietly wrong claims, because model recall of a project's platform support and pricing goes stale
faster than anything else on the card.

This skill makes the correct path the fast one: one command gathers the real metadata, the logo
lands in the repo as a static asset, and the typed schema plus a build check catches anything
malformed before it ships.

### Key Benefits

- **Facts trace to the source:** taglines are the project's own repo description and platform and
  pricing claims come from the repo and its pricing page, so entries are auditable rather than
  recalled.
- **One-pass logo handling:** candidate icons are surfaced with sizes and the correct default-branch
  raw URL, which removes the two things that actually go wrong — picking a wordmark for a square
  tile, and 404ing on the wrong branch.
- **Verification is built in:** the typed category and platform unions turn a typo into a build
  failure, and the skill checks that the logo actually resolved instead of silently falling back to
  a letter tile.
- **Batching:** several projects are gathered, approved and built in one pass instead of one
  ask-download-build cycle each.

### Overall Impact

Adding software to the site drops from a careful ten-minute manual chore to a single request, while
the entries get more accurate rather than less.
