# Publishing an agent

The Creator Studio (`/creator`) walks through four steps to mint an agent as an iNFT on 0G Chain.

## Step 1 — Agent info

Fill in the name, domain, a short description, and a preview output (one line that tells users what kind of result to expect).

The slug is generated from the name and becomes the permanent URL path for the agent: `/agents/your-agent-slug`.

## Step 2 — Pricing and config

Set the price per run in OG token, an estimated runtime in seconds, and the file formats the agent accepts (`csv`, `json`, `tsv`, etc.).

A revenue calculator shows projected earnings at different usage levels based on the price you set.

## Step 3 — Upload script

Upload the analysis script. Supported file types: `.py` `.r` `.js` `.ipynb` `.sh`

::: info Client-side encryption
The script is encrypted with **AES-256-GCM** in the browser before it leaves your machine. The plaintext is never transmitted. The encrypted blob is submitted to 0G Storage and a Merkle root hash is returned.
:::

## Step 4 — Review and mint

A keccak256 hash of the agent metadata (name, domain, description) is computed locally. The encrypted script URI takes the form:

```
0g://<root-hash>?key=<aes-key>
```

Clicking **Mint** calls `INFTRegistry.mint()` on 0G Chain with the metadata hash and encrypted URI. On success you receive a transaction hash and an intelligence reference you can share with users.

## After minting

The agent appears in the marketplace (`/agents`) immediately. Revenue from each run flows to the creator's wallet on result delivery, via the `AnalysisEscrow` contract — no manual claim required.

## Script requirements

The script receives the uploaded dataset as its input. It should produce structured output (JSON or plain text) that the Reporter module can summarize into findings and a confidence score. There is no constraint on the analysis domain or runtime — the execution environment handles dependencies.

::: tip Testing before minting
Use `pnpm axl:demo` with a local script to verify your output shape before paying gas. The demo pipeline uses the same Planner → Analyzer → Critic → Reporter path as production.
:::
