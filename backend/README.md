# Backend — Microsoft Agent Framework (.NET)

```bash
cp .env.example .env   # then set OPENAI_API_KEY
dotnet run             # http://localhost:8241
```

| File | Origin |
|---|---|
| `Program.cs` | Self-defined host: the `default` agent, `getWeather`, and the `MapAGUI` endpoints |
| `SubagentsAgent.cs` | CopilotKit showcase `showcase/integrations/ms-agent-dotnet/agent/` — the file the Sub-Agents guide quotes. Unchanged except the factory constructor's `OpenAIClient` setup, which drops the showcase-only `ApiKeyResolver` / `AimockHeaderPolicy` helpers (marked `HARNESS DEVIATION`) |
| `shared/LunaChatClientExtensions.cs` | Showcase `showcase/integrations/_shared/dotnet/`, unchanged (`AsLunaChatClient`, which the guide's code calls) |
| `Backend.csproj` | Showcase `ProverbsAgent.csproj` settings and package pins |
