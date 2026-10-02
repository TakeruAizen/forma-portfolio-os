import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site-url'

const baseUrl = siteUrl.replace(/\/$/, '')

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/blog', '/work/noir', '/work/north', '/work/project-03', '/work/project-04']
  return paths.map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path === '/blog' ? 0.5 : 0.6,
  }))
}
