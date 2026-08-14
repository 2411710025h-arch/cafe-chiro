"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeShort, isLocale, type Locale } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/I18nProvider";

/** Swap the locale segment of the current path, preserving the rest. */
function swapLocale(pathname: string, next: Locale): string {
  const parts = pathname.split("/");
  // parts[0] is "" (leading slash); parts[1] is the current locale.
  if (parts.length > 1 && isLocale(parts[1])) {
    parts[1] = next;
  } else {
    return `/${next}`;
  }
  return parts.join("/") || `/${next}`;
}

export function LanguageSwitch({
  onNavigate,
  className = ""
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  const pathname = usePathname() || "/";
  const { locale } = useI18n();

  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      role="group"
      aria-label="Language"
    >
      {locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span aria-hidden className="mx-1 text-mist-strong">/</span>}
          <Link
            href={swapLocale(pathname, l)}
            hrefLang={l}
            aria-current={l === locale ? "true" : undefined}
            onClick={onNavigate}
            className={`text-xs tracking-wide transition-colors duration-250 ${
              l === locale ? "text-ink font-medium" : "text-ink-muted hover:text-ink"
            }`}
          >
            {localeShort[l]}
          </Link>
        </span>
      ))}
    </div>
  );
}
