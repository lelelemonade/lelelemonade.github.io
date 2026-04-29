---
name: new-component
description: Scaffold a new reusable React component under src/components/ following the project's MUI v7 + Framer Motion + TypeScript conventions. Use when the user asks to "add a component", "extract this into a component", or "create a reusable X".
---

# new-component

Add a new reusable component to `src/components/`.

## Conventions in this repo

- One component per file. Filename = `PascalCase.tsx` and matches the exported component name.
- Default export of the component. Props declared as a typed interface, not inline.
- UI primitives come from **MUI v7** (`@mui/material`, `@mui/icons-material`). Don't add a new component library.
- Animations use **Framer Motion** when needed (see `AnimatedCard.tsx`, `HeroSection.tsx`).
- Styling: prefer MUI's `sx` prop; use Emotion `styled(...)` only when the component is already complex enough to warrant it (look at sibling files for examples).
- No CSS modules, no Tailwind — global styles live in `src/index.css` / `src/App.css` only.

## Template

```tsx
import { Box, Typography } from '@mui/material';

interface <Name>Props {
  // ...required props
}

const <Name>: React.FC<<Name>Props> = ({ /* destructure props */ }) => {
  return (
    <Box sx={{ /* ... */ }}>
      <Typography variant="body1">{/* ... */}</Typography>
    </Box>
  );
};

export default <Name>;
```

## Steps

1. Skim 1–2 nearby components (e.g. `src/components/FeatureCard.tsx`, `src/components/SkillChip.tsx`) so the new file matches their density and style. **Do this before writing — don't invent a new pattern.**
2. Create `src/components/<Name>.tsx`.
3. If the component has a non-obvious public surface, expose props through a typed `interface`, not `type` aliases or inline object types — the rest of the codebase uses `interface`.
4. Import from the new component in the requested call-site, if the user named one.
5. After substantial UI work, run `npm run build` (or use `verify-build`) to catch type errors before declaring done.

## Don't

- Don't add a new dependency for something MUI already provides (icons, layout, typography, dialogs, etc.).
- Don't create an `index.ts` barrel file in `src/components/` — the project imports from each file directly.
- Don't write multi-paragraph JSDoc on simple components; the repo style is terse.
