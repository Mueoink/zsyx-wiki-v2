<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { SITE_DESCRIPTION, SITE_LOGO_URL, SITE_NAME, SITE_URL, serializeJsonLd } from '~/utils/seo'

useHead({
  script: [
    {
      key: 'site-identity-jsonld',
      type: 'application/ld+json',
      innerHTML: serializeJsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: SITE_NAME,
            url: SITE_URL,
            logo: {
              '@type': 'ImageObject',
              url: SITE_LOGO_URL,
            },
          },
          {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            name: SITE_NAME,
            alternateName: ['诸神愚戏Wiki', '诸神愚戏百科'],
            url: SITE_URL,
            description: SITE_DESCRIPTION,
            inLanguage: 'zh-CN',
            publisher: { '@id': `${SITE_URL}/#organization` },
          },
        ],
      }),
    },
  ],
})
</script>
