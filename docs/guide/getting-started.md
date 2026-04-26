# Getting started

## Requirements

- Node.js 20+
- pnpm 9+
- A browser wallet (MetaMask or any EIP-6963 compatible wallet)
- 0G Galileo Testnet added to your wallet (chainId `16602`)

::: tip Wallet not required for local dev
The app runs fully in demo mode without a wallet. Contract interactions are skipped and the AXL client falls back to in-memory.
:::

## Install and run

```bash
git clone https://github.com/AriiBen/kinsvarmo
cd kinsvarmo
pnpm install
pnpm dev
```

This starts both processes in parallel:

| Process | URL |
|---|---|
| Web (Next.js 15) | http://localhost:3000 |
| API (Fastify 5) | http://localhost:4000 |

## Run the AXL demo

The demo sends a phytochemistry job through the full agent pipeline using a local in-memory AXL network. No external services required.

Open three terminals:

```bash
# Terminal 1 — start local AXL nodes
pnpm axl:nodes

# Terminal 2 — start agent workers
pnpm axl:workers

# Terminal 3 — send a demo job and watch the trace
pnpm axl:demo
```

The third terminal prints the full pipeline trace — Planner → Analyzer → Critic → Reporter — and outputs the final structured report.

## Environment variables

```bash
cp .env.example .env.local
```

Fill in values as they become available. Every variable has a fallback so the app works out of the box:

| Variable | Fallback |
|---|---|
| `AXL_NODE_URLS` | In-memory AXL client |
| `ZERO_G_RPC_URL` | Mock 0G client |
| `NEXT_PUBLIC_CHAIN_ID` | `16602` (Galileo Testnet) |

## Run checks

```bash
pnpm test        # repository-level unit tests
pnpm test:axl    # AXL integration tests (requires axl:nodes)
pnpm typecheck   # full monorepo type check
```
