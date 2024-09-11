import { action, atom, Ctx } from '@reatom/core';
import { VNode } from 'snabbdom';
import { indexLayout } from './pages/IndexLayout';
import { aboutPage } from './pages/about/AboutPage';
import { NotesPage } from './pages/notesList/NotesPage';
import { NotePage } from './pages/note/NotePage';

const pathAtom = atom(window.location.pathname);

export const goTo = action((ctx, newPath: string, title: string) => {
  const oldPath = ctx.get(pathAtom);
  if (oldPath !== newPath) {
    ctx.schedule(() => {
      pathAtom(ctx, newPath);
      changeLocation(newPath, title);
    });
  }
});

const changeLocation = (path: string, title: string) => {
  window.history.replaceState(window.history.state, 'asef', path);
  document.title = title;
  window.scrollTo({ top: 0 });
};

const staticRouts = {
  '/': () => indexLayout({ children: NotesPage() }),
  '/about': () => indexLayout({ children: aboutPage() }),
  notFound: () => indexLayout({ children: '404 Not Found' }),
} as Record<string, () => VNode>;

export const getLayout = (ctx: Ctx): VNode => {
  const path = ctx.get(pathAtom);
  let layout;
  if (path.startsWith('/note/')) {
    layout = () => indexLayout({ children: NotePage() });
  } else {
    layout = staticRouts[path] || staticRouts.notFound;
  }
  return layout();
};

export const subToPathAtom = (cb: (ctx: Ctx) => any) => {
  pathAtom.onChange((ctx) => {
    cb(ctx);
  });
};

export const getCurrentPath = (ctx: Ctx) => ctx.get(pathAtom);
