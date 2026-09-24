---
name: verify-build
description: Run lint and the production Vite build to catch TypeScript and bundling errors before reporting a task done. Use after non-trivial UI, route, or utility changes — and any time the user asks to "check the build", "make sure it compiles", or "run the checks".
---

# verify-build

Run the project's static checks the same way CI does.

## Commands (run in this order)

1. `npm run lint` — ESLint over the repo (config: `eslint.config.js`, includes `react-hooks` and `react-refresh` plugins).
2. `npm run build` — `vite build`. This is what catches TypeScript errors; there is **no separate `tsc`/typecheck script**.

Both should exit 0. CI runs on **Node 20** with `npm ci` (see `.github/workflows/deploy.yml`); local Node should be on a similar major.

## Steps

1. Run `npm run lint`. If it fails, fix the issues (or surface them clearly) before continuing — don't ignore lint to push through.
2. Run `npm run build`. Output goes to `dist/`.
3. If the build fails, read the error: TypeScript errors usually point at a specific `src/...` file:line — fix at the source rather than loosening `tsconfig.json`.
4. Report the outcome to the user: lint pass/fail, build pass/fail, and any meaningful warnings.

## Don't

- Don't run `npm install` unless `node_modules` is genuinely missing or `package.json` was edited — it's slow and not needed for verification.
- Don't add a `tsc --noEmit` step or a new `typecheck` script unless the user asks; `vite build` already type-checks.
- Don't suppress errors with `// @ts-ignore`, `eslint-disable`, or `--no-verify` to make checks pass. Fix the root cause.
- Don't deploy or push — deployment is automatic from `main` via GitHub Actions.
