# API reference

The Fastify API runs on port `4000` in development.

::: tip Base URL
`http://localhost:4000` in development. Set `NEXT_PUBLIC_API_URL` to override in other environments.
:::

## Health

### `GET /health`

Returns the AXL node connection status.

```json
{ "status": "ok", "axl": "connected" }
```

## Agents

### `GET /api/agents`

Returns all published agents as an array.

### `GET /api/agents/:id`

Returns a single agent by ID or slug. Returns `404` if not found.

## Jobs

### `POST /api/jobs`

Creates an analysis job. Returns the new job record including its generated ID.

**Request body:**

```json
{
  "agentId": "agent_alkaloid_predictor_v2",
  "userWallet": "0xabc...",
  "datasetReference": "0g://bafy...",
  "priceIn0G": "0.25"
}
```

**Response:** the job object with `status: "created"`.

---

### `POST /api/jobs/:id/start`

Starts the AXL workflow for an existing job. Sends `job.created` to the Planner and begins consuming inbound messages in the background. Returns `404` if the job is not found, `409` if already started.

---

### `GET /api/jobs/:id`

Returns the current job state including per-module status and timestamps.

```json
{
  "id": "job_01hwx...",
  "agentId": "agent_alkaloid_predictor_v2",
  "status": "analyzing",
  "modules": {
    "planner":  { "status": "completed", "completedAt": "..." },
    "analyzer": { "status": "running" },
    "critic":   { "status": "pending" },
    "reporter": { "status": "pending" }
  },
  "createdAt": "...",
  "updatedAt": "..."
}
```

**Module status values:** `pending` · `running` · `completed` · `failed`

---

### `GET /api/jobs/:id/messages`

Returns the full AXL message log for a job, ordered by timestamp.

```json
[
  {
    "sender": "planner",
    "receiver": "analyzer",
    "type": "plan.generated",
    "payload": { "samplesDetected": 24, "estimatedDuration": 3 },
    "timestamp": "2025-04-20T14:03:11.421Z"
  }
]
```

---

### `GET /api/jobs/:id/result`

Returns the final analysis result. Only available once `status` is `completed`.

```json
{
  "summary": "24 alkaloid compounds detected across 3 sample groups...",
  "confidence": 0.82,
  "findings": [
    { "compound": "berberine", "concentration": 0.14, "flag": null }
  ],
  "provenanceId": "0g://bafy..."
}
```

::: info Polling
The frontend polls `GET /api/jobs/:id` every 2 seconds to render live progress. Switch to `/messages` after the job completes to inspect the full AXL trace.
:::
