// COMMENTED OUT so the app builds: @copilotkit/angular/generative-ui is not in
// any published @copilotkit/angular release. Uncomment every line once it is.
// /**
//  * SELF-DEFINED — `ProductRow` and `Product`, which the Surfaces guide imports
//  * ("./product-row.component") and types against but never shows.
//  *
//  * No Angular source in the CopilotKit repo defines either. The shape follows
//  * the fallback of the React shop example's featured-products section
//  * (examples/v2/generative-ui-shop/app/routes/_landing/+/index/featured-products.section.tsx):
//  * a grid with one plain card per product. `Product` carries only the fields
//  * the catalog's ProductCard renders (name, price, image).
//  */
// import { Component, input } from "@angular/core";
//
// export interface Product {
//   id: string;
//   name: string;
//   price: number;
//   image?: string;
// }
//
// @Component({
//   selector: "app-product-row",
//   template: `
//     <div
//       style="
//         display: grid;
//         gap: 16px;
//         grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
//       "
//     >
//       @for (product of products(); track product.id) {
//         <article
//           style="
//             display: flex;
//             flex-direction: column;
//             gap: 8px;
//             padding: 12px;
//             border: 1px solid rgba(0, 0, 0, 0.1);
//             border-radius: 12px;
//             background: #fff;
//           "
//         >
//           @if (product.image) {
//             <img
//               [src]="product.image"
//               alt=""
//               style="width: 100%; aspect-ratio: 4/3; object-fit: cover; border-radius: 8px"
//             />
//           }
//           <strong>{{ product.name }}</strong>
//           <span style="color: #5d5d5d">{{ "$" + product.price }}</span>
//         </article>
//       }
//     </div>
//   `,
// })
// export class ProductRow {
//   readonly products = input.required<Product[]>();
// }
