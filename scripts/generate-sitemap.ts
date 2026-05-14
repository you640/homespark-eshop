// Generates public/sitemap.xml. Wired to predev/prebuild scripts.
import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://abode-forge-store.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/kategoria/vsetko", changefreq: "daily", priority: "0.9" },
  { path: "/kategoria/nabytok", changefreq: "weekly", priority: "0.8" },
  { path: "/kategoria/dlazba-podlahy", changefreq: "weekly", priority: "0.8" },
  { path: "/kategoria/kupelne", changefreq: "weekly", priority: "0.8" },
  { path: "/kategoria/dvere", changefreq: "weekly", priority: "0.8" },
  { path: "/kategoria/kurenie", changefreq: "weekly", priority: "0.8" },
  { path: "/kategoria/zahrada", changefreq: "weekly", priority: "0.8" },
  { path: "/kategoria/naradie", changefreq: "weekly", priority: "0.8" },
  { path: "/prihlasenie", changefreq: "yearly", priority: "0.3" },
  { path: "/registracia", changefreq: "yearly", priority: "0.3" },
];

function generateSitemap(items: SitemapEntry[]) {
  const urls = items.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
