import type { Metadata } from "next";
import { localePath } from "./paths";
import type { Locale } from "./i18n/config";

/** Consistent per-page metadata: canonical + hreflang alternates + OG. */
export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string
): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: localePath(locale, path),
      languages: {
        ja: localePath("ja", path),
        en: localePath("en", path),
        ko: localePath("ko", path),
        "x-default": localePath("ja", path)
      }
    },
    openGraph: {
      title,
      description,
      url: localePath(locale, path)
    }
  };
}
