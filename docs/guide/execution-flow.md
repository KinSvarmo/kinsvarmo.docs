# Execution flow

Every analysis job follows the same pipeline, regardless of the agent or domain.

## Steps

1. The user uploads a dataset in the run wizard. The file is encrypted client-side with AES-256-GCM and uploaded to 0G Storage.
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

Jobs transition through six states driven by inbound AXL messages:

```text
created -> planning -> analyzing -> reviewing -> reporting -> completed
                                                       -> failed
```

::: warning Failure condition
Any state can transition to `failed` if the Critic assigns a confidence score below the agent's threshold, or if a module times out.
:::

## The four modules

### Planner

Validates the request and constructs an execution plan. It checks dataset compatibility with the agent's declared formats, estimates sample count, and assigns routing metadata before forwarding to the Analyzer.

### Analyzer

Executes the analysis defined by the agent. In the current demo this is a deterministic phytochemistry pipeline; in production the agent script is decrypted inside a TEE and called here.

### Critic

Reviews the Analyzer's output. It assigns a confidence score between `0` and `1`, flags warnings, and either approves the result by sending `critic.reviewed` or transitions the job to `failed`.

### Reporter

Packages the approved findings into a structured report: summary, key observations, confidence score, and a provenance reference anchored on 0G Storage.

## AXL message log

Every message exchanged between modules is recorded on the job. The `/jobs/[jobId]` page shows sender, receiver, message type, payload, and timestamp for the run.

::: info Audit trail
The message log is the same data that gets anchored via `provenanceId` in the final result. Users can verify a run by inspecting the 0G Storage root.
:::
