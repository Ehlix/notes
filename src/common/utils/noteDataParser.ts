import { h, VNode } from "snabbdom";

export const noteDataParser = (data: NoteResponse, lvl = 0): VNode[] => {
  let level = lvl;
  return data.map((item) => {
    const tagWithClass = item.tag + ".note_level_" + level;

    if (item.tag === "a") {
      return h(
        tagWithClass,
        {
          props: {
            href: item.value.href,
            target: "_blank",
          },
        },
        item.value.title,
      );
    }
    if (Array.isArray(item.value)) {
      return h(tagWithClass, noteDataParser(item.value, ++level));
    }
    return h(tagWithClass, item.value);
  });
};
