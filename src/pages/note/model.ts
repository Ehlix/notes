import { getNote } from '@/common/api/getNote';
import { render } from '@/main';
import { getCurrentPath, subToPathAtom } from '@/router';
import { action, atom, Ctx } from '@reatom/core';
import { AxiosError } from 'axios';

const noteAtom = atom<NoteResponse | null>(null);
const errorAtom = atom(false);

noteAtom.onChange((ctx) => render(ctx));
errorAtom.onChange((ctx) => render(ctx));

let secondTry = false;
let noteHaveSub = false;

const getPage = action(async (ctx) => {
  const currentPath = getCurrentPath(ctx);
  const wrongPath = !currentPath.startsWith('/note/');
  if (wrongPath) {
    return noteAtom(ctx, null);
  }
  const note = currentPath.replace('/note/', '');
  try {
    noteAtom(ctx, null);
    const { data } = await getNote(note);
    return noteAtom(ctx, data || []);
  } catch (e) {
    const error = e as AxiosError;
    if (error?.message !== 'canceled') {
      if (!secondTry) {
        secondTry = true;
        getPage(ctx);
      } else {
        errorAtom(ctx, true);
      }
    }
  }
});

export const subscribe = (ctx: Ctx) => {
  if (!noteHaveSub) {
    noteHaveSub = true;
    subToPathAtom((ctx) => {
      getPage(ctx);
    });
    !ctx.get(noteAtom) && getPage(ctx);
  }
  return {
    notes: ctx.get(noteAtom),
    error: ctx.get(errorAtom),
  };
};
