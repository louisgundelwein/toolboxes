import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/forgot-password', '/api/*'],
    },
    sitemap: 'https://toolboxes.app/sitemap.xml',
  }
}