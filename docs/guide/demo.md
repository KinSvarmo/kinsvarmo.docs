# Run the demo

The local demo runs the same module path used by the app: Planner, Analyzer, Critic, and Reporter. It uses an in-memory AXL network, so you can inspect the flow without a wallet or external service keys.

## Start the app

```bash
git clone https://github.com/AriiBen/kinsvarmo
cd kinsvarmo
pnpm install
pnpm dev
```

This starts the web app on `http://localhost:3000` and the API on `http://localhost:4000`.

## Run the agent pipeline

Open three terminals from the repository root:

```bash
# Terminal 1
pnpm axl:nodes

# Terminal 2
pnpm axl:workers

# Terminal 3
pnpm axl:demo
```

The demo command sends a seeded phytochemistry job through the pipeline. The output should show each module handoff, followed by a structured report.

## Expected trace

```text
job.created        -> planner
plan.generated     -> analyzer
analysis.completed -> critic
critic.reviewed    -> reporter
report.generated   -> api
```

## What to check

Look for three things in the final output:

- `status` should be `completed`
- `confidence` should be a number between `0` and `1`
- `provenanceId` should be present in the result

If a module fails, check that all three demo processes are still running and that the API is available on port `4000`.
