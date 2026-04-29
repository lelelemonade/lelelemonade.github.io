---
name: new-page
description: Scaffold a new top-level React page under src/pages/ and wire it into the route table in src/App.tsx. Use when the user wants to "add a new page", "create a /something route", or "add a section to the site".
---

# new-page

Add a new top-level page to the site.

## Files involved

- Create: `src/pages/<PageName>Page.tsx`
- Edit: `src/App.tsx` — add a `<Route>` inside the existing `<Route path="/" element={<MainLayout />}>` block, **above** the catch-all `path="*"` route.

## Routing notes

- The app uses `HashRouter` (see `src/main.tsx`), so the user-facing URL will be `/#/<path>`.
- Don't put the new route outside the `MainLayout` wrapper unless the user explicitly wants a layout-less page (e.g. like the separate `stickers.html` entry).
- The catch-all `path="*"` must remain **last**.

## Page template

Match the existing pages in `src/pages/` — MUI v7 + Framer Motion conventions. Minimal scaffold:

```tsx
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const <PageName>Page: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Box>
          <Typography variant="h3" gutterBottom>
            <PageName>
          </Typography>
          {/* content */}
        </Box>
      </motion.div>
    </Container>
  );
};

export default <PageName>Page;
```

## Steps

1. Confirm the page name and URL path with the user if ambiguous.
2. Look at a sibling page (e.g. `src/pages/BlogPage.tsx`) before writing — copy its style, spacing, and animation conventions instead of inventing new ones.
3. Create `src/pages/<PageName>Page.tsx`.
4. In `src/App.tsx`:
   - Add `import <PageName>Page from './pages/<PageName>Page';` with the other page imports.
   - Add `<Route path="<url-path>" element={<<PageName>Page />} />` **above** the `path="*"` line.
5. Run `npm run build` (or use the `verify-build` skill) to catch typing/route mistakes.

## Don't

- Don't switch the app to `BrowserRouter` — `HashRouter` is intentional for GitHub Pages hosting (see `AGENTS.md`).
- Don't create a new HTML entry in `vite.config.ts` unless the user wants a fully separate bundle like `stickers.html`.
