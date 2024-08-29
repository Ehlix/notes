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
    title: "// Home",
    path: "/",
  },
  {
    title: "// Notes",
    path: "/note",
  },
];

export const indexLayout = (props: Props) => {
  const currentPath = ctx.get(pathAtom);
  console.log(currentPath);
  return h("div#app", [
    h(
      `nav.${styles.nav}`,
      PAGES.map((page) =>
        h("ul", [
          h(
            "li",
            Link({
              href: page.path,
              title:
                page.title + (currentPath === page.path ? " [current]" : ""),
            }),
          ),
        ]),
      ),
    ),
    h("main#main.container", props.children),
    h(`footer.${styles.footer}`),
  ]);
};
