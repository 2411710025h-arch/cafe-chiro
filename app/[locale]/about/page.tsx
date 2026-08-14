import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { AboutScrollStory } from "@/components/about/AboutScrollStory";

export function generateMetadata({
  params
}: {
  params: { locale: string };
}): Metadata {
  const locale: Locale = isLocale(params.locale) ? params.locale : "ja";
  const dict = getDictionary(locale);
  return pageMetadata(
    locale,
    "about",
    dict.aboutPage.title.replace(/\n/g, " "),
    dict.aboutPage.lead
  );
}

export default function AboutPage() {
  return <AboutScrollStory />;
}
