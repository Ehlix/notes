import { h, VNodeChildElement } from "snabbdom";
import style from "./link.module.css";
import { goTo } from "../../../router";
import { ctx } from "../../../main";

type Props = {
  href: string;
  title: string;
  children?: VNodeChildElement[];
  class?: string;
};

export const Link = (props: Props) => {
  return h(
    `a.${style.link}.${props.class}`,
    {
      props: {
        href: props.href,
      },
      on: {
        click: (e) => (e.preventDefault(), goTo(ctx, props.href, props.title)),
      },
    },
    props.children || props.title,
  );
};
