import { h, VNode } from "snabbdom";
import { nestedRouts } from "../../common/static/nestedRouts";
import styles from "./notesPage.module.css";
import { Link } from "../../common/components/ui/Link";

export const NotesPage = () =>
  h(`div.animation_fade_in.${styles.notes}`, [
    h(
      `ul.${styles.top_level}`,
      nestedRouts.map((data) => {
        const getChildrenNode = (
          items: typeof data.subData,
          level: number,
        ): VNode | string => {
          return (
            (items.length &&
              h(
                `ul.${styles[`level_${level}`]}`,
                items.map((item) => {
                  return h("li", [
                    Link({
                      href: item.link,
                      title: item.title,
                      children: [
                        item.title,
                        item.icon ? h(`i.${item.icon}.${styles.icon}`) : "",
                      ],
                    }),
                    (item.subData?.length &&
                      getChildrenNode(item.subData, level + 1)) ||
                      "",
                  ]);
                }),
              )) ||
            ""
          );
        };

        return h("li", [
          Link({
            href: data.link,
            title: data.title,
            children: [
              data.title,
              data.icon ? h(`i.${data.icon}.${styles.icon}`) : "",
            ],
          }),
          data.subData.length ? getChildrenNode(data.subData, 0) : "",
        ]);
      }),
    ),
  ]);
