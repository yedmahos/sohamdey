# Soham Dey's portfolio

My portfolio is a single page built with React, TanStack Start, Vite, and Tailwind CSS. The work section includes TRINETRAA, my work on financial fraud detection, alongside the Dharitri cattle health platform and Cluster Lens, an image segmentation tool.

Project descriptions, screenshots, and contact links are listed in `src/lib/constants.ts`. The portrait, project screenshots, and organization logos live in `public/images`.

## Run locally

You'll need Node.js and Bun. From the project folder, run

```sh
bun install --frozen-lockfile
bun run dev
```

Open http://localhost:8080. Run `bun test` to check the contact and résumé links and the order of the organization logos.

## Build for production

To run the production build locally, use

```sh
bun run build
node .output/server/index.mjs
```
