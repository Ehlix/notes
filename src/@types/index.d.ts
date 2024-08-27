type Note = {
  tag: keyof HTMLElementTagNameMap;
  value: Note | string;
} & {
  tag: "a";
  value: {
    title: string;
    href: string;
  };
};

type NoteResponse = Note[];
