# Toolboxes.app

[Visit Toolboxes.app](https://toolboxes.app)

This repository contains a Next.js website built with the aim of maximizing SEO performance. Our goal is to deliver an advanced, highly optimized online toolbox that serves developers, designers, and creative professionals with modern digital solutions.

## Overview

The site is designed to provide:

- A comprehensive collection of online tools including unit converters, file converters, and online calculators.
- SEO-optimized pages with rich, localized content.
- A responsive layout with a dynamic hero section, tool overview, and additional information.
- A language switcher and theme changer accessible via a burger menu.
- Fully localized texts stored in dedicated JSON files (e.g. `seoLocales.json` and `localbook.json`) supporting multiple languages such as English, German, French, Spanish, Portuguese, Ukrainian, and Chinese.
- Automatically generated sitemaps for all tools and their variations

## Getting Started

First, install dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Sitemap Generation

The project includes automatic sitemap generation for better SEO. Here's how it works:

1. Install the required package:

```bash
pnpm add next-sitemap
```

2. Create `next-sitemap.config.js` in the root directory:

```javascript
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://toolboxes.app',
  generateRobotsTxt: true,
  // Your configuration here
};
```

3. Add the postbuild script to `package.json`:

```json
{
  "scripts": {
    "postbuild": "next-sitemap"
  }
}
```

4. For dynamic tools like the unit converter, add paths in the config:

```javascript
additionalPaths: async () => {
  const paths = [];
  // Define your tool's URLs here
  // Example for unit converter:
  paths.push({
    loc: '/en/tools/unit-converter',
    lastmod: new Date().toISOString(),
  });
  return paths;
};
```

The sitemap will be automatically generated after each build, creating:

- `public/sitemap.xml` - Main sitemap index
- `public/sitemap-0.xml` - URLs for all pages
- `public/robots.txt` - Updated robots.txt with sitemap reference

To generate the sitemap manually:

```bash
pnpm run postbuild
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
