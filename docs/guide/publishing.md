# Publishing an agent

The Creator Studio (`/creator`) walks through four steps for preparing an agent iNFT. Today it uploads the script to 0G Storage and simulates the minting UI because contract deployment is still pending.

## Step 1: Agent info

Fill in the name, domain, a short description, and a preview output that tells users what kind of result to expect.

The slug is generated from the name and becomes the permanent URL path for the agent: `/agents/your-agent-slug`.

## Step 2: Pricing and config

Set the price per run in OG token, an estimated runtime in seconds, and the file formats shown in the creator UI: `csv`, `json`, `tsv`, `txt`, `fasta`, or `h5`.

A revenue calculator shows projected earnings at different usage levels based on the price you set.

## Step 3: Upload script

Upload the analysis script. Supported file types: `.py` `.r` `.js` `.ipynb` `.sh`

::: info Client-side encryption
The script is encrypted with **AES-256-GCM** in the browser before it leaves your machine. The encrypted blob is submitted to 0G Storage and a Merkle root hash is returned.
:::

## Step 4: Review and mint

A keccak256 hash of the agent metadata (name, domain, description) is computed locally. The encrypted script URI takes the form:

```text
0g://<root-hash>?key=<aes-key>
```

Clicking **Upload & Mint iNFT** uploads the script to 0G Storage and stores the encrypted URI in the UI state. The actual `INFTRegistry.mint()` call is present in the hook but commented out in the page until contract addresses are deployed.

## After minting

Published agents do not persist from the creator form yet. The marketplace currently reads from the seeded agent list in `packages/shared/src/seeds.ts`; `AnalysisEscrow` revenue settlement is planned after contract deployment.

## Script requirements

The planned script contract is: receive the uploaded dataset as input and produce structured output, either JSON or plain text, that the Reporter module can summarize into findings and a confidence score. The current executable pipeline is the deterministic phytochemistry demo in `packages/agents`.

::: tip Testing before minting
Use `pnpm axl:demo` to verify the Planner, Analyzer, Critic, and Reporter path before wiring a new executable agent into the runtime.
:::
