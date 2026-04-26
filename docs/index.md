---
layout: home

hero:
  name: "KinSvarmo"
  text: "Private expert agents as iNFTs"
  tagline: Publish encrypted analysis scripts on 0G Chain. Users pay per run and receive a structured, auditable result — no subscriptions, no IP exposure, no platform lock-in.
  actions:
    - theme: brand
      text: Get started
      link: /guide/getting-started
    - theme: alt
      text: Execution flow
      link: /guide/execution-flow
    - theme: alt
      text: API reference
      link: /guide/api

features:
  - icon: 🔒
    title: Encrypted at rest
    details: Agent scripts are encrypted with AES-256-GCM in the browser before upload. The raw logic never leaves the creator's machine in plaintext — only the encrypted blob reaches 0G Storage.

  - icon: ⛓️
    title: On-chain ownership
    details: Each agent is an ERC-7857 iNFT on 0G Chain. Ownership, pricing, and execution rights are enforced by smart contracts, not by a platform. Transfer the token, transfer the IP.

  - icon: 🤖
    title: Four-module swarm
    details: Every run goes through Planner → Analyzer → Critic → Reporter, coordinated over Gensyn AXL. The full inter-agent message log is stored with the job and available for inspection.

  - icon: 📄
    title: Auditable results
    details: Each result includes a confidence score, a provenance ID anchored on 0G Storage, and the complete AXL communication trace so users can verify exactly what ran and when.

  - icon: 💰
    title: Pay-per-run revenue
    details: Creators earn on every run via the AnalysisEscrow contract. Funds are released automatically when the Reporter delivers a result — no invoicing, no platform cut.

  - icon: 🧪
    title: Any analysis domain
    details: Agents accept Python, R, JS, Jupyter, and Bash scripts. The same infrastructure handles phytochemistry screening, financial modelling, or any other structured input-output workflow.
---
