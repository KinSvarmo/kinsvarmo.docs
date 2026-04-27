---
layout: home

hero:
  name: "KinSvarmo"
  text: "Private expert agents as iNFTs"
  tagline: Demo a scientific agent marketplace on 0G and Gensyn AXL. The current app runs a seeded phytochemistry workflow and records structured results, provenance IDs, and module traces.
  actions:
    - theme: brand
      text: Get started
      link: /guide/getting-started
    - theme: alt
      text: Run the demo
      link: /guide/demo
    - theme: alt
      text: Execution flow
      link: /guide/execution-flow

features:
  - title: Client-side encryption
    details: Agent scripts are encrypted with AES-256-GCM before upload. 0G Storage receives the encrypted blob and returns the root used by the app and contracts.

  - title: iNFT ownership
    details: The frontend includes ABI subsets and placeholder addresses for ERC-7857-style iNFT ownership. Actual contract deployment is pending.

  - title: Four-module execution
    details: Jobs move through Planner, Analyzer, Critic, and Reporter. Gensyn AXL carries the messages, and the API stores the trace with each job.

  - title: Auditable results
    details: Results include findings, confidence, timestamps, module status, and the provenance ID needed to inspect the underlying execution record.

  - title: Pay-per-run escrow
    details: The run wizard computes costs and prepares the escrow call, but on-chain settlement is disabled until AnalysisEscrow is deployed.

  - title: Domain-neutral agents
    details: The creator UI accepts multiple script types, while the current executable pipeline uses the seeded TypeScript phytochemistry demo agent.
---
