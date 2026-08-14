import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { localePath } from "@/lib/paths";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { menu, formatYen } from "@/content/menu";

export function generateMetadata({
  params
}: {
  params: { locale: string };
}): Metadata {
  const locale: Locale = isLocale(params.locale) ? params.locale : "ja";
  const dict = getDictionary(locale);
  return pageMetadata(locale, "menu", dict.menuPage.title, dict.menuPage.lead);
}

export default function MenuPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "ja";
  const dict = getDictionary(locale);

  return (
    <>
      <PageHeader
        eyebrow={dict.menuPage.eyebrow}
        index="03"
        title={dict.menuPage.title}
        lead={dict.menuPage.lead}
      />

      <Container className="pb-section">
        <div className="grid grid-cols-1 gap-x-16 gap-y-14 md:grid-cols-2">
          {menu.map((category, i) => (
            <section key={category.key} aria-label={dict.menuPage.categories[category.key]}>
              <Reveal delay={(i % 2) * 80}>
                <h2 className="label label-ink border-b border-ink pb-3">
                  {dict.menuPage.categories[category.key]}
                </h2>
                <ul>
                  {category.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-baseline justify-between gap-4 border-b border-line py-4"
                    >
                      <span className="text-[15px]">{item.name}</span>
                      <span className="text-[15px] tabular-nums text-ink-muted">
                        {formatYen(item.price)}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </section>
          ))}
        </div>

        <p className="mt-12 text-xs text-ink-muted">{dict.menuPage.note}</p>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-10 sm:flex-row">
          <Link href={localePath(locale, "price")} className="btn btn-outline">
            {dict.priceSection.link} →
          </Link>
          <Link href={localePath(locale, "reservation")} className="btn btn-primary">
            {dict.common.reserve}
          </Link>
        </div>
      </Container>
    </>
  );
}
