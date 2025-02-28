import { MetadataRoute } from 'next'

const baseUrl = 'https://toolboxes.app'
const languages = ['en', 'de', 'fr', 'es', 'uk', 'zh', 'pt', 'mn']
const tools = [
  'qr-code-generator',
  'unit-converter',
  'password-generator',
  'file-converter',
  'tip-calculator',
  'json-validator'
]

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = []

  // Add language root pages
  for (const lang of languages) {
    routes.push({
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1
    })
  }

  // Add tool pages for each language
  for (const lang of languages) {
    for (const tool of tools) {
      routes.push({
        url: `${baseUrl}/${lang}/${tool}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8
      })
    }
  }

  return routes
}