import {
  SITE_DESCRIPTION,
  SITE_IMAGE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  createBreadcrumbJsonLd,
  serializeJsonLd,
  toAbsoluteSiteUrl,
  type SeoBreadcrumbItem,
} from '~/utils/seo'

interface PageAuthor {
  name: string
}

interface PageSeoOptions {
  title?: string
  description?: string
  path?: string
  image?: string
  type?: 'website' | 'article'
  breadcrumbs?: SeoBreadcrumbItem[]
  authors?: PageAuthor[]
  datePublished?: string
  dateModified?: string
  noindex?: boolean
}

export const usePageSeo = (options: PageSeoOptions = {}) => {
  const route = useRoute()
  const pageTitle = options.title || SITE_NAME
  const fullTitle = pageTitle === SITE_NAME
    ? `${SITE_NAME} - ${SITE_TAGLINE}`
    : `${pageTitle} | ${SITE_NAME}`
  const description = options.description || SITE_DESCRIPTION
  const canonicalPath = options.path || route.path
  const canonicalUrl = toAbsoluteSiteUrl(canonicalPath)
  const imageUrl = options.image
    ? (options.image.startsWith('http') ? options.image : toAbsoluteSiteUrl(options.image))
    : SITE_IMAGE_URL
  const robots = options.noindex
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

  useSeoMeta({
    title: fullTitle,
    description,
    robots,
    ogTitle: fullTitle,
    ogDescription: description,
    ogType: options.type || 'website',
    ogUrl: canonicalUrl,
    ogImage: imageUrl,
    ogImageAlt: `${pageTitle} - ${SITE_NAME}`,
    ogImageWidth: options.image ? undefined : 1200,
    ogImageHeight: options.image ? undefined : 630,
    ogImageType: options.image ? undefined : 'image/jpeg',
    ogSiteName: SITE_NAME,
    ogLocale: 'zh_CN',
    twitterCard: 'summary_large_image',
    twitterTitle: fullTitle,
    twitterDescription: description,
    twitterImage: imageUrl,
    twitterImageAlt: `${pageTitle} - ${SITE_NAME}`,
  })

  const graph: Record<string, unknown>[] = []

  if (options.breadcrumbs?.length) {
    graph.push(createBreadcrumbJsonLd(options.breadcrumbs, canonicalPath))
  }

  if (options.type === 'article') {
    graph.push({
      '@type': 'Article',
      '@id': `${canonicalUrl}#article`,
      headline: pageTitle,
      description,
      url: canonicalUrl,
      mainEntityOfPage: canonicalUrl,
      image: imageUrl,
      inLanguage: 'zh-CN',
      author: options.authors?.length
        ? options.authors.map(author => ({ '@type': 'Person', name: author.name }))
        : { '@id': `${SITE_URL}/#organization` },
      publisher: { '@id': `${SITE_URL}/#organization` },
      ...(options.datePublished ? { datePublished: options.datePublished } : {}),
      ...(options.dateModified ? { dateModified: options.dateModified } : {}),
    })
  } else {
    graph.push({
      '@type': 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      name: pageTitle,
      description,
      url: canonicalUrl,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      inLanguage: 'zh-CN',
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: imageUrl,
      },
    })
  }

  useHead({
    link: [{ key: 'canonical', rel: 'canonical', href: canonicalUrl }],
    script: [{
      key: 'page-jsonld',
      type: 'application/ld+json',
      innerHTML: serializeJsonLd({
        '@context': 'https://schema.org',
        '@graph': graph,
      }),
    }],
  })

  return { canonicalUrl, fullTitle }
}
