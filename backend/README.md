# Backend — Microsoft Agent Framework (.NET)

```bash
cp .env.example .env   # then set OPENAI_API_KEY
dotnet run             # http://localhost:8241
```

| File | Origin |
|---|---|
| `Program.cs` | Self-defined host: the `default` agent, `getWeather`, and the `MapAGUI` endpoints |
| `SubagentsAgent.cs` | CopilotKit showcase `showcase/integrations/ms-agent-dotnet/agent/`, unchanged — the file the Sub-Agents guide quotes |
| `ApiKeyResolver.cs`, `AimockHeaderPolicy.cs`, `AimockHeaderContext.cs`, `CvDiag.cs`, `CvdiagBackend.cs` | Same showcase directory, unchanged — `SubagentsAgentFactory`'s constructor calls `ApiKeyResolver` and `AimockHeaderPolicy`, which pull in the rest |
| `shared/*.cs` | Showcase `showcase/integrations/_shared/dotnet/`, unchanged (`AsLunaChatClient`, CVDIAG schema) |
| `Backend.csproj` | Showcase `ProverbsAgent.csproj` settings and package pins |
