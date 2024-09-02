import { h, VNode } from "snabbdom";
import styles from "./indexLayout.module.css";
import { Link } from "@/common/components/ui/Link";
import { ctx } from "@/main";
import { pathAtom } from "@/router";

type Props = {
  children: VNode | string;
};

const PAGES = [
  {
    title: "//Notes",
    path: "/",
  },
  {
    title: "//About",
    path: "/about",
  },
];

export const indexLayout = (props: Props) => {
  const currentPath = ctx.get(pathAtom);
  return h("div#app.container", [
    h(
      `nav.${styles.nav}`,
      PAGES.map((page) =>
        h("ul", [
          h(
            "li",
            Link({
              href: page.path,
              title: page.title,
              class: `${styles.link} ${currentPath === page.path ? styles.link_current : ""}`,
            }),
          ),
        ]),
      ),
    ),
    h("main#main", props.children),
    h(`footer.${styles.footer}`),
  ]);
};
