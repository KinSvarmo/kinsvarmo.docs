import { defineConfig } from "vitepress";

export default defineConfig({
  title: "KinSvarmo",
  description: "Private expert agents published as encrypted iNFTs.",

  lastUpdated: true,

  ignoreDeadLinks: [/^http:\/\/localhost/],

  head: [["link", { rel: "icon", href: "/favicon.svg" }]],

  themeConfig: {
    logo: "/favicon.svg",
    siteTitle: "KinSvarmo",

    nav: [
      { text: "Guide", link: "/guide/what-is-kinsvarmo" },
      { text: "Demo", link: "/guide/demo" },
      { text: "API", link: "/guide/api" },
      { text: "Contracts", link: "/guide/contracts" },
    ],

    sidebar: [
      {
        text: "Introduction",
        collapsed: false,
        items: [
          { text: "What is KinSvarmo?", link: "/guide/what-is-kinsvarmo" },
          { text: "Getting started", link: "/guide/getting-started" },
          { text: "Run the demo", link: "/guide/demo" },
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
      pattern: "https://github.com/KinSvarmo/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },

    lastUpdated: {
      text: "Updated",
      formatOptions: {
        dateStyle: "medium",
      },
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/KinSvarmo" },
    ],

    footer: {
      message: "Built for the 0G x Gensyn x KeeperHub hackathon.",
      copyright: "MIT License",
    },

    search: {
      provider: "local",
    },
  },
});
