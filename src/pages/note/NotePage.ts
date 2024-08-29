import { getNote } from "@/common/api/notes";
import { noteDataParser } from "@/common/utils/noteDataParser";
import { ctx } from "@/main";
import { pathAtom } from "@/router";
import { action, atom } from "@reatom/core";
import { h, VNode } from "snabbdom";
import styles from "./notePage.module.css";
import { nestedRouts, RoutItem } from "@/common/static/nestedRouts";
import { Link } from "@/common/components/ui/Link";

const notesAtom = atom<NoteResponse | null>(null);

const getPage = action(async (ctx) => {
  const path = ctx.get(pathAtom);
  console.log(path);
  if (!path.startsWith("/note/")) {
    return notesAtom(ctx, null);
  }
  const note = ctx.get(pathAtom).replace("/note/", "");
  const { data, status } = await getNote(note);
  console.log(status);
  return notesAtom(ctx, data || []);
});

const subToPath = () => {
  pathAtom.onChange((ctx) => {
    getPage(ctx);
  });
  getPage(ctx);
};

export const NotePage = () => {
  const notes = ctx.get(notesAtom);
  if (!notes) {
    subToPath();
  }
  if (notes && !notes.length) {
    return h("div.animation_fade_in", "Nothing");
  }
  if (!notes) {
    console.log("loading");
    return h("div.animation_fade_in", "Loading");
  }
  return h("div.container.animation_fade_in", [
    h(`div.${styles.note}`, [
      ...noteDataParser(notes),
      h("h3", ["// Related"]),
      Related(),
    ]),
    h(`div.${styles.related}`, []),
  ]);
};

const Related = (): VNode => {
  const currentPath = ctx.get(pathAtom);
  const tp = currentPath.split("/");
  tp.length = 3;
  const topPath = tp.join("/");
  console.log("ttp", topPath);
  const relatedNodes: VNode[] = [];

  const getNodes = (items: RoutItem[]) => {
    items.forEach((item) => {
      if (item.link !== currentPath) {
        relatedNodes.push(
          h("li", Link({ href: item.link, title: item.title })),
        );
      }
      if (item.subData.length) {
        getNodes(item.subData);
      }
    });
  };

  const targetRouts = nestedRouts.find((item) => {
    return item.link.startsWith(topPath);
  });
  if (targetRouts) {
    if (targetRouts.link !== currentPath) {
      relatedNodes.push(
        h("li", Link({ href: targetRouts.link, title: targetRouts.title })),
      );
    }
    getNodes(targetRouts.subData);
  }
  console.log("related", relatedNodes);
  return h("ul", relatedNodes);
};
