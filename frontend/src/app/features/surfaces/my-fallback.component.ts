// COMMENTED OUT so the app builds: @copilotkit/angular/generative-ui is not in
// any published @copilotkit/angular release. Uncomment every line once it is.
// /**
//  * SELF-DEFINED — `MyFallback`, which the Surfaces guide's
//  * `provideGenerativeUI({ errorFallback: MyFallback })` names but never shows.
//  *
//  * Built only from what the guide says about it: "A component with the inputs
//  * `message` and `componentId`, and `retry` if it declares it", where `retry`
//  * "creates the component again with the current data".
//  */
// import { Component, input } from "@angular/core";
//
// @Component({
//   selector: "app-my-fallback",
//   template: `
//     <div
//       role="alert"
//       style="
//         display: flex;
//         gap: 8px;
//         align-items: center;
//         padding: 8px 12px;
//         border: 1px solid #fca5a5;
//         border-radius: 8px;
//         background: #fef2f2;
//         color: #991b1b;
//         font-size: 13px;
//       "
//     >
//       <span>{{ componentId() }} failed: {{ message() }}</span>
//       @if (retry(); as retry) {
//         <button type="button" (click)="retry()">Try again</button>
//       }
//     </div>
//   `,
// })
// export class MyFallback {
//   readonly message = input<string>();
//   readonly componentId = input<string>();
//   readonly retry = input<() => void>();
// }
