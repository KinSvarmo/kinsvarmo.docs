---
layout: home

hero:
  name: "KinSvarmo"
  text: "Private expert agents as iNFTs"
  tagline: Publish private analysis scripts on 0G Chain. Each run produces a structured result, a provenance reference, and a trace of the modules that handled the job.
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
    details: Each published agent maps to an ERC-7857 iNFT on 0G Chain. The token carries the encrypted script reference, metadata hash, owner, and run price.

  - title: Four-module execution
    details: Jobs move through Planner, Analyzer, Critic, and Reporter. Gensyn AXL carries the messages, and the API stores the trace with each job.

  - title: Auditable results
    details: Results include findings, confidence, timestamps, module status, and the provenance ID needed to inspect the underlying execution record.

  - title: Pay-per-run escrow
    details: The AnalysisEscrow contract locks payment at job start and releases it to the creator once a result is delivered, or refunds the user on failure.

  - title: Domain-neutral agents
    details: The pipeline accepts scripts in Python, R, JavaScript, Jupyter, or Bash, as long as the output can be shaped into a report.
---
