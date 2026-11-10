// SELF-DEFINED — the agent backend this harness's Copilot Runtime points at.
//
// https://docs.copilotkit.ai/angular/ms-agent-dotnet/quickstart ships no
// backend for this framework ("setup skipped: agent-setup is not bundled for
// ms-agent-dotnet") and sends you to the runtime guide, which is TypeScript
// only. So this file is the smallest Microsoft Agent Framework (.NET) host
// that answers the runtime's HttpAgents, built from the same pieces as the
// CopilotKit showcase's showcase/integrations/ms-agent-dotnet/agent/Program.cs
// (`AddAGUI`, `MapAGUI`, `ChatClientAgent`, the same package pins), minus the
// showcase's aimock / CVDIAG test plumbing.
//
// Endpoints (each one an AG-UI agent streaming over SSE):
//   POST /           the `default` (and `support`) agent
//   POST /subagents  the Sub-Agents supervisor, SubagentsAgent.cs, from the
//                    showcase unchanged
//   GET  /health     liveness, for the frontend's backend-health check
//
// Mirrors ../ms-agent-py/backend/main.py, the Python harness's equivalent.
// quickstart : connect the selected agent backend
using System.ClientModel;
using System.ComponentModel;
using Microsoft.Agents.AI;
using Microsoft.Agents.AI.Hosting.AGUI.AspNetCore;
using Microsoft.AspNetCore.Http.Json;
using Microsoft.Extensions.AI;
using Microsoft.Extensions.Options;
using OpenAI;

LoadDotEnv(Path.Combine(AppContext.BaseDirectory, ".env"));
LoadDotEnv(Path.Combine(Directory.GetCurrentDirectory(), ".env"));

var builder = WebApplication.CreateBuilder(args);
var port = Environment.GetEnvironmentVariable("PORT") ?? "8241";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

builder.Services.AddAGUI();
// The browser calls GET /health directly (components/backend-health.ts), so
// this origin must be reachable cross-origin. Same policy as main.py's
// CORSMiddleware.
builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));

var app = builder.Build();
app.UseCors();

var loggerFactory = app.Services.GetRequiredService<ILoggerFactory>();
var logger = loggerFactory.CreateLogger("Program");
var jsonOptions = app.Services.GetRequiredService<IOptions<JsonOptions>>().Value.SerializerOptions;

// Same key/endpoint resolution as the showcase (ApiKeyResolver.cs, copied
// unchanged), so this agent and the sub-agents supervisor — whose factory
// resolves its own client through ApiKeyResolver — hit the same upstream.
var endpoint = ApiKeyResolver.ResolveEndpoint(builder.Configuration);
var apiKey = ApiKeyResolver.ResolveApiKey(builder.Configuration, logger);
var model = Environment.GetEnvironmentVariable("OPENAI_CHAT_MODEL_ID") ?? "gpt-5.4-mini";
logger.LogInformation("OpenAI endpoint {Endpoint}, default-agent model {Model}", endpoint, model);

var openAiClient = new OpenAIClient(
    new ApiKeyCredential(apiKey),
    new OpenAIClientOptions { Endpoint = new Uri(endpoint) });

// frontend tools : server tool getWeather start
[Description("Get the weather for a location.")]
static string GetWeather([Description("The location to get weather for")] string location)
{
    var normalized = string.IsNullOrWhiteSpace(location) ? "the requested location" : location.Trim();
    return $"The weather for {normalized} is 70 degrees.";
}
// frontend tools : server tool getWeather end

// quickstart : default agent start
AIAgent defaultAgent = new ChatClientAgent(
    openAiClient.GetChatClient(model).AsIChatClient(),
    name: "sample_agent",
    instructions: "You are a helpful assistant.",
    tools: [AIFunctionFactory.Create(GetWeather, options: new() { Name = "getWeather", SerializerOptions = jsonOptions })]);
// quickstart : default agent end

// subagents : supervisor agent start
var subagentsFactory = new SubagentsAgentFactory(builder.Configuration, loggerFactory, jsonOptions);
// subagents : supervisor agent end

// quickstart : expose agent framework endpoint start
app.MapAGUI("/", defaultAgent);
// quickstart : expose agent framework endpoint end
// subagents : expose supervisor endpoint start
app.MapAGUI("/subagents", subagentsFactory.CreateAgent());
// subagents : expose supervisor endpoint end

app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

await app.RunAsync();

// .NET has no load_dotenv; read KEY=VALUE lines from backend/.env without
// overriding variables already set in the environment.
static void LoadDotEnv(string path)
{
    if (!File.Exists(path)) return;
    foreach (var raw in File.ReadAllLines(path))
    {
        var line = raw.Trim();
        if (line.Length == 0 || line.StartsWith('#')) continue;
        var eq = line.IndexOf('=');
        if (eq <= 0) continue;
        var key = line[..eq].Trim();
        var value = line[(eq + 1)..].Trim().Trim('"');
        if (Environment.GetEnvironmentVariable(key) is null)
        {
            Environment.SetEnvironmentVariable(key, value);
        }
    }
}
