/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://toolboxes.app",
  generateRobotsTxt: true,
  exclude: ["/server-sitemap.xml"],
  robotsTxtOptions: {
    additionalSitemaps: ["https://toolboxes.app/server-sitemap.xml"],
  },
  alternateRefs: [
    { href: "https://toolboxes.app/en", hreflang: "en" },
    { href: "https://toolboxes.app/de", hreflang: "de" },
    { href: "https://toolboxes.app/fr", hreflang: "fr" },
    { href: "https://toolboxes.app/es", hreflang: "es" },
    { href: "https://toolboxes.app/uk", hreflang: "uk" },
    { href: "https://toolboxes.app/zh", hreflang: "zh" },
    { href: "https://toolboxes.app/pt", hreflang: "pt" },
  ],
  // Dynamic entries for unit converter pages
  additionalPaths: async () => {
    const paths = [];

    // Define the supported locales
    const LOCALES = ["en", "de", "fr", "es", "uk", "zh", "pt"];

    // Define unit categories (simplified version for sitemap)
    const categories = {
      length: {
        units: {
          mile: {},
          yard: {},
          foot: {},
          inch: {},
          mile: {},
          yard: {},
          foot: {},
          inch: {},
        },
      },
      weight: {
        units: {
          kilogram: {},
          gram: {},
          milligram: {},
          pound: {},
          ounce: {},
        },
      },
      temperature: {
        units: {
          celsius: {},
          fahrenheit: {},
          kelvin: {},
        },
      },
      area: {
        units: {
          "square-meter": {},
          "square-kilometer": {},
          "square-centimeter": {},
          "square-millimeter": {},
          "square-mile": {},
          "square-yard": {},
          "square-foot": {},
          "square-inch": {},
          hectare: {},
          acre: {},
        },
      },
      volume: {
        units: {
          "cubic-meter": {},
          "cubic-centimeter": {},
          "cubic-millimeter": {},
          liter: {},
          milliliter: {},
          "cubic-foot": {},
          "cubic-inch": {},
          "us-gallon": {},
          "us-quart": {},
          "us-pint": {},
          "us-cup": {},
          "us-fluid-ounce": {},
          "us-tablespoon": {},
          "us-teaspoon": {},
        },
      },
      speed: {
        units: {
          "meters-per-second": {},
          "kilometers-per-hour": {},
          "miles-per-hour": {},
          knot: {},
        },
      },
      time: {
        units: {
          second: {},
          minute: {},
          hour: {},
          day: {},
          week: {},
          month: {},
          year: {},
        },
      },
      pressure: {
        units: {
          pascal: {},
          kilopascal: {},
          bar: {},
          atmosphere: {},
          "pounds-per-square-inch": {},
          "millimeters-of-mercury": {},
        },
      },
    };

    // Mapping for the connector word per language
    const conversionConnector = {
      en: "to",
      de: "zu",
      fr: "à",
      es: "a",
      uk: "до",
      zh: "到",
      pt: "para",
    };

    // Generate URLs for each language
    LOCALES.forEach((lang) => {
      // Add the main unit converter page
      paths.push({
        loc: `/${lang}/tools/unit-converter`,
        lastmod: new Date().toISOString(),
      });

      // Generate URLs for each category
      Object.keys(categories).forEach((categoryKey) => {
        const category = categories[categoryKey];
        const unitKeys = Object.keys(category.units);

        // Add category page
        paths.push({
          loc: `/${lang}/tools/unit-converter/${categoryKey}`,
          lastmod: new Date().toISOString(),
        });

        // Generate URLs for each unit pair
        unitKeys.forEach((from) => {
          unitKeys.forEach((to) => {
            if (from !== to) {
              const connector = conversionConnector[lang];
              const urlPath = `/${lang}/tools/unit-converter/${categoryKey}/${from}-${connector}-${to}`;
              paths.push({
                loc: urlPath,
                lastmod: new Date().toISOString(),
              });
            }
          });
        });
      });
    });

    return paths;
  },
};
