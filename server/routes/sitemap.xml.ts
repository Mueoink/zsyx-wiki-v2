import { queryCollection } from '@nuxt/content/server'
import { SITE_URL, toAbsoluteSiteUrl } from '../../app/utils/seo'

const STATIC_ROUTES = ['/', '/classes', '/contributors', '/storyline']

const escapeXml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;')

export default defineEventHandler(async (event) => {
  const documents = await queryCollection(event, 'content')
    .select('path', 'category', 'date', 'noindex')
    .all()

  const categories = [...new Set(
    documents
      .filter(document => !document.noindex && document.category)
      .map(document => document.category as string),
  )]

  const entries = new Map<string, string | undefined>()
  STATIC_ROUTES.forEach(path => entries.set(path, undefined))

  documents.forEach((document) => {
    if (!document.noindex && document.path && document.path !== '/') {
      entries.set(document.path, document.date || undefined)
    }
  })

  categories.forEach((category) => {
    entries.set(`/category/${category}`, undefined)
  })

  const urls = [...entries.entries()]
    .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, 'zh-CN'))
    .map(([path, lastmod]) => [
      '  <url>',
      `    <loc>${escapeXml(toAbsoluteSiteUrl(path))}</loc>`,
      ...(lastmod ? [`    <lastmod>${escapeXml(lastmod)}</lastmod>`] : []),
      '  </url>',
    ].join('\n'))
    .join('\n')

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=3600')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
    '',
  ].join('\n')
})
