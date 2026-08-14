import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { newsSeed } from "@/content/news.seed";
import { NewsArticleView } from "@/components/news/NewsArticleView";

// Admin-created slugs are rendered on demand (from the client store).
export const dynamicParams = true;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    newsSeed.map((a) => ({ locale, slug: a.slug }))
  );
}

export function generateMetadata({
  params
}: {
  params: { locale: string; slug: string };
}): Metadata {
  const locale: Locale = isLocale(params.locale) ? params.locale : "ja";
  const dict = getDictionary(locale);
  const seed = newsSeed.find((a) => a.slug === params.slug);

  const title = seed ? seed.title[locale] : dict.newsPage.title;
  const description = seed
    ? seed.content[locale].replace(/\s+/g, " ").slice(0, 120)
    : dict.newsPage.lead;

  return pageMetadata(locale, `news/${params.slug}`, title, description);
}

export default function NewsDetailPage({
  params
}: {
  params: { locale: string; slug: string };
}) {
  const seed = newsSeed.find((a) => a.slug === params.slug) ?? null;
  return <NewsArticleView slug={params.slug} initial={seed} />;
}
