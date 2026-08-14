import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { CatsSection } from "@/components/home/CatsSection";
import { MenuSection } from "@/components/home/MenuSection";
import { PriceSection } from "@/components/home/PriceSection";
import { ReservationCTA } from "@/components/home/ReservationCTA";
import { NewsSection } from "@/components/home/NewsSection";
import { AccessSection } from "@/components/home/AccessSection";

export default function HomePage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "ja";
  const dict = getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <AboutSection locale={locale} dict={dict} />
      <CatsSection locale={locale} dict={dict} />
      <MenuSection locale={locale} dict={dict} />
      <PriceSection locale={locale} dict={dict} />
      <ReservationCTA locale={locale} dict={dict} />
      <NewsSection locale={locale} dict={dict} />
      <AccessSection locale={locale} dict={dict} />
    </>
  );
}
