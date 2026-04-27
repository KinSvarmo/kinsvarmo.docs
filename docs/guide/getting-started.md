# Getting started

## Requirements

- Node.js 20+
- pnpm 9+
- A browser wallet, such as MetaMask or another EIP-6963 compatible wallet
- 0G Galileo Testnet added to your wallet, with chainId `16602`

::: tip Local demo mode
The app can run locally without a wallet. Contract interactions are skipped, and the AXL client can use its in-memory implementation.
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

## Next step

Use the [demo guide](/guide/demo) to send a seeded job through the local AXL pipeline and inspect the resulting trace.

## Environment variables

```bash
cp .env.example .env.local
```

Fill in production values as they become available. The local app includes development fallbacks:

| Variable | Fallback |
|---|---|
| `AXL_NODE_URLS` | In-memory AXL client |
| `ZERO_G_RPC_URL` | Mock 0G client |
| `NEXT_PUBLIC_CHAIN_ID` | `16602` (Galileo Testnet) |

## Run checks

```bash
pnpm test
pnpm test:axl
pnpm typecheck
```

`pnpm test:axl` expects the local AXL nodes to be running.
