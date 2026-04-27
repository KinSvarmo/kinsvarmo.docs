# Architecture

KinSvarmo is a pnpm monorepo with two apps and six shared packages.

```text
apps/
  web/          Next.js 15 frontend
  api/          Fastify 5 API service
packages/
  shared/       Domain types, schemas, and seeded agent data
  agents/       Planner, Analyzer, Critic, Reporter modules
  axl-client/   Gensyn AXL HTTP and in-memory client
  zero-g/       0G Storage upload/download with AES-256-GCM
  keeperhub/    KeeperHub execution client interface
  contracts/    Contract deployment metadata package
```

## Frontend (`apps/web`)

Next.js 15 with React 19. Wallet connection uses Wagmi v3 and RainbowKit. Wallet state and API responses drive the UI.

| Route | Purpose |
|---|---|
| `/` | Landing page |
| `/agents` | Browse marketplace |
| `/agents/[slug]` | Upload dataset and start a run |
| `/jobs/[jobId]` | Live job status and AXL message log |
| `/creator` | Creator Studio for minting a new agent |
| `/docs` | In-app technical reference |

## API (`apps/api`)

Fastify 5 service running on port `4000`. It owns the job lifecycle: creates records, starts AXL workflows, consumes inbound messages, and stores results. Development uses an in-memory store; production should replace it with a persistent adapter.

## Shared packages

**`shared`** contains domain types: `AgentListing`, `AnalysisJob`, `AxlMessage`, `AnalysisResult`, job and module status enums, and the seeded agent list.

**`agents`** contains the four execution modules with typed inputs and outputs. Each module is a pure function: takes a payload, returns a result.

**`axl-client`** has two implementations behind the same interface: an HTTP client that routes messages through AXL nodes, and an in-memory client used in tests and local demo mode. The API picks the implementation from environment config.

**`zero-g`** handles file operations against 0G Storage: AES-256-GCM encryption, Merkle tree generation, blob submission, and indexed retrieval by root hash.

**`keeperhub`** defines the KeeperHub execution client interface. The current API does not yet instantiate a KeeperHub adapter, so run IDs are placeholders in the UI until that integration is connected.

**`contracts`** currently contains deployment metadata types. The frontend keeps the contract ABI subsets and placeholder addresses in `apps/web/lib/contracts.ts` until the 0G Galileo deployment is ready.

## Data flow

```text
Browser -> POST /api/jobs           -> job record created (status: created)
Browser -> POST /api/jobs/:id/start -> AXL: job.created       -> Planner
                                      AXL: plan.generated    -> Analyzer
                                      AXL: analysis.completed -> Critic
                                      AXL: critic.reviewed   -> Reporter
                                      AXL: report.generated  -> API
API     -> result stored (status: completed)
Browser -> GET /api/jobs/:id         -> polls every 2s and renders progress
```
