/**
 * The nav, every route header, the demo links, and the README status table all
 * read from here, so a doc page and its implementation status are described
 * exactly once.
 *
 * Groups mirror the sidebar at
 * https://docs.copilotkit.ai/angular/ms-agent-dotnet, limited to the pages this
 * harness was asked to cover. The threads/memory/attachments/headless page covers
 * four topics at once; it is split into four routes here, which all point back
 * at the same `docPath`.
 *
 * There is exactly one doc-sync date in this repo, and it is not here: it is
 * `syncedAt` in `doc-snapshot/manifest.json`, written every time the sync
 * runs. A hand-maintained constant here could only ever drift out of
 * agreement with the machine one, so it was removed — `/doc-sync` is the
 * single place that answers "how current are these docs".
 */
export const DOCS_ROOT = 'https://docs.copilotkit.ai/angular/ms-agent-dotnet';

/**
 * working   — implemented and exercisable against the local stack.
 * partial   — implemented, but something outside this repo limits it
 *             (a premium license, a runtime capability this repo does not run).
 * reference — intentionally not a live feature; notes surface only.
 * broken    — implemented but currently failing.
 * unverified — implemented from the guide, never exercised end to end against
 *             a live model on this stack yet.
 */
export type RouteStatus =
  | 'working'
  | 'partial'
  | 'reference'
  | 'broken'
  | 'unverified'
  | 'not-started';

export interface RouteMeta {
  /** App route path. */
  path: string;
  /** Nav label. */
  title: string;
  /** Doc page this route tests, relative to docs.copilotkit.ai. */
  docPath: string;
  /** One-line description in our own words. */
  summary: string;
  status: RouteStatus;
  /** Shown in the route header when the status is not plain "working". */
  statusNote?: string;
  /** Feature requires a CopilotKit Enterprise Intelligence license. */
  premium?: boolean;
  /**
   * This route owns a live interactive surface, which lives at `<path>/demo`
   * rather than on the page itself. The doc route keeps the explanation and the
   * source; the demo route is chrome-free so it can be screen-recorded alone.
   */
  hasDemo?: boolean;
}

/** Where a route's interactive demo lives, if it has one. */
export function demoPath(route: RouteMeta): string | undefined {
  if (!route.hasDemo) return undefined;
  return route.path === '/' ? '/demo' : `${route.path}/demo`;
}

export interface NavGroup {
  title: string;
  routes: RouteMeta[];
}

