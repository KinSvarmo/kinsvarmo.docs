# KinSvarmo Docs

Documentation site for KinSvarmo, a marketplace where experts publish private analysis agents and users pay to run them on their own data.

KinSvarmo packages expert scripts as encrypted on-chain assets. A creator uploads a script, the browser encrypts it before storage, and the agent is minted as an iNFT on 0G Chain. Users submit datasets, pay for a run, and receive a structured report with provenance and an execution trace.

## Documentation Site

This repository contains the public documentation built with VitePress.

```text
docs/
  index.md                    Home page
  guide/
    what-is-kinsvarmo.md      Product overview
    getting-started.md        Local setup
    demo.md                   End-to-end demo path
    architecture.md           Monorepo and package layout
    execution-flow.md         Job lifecycle and AXL messages
    publishing.md             Creator workflow
    api.md                    Fastify API reference
    contracts.md              Smart contract reference
  .vitepress/
    config.mts                Navigation and theme config
    theme/custom.css          Site styling
```

## Run Locally

Requirements:

- Node.js 20+
- pnpm 9+

Install dependencies and start the docs server:

```bash
pnpm install
pnpm dev
```

The site runs at `http://localhost:5173` by default.

## Build

```bash
pnpm build
```

The generated site is written to:

```text
docs/.vitepress/dist
```

Preview the production build:

```bash
pnpm preview
```

## KinSvarmo Runtime Overview

The application documented here is a pnpm monorepo with two apps and six shared packages:

```text
apps/
  web/          Next.js frontend
  api/          Fastify API service
packages/
  shared/       Domain types and seeded agent data
  agents/       Planner, Analyzer, Critic, Reporter modules
  axl-client/   Gensyn AXL HTTP and in-memory clients
  zero-g/       0G Storage integration and AES-256-GCM encryption
  keeperhub/    KeeperHub execution client interface
  contracts/    iNFT registry and escrow ABIs
```

Each analysis job follows the same path:

```text
job.created        -> planner
plan.generated     -> analyzer
analysis.completed -> critic
critic.reviewed    -> reporter
report.generated   -> api
```

The API stores module status, message payloads, timestamps, final result data, and the provenance reference for the run.

## Sponsor Integrations

| Technology | Role |
|---|---|
| 0G Network | Encrypted blob storage and EVM-compatible chain for iNFT ownership |
| Gensyn AXL | Peer-to-peer message routing between execution modules |
| KeeperHub | Workflow orchestration, retry logic, and execution guarantees |

## Content Guidelines

The docs should stay technical, readable, and specific:

- Prefer concrete behavior over marketing language.
- Keep demo and production boundaries explicit.
- Document fallback behavior when local mode uses mocks or in-memory clients.
- Avoid emoji-heavy feature lists and generic launch copy.
- Use ASCII diagrams in code blocks for execution traces.

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
