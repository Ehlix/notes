type Items = {
  title: string;
  link: string;
  subData: Items[];
};

export const nestedRouts: Items[] = [
  {
    title: "artificial int.",
    link: "/note/ai",
    subData: [
      {
        title: "chat gpt",
        link: "/note/ai/chat-gpt",
        subData: [
          {
            title: "coding",
            link: "/note/ai/chat-gpt/coding",
            subData: [],
          },
          {
            title: "research",
            link: "/note/ai/chat-gpt/research",
            subData: [],
          },
          {
            title: "writing",
            link: "/note/ai/chat-gpt/writing",
            subData: [],
          },
        ],
      },
      {
        title: "codeium",
        link: "/note/ai/codeium",
        subData: [],
      },
    ],
  },
  {
    title: "git",
    link: "/note/git",
    subData: [
      {
        title: "github",
        link: "/note/git/github",
        subData: [],
      },
    ],
  },
  {
    title: "containers",
    link: "/note/containers",
    subData: [
      {
        title: "docker",
        link: "/note/containers/docker",
        subData: [],
      },
      {
        title: "kubernetes",
        link: "/note/containers/kubernetes",
        subData: [],
      },
    ],
  },
  {
    title: "databases",
    link: "/note/databases",
    subData: [
      {
        title: "data science",
        link: "/note/databases/data-science",
        subData: [],
      },
      {
        title: "looker",
        link: "/note/databases/looker",
        subData: [],
      },
      {
        title: "redis",
        link: "/note/databases/redis",
        subData: [],
      },
      {
        title: "sql",
        link: "/note/databases/sql",
        subData: [],
      },
    ],
  },
  {
    title: "javascript",
    link: "/note/javascript",
    subData: [
      {
        title: "node",
        link: "/note/javascript/node",
        subData: [],
      },
      {
        title: "npm",
        link: "/note/javascript/npm",
        subData: [],
      },
      {
        title: "testing",
        link: "/note/javascript/testing",
        subData: [],
      },
      {
        title: "typescript",
        link: "/note/javascript/typescript",
        subData: [],
      },
    ],
  },
  {
    title: "web development",
    link: "/note/web",
    subData: [
      {
        title: "http",
        link: "/note/web/http",
        subData: [],
      },
      {
        title: "html",
        link: "/note/web/html",
        subData: [],
      },
      {
        title: "css",
        link: "/note/web/css",
        subData: [],
      },
      {
        title: "qwik",
        link: "/note/web/qwik",
        subData: [],
      },
      {
        title: "react",
        link: "/note/web/react",
        subData: [
          {
            title: "next",
            link: "/note/web/react/next",
            subData: [],
          },
        ],
      },
      {
        title: "vue",
        link: "/note/web/vue",
        subData: [
          {
            title: "nuxt",
            link: "/note/web/vue/nuxt",
            subData: [],
          },
        ],
      },
    ],
  },
];
