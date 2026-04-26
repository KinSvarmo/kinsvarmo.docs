# What is KinSvarmo?

KinSvarmo is a marketplace where experts publish private analysis agents and users pay to run them on their own data.

The core idea: someone has a valuable analysis script — a pricing model, a screening pipeline, a diagnostic tool. They want to earn from it without giving it away. KinSvarmo lets them publish the encrypted script as an on-chain iNFT. Users pay per run and receive a structured result with full provenance. The script itself is never exposed.

## The three parts

**Agent publishing.** A creator uploads an analysis script, sets a price per run, and mints an iNFT on 0G Chain. The script is encrypted client-side before upload — the raw logic never leaves the creator's machine in plaintext.

**Job execution.** When a user submits a dataset, a four-module agent swarm handles the job: planning, analysis, review, and reporting. The modules communicate over Gensyn AXL, and the full message log is stored with each job.

**Result delivery.** The output is a structured report with findings, a confidence score, and a provenance reference anchored on 0G Storage. The user can verify what ran and when.

## What it is not

It is not a SaaS subscription. There is no platform account to manage — just a wallet.

It is not a model marketplace. Agents are arbitrary analysis scripts (Python, R, JS, Jupyter, Bash), not foundation models.

It is not limited to one domain. The same infrastructure handles phytochemistry screening, financial analysis, or any other structured input-output workflow.

## Sponsor integrations

| Technology | Role |
|---|---|
| **0G Network** | Encrypted blob storage and EVM-compatible chain for iNFT ownership |
| **Gensyn AXL** | Peer-to-peer message routing between the four execution modules |
| **KeeperHub** | Workflow orchestration, retry logic, and execution guarantees |

::: info Built for the hackathon
KinSvarmo was built for the 0G × Gensyn × KeeperHub hackathon. All three sponsor technologies are required for a complete run — 0G stores the data, AXL routes the messages, and KeeperHub ensures the workflow completes.
:::
