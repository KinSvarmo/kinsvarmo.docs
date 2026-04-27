# KinSvarmo Docs

Documentation site for KinSvarmo, a scientific agent marketplace and execution platform on 0G.

KinSvarmo lets researchers publish encrypted analysis agents and lets users run those agents on uploaded datasets. In the current codebase, the app supports the seeded phytochemistry workflow, 0G Storage upload/download with AES-256-GCM encryption, AXL HTTP and in-memory modes, and a Fastify API for job orchestration. Smart contracts and KeeperHub are documented as prepared interfaces until deployment/integration is complete.

## What This Repository Contains

This repository contains the public documentation site built with VitePress.

```text
docs/
  index.md                    Home page
  guide/
    what-is-kinsvarmo.md      Product overview and boundaries
    getting-started.md        Local setup and environment variables
    demo.md                   AXL demo path
    architecture.md           Monorepo and package layout
    execution-flow.md         Job lifecycle and AXL messages
    publishing.md             Creator workflow and current limits
    api.md                    Fastify API reference
    contracts.md              Pending contract reference
  .vitepress/
    config.mts                Navigation and theme config
    theme/custom.css          Site styling
```

The main implementation lives in the KinSvarmo app repository. Treat that codebase as the source of truth, and keep these docs explicit about what is implemented today versus what is prepared for deployment.

## Run The Docs

Requirements:

- Node.js 20+
- pnpm 9+

```bash
pnpm install
pnpm dev
```

The VitePress dev server runs at `http://localhost:5173` by default.

## Build And Preview

```bash
pnpm build
pnpm preview
```

The generated static site is written to:

```text
docs/.vitepress/dist
```

## KinSvarmo App Overview

The documented application is a pnpm monorepo with two apps and six shared packages:

```text
apps/
  web/          Next.js 15 frontend
  api/          Fastify 5 API service
packages/
  shared/       Domain types, schemas, and seeded agent data
  agents/       Planner, Analyzer, Critic, Reporter modules
  axl-client/   Gensyn AXL HTTP and in-memory clients
  zero-g/       0G Storage upload/download with AES-256-GCM
  keeperhub/    KeeperHub execution client interface
  contracts/    Contract deployment metadata package
scripts/
  axl/          Local AXL nodes, workers, and demo runner
  tests/        Repository-level tests
  deploy/       Contract deployment scripts
demo-data/      Sample phytochemistry CSV dataset
```

## App Pages

| Route | Description |
|---|---|
| `/` | Landing page |
| `/agents` | Marketplace with seeded agents |
| `/agents/[slug]` | Run wizard for dataset upload, validation, cost review, and authorization |
| `/jobs/[jobId]` | Job monitor with module status, AXL messages, and result |
| `/creator` | Creator Studio for preparing an encrypted agent upload |
| `/docs` | In-app technical reference |

## Execution Flow

The implemented demo pipeline uses four deterministic modules:

```text
job.created        -> planner
plan.generated     -> analyzer
analysis.completed -> critic
critic.reviewed    -> reporter
report.generated   -> api
```

The API stores job state, module status, message payloads, timestamps, final result data, and the provenance reference.

## API Shape

The docs reflect the current Fastify API shape:

| Method | Path | Response shape |
|---|---|---|
| `GET` | `/health` | `{ ok, service, axl }` |
| `GET` | `/api/agents` | `{ agents }` |
| `GET` | `/api/agents/:id` | `{ agent }` |
| `POST` | `/api/jobs` | `{ job }` |
| `POST` | `/api/jobs/:id/start` | starts the AXL workflow |
| `GET` | `/api/jobs/:id` | `{ job }` |
| `GET` | `/api/jobs/:id/messages` | `{ messages }` |
| `GET` | `/api/jobs/:id/result` | `{ result }` |

## Runtime Status

| Area | Status |
|---|---|
| Frontend pages | Implemented |
| Wallet connection | Implemented with Wagmi/RainbowKit |
| 0G Storage | Upload/download with encryption implemented |
| API job orchestration | Implemented |
| AXL client | HTTP and in-memory modes implemented |
| Demo pipeline | Seeded phytochemistry workflow implemented |
| Smart contracts | Pending deployment; frontend calls are prepared/commented |
| KeeperHub | Interface defined; runtime adapter not wired yet |
| Persistence | In-memory store today |
| Seeded agents | One current seeded agent: Alkaloid Predictor v2 |

## Sponsor Integrations

| Technology | Role |
|---|---|
| 0G Network | Encrypted blob storage and EVM-compatible chain for iNFT ownership |
| Gensyn AXL | Peer-to-peer message routing between execution modules |
| KeeperHub | Execution client interface; runtime adapter not wired yet |

## Documentation Guidelines

- Prefer concrete behavior over launch copy.
- Keep local/demo behavior separate from planned production behavior.
- Use the app repository as the source of truth for API payloads, env vars, package names, and contract status.
- Avoid emoji-heavy feature lists and generic phrases.
- Use ASCII diagrams for execution traces.
- Mention mocks, placeholders, and in-memory fallbacks when they affect a reader's expectations.

## Deployment

The Vercel build uses:

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "docs/.vitepress/dist",
  "installCommand": "pnpm install"
}
```

See `vercel.json` for the active deployment settings.
