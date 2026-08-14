import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ChargeTable } from "@/components/sections/ChargeTable";
import { localePath } from "@/lib/paths";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/messages/ja";

export function PriceSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const p = dict.priceSection;
  return (
    <section className="border-b border-line py-section" aria-labelledby="price-heading">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Reveal>
            <Eyebrow index="05">{p.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="price-heading" className="mt-6 text-display-sm font-semibold">
              {p.heading}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-ink-muted">
              {p.lead}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <Link
              href={localePath(locale, "price")}
              className="link-underline mt-6 inline-block text-sm font-medium"
            >
              {p.link} →
            </Link>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal delay={120}>
            <span className="label">{dict.pricePage.chargeTitle}</span>
            <div className="mt-4">
              <ChargeTable dict={dict} />
            </div>
            <p className="mt-2 text-xs text-ink-muted">{dict.pricePage.taxNote}</p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
