// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/content",
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
  ],
  colorMode: {
    preference: "light",
    fallback: "light",
    classSuffix: "",
  },
  nitro: {
    preset: "vercel",
    prerender: {
      crawlLinks: true,
      failOnError: false,
      routes: ["/robots.txt", "/sitemap.xml", "/timeline"],
    },
  },

  runtimeConfig: {
    public: {
      siteUrl: "https://www.zsyxwiki.top",
    },
  },

  routeRules: {
    "/timeline": {
      redirect: {
        to: "/storyline",
        statusCode: 301,
      },
    },
    "/robots.txt": { prerender: true },
    "/sitemap.xml": { prerender: true },
    "/__nuxt_content/**": {
      headers: { "X-Robots-Tag": "noindex, nofollow" },
    },
  },

  devtools: { enabled: true },
  compatibilityDate: "2026-02-20",
  app: {
    head: {
      title: "诸神愚戏 WIKI - 神谕与谎言的档案馆",
      htmlAttrs: {
        lang: "zh-CN",
      },
      meta: [
        { name: "theme-color", content: "#f7f6f3", media: "(prefers-color-scheme: light)" },
        { name: "theme-color", content: "#15151a", media: "(prefers-color-scheme: dark)" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/logo.png" },
        { rel: "apple-touch-icon", href: "/logo.png" },
      ],
    },
  },
});
