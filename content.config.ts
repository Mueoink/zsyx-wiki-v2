// content.config.ts
import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "page",
      source: "**/*.md",
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        navType: z.string().optional(),
        category: z.string().optional(),
        tags: z.array(z.string()).optional(),
        authors: z.array(z.string()).optional(),
        date: z.string().optional(),
        type: z.string().optional(),
        color: z.string().optional(),
        version: z.string().optional(),
        updateType: z.string().optional(),
        hideInMenu: z.boolean().optional(),
        layoutType: z.string().optional(),
      }),
    }),
  },
});
