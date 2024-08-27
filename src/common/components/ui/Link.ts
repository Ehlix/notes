import { h } from "snabbdom";
import style from "./link.module.css";
import { goTo } from "../../../router";
import { ctx } from "../../../main";

type Props = {
  href: string;
  title: string;
};

export const Link = (props: Props) => {
  return h(
    `button.${style.link}`,
    {
      on: {
        click: () => goTo(ctx, props.href, props.title),
      },
    },
    props.title,
  );
};
