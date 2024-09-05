import './common/css/index.css';
import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  VNode,
} from 'snabbdom';
import { createCtx, Ctx } from '@reatom/core';
import * as router from './router';
import { InitCanvas } from './common/components/other/BackgroundAnimation';

export const ctx = createCtx();

const app = document.getElementById('app')!;

export const patch = init([
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
]);

const canvas = document.getElementById('canvas')! as HTMLCanvasElement;
InitCanvas(canvas);

let oldLayout: HTMLElement | VNode = app;
let newLayout: VNode;

export const render = (ctx: Ctx) => {
  newLayout = router.getLayout(ctx);
  oldLayout = patch(oldLayout, newLayout);
};
render(ctx);

router.subToPathAtom(() => render(ctx));
