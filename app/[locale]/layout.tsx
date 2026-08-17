import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { fontVariables } from "../fonts";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { locales, isLocale, localeHtmlLang } from "@/lib/i18n/config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileReserveBar } from "@/components/layout/MobileReserveBar";
import { SITE_URL, OG_IMAGE } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1
};

export function generateMetadata({
  params
}: {
  params: { locale: string };
}): Metadata {
  const locale = isLocale(params.locale) ? params.locale : "ja";
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${dict.meta.siteName} — ${dict.meta.tagline}`,
      template: `%s | ${dict.meta.brand}`
    },
    description: dict.meta.description,
    applicationName: dict.meta.brand,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ja: "/ja",
        en: "/en",
        ko: "/ko",
        "x-default": "/ja"
      }
    },
    openGraph: {
      type: "website",
      siteName: dict.meta.brand,
      title: `${dict.meta.siteName} — ${dict.meta.tagline}`,
      description: dict.meta.description,
      url: `/${locale}`,
      locale,
      images: [OG_IMAGE]
    },
    twitter: {
      card: "summary_large_image",
      title: `${dict.meta.siteName} — ${dict.meta.tagline}`,
      description: dict.meta.description,
      images: [OG_IMAGE.url]
    },
    robots: { index: true, follow: true }
  };
}

export default function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const dict = getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: dict.meta.brand,
    alternateName: dict.meta.siteName,
    url: SITE_URL,
    inLanguage: locale,
    description: dict.meta.description
  };

  return (
    <html lang={localeHtmlLang[locale]} className={fontVariables}>
      <body className="min-h-screen bg-paper text-ink">
        <span id="top" />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
        >
          {dict.nav.home}
        </a>
        <I18nProvider locale={locale} dict={dict}>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MobileReserveBar />
        </I18nProvider>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
