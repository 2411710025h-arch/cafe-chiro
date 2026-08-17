import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { newsSeed } from "@/content/news.seed";
import { SITE_URL as SITE } from "@/lib/site";

// Public, indexable paths (reservation is noindex; admin is excluded).
const PATHS = ["", "about", "cats", "menu", "price", "news", "access"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of PATHS) {
      entries.push({
        url: `${SITE}/${locale}${path ? `/${path}` : ""}`,
        changeFrequency: "monthly",
        priority: path === "" ? 1 : 0.7
      });
    }
    for (const article of newsSeed) {
      entries.push({
        url: `${SITE}/${locale}/news/${article.slug}`,
        lastModified: article.updatedAt,
        changeFrequency: "yearly",
        priority: 0.5
      });
    }
  }

  return entries;
}
