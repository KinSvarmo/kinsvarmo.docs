# What is KinSvarmo?

KinSvarmo is a marketplace where experts publish private analysis agents and users pay to run them on their own data.

The core idea is simple: an expert may have a pricing model, screening pipeline, diagnostic tool, or other script that is valuable because of the method inside it. KinSvarmo packages that script as an encrypted on-chain asset. Users submit data, pay for one run, and receive a structured result with provenance. The script remains private throughout the flow.

## How the pieces fit

**Publishing.** A creator uploads an analysis script, sets a price per run, and mints an iNFT on 0G Chain. The script is encrypted in the browser before upload, then stored as a blob on 0G Storage.

**Execution.** When a user submits a dataset, four modules handle the job: planning, analysis, review, and reporting. The modules communicate over Gensyn AXL, and the API keeps the message log with the job record.

**Delivery.** The output is a structured report with findings, confidence, timestamps, and a provenance reference. The user can inspect the trace after the job completes.

## Product boundaries

KinSvarmo is built around wallet-based access and pay-per-run jobs. The current demo keeps development mode lightweight: contract calls can be skipped, AXL can run in memory, and missing infrastructure falls back to mock clients.

Agents are analysis programs rather than hosted foundation models. They can be written in Python, R, JavaScript, Jupyter, or Bash, and the Reporter turns their output into a consistent result shape.

The first seeded workflow focuses on phytochemistry screening, but the execution contract is domain-neutral: dataset in, structured report out.

## Sponsor integrations

| Technology | Role |
|---|---|
| **0G Network** | Encrypted blob storage and EVM-compatible chain for iNFT ownership |
| **Gensyn AXL** | Peer-to-peer message routing between the four execution modules |
| **KeeperHub** | Workflow orchestration, retry logic, and execution guarantees |

::: info Built for the hackathon
KinSvarmo was built for the 0G x Gensyn x KeeperHub hackathon. A complete production run uses 0G for storage and chain state, AXL for module messaging, and KeeperHub for workflow guarantees.
:::
