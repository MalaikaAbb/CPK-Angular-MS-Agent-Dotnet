// COMMENTED OUT so the app builds: @copilotkit/angular/generative-ui is not in
// any published @copilotkit/angular release. Uncomment every line once it is.
// // surfaces : add a page target start
// /**
//  * "Add a page target", verbatim (the Angular tab, src/app/featured-products.component.ts).
//  * https://docs.copilotkit.ai/ms-agent-dotnet/generative-ui/components/surfaces
//  *
//  * Kept exactly as published. Two things it relies on that the page does not
//  * define:
//  * - `@copilotkit/angular/generative-ui` is not in any published
//  *   @copilotkit/angular release (0.6.0, npm `latest`, has no such entry
//  *   point), so this import fails to resolve.
//  * - `Product` is used in `input.required<Product[]>()` but never imported or
//  *   declared. A `Product` type exists in ./product-row.component, but the
//  *   snippet does not import it, so it stays unresolved here.
//  */
// import { Component, input } from "@angular/core";
// import { CopilotGenerativeUISurface } from "@copilotkit/angular/generative-ui";
// import { ProductRow } from "./product-row.component";
// import { shopUI } from "./shop-ui";
//
// @Component({
//   selector: "app-featured-products",
//   imports: [CopilotGenerativeUISurface, ProductRow],
//   template: `
//     <copilot-generative-ui-surface
//       id="featured"
//       [ui]="shopUI"
//       description="The Featured Products row of the home page. When the customer asks to see products here, show them as a ProductGrid with one ProductCard for each product. When they ask for the featured products again, delete this surface."
//       [components]="['ProductGrid', 'ProductCard']"
//     >
//       <app-product-row [products]="products()" />
//     </copilot-generative-ui-surface>
//   `,
// })
// export class FeaturedProducts {
//   readonly products = input.required<Product[]>();
//   protected readonly shopUI = shopUI;
// }
// // surfaces : add a page target end
