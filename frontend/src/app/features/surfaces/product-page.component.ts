// COMMENTED OUT so the app builds: @copilotkit/angular/generative-ui is not in
// any published @copilotkit/angular release. Uncomment every line once it is.
// /**
//  * "One target for each item", from
//  * https://docs.copilotkit.ai/ms-agent-dotnet/generative-ui/components/surfaces
//  *
//  * The guide shows this as a bare `ts` fragment with no import lines. The
//  * component between the region markers is the guide's, unchanged; the imports
//  * above it are added so it can be mounted: Angular's `Component` and `input`,
//  * the guide's own `CopilotGenerativeUISurface`, and the self-defined
//  * `Product` from ./product-row.component.
//  */
// import { Component, input } from "@angular/core";
// import { CopilotGenerativeUISurface } from "@copilotkit/angular/generative-ui";
// import type { Product } from "./product-row.component";
//
// // surfaces : one target for each item start
// @Component({
//   selector: "app-product-page",
//   imports: [CopilotGenerativeUISurface],
//   template: `
//     <copilot-generative-ui-surface
//       [id]="'recommendations-' + product().id"
//       [description]="recommendationsDescription(product())"
//     />
//   `,
// })
// export class ProductPage {
//   readonly product = input.required<Product>();
//
//   protected recommendationsDescription({ name }: Product) {
//     return `The "You might also like" row under ${name}. Show related products here. Never include ${name} itself.`;
//   }
// }
// // surfaces : one target for each item end
