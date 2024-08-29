import { action, atom } from "@reatom/core";
import { h, VNode } from "snabbdom";
import { ctx } from "../../main";

const count = atom(0);
const count2 = atom(10);

const increment = action((ctx) => {
  const oldValue = ctx.get(count);
  count(ctx, oldValue + 1);
});

const increment2 = action((ctx) => {
  const oldValue = ctx.get(count2);
  count2(ctx, oldValue + 1);
});

type Props = {
  children: VNode | string;
};

export const aboutPage = (props: Props) =>
  h("div#about", [
    h("div", [
      h("div", ctx.get(count)),
      h(
        "button",
        {
          on: {
            click: () => increment(ctx),
          },
        },
        props.children || "",
      ),
      h("div", ctx.get(count2)),
      h(
        "button",
        {
          on: {
            click: () => increment2(ctx),
          },
        },
        props.children || "",
      ),
    ]),
  ]);
