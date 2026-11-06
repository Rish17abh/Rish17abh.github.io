# Rishabh Ramteke portfolio

Responsive Next.js portfolio with light/dark themes, an interactive data-cloud illustration, outcome graphics, selectable workflow diagrams, five case-study routes and stationary cursor-responsive colored dots.

## Preview locally

Requires Node.js 22 or newer and npm.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. The preview is local to this computer.

## Production export

```sh
npm run build
npm run preview
```

The static website is generated in `out/`. Stop the development server before running the production preview on the same port, or use `PORT=3001 npm run preview`.

## Validation

```sh
npm run typecheck
node --test tests/cursor-physics.test.mjs
```

## Content and design

- `src/lib/projects.ts`: source-grounded case-study content.
- `src/components/project-workbench.tsx`: desktop picker and mobile navigation.
- `src/components/outcome-explorer.tsx`: metric graphics and interactive workflow nodes.
- `src/components/hero-art.tsx`: interactive data cloud → patterns → insight → decision illustration.
- `src/components/cursor-companion.tsx`: stationary dot plane with cursor-responsive colors and moderated acceleration response.
- `src/app/globals.css`: system typography, white/graphite themes and project colors.

Source documents are not bundled into the public site. Metrics preserve their original scope, ranges and prototype qualifications. No private records, original résumé download or visitor analytics are included.

## Public hosting

Published at https://rish17abh.github.io using GitHub Pages.
The `main` branch contains the source; `gh-pages` contains the production export.
Build with `NEXT_PUBLIC_SITE_URL=https://rish17abh.github.io npm run build`, then publish the contents of `out/` to `gh-pages`, including a `.nojekyll` file.
