// COMMENTED OUT so the app builds: @copilotkit/angular/generative-ui is not in
// any published @copilotkit/angular release. Uncomment every line once it is.
// /**
//  * Mounts every Angular snippet of
//  * https://docs.copilotkit.ai/ms-agent-dotnet/generative-ui/components/surfaces
//  * beside a chat on the `default` agent:
//  *
//  * - "Add a page target": <app-featured-products> (featured-products.component.ts).
//  * - "Scroll to the surface": the guide's HTML fragment, verbatim, between the
//  *   region markers in the template below. ("Limit the components" is the
//  *   same element as the featured target, with the same id and limits, so it
//  *   is shown on the route page rather than mounted a second time.)
//  * - "One target for each item": <app-product-page> (product-page.component.ts).
//  *
//  * The page layout and the sample products are this harness's own; the guide
//  * passes `products` without saying where they come from.
//  */
// import { Component, signal } from "@angular/core";
// import { CopilotChat } from "@copilotkit/angular";
// import { CopilotGenerativeUISurface } from "@copilotkit/angular/generative-ui";
//
// import { FeaturedProducts } from "./featured-products.component";
// import { ProductPage } from "./product-page.component";
// import type { Product } from "./product-row.component";
//
// const SAMPLE_PRODUCTS: Product[] = [
//   { id: "trail-runner", name: "Trail Runner", price: 89 },
//   { id: "city-sneaker", name: "City Sneaker", price: 65 },
//   { id: "marathon-pro", name: "Marathon Pro", price: 140 },
// ];
//
// @Component({
//   selector: "app-surfaces-demo",
//   imports: [CopilotChat, CopilotGenerativeUISurface, FeaturedProducts, ProductPage],
//   template: `
//     <div class="layout">
//       <main class="page">
//         <h2>Featured Products</h2>
//         <app-featured-products [products]="products()" />
//
//         <h2>{{ selected().name }}</h2>
//         <app-product-page [product]="selected()" />
//
//         <h2>Notes</h2>
//         <!-- surfaces : scroll to the surface start -->
//         <copilot-generative-ui-surface id="sidebar-notes" [autoScroll]="false" />
//         <!-- surfaces : scroll to the surface end -->
//       </main>
//       <copilot-chat class="chat" />
//     </div>
//   `,
//   styles: `
//     :host {
//       display: block;
//       height: 100%;
//     }
//     .layout {
//       display: grid;
//       grid-template-columns: minmax(0, 1.4fr) minmax(320px, 1fr);
//       height: 100%;
//     }
//     .page {
//       overflow: auto;
//       padding: 24px;
//       border-right: 1px solid #e5e7eb;
//     }
//     .page h2 {
//       margin: 24px 0 12px;
//       font-size: 18px;
//     }
//     .chat {
//       min-width: 0;
//       height: 100%;
//     }
//   `,
// })
// export class SurfacesDemoComponent {
//   protected readonly products = signal(SAMPLE_PRODUCTS);
//   protected readonly selected = signal(SAMPLE_PRODUCTS[0]);
// }
