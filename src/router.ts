import { action, atom, Ctx } from "@reatom/core";
import { VNode } from "snabbdom";
import { indexLayout } from "./pages/IndexLayout";
import { aboutPage } from "./pages/about/AboutPage";
import { NotesPage } from "./pages/notes/NotesPage";
import { NotePage } from "./pages/note/NotePage";

export const pathAtom = atom(window.location.pathname);

export const goTo = action((ctx, newPath: string, title: string) => {
  const oldPath = ctx.get(pathAtom);
  if (oldPath !== newPath) {
    ctx.schedule(() => {
      pathAtom(ctx, newPath);
      changeLocation(newPath, title);
    });
  }
});

const changeLocation = (value: string, title: string) => {
  window.history.replaceState(window.history.state, "asef", value);
  document.title = title;
  window.scrollTo({ top: 0 });
};

const staticPages = {
  "/about": () => indexLayout({ children: aboutPage() }),
  "/": () => indexLayout({ children: NotesPage() }),
  notFound: () => indexLayout({ children: "404 Not Found" }),
} as Record<string, () => VNode>;

export const getLayout = (ctx: Ctx): VNode => {
  const path = ctx.get(pathAtom);
  let layout;
  if (path.startsWith("/note/")) {
    layout = () => indexLayout({ children: NotePage() });
  } else {
    layout = staticPages[path] || staticPages.notFound;
  }
  return layout();
};
