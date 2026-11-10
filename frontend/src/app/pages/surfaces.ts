import { Component } from '@angular/core';

import { RouteHeader } from '../components/route-header';
import { Callout, DocSample, Panel, SourceCode, TryIt } from '../components/ui';

@Component({
  selector: 'app-surfaces-page',
  imports: [RouteHeader, Panel, Callout, TryIt, SourceCode, DocSample],
  template: `
    <app-route-header path="/surfaces" />

    <div class="space-y-6">
      <ui-try-it>
        <p class="mt-1 text-slate-700">
          <strong>Commented out — no demo yet.</strong> The integration is in
          place but every line of <code>features/surfaces/</code>, the
          <code>provideGenerativeUI</code> block in <code>app.config.ts</code>,
          and the <code>/surfaces/demo</code> route are commented out, so the
          rest of the app builds. Uncommented, <code>ng build</code> fails with
          <code>Could not resolve "&#64;copilotkit/angular/generative-ui"</code>
          and <code>TS2304: Cannot find name 'Product'</code>.
        </p>
        <p class="mt-2 text-slate-700">
          Once a release ships the entry point, uncomment them, open the demo
          and send <em>Show me cheap running shoes in the featured row.</em>
          <strong>Pass:</strong> the Featured Products row swaps to a
          ProductGrid of ProductCards, then returns to the harness's own row
          after <em>Show the featured products again.</em>
        </p>
      </ui-try-it>

      <ui-callout tone="warn" title="The guide's entry point is not published">
        Every Angular snippet on the page imports from
        <code>&#64;copilotkit/angular/generative-ui</code>.
        <code>&#64;copilotkit/angular</code> 0.6.0 — npm <code>latest</code>,
        installed here — exports only <code>.</code>,
        <code>./a2ui</code>, <code>./mcp-apps</code> and
        <code>./styles.css</code>. The entry point exists only on the
        CopilotKit repo's <code>main</code> branch, whose
        <code>package.json</code> also says 0.6.0. The code below is
        integrated as published, then commented out line by line so the app
        builds; the sources shown are the commented files.
      </ui-callout>

      <ui-panel heading="Add a page target">
        <ui-source path="src/app/features/surfaces/featured-products.component.ts" />
      </ui-panel>

      <ui-panel heading="Limit the components">
        <p class="mb-3 text-sm text-slate-700">
          The same element as the featured target above — same id, same
          limits — so it is not mounted a second time.
        </p>
        <ui-doc-sample caption="the guide's fragment" language="xml" [code]="limitSample" />
      </ui-panel>

      <ui-panel heading="Scroll to the surface">
        <ui-source path="src/app/features/surfaces/surfaces-demo.component.ts" />
        <div class="mt-3">
          <ui-doc-sample caption="the guide's CSS, appended to src/styles.css" language="css" [code]="cssSample" />
        </div>
      </ui-panel>

      <ui-panel heading="One target for each item">
        <ui-source path="src/app/features/surfaces/product-page.component.ts" />
      </ui-panel>

      <ui-panel heading="When a component fails">
        <ui-source path="src/app/app.config.ts" />
      </ui-panel>

      <ui-callout title="Not in the guide — where the gaps were filled">
        <ul class="ml-5 list-disc space-y-1">
          <li>
            <code>shopUI</code> (<code>features/surfaces/shop-ui.ts</code>):
            the Angular demo's
            <code>examples/v2/angular/demo/src/app/routes/generative-ui/shop-ui.ts</code>,
            unchanged, plus <code>ProductGrid</code>. The guide limits its
            target to <code>ProductGrid</code> and <code>ProductCard</code>, and
            only the React shop example
            (<code>examples/v2/generative-ui-shop</code>) defines
            <code>ProductGrid</code>; it is ported with the same description,
            props and slot.
          </li>
          <li>
            <code>ProductRow</code> and <code>Product</code>
            (<code>product-row.component.ts</code>) and
            <code>MyFallback</code> (<code>my-fallback.component.ts</code>):
            self-defined. No Angular source defines them; they are built from
            the React example's fallback row and from the guide's own
            description of the fallback's inputs.
          </li>
          <li>
            <code>featured-products.component.ts</code> uses
            <code>Product</code> without importing it. Kept as published, so
            it is a second compile error.
          </li>
          <li>
            The "One target for each item" fragment has no import lines; the
            imports in <code>product-page.component.ts</code> are added so it
            can be mounted.
          </li>
          <li>
            The sample products and the demo layout are the harness's own.
          </li>
        </ul>
      </ui-callout>
    </div>
  `,
})
export default class SurfacesPage {
  protected readonly limitSample = `<copilot-generative-ui-surface id="featured" [ui]="shopUI" [components]="['ProductGrid', 'ProductCard']" />`;
  protected readonly cssSample = `[data-generative-ui-surface] {
  scroll-margin-top: 6rem;
}`;
}
