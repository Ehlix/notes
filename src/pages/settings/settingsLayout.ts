import { h, VNode } from "snabbdom";
import { goTo } from "../../router";
import { ctx } from "../../main";
import styles from "./settiongsLayout.module.css";

type Props = {
  children: VNode | string;
};

const PAGES = [
  {
    title: "User settings",
    path: "/settings",
  },
  {
    title: "Security",
    path: "/settings/security",
  },
  {
    title: "Notifications",
    path: "/settings/notifications",
  },
];

export const settingLayout = (props: Props) =>
  h("div", [
    h(
      `div.${styles.nav}`,
      PAGES.map((page) =>
        h(
          "ul",
          h(
            "li",
            h(
              "button",
              {
                on: {
                  click: () => goTo(ctx, page.path, page.title),
                },
              },
              page.title,
            ),
          ),
        ),
      ),
    ),
    props.children,
  ]);
