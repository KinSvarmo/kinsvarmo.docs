import { defineConfig } from "vitepress";

export default defineConfig({
  title: "KinSvarmo",
  description: "Private expert agents as iNFTs. Pay per run, get auditable results.",

  lastUpdated: true,

  ignoreDeadLinks: [/^http:\/\/localhost/],

  head: [["link", { rel: "icon", href: "/favicon.svg" }]],

  themeConfig: {
    logo: "/favicon.svg",
    siteTitle: "KinSvarmo",

    nav: [
      { text: "Guide", link: "/guide/what-is-kinsvarmo" },
      { text: "API", link: "/guide/api" },
      { text: "Contracts", link: "/guide/contracts" },
      { text: "GitHub", link: "https://github.com/AriiBen/kinsvarmo" },
    ],

    sidebar: [
      {
        text: "Introduction",
        collapsed: false,
        items: [
          { text: "What is KinSvarmo?", link: "/guide/what-is-kinsvarmo" },
          { text: "Getting started", link: "/guide/getting-started" },
        ],
      },
      {
        text: "How it works",
        collapsed: false,
        items: [
          { text: "Architecture", link: "/guide/architecture" },
          { text: "Execution flow", link: "/guide/execution-flow" },
          { text: "Publishing an agent", link: "/guide/publishing" },
        ],
      },
      {
        text: "Reference",
        collapsed: false,
        items: [
          { text: "API reference", link: "/guide/api" },
          { text: "Smart contracts", link: "/guide/contracts" },
        ],
      },
    ],

    outline: {
      level: [2, 3],
      label: "On this page",
    },

    editLink: {
      pattern: "https://github.com/AriiBen/kinsvarmo/edit/main/apps/docs/docs/:path",
      text: "Edit this page on GitHub",
    },

    lastUpdated: {
      text: "Updated",
      formatOptions: {
        dateStyle: "medium",
      },
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/AriiBen/kinsvarmo" },
    ],

    footer: {
      message: "Built for the 0G × Gensyn × KeeperHub hackathon.",
      copyright: "MIT License",
    },

    search: {
      provider: "local",
    },
  },
});
