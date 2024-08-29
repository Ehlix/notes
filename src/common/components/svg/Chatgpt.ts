import { h } from "snabbdom";
import chatgpt from "/chatgpt.svg";

export const Chatgpt = () => {
  return h("img", {
    style: {
      width: "1.5rem",
      height: "1.5rem",
    },
    props: {
      src: chatgpt,
      alt: "",
    },
  });
};
