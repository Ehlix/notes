import { action, atom, Ctx } from "@reatom/core";
import { VNode } from "snabbdom";
import { indexLayout } from "./pages/IndexLayout";
import { settingLayout } from "./pages/settings/settingsLayout";
import { aboutPage } from "./pages/about/AboutPage";
import { indexPage } from "./pages/index/IndexPage";
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
};

const staticPages = {
  "/": () => indexLayout({ children: indexPage() }),
  "/about": () => indexLayout({ children: aboutPage({ children: "heh" }) }),
  "/note": () => indexLayout({ children: NotesPage() }),
  "/settings": () =>
    indexLayout({
      children: settingLayout({ children: "user settings" }),
    }),
  "/settings/security": () =>
    indexLayout({
      children: settingLayout({ children: "security" }),
    }),
  "/settings/notifications": () =>
    indexLayout({
      children: settingLayout({ children: "notifications" }),
    }),
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