export const NAV: NavGroup[] = [
  {
    title: 'Getting Started',
    routes: [
      {
        path: '/',
        title: 'Introduction',
        docPath: '/angular/ms-agent-dotnet',
        summary:
          'What this harness covers and how the three processes fit together.',
        status: 'reference',
        statusNote: 'Landing page — orientation and a live connection check.',
      },
      {
        path: '/quickstart',
        hasDemo: true,
        title: 'Quickstart',
        docPath: '/angular/ms-agent-dotnet/quickstart',
        summary:
          'The smallest end-to-end path: an HttpAgent in Copilot Runtime pointed at the .NET Agent Framework endpoint, provideCopilotKit, and one copilot-chat.',
        status: 'working',
        statusNote:
          'The guide ships no backend for this framework ("agent-setup is not bundled for ms-agent-dotnet"), so backend/Program.cs is self-defined.',
      },
    ],
  },
  {
    title: 'Guides',
    routes: [
      {
        path: '/chat-ui',
        hasDemo: true,
        title: 'Chat UI and customization',
        docPath: '/angular/ms-agent-dotnet/guides/chat-ui',
        summary:
          'The four chat surfaces, a replaced assistant-message component, and scoped chat CSS.',
        status: 'working',
      },
      {
        path: '/frontend-tools-generative-ui',
        hasDemo: true,
        title: 'Frontend tools and generative UI',
        docPath: '/angular/ms-agent-dotnet/guides/frontend-tools-generative-ui',
        summary:
          'A server-side tool call rendered by an Angular component, a browser-executed tool, the display-only registerComponent path, and sandboxed Open Generative UI.',
        status: 'working',
        statusNote:
          'The guide never shows the server side of getWeather; backend/Program.cs declares a self-defined getWeather(location), while the guide’s renderer reads args.city.',
      },
      {
        path: '/a2ui',
        hasDemo: true,
        title: 'A2UI schemas, styling, and recovery',
        docPath: '/angular/ms-agent-dotnet/guides/a2ui',
        summary:
          'Declarative generative UI driven by the runtime A2UI middleware, with the guide’s recovery thresholds and catalog CSS.',
        status: 'broken',
        statusNote:
          'The catalog registered is the guide’s createAngularCatalog one from “Use existing web components” (Panel + the acme-badge Custom Element). It only type-checks with zod 3, which the guide never states; the schema-strategy snippets remain not self-contained.',
      },
      {
        path: '/voice-multimodal',
        hasDemo: true,
        title: 'Voice and multimodal input',
        docPath: '/angular/ms-agent-dotnet/guides/voice-multimodal',
        summary:
          'The built-in microphone control, an attachments config, and a programmatically constructed multimodal message.',
        status: 'partial',
        statusNote:
          'This repo’s runtime has no transcription service configured, so transcription fails by design.',
      },
      {
        path: '/human-in-the-loop',
        hasDemo: true,
        title: 'Human-in-the-loop and interrupts',
        docPath: '/angular/ms-agent-dotnet/guides/human-in-the-loop',
        summary:
          'A decision tool that pauses the run until the user answers, plus a headless interrupt controller.',
        status: 'working',
        statusNote:
          'The interrupt panel stays idle unless the agent emits an AG-UI interrupt; the default .NET agent emits none.',
      },
      {
        path: '/shared-state',
        hasDemo: true,
        title: 'Shared state and agent context',
        docPath: '/angular/ms-agent-dotnet/guides/shared-state',
        summary:
          'Reading and writing agent state through injectAgentStore, and publishing read-only app context two ways.',
        status: 'broken',
        statusNote:
          'The guide shows no agent-side code; the default agent declares no state, so the workspace panel sits on its defaults.',
      },
      {
        path: '/webmcp',
        hasDemo: true,
        title: 'WebMCP',
        docPath: '/angular/ms-agent-dotnet/webmcp',
        summary:
          'A frontend tool opted into WebMCP with webmcp: { annotations }, so the same handler serves the CopilotKit agent and browser agents via document.modelContext.',
        status: 'working',
        statusNote:
          'WebMCP is experimental: browser agents can only discover the tool in Chrome 149+ with the origin trial or chrome://flags/#enable-webmcp-testing. Elsewhere CopilotKit registers nothing, and only the chat path runs.',
      },
    ],
  },
  {
    title: 'Threads, memory, attachments, headless',
    routes: [
      {
        path: '/threads',
        hasDemo: true,
        title: 'Threads',
        docPath: '/angular/ms-agent-dotnet/guides/threads-memory-attachments-headless',
        summary:
          'A hand-built thread list on injectThreads, and the drop-in CopilotThreadsDrawer beside a chat.',
        status: 'partial',
        premium: true,
        statusNote:
          'Thread endpoints come from CopilotKit Intelligence. Without CPK_INTELLIGENCE_API_KEY the list stays empty and the drawer renders its locked state.',
      },
      {
        path: '/memory',
        hasDemo: true,
        title: 'Memory',
        docPath: '/angular/ms-agent-dotnet/guides/threads-memory-attachments-headless',
        summary:
          'injectMemories with the isAvailable() gate the guide requires before showing memory controls.',
        status: 'partial',
        premium: true,
        statusNote:
          'Memory routes come from CopilotKit Intelligence; without them isAvailable() is false and the guide’s fallback message is what renders.',
      },
      {
        path: '/attachments',
        hasDemo: true,
        title: 'Attachments',
        docPath: '/angular/ms-agent-dotnet/guides/threads-memory-attachments-headless',
        summary:
          'An AttachmentsConfig bound to copilot-chat, with the file picker, drag-and-drop, and paste.',
        status: 'broken',
      },
      {
        path: '/headless',
        hasDemo: true,
        title: 'Headless UI',
        docPath: '/angular/ms-agent-dotnet/guides/threads-memory-attachments-headless',
        summary:
          'A transcript and composer built from scratch on injectAgentStore and CopilotKitCore.runAgent.',
        status: 'working',
      },
    ],
  },
  {
    title: 'Runtime and protocol',
    routes: [
      {
        path: '/auth',
        hasDemo: true,
        title: 'Authentication',
        docPath: '/angular/ms-agent-dotnet/auth',
        summary:
          'A runtime gated by an onRequest hook, session headers set through updateRuntime, a forwardHeaders allowlist, and credentialed CORS.',
        status: 'working',
      },
    ],
  },
  {
    title: 'Multi-agent',
    routes: [
      {
        path: '/subagents',
        hasDemo: true,
        title: 'Sub-agents',
        docPath: '/angular/ms-agent-dotnet/multi-agent/subagents',
        summary:
          'A supervisor delegating to research, writing, and critique sub-agents, with a live delegation log driven by shared state.',
        status: 'working',
        statusNote:
          'The guide’s C# compiles as published against the showcase’s package pins, but it is cut off mid-CreateAgent() and hard-codes the model gpt-6-luna; the rest comes from the showcase file it quotes.',
      },
    ],
  },
  {
    title: 'Generative UI',
    routes: [
      {
        path: '/surfaces',
        // hasDemo: true, — the demo is commented out until the entry point ships.
        title: 'Surfaces',
        docPath: '/ms-agent-dotnet/generative-ui/components/surfaces',
        summary:
          'Named page targets for generated UI: a featured-products row the agent can swap, one target per product, auto-scroll, and an error fallback.',
        status: 'broken',
        statusNote:
          'Integrated as published, then commented out so the app builds: @copilotkit/angular/generative-ui is not in any published @copilotkit/angular release (0.6.0 has no such entry point), and the featured-products snippet uses Product without importing it.',
      },
    ],
  },
  {
    title: 'Doc Sync',
    routes: [
      {
        path: '/doc-sync',
        title: 'Doc drift',
        docPath: '/angular/ms-agent-dotnet',
        summary:
          'Re-fetches the markdown behind every tracked doc page and diffs it against the stored snapshot, flagging changes inside code blocks.',
        status: 'reference',
      },
    ],
  },
];

export const ALL_ROUTES: RouteMeta[] = NAV.flatMap((g) => g.routes);

export function findRoute(path: string): RouteMeta | undefined {
  return ALL_ROUTES.find((r) => r.path === path);
}

export function docUrl(route: RouteMeta): string {
  return `https://docs.copilotkit.ai${route.docPath}`;
}

export const STATUS_LABEL: Record<RouteStatus, string> = {
  working: 'Working',
  partial: 'Partial',
  reference: 'Reference',
  broken: 'Broken',
  unverified: 'Unverified',
  'not-started': 'Not started',
};
