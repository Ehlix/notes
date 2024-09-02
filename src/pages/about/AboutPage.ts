import { h } from "snabbdom";
import styles from "./about.module.css";

export const aboutPage = () =>
  h("div#about.container", [
    h(`h1.${styles.title}`, "A.F."),
    h("div", ["I build stuff for the web"]),
    h(
      `a.${styles.link}`,
      {
        props: {
          href: "https://github.com/ehlix",
        },
      },
      ["GitHub", h("i.nf.nf-cod-github")],
    ),
  ]);
