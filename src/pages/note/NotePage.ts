import { h } from "snabbdom";
import { ctx } from "../../main";
import { pathAtom } from "../../router";
import { action, atom } from "@reatom/framework";
import { getNote } from "../../common/api/notes";
import { noteDataParser } from "../../common/utils/noteDataParser";
import styles from "./notesPage.module.css";

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
    h(`div.${styles.note}`, notes && noteDataParser(notes)),
  ]);
};
