# RAISC Robotics Club

An informational website for GKCIET’s student-led Robotics, AI and Intelligent Systems Club.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/raisc-club/src/App.tsx` — single-page club website content and interactions
- `artifacts/raisc-club/src/index.css` — dark robotics visual system, typography, responsive layout, and motion
- `artifacts/raisc-club/.replit-artifact/artifact.toml` — web artifact routing and preview configuration

## Architecture decisions

- The public site is frontend-only; club information is static and does not need a database or API.
- The main artifact is served at `/` so the project opens directly to the club website.
- External destinations are limited to the official GKCIET club page, RAISC LinkedIn page, and the convenor’s mail link.

## Product

- Presents RAISC’s mission, interdisciplinary robotics context, focus areas, working model, milestones, people, and join/follow actions.
- Uses a minimal dark futuristic robotics identity with a prominent calligraphic RAISC wordmark.

## User preferences

- Keep the experience minimal, dark, futuristic, and robotics-focused.
- Prefer the calligraphic RAISC wordmark over the previously removed hero diagram.

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
