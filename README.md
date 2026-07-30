# Trending Society — Creator Studio UI

**Live demo → [studio.jeffkliu.com](https://studio.jeffkliu.com)**

A front-end prototype for an AI creator-economy product: 33 screens sharing one design system, one responsive app shell, and a mock data layer built so a real API can drop in behind it.

## Scope, up front

This is a **front-end** piece. There is no backend behind the demo — `server/` exists only to serve the built client, `server/routes.ts` registers no API routes, and every screen reads from `client/src/lib/data/`. The Express, Drizzle, and Postgres dependencies are scaffolding for a backend that isn't built yet.

Saying so plainly because the interesting work here is the front end: composing 33 distinct screens out of a shared primitive set without them drifting apart.

## What's in it

| | |
|---|---|
| Screens | 33 routes |
| Components | 68, of which 55 are shadcn/Radix primitives |
| TypeScript | ~19k lines across `client/src` |
| Bundle | 331 KB gzipped JS, 26 KB gzipped CSS |

Notable pieces:

- **Three-column app shell** ([`Layout.tsx`](client/src/components/layout/)) — persistent left nav, content column, and a collapsible Trend Watch rail that drops to bottom tabs on mobile.
- **Data isolated from presentation** — all fixtures live in [`lib/data/`](client/src/lib/data/) behind exported types, and [`lib/api/`](client/src/lib/api/) already holds a typed HTTP client plus React Query wrappers. Swapping fixtures for endpoints is a change in one layer.
- **Centralized asset URLs** ([`lib/constants/urls.ts`](client/src/lib/constants/urls.ts)) — every external image resolves through one module, so a CDN move is one file.
- **Custom hooks for page state** — `useCreationStudio` folds 11 related values into one hook instead of a stack of `useState` calls in the component.

## Stack

| Layer | Choice |
|---|---|
| UI | React 19 + TypeScript |
| Build | Vite 7 |
| Routing | wouter (chosen over React Router for bundle size) |
| Styling | Tailwind 4 |
| Primitives | Radix UI + shadcn |
| Async state | React Query (wired, currently unused) |
| Hosting | Vercel, static output |

## Run it locally

```bash
npm install
npm run dev          # http://localhost:5000
```

macOS squats port 5000 with the AirPlay Receiver (ControlCenter). Either turn it off in System Settings → General → AirDrop & Handoff, or pick another port:

```bash
PORT=5174 npm run dev
```

```bash
npm run check        # tsc, no emit
npm run build        # client → dist/public
```

## Deployment

Static output on Vercel. [`vercel.json`](vercel.json) overrides two framework-preset defaults that each break the build alone:

- `buildCommand: vite build` — the default `npm run build` also esbuilds the unused Express server
- `outputDirectory: dist/public` — the Vite preset assumes `dist`
- an SPA rewrite to `/index.html`, without which every non-root route 404s on direct navigation

## Known gaps

- No backend, no auth, no persistence. `MemStorage` is an unused in-memory stub.
- `MOCK_ARTICLES` skips id 15.
- `RightSidebar` hand-rolls an `ArrowRight` SVG that `lucide-react` already exports, and imports from the deprecated `lib/mockData` shim rather than `lib/data`.
- The JS bundle is a single 1.2 MB chunk; no route-level code splitting yet.

## Docs

- [ARCHITECTURE.md](ARCHITECTURE.md) — module layout and data flow
- [CONVENTIONS.md](CONVENTIONS.md) — coding patterns
