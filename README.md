# Soham Dey portfolio

A single-page portfolio built with React, TanStack Start, Vite, and Tailwind CSS.
The portrait, project screenshots, and organization logos are served from `public/images`.

## Local development

With Node.js and Bun installed, run:

```sh
bun install --frozen-lockfile
bun run dev
```

Open http://localhost:8080. Run `bun test` to check the shared portfolio data.

## Production

```sh
bun run build
node .output/server/index.mjs
```
