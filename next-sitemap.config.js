/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://toolboxes.app',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/server-sitemap.xml'], // Exclude the dynamic sitemap from static generation
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://toolboxes.app/server-sitemap.xml', // Add the dynamic sitemap to robots.txt
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  // Transform the default sitemap entries
  transform: async (config, path) => {
    // Custom transformation for specific paths
    const customPriority = path.startsWith('/tools/') ? 0.8 : 0.7;

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: customPriority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
