# Getting started

## Requirements

- Node.js 20+
- pnpm 9+
- A browser wallet, such as MetaMask or another EIP-6963 compatible wallet
- 0G Galileo Testnet added to your wallet, with chainId `16602`

::: tip Local demo mode
The API can run with the in-memory AXL client when no AXL node URLs are configured. The browser flows still ask for a wallet when they need 0G Storage upload or simulated payment authorization.
:::

## Install and run

```bash
git clone https://github.com/KinSvarmo
cd kinsvarmo
pnpm install
pnpm dev
```

This starts both processes in parallel:

| Process | URL |
|---|---|
| Web (Next.js 15) | http://localhost:3000 |
| API (Fastify 5) | http://localhost:4000 |

## Next step

Use the [demo guide](/guide/demo) to send a seeded job through the local AXL pipeline and inspect the resulting trace.

## Environment variables

```bash
cp .env.example .env.local
```

Fill in production values as they become available. The local app includes development fallbacks:

| Variable | Fallback |
|---|---|
| `AXL_NODE_API_URL`, `AXL_NODE_PLANNER_URL`, `AXL_NODE_ANALYZER_URL`, `AXL_NODE_CRITIC_URL`, `AXL_NODE_REPORTER_URL` | In-memory AXL client when none are set |
| `AXL_NODE_*_PEER_ID` | Required only for the HTTP AXL client |
| `AXL_REQUEST_TIMEOUT_MS` | `5000` |
| `NEXT_PUBLIC_API_URL` | `http://localhost:4000` |
| `NEXT_PUBLIC_0G_INDEXER_RPC` | `https://indexer-storage-testnet-turbo.0g.ai` |

## Run checks

```bash
pnpm test
pnpm test:axl
pnpm typecheck
```

`pnpm test:axl` expects the local AXL nodes to be running.
