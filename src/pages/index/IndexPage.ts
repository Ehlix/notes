import { h } from "snabbdom";

export const indexPage = () =>
  h(
    "div#index-page",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      },
    },
    [
      h("span", { style: { fontWeight: "bold" } }, "This is bold"),
      " and this is just normal text",
      h("a", { props: { href: "/foo" } }, "I'll take you places!"),
      h(
        "button",

        { on: { click: () => console.log("click") } },
        "Button",
      ),
    ],
  );
