import { getNote } from "@/common/api/getNote";
import { pathAtom } from "@/router";
import { action, atom, Ctx } from "@reatom/core";
import { AxiosError } from "axios";

export const noteAtom = atom<NoteResponse | null>(null);
export const errorAtom = atom(false);

let secondTry = false;
let noteHaveSub = false;

export const getPage = action(async (ctx) => {
  const currentPath = ctx.get(pathAtom);
  const isNotePath = !currentPath.startsWith("/note/");

  if (isNotePath) {
    return noteAtom(ctx, null);
  }

  const note = ctx.get(pathAtom).replace("/note/", "");

  try {
    noteAtom(ctx, null);
    const { data } = await getNote(note);
    return noteAtom(ctx, data || []);
  } catch (e) {
    const error = e as AxiosError;
    if (error?.message !== "canceled") {
      if (!secondTry) {
        secondTry = true;
        getPage(ctx);
      } else {
        errorAtom(ctx, true);
      }
    }
    // console.warn(error);
  }
});

export const subToNoteUpdate = (ctx: Ctx) => {
  if (noteHaveSub) return;
  noteHaveSub = true;
  pathAtom.onChange((ctx) => {
    getPage(ctx);
  });
  !ctx.get(noteAtom) && getPage(ctx);
};
