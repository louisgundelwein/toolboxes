// app/sitemap.xml.js

export default function Sitemap() {
  const urls = [
    "https://www.toolboxes.app/en",
    "https://www.toolboxes.app/de",
    "https://www.toolboxes.app/en/unit-converter",
    // Weitere URLs hinzufügen…
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map((url) => {
        return `
      <url>
        <loc>${url}</loc>
        <changefreq>weekly</changefreq>
      </url>
    `;
      })
      .join("")}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
