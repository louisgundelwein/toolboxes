/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: 'https://toolboxes.app', // Replace with your actual domain
	generateRobotsTxt: true,
	exclude: ['/server-sitemap.xml'], // Optional: exclude any paths
	robotsTxtOptions: {
		additionalSitemaps: [
			'https://toolboxes.app/server-sitemap.xml', // Updated for consistency
		],
	},
	// Handle locale-based routes
	alternateRefs: [
		{
			href: 'https://toolboxes.app/en', // Updated for consistency
			hreflang: 'en',
		},
		{
			href: 'https://toolboxes.app/de', // Updated for consistency
			hreflang: 'de',
		},
		{
			href: 'https://toolboxes.app/fr', // Updated the href for French localization
			hreflang: 'fr',
		},
		{
			href: 'https://toolboxes.app/es', // Added support for Spanish localization
			hreflang: 'es',
    },
    {
      href: 'https://toolboxes.app/uk', // Added support for Ukrainian localization 
      hreflang: 'uk',
    },
    {
      href: 'https://toolboxes.app/zh', // Added support for Chinese localization
      hreflang: 'zh',
    },
    {
      href: 'https://toolboxes.app/pt', // Added support for Portuguese localization
      hreflang: 'pt',
    },
	],
};