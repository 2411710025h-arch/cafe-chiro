import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { localePath } from "@/lib/paths";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ChargeTable } from "@/components/sections/ChargeTable";
import { GuideIcon } from "@/components/sections/GuideIcon";
import { guideItems } from "@/content/guide";

export function generateMetadata({
  params
}: {
  params: { locale: string };
}): Metadata {
  const locale: Locale = isLocale(params.locale) ? params.locale : "ja";
  const dict = getDictionary(locale);
  return pageMetadata(
    locale,
    "price",
    dict.pricePage.title.replace(/\n/g, " "),
    dict.pricePage.lead
  );
}

export default function PricePage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "ja";
  const dict = getDictionary(locale);
  const p = dict.pricePage;

  return (
    <>
      <PageHeader eyebrow={p.eyebrow} index="04" title={p.title} lead={p.lead} />

      {/* Charge */}
      <Container className="pb-section">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="label label-ink">{p.chargeTitle}</span>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-muted">
                {p.oneOrder}
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={100}>
              <ChargeTable dict={dict} />
              <p className="mt-2 text-xs text-ink-muted">{p.taxNote}</p>
            </Reveal>
          </div>
        </div>
      </Container>

      {/* Guide */}
      <section className="border-t border-line bg-paper-soft py-section" aria-labelledby="guide-heading">
        <Container>
          <Reveal>
            <span className="label label-ink">{p.guideTitle}</span>
            <h2 id="guide-heading" className="mt-4 max-w-xl text-display-sm font-semibold">
              {p.guideLead}
            </h2>
          </Reveal>

          <ul className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {guideItems.map((item, i) => (
              <li key={item.icon}>
                <Reveal delay={(i % 3) * 70}>
                  <div className="flex items-start gap-4 border-t border-line pt-5">
                    <GuideIcon name={item.icon} className="h-6 w-6 shrink-0 text-ink" />
                    <p className="text-[15px] leading-relaxed text-ink-soft">
                      {item.text[locale]}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <div className="mt-14">
            <Link href={localePath(locale, "reservation")} className="btn btn-primary">
              {dict.common.reserve}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
