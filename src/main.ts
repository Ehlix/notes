import "./common/css/index.css";
import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  VNode,
} from "snabbdom";
import { createCtx } from "@reatom/core";
import * as router from "./router";
import {
  BackgroundAnimation,
  start,
} from "./common/components/other/BackgroundAnimation";

export const ctx = createCtx();

const app = document.getElementById("app")!;

const canvas = document.getElementById("canvas")!;
export const patch = init([
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
]);

patch(canvas, BackgroundAnimation());
const cvs = document.getElementById("canvas")! as HTMLCanvasElement;
start(cvs);

let oldLayout: HTMLElement | VNode = app;
let newLayout: VNode;

newLayout = router.getLayout(ctx);
oldLayout = patch(oldLayout, newLayout);

ctx.subscribe(() => {
  console.log("----render----");
  newLayout = router.getLayout(ctx);
  oldLayout = patch(oldLayout, newLayout);
});
