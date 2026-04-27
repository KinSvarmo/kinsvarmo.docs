# Execution flow

The implemented demo path follows one pipeline for the seeded phytochemistry agent.

## Steps

1. The user uploads a dataset in the run wizard. The current run page records a dataset reference for the API job; the 0G upload helper is implemented separately and used by the Creator Studio upload flow.
2. The frontend calls `POST /api/jobs`. The API creates a job record with status `created`.
3. The frontend calls `POST /api/jobs/:id/start`. The API sends a `job.created` message over AXL to the Planner module.
4. The four modules execute in sequence, each sending a typed message when done:

```text
job.created        -> [Planner]  -> plan.generated
plan.generated     -> [Analyzer] -> analysis.completed
analysis.completed -> [Critic]   -> critic.reviewed
critic.reviewed    -> [Reporter] -> report.generated
```

5. The API consumes each inbound AXL message, updates job state, and stores the result when `report.generated` arrives.
6. The frontend polls `GET /api/jobs/:id` every 2 seconds and renders module status and the AXL message log.

## Job states

Jobs can use these status values: `created`, `authorized`, `planning`, `analyzing`, `reviewing`, `reporting`, `completed`, and `failed`. The active AXL workflow moves through this path:

```text
created -> planning -> analyzing -> reviewing -> reporting -> completed
                                                       -> failed
```

::: warning Failure condition
The API marks a job as `failed` when a module sends `job.failed` or when the workflow consumer times out waiting for the expected report message.
:::

## The four modules

### Planner

Validates the request and constructs an execution plan. It checks dataset compatibility with the agent's declared formats, estimates sample count, and assigns routing metadata before forwarding to the Analyzer.

### Analyzer

Executes the deterministic phytochemistry pipeline in `packages/agents/src/phytochemistry/demo-analysis.ts`. TEE-based execution of uploaded scripts is planned but not wired into the current API workflow.

### Critic

Reviews the Analyzer's output. It assigns a confidence score between `0` and `1`, adds warnings, and sends `critic.reviewed` in the deterministic demo path.

### Reporter

Packages the approved findings into a structured report: summary, key observations, confidence score, and a generated `prov_<jobId>` provenance reference.

## AXL message log

Every message exchanged between modules is recorded on the job. The `/jobs/[jobId]` page shows sender, receiver, message type, payload, and timestamp for the run.

::: info Audit trail
The final result includes a `provenanceId`. In the current demo it is generated from the job ID; anchoring the full message log to 0G Storage is a planned production step.
:::
