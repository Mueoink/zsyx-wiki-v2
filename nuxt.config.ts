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
    preset: 'vercel' 
  },
  devtools: { enabled: true },
  compatibilityDate: "2026-02-20",
  app: {
    head: {
      htmlAttrs: {
        lang: "zh-CN", 
      },
      link: [
        { rel: "icon", type: "image/png", href: "/logo.png" },
      ],
    },
  },
});