# Getting started

## Requirements

- Node.js 20+
- pnpm 9+
- A browser wallet, such as MetaMask or another EIP-6963 compatible wallet
- 0G Galileo Testnet in the wallet when testing onchain flows, chainId `16602`

## Install

```bash
git clone https://github.com/KinSvarmo/kinsvarmo
cd kinsvarmo
pnpm install
```

## Start the app

```bash
pnpm dev
```

This starts the workspace dev targets for:

| Process | URL |
|---|---|
| Web (Next.js 15) | http://localhost:3000 |
| API (Fastify 5) | http://localhost:4000 |

The browser uses `NEXT_PUBLIC_API_URL` when it is set. Without it, browser calls resolve to the Next route handlers under `apps/web/app/api`. The Fastify service remains available on port `4000` and is used by direct API/demo scripts.

## Full local demo

The quickest end-to-end path starts local AXL-compatible nodes, workers, API, and web app:

```bash
pnpm demo:local
```

In another terminal:

```bash
pnpm demo:check
```

Then open:

```text
http://localhost:3000/agents/1
```

## Environment variables

Copy the example file for local development:

```bash
cp .env.example .env
```

Important groups:

| Group | Variables |
|---|---|
| Frontend | `NEXT_PUBLIC_APP_NAME`, `NEXT_PUBLIC_CHAIN_ID`, `NEXT_PUBLIC_INFT_REGISTRY_ADDRESS`, `NEXT_PUBLIC_API_URL` |
| 0G chain/storage | `ZERO_G_RPC_URL`, `ZERO_G_EXPLORER_URL`, `ZERO_G_STORAGE_ENDPOINT`, `ZERO_G_PRIVATE_KEY` |
| 0G Compute | `ZERO_G_INFERENCE_PROVIDER`, `ZERO_G_COMPUTE_PROVIDER_ADDRESS`, `ZERO_G_COMPUTE_SERVICE_URL`, `ZERO_G_COMPUTE_API_SECRET`, `ZERO_G_COMPUTE_MODEL` |
| Contracts | `ZERO_G_AGENT_REGISTRY_ADDRESS`, `ZERO_G_USAGE_AUTHORIZATION_ADDRESS` |
| KeeperHub | `KEEPERHUB_API_KEY`, `KEEPERHUB_WEBHOOK_KEY`, `KEEPERHUB_BASE_URL`, `KEEPERHUB_WORKFLOW_ID`, `KEEPERHUB_*_PATH` |
| AXL | `AXL_NODE_*_URL`, `AXL_NODE_*_PEER_ID`, `AXL_REQUEST_TIMEOUT_MS`, `AXL_LOCAL_PORT_OFFSET`, `AXL_REAL_DIR`, `AXL_REAL_PORT_OFFSET` |

Defaults in code keep the local demo usable without every variable. Missing 0G Compute secrets switch inference to a placeholder response. Missing KeeperHub base URL switches the KeeperHub client to memory mode. Missing AXL HTTP node URLs can use the in-memory client in tests or the local node scripts in demo mode.

## KeeperHub setup

Create and enable the webhook workflow, then test it:

```bash
pnpm keeperhub:create-webhook
pnpm keeperhub:test
```

The API starts a KeeperHub run before sending `job.created` into AXL. If KeeperHub HTTP mode is configured incorrectly, `POST /api/jobs/:id/start` returns a KeeperHub-specific error and hint.

## Checks

```bash
pnpm test
pnpm test:axl
pnpm typecheck
```

`pnpm test:axl` starts local AXL-compatible node and worker processes for the test suite.
