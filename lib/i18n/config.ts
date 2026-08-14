export const locales = ["ja", "en", "ko"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ja";

export const localeLabels: Record<Locale, string> = {
  ja: "日本語",
  en: "English",
  ko: "한국어"
};

/** Short switch label shown in the header. */
export const localeShort: Record<Locale, string> = {
  ja: "JP",
  en: "EN",
  ko: "KO"
};

/** BCP-47 lang attribute for <html>. */
export const localeHtmlLang: Record<Locale, string> = {
  ja: "ja",
  en: "en",
  ko: "ko"
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
