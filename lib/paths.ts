import type { Locale } from "./i18n/config";

/** Build a locale-prefixed path, e.g. localePath("en", "cats") -> "/en/cats". */
export function localePath(locale: Locale, path = ""): string {
  const clean = path.replace(/^\/+/, "").replace(/\/+$/, "");
  return "/" + locale + (clean ? "/" + clean : "");
}
