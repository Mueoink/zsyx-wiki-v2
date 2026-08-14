export const SITE_URL = 'https://www.zsyxwiki.top'
export const SITE_NAME = '诸神愚戏 WIKI'
export const SITE_TAGLINE = '神谕与谎言的档案馆'
export const SITE_DESCRIPTION = '收录《诸神愚戏》角色、信仰、势力、职业、道具与剧情事件的中文世界观百科。'
export const SITE_IMAGE_PATH = '/og-image.jpg'
export const SITE_IMAGE_URL = `${SITE_URL}${SITE_IMAGE_PATH}`
export const SITE_LOGO_URL = `${SITE_URL}/logo.png`

export interface SeoBreadcrumbItem {
  label: string
  to?: string
}

export const normalizeSitePath = (path = '/') => {
  const cleanPath = path.split('#')[0]?.split('?')[0] || '/'
  if (cleanPath === '/') return '/'
  return `/${cleanPath.replace(/^\/+|\/+$/g, '')}`
}

export const toAbsoluteSiteUrl = (path = '/') =>
  new URL(normalizeSitePath(path), `${SITE_URL}/`).toString()

export const serializeJsonLd = (value: unknown) =>
  JSON.stringify(value).replace(/</g, '\\u003c')

export const createBreadcrumbJsonLd = (
  items: SeoBreadcrumbItem[],
  currentPath: string,
) => {
  const linkedItems = items.filter((item, index) => item.to || index === items.length - 1)

  return {
    '@type': 'BreadcrumbList',
    itemListElement: linkedItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: toAbsoluteSiteUrl(item.to || currentPath),
    })),
  }
}
