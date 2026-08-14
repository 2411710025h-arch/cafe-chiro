import type { Locale } from "./i18n/config";
import { parseDateString } from "./slots";

export const intlLocale: Record<Locale, string> = {
  ja: "ja-JP",
  en: "en-GB",
  ko: "ko-KR"
};

export function formatDate(iso: string, locale: Locale): string {
  // Use the calendar date as written (stable across timezones) when the string
  // begins with YYYY-MM-DD; otherwise fall back to the parsed instant.
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  const d = m
    ? new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 12))
    : new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(intlLocale[locale], {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: m ? "UTC" : undefined
  }).format(d);
}

export function formatDateTime(iso: string, locale: Locale): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(intlLocale[locale], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(d);
}

/** Short weekday for a YYYY-MM-DD string, localized (e.g. Mon / 月 / 월). */
export function formatWeekday(dateStr: string, locale: Locale): string {
  const d = parseDateString(dateStr);
  return new Intl.DateTimeFormat(intlLocale[locale], { weekday: "short" }).format(d);
}

/** Full localized date for a YYYY-MM-DD string (e.g. 14 Aug 2026). */
export function formatFullDate(dateStr: string, locale: Locale): string {
  const d = parseDateString(dateStr);
  return new Intl.DateTimeFormat(intlLocale[locale], {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "short"
  }).format(d);
}

/** Numeric YYYY.MM.DD — used for compact editorial date stamps. */
export function formatStamp(iso: string): string {
  const parts = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (parts) return `${parts[1]}.${parts[2]}.${parts[3]}`;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}
