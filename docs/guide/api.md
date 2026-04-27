# API reference

The Fastify API runs on port `4000` in development.

::: tip Base URL
`http://localhost:4000` in development. Set `NEXT_PUBLIC_API_URL` to override in other environments.
:::

## Health

### `GET /health`

Returns service status and the AXL client health object.

```json
{
  "ok": true,
  "service": "kingsvarmo-api",
  "axl": {
    "configured": ["api", "planner", "analyzer", "critic", "reporter"],
    "nodes": {
      "api": true,
      "planner": true,
      "analyzer": true,
      "critic": true,
      "reporter": true
    },
    "healthy": true
  }
}
```

## Agents

### `GET /api/agents`

Returns all seeded agents.

```json
{ "agents": [] }
```

### `GET /api/agents/:id`

Returns a single agent by ID or slug. Returns `404` if not found.

```json
{ "agent": {} }
```

## Jobs

### `POST /api/jobs`

Creates an analysis job. Returns the new job record including its generated ID.

**Request body:**

```json
{
  "agentId": "agent_alkaloid_predictor_v2",
  "userWallet": "0xabc...",
  "filename": "alkaloid-sample.csv",
  "uploadReference": "0g://dataset/0x...",
  "inputMetadata": {
    "source": "web-run-page",
    "totalOG": 0.282
  }
}
```

**Response:** `{ "job": { ... } }` with `status: "created"`.

---

### `POST /api/jobs/:id/start`

Starts the AXL workflow for an existing job. Sends `job.created` to the Planner and begins consuming inbound messages in the background. Returns `404` if the job is not found.

---

### `GET /api/jobs/:id`

Returns the current job state including per-module status and timestamps.

```json
{
  "job": {
    "id": "job_1710000000000_1",
    "agentId": "agent_alkaloid_predictor_v2",
    "userWallet": "0xabc...",
    "filename": "alkaloid-sample.csv",
    "status": "analyzing",
    "paymentStatus": "authorized",
    "plannerStatus": "completed",
    "analyzerStatus": "running",
    "criticStatus": "pending",
    "reporterStatus": "pending",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

**Module status values:** `pending`, `running`, `completed`, `failed`

---

### `GET /api/jobs/:id/messages`

Returns the full AXL message log for a job, ordered by timestamp.

```json
{
  "messages": [
    {
      "sender": "planner",
      "receiver": "analyzer",
      "type": "plan.generated",
      "payload": { "sampleCount": 4 },
      "timestamp": "2026-04-24T14:03:11.421Z"
    }
  ]
}
```

---

### `GET /api/jobs/:id/result`

Returns the final analysis result. Only available once `status` is `completed`.

```json
{
  "result": {
    "summary": "Demo sample shows modest alkaloid-like screening signals.",
    "confidence": 0.76,
    "keyFindings": [
      "3 candidate alkaloid-like signals detected",
      "Top families: indole-like, quinoline-like, isoquinoline-like"
    ],
    "provenanceId": "prov_job_1710000000000_1"
  }
}
```

::: info Polling
The frontend polls `GET /api/jobs/:id` every 2 seconds to render live progress. Switch to `/messages` after the job completes to inspect the full AXL trace.
:::
