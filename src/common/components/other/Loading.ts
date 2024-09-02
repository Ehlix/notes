import { h } from "snabbdom";
import styles from "./loading.module.css";

export const Loading = () => {
  return h(`div.animation_fade_in.${styles.loading}`, [
    h(`div`, "Loading"),
    h(`div.${styles.flash}`),
    // h(`span.${styles.dot}`, '.'),
    // h(`span.${styles.dot}`, '.'),
    // h(`span.${styles.dot}`, '.'),
  ]);
};
