import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { NewsList } from "@/components/news/NewsList";

export function generateMetadata({
  params
}: {
  params: { locale: string };
}): Metadata {
  const locale: Locale = isLocale(params.locale) ? params.locale : "ja";
  const dict = getDictionary(locale);
  return pageMetadata(locale, "news", dict.newsPage.title, dict.newsPage.lead);
}

export default function NewsPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "ja";
  const dict = getDictionary(locale);

  return (
    <>
      <PageHeader
        eyebrow={dict.newsPage.eyebrow}
        index="06"
        title={dict.newsPage.title}
        lead={dict.newsPage.lead}
      />
      <NewsList />
    </>
  );
}
