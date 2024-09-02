import { noteDataParser } from "@/common/utils/noteDataParser";
import { ctx } from "@/main";
import { h } from "snabbdom";
import { errorAtom, noteAtom, subToNoteUpdate } from "./model";
import styles from "./notePage.module.css";
import { Related } from "./Relates";
import { Loading } from "@/common/components/other/Loading";

export const NotePage = () => {
  const notes = ctx.get(noteAtom);
  const error = ctx.get(errorAtom);

  subToNoteUpdate(ctx);
  if (error) {
    return h("div.animation_fade_in", [
      "Something wrong ",
      h(`i.nf.nf-md-skull`, {
        style: {
          minHeight: "2rem",
        },
      }),
    ]);
  }
  if (notes && !notes.length) {
    return h("div.animation_fade_in", "Nothing");
  }
  if (!notes) {
    console.log("loading");
    return Loading();
  }
  const related = Related();
  return h("div.container.animation_fade_in", [
    h(`div.${styles.note}`, [
      ...noteDataParser(notes),
      related && h("h3", ["// Related"]),
      related,
    ]),
  ]);
};
