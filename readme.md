### Project Overview

This project is an **interactive test harness and demonstration suite** for validating the integration between **CopilotKit** (Angular client + Node runtime) and the **Microsoft Agent Framework** (.NET / ASP.NET Core).

It follows the structure of the Python harness, [`../ms-agent-py`](../ms-agent-py), and serves the same two purposes:

1. **Interactive Demo & QA Harness**: A running Angular 22 web application that implements each feature of `@copilotkit/angular` covered by the [ms-agent-dotnet Angular docs](https://docs.copilotkit.ai/angular/ms-agent-dotnet) against a live .NET Microsoft Agent Framework backend.
2. **Living Documentation Verifier**: Mirrors the official documentation in [doc-snapshot/](doc-snapshot), so the code snippets shown on each route are byte-identical to the code that runs.

---

### Architecture Overview

```mermaid
flowchart LR
    subgraph Browser ["Frontend (Angular 22)"]
        UI["@copilotkit/angular\n(Signal-based & Zoneless)"]
    end

    subgraph Runtime ["Copilot Runtime (Node.js)"]
        CR["@copilotkit/runtime/v2\n(Port 8240 /api/copilotkit)"]
        HA["HttpAgent (AG-UI Client)"]
    end

    subgraph Backend ["Agent Framework (.NET / ASP.NET Core)"]
        AF["MapAGUI endpoints\n(Port 8241 POST / and /subagents)"]
        Tools["Tools: getWeather; research/writing/critique sub-agents"]
    end

    subgraph Model ["LLM Provider"]
        LLM["OpenAI-compatible\n(OPENAI_BASE_URL)"]
    end

    UI -- "POST /api/copilotkit\n(SSE Events)" --> CR
    CR -- "AG-UI protocol over SSE" --> AF
    AF -- "Chat completions / tool calls" --> LLM
```

1. **Frontend (Browser - Angular 22)**: [app.config.ts](frontend/src/app/app.config.ts) uses `provideCopilotKit({ runtimeUrl: 'http://localhost:8240/api/copilotkit' })`. No model key reaches the browser.
2. **Copilot Runtime Proxy ([frontend/server.ts](frontend/server.ts))**: a standalone Node server on **port 8240** using `@copilotkit/runtime/v2`. Registers `default` and `support` (both → `http://localhost:8241/`) and `subagents` (→ `/subagents`) through `@ag-ui/client`'s `HttpAgent`, enables `a2ui: {}`, and hosts a second, token-gated runtime at `/api/copilotkit-auth` for the Authentication route.
3. **Backend Agent ([backend/Program.cs](backend/Program.cs))**: ASP.NET Core on **port 8241**, `Microsoft.Agents.AI.Hosting.AGUI.AspNetCore`. `POST /` is a `ChatClientAgent` with a `getWeather` tool; `POST /subagents` is the showcase's sub-agents supervisor; `GET /health` is the liveness probe.

---

### Directory Structure

```
ms-agent-dotnet/
├── doc-snapshot/               # Versioned upstream documentation snapshots
│   ├── manifest.json           # SHA256 checksums & route mappings
│   ├── CHANGELOG.md            # Doc drift history
│   ├── reports/                # Timestamped diff analysis reports
│   └── pages/                  # Tracked official guide markdown files
├── backend/                    # .NET / Microsoft Agent Framework
│   ├── Backend.csproj          # Showcase package pins (net9.0, RollForward Major)
│   ├── Program.cs              # Self-defined host: default agent, MapAGUI endpoints
│   ├── SubagentsAgent.cs       # Showcase — what the Sub-Agents guide quotes (one marked deviation)
│   └── shared/                 # Showcase _shared/dotnet/LunaChatClientExtensions.cs, unchanged
├── autorecorder/               # Portable screen-recording suite (config/ + actions/ adapted)
└── frontend/                   # Angular 22 Application + Node Runtime
    ├── server.ts               # Copilot Runtime server (Node.js, Port 8240)
    ├── scripts/
    │   ├── generate-sources.ts # Syncs running source code into TypeScript strings
    │   └── doc-sync.ts         # Doc drift check / sync
    └── src/app/
        ├── app.config.ts       # Root providers (provideCopilotKit, sandbox functions)
        ├── app.routes.ts       # Doc routes + isolated chrome-free /demo routes
        ├── features/           # One folder per feature
        ├── lib/                # Nav configuration, source loader, doc-sync
        └── pages/              # Routed doc & overview pages
```

---

### Feature Modules & Implementation Status

Every route is defined once in [nav-config.ts](frontend/src/app/lib/nav-config.ts) and listed with its status on `/status`. **Unverified** means the route is implemented from the guide and the stack starts and streams, but the feature has not yet been exercised end to end against a live model.

| Doc page | Route(s) | Status |
| :--- | :--- | :--- |
| [Quickstart](https://docs.copilotkit.ai/angular/ms-agent-dotnet/quickstart) | `/quickstart` | Unverified |
| [WebMCP](https://docs.copilotkit.ai/angular/ms-agent-dotnet/webmcp) | `/webmcp` | Partial (Chrome 149+ / flag) |
| [Authentication](https://docs.copilotkit.ai/angular/ms-agent-dotnet/auth) | `/auth` | Unverified |
| [Sub-Agents](https://docs.copilotkit.ai/angular/ms-agent-dotnet/multi-agent/subagents) | `/subagents` | Unverified |
| [Chat UI](https://docs.copilotkit.ai/angular/ms-agent-dotnet/guides/chat-ui) | `/chat-ui` | Unverified |
| [Frontend tools & generative UI](https://docs.copilotkit.ai/angular/ms-agent-dotnet/guides/frontend-tools-generative-ui) | `/frontend-tools-generative-ui` | Unverified |
| [A2UI](https://docs.copilotkit.ai/angular/ms-agent-dotnet/guides/a2ui) | `/a2ui` | Unverified |
| [Voice & multimodal](https://docs.copilotkit.ai/angular/ms-agent-dotnet/guides/voice-multimodal) | `/voice-multimodal` | Partial (no transcription service) |
| [Human-in-the-loop](https://docs.copilotkit.ai/angular/ms-agent-dotnet/guides/human-in-the-loop) | `/human-in-the-loop` | Unverified |
| [Shared state](https://docs.copilotkit.ai/angular/ms-agent-dotnet/guides/shared-state) | `/shared-state` | Unverified |
| [Generative UI — Surfaces](https://docs.copilotkit.ai/ms-agent-dotnet/generative-ui/components/surfaces) | `/surfaces` | Broken (`@copilotkit/angular/generative-ui` is unpublished; integration commented out so the app builds) |
| [Threads, memory, attachments, headless](https://docs.copilotkit.ai/angular/ms-agent-dotnet/guides/threads-memory-attachments-headless) | `/threads`, `/memory`, `/attachments`, `/headless` | Partial (threads/memory need Intelligence) / Unverified |

---

### Where the docs left gaps

Only the Sub-Agents page contains any C#; every other page is Angular/TypeScript and byte-identical to the ms-agent-python page. Gaps were filled from the CopilotKit showcase (`showcase/integrations/ms-agent-dotnet/`), never invented, and each is labelled on its route:

- **Quickstart backend step** — published as `<!-- setup skipped: agent-setup is not bundled for ms-agent-dotnet -->`. [backend/Program.cs](backend/Program.cs) is therefore self-defined, from the showcase's `Program.cs` building blocks.
- **Sub-Agents** — both C# snippets stop mid-`CreateAgent()` and call `ApiKeyResolver`, `AimockHeaderPolicy` and `AsLunaChatClient()`, which the page never defines. The full showcase file and `LunaChatClientExtensions.cs` are copied. `ApiKeyResolver` and `AimockHeaderPolicy` are showcase test plumbing and are left out ([CLAUDE.md](CLAUDE.md), "Showcase-only code"); the constructor reads `OPENAI_API_KEY` / `OPENAI_BASE_URL` from configuration instead, marked `HARNESS DEVIATION`. The hard-coded model `gpt-6-luna` is kept as published.
- **`getWeather`** — the tools guide renders a server tool it never shows; the .NET tool mirrors the Python harness's self-defined `getWeather(location)`.

---

### How to Run the Project

#### 1. Backend (.NET Agent Framework)

```bash
cd backend
cp .env.example .env    # set OPENAI_API_KEY (OPENAI_BASE_URL is optional)
dotnet run
# Runs on http://localhost:8241  (GET /health)
```

_Requires the .NET 9 SDK or newer (`RollForward` is `Major`, so a .NET 10-only machine works)._

#### 2. Copilot Runtime & Angular Frontend

```bash
cd frontend
npm install
# optional: echo "CPK_INTELLIGENCE_API_KEY=..." > .env   (threads / memory)

# Option A: Run runtime and frontend concurrently
npm run dev

# Option B: Run separately
npm run runtime    # Starts Copilot Runtime on http://localhost:8240
npm start          # Starts Angular Dev Server on http://localhost:4240
```

#### 3. Automated Screen Recording

Lives in [autorecorder/](autorecorder), adapted through `config/` and `actions/` only (see [autorecorder/README.md](autorecorder/README.md)). With the backend (`8241`), runtime (`8240`) and dev server (`4240`) running:

```bash
cd autorecorder
npm install
npx playwright install chromium
npm run doctor            # validate the configuration (exits 1 on error)
npm run record -- --list  # what will be recorded
npm run record            # record all pages
```

Recordings are saved to `autorecorder/videos/MSNET-angular-<NN>-<Name>.webm`.

#### 4. Documentation Drift & Sync

`/doc-sync` (and `npm run doc:check` / `npm run doc:sync` in `frontend/`) fetches the markdown behind every tracked page under `https://docs.copilotkit.ai/angular/ms-agent-dotnet`, diffs it against `doc-snapshot/`, and ranks changes High (code fences), Medium (headings / nearby prose) or Low.

---

### Known doc findings

See [FINDINGS.md](FINDINGS.md).

### Upgrading Packages

Frontend: `npm --prefix frontend outdated`, then bump on a branch and `npm --prefix frontend run build`. Do not use `npm-check-updates -u` or `--legacy-peer-deps` (see the Python harness's README for why).

Backend: the `PackageReference` pins are the showcase's and are exact on purpose — the Sub-Agents guide's `AgentThread` / `AgentRunResponse` overrides only compile against `Microsoft.Agents.AI.Hosting.AGUI.AspNetCore` `1.0.0-preview.251110.1`. Later releases renamed them (`AgentSession`, `AgentResponse`, `RunCoreAsync`); raising the pin breaks the guide's code, which is itself a finding to record rather than fix.
