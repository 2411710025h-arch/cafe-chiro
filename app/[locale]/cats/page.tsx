import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { localePath } from "@/lib/paths";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { CatPortrait } from "@/components/media/CatPortrait";
import { cats } from "@/content/cats";

export function generateMetadata({
  params
}: {
  params: { locale: string };
}): Metadata {
  const locale: Locale = isLocale(params.locale) ? params.locale : "ja";
  const dict = getDictionary(locale);
  return pageMetadata(locale, "cats", dict.catsPage.title, dict.catsPage.lead);
}

export default function CatsPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "ja";
  const dict = getDictionary(locale);
  const labels = dict.catsPage.labels;

  return (
    <>
      <PageHeader
        eyebrow={dict.catsPage.eyebrow}
        index="02"
        title={dict.catsPage.title}
        lead={dict.catsPage.lead}
      />

      <Container className="pb-section">
        <div className="flex flex-col gap-20 md:gap-28">
          {cats.map((cat, i) => {
            const reversed = i % 2 === 1;
            const sexSymbol =
              cat.sex === "male" ? dict.catsPage.sexMale : dict.catsPage.sexFemale;

            return (
              <article
                key={cat.id}
                id={cat.id}
                className="scroll-mt-[calc(var(--header-h)+1rem)] grid grid-cols-1 items-center gap-8 border-t border-line pt-12 lg:grid-cols-12 lg:gap-12"
              >
                <div
                  className={`lg:col-span-6 ${
                    reversed ? "lg:order-2 lg:col-start-7" : "lg:order-1"
                  }`}
                >
                  <Reveal>
                    <CatPortrait
                      cat={cat}
                      locale={locale}
                      showName={false}
                      className="aspect-[4/5] w-full"
                    />
                  </Reveal>
                </div>

                <div
                  className={`lg:col-span-5 ${
                    reversed ? "lg:order-1 lg:col-start-1" : "lg:order-2 lg:col-start-8"
                  }`}
                >
                  <Reveal delay={80}>
                    <span className="label label-ink">{cat.catch}</span>
                    <div className="mt-4 flex items-baseline gap-4">
                      <h2 className="text-display-sm font-semibold tracking-[0.06em]">
                        {cat.name}
                      </h2>
                      <span className="font-jp text-lg text-ink-muted">
                        {cat.nameLocal[locale]}
                      </span>
                    </div>

                    <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 border-y border-line py-4 text-sm">
                      <div className="flex gap-2">
                        <dt className="text-ink-muted">{labels.breed}</dt>
                        <dd>{cat.breed[locale]}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="text-ink-muted">{labels.sex}</dt>
                        <dd>{sexSymbol}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="text-ink-muted">{labels.age}</dt>
                        <dd>
                          {cat.age}
                          {labels.years}
                        </dd>
                      </div>
                    </dl>

                    <p className="mt-6 text-pretty text-[15px] leading-relaxed text-ink-soft">
                      {cat.personality[locale]}
                    </p>

                    {cat.note && (
                      <p className="mt-4 border-l border-mist-strong pl-4 text-sm leading-relaxed text-ink-muted">
                        {cat.note[locale]}
                      </p>
                    )}
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-line pt-10 sm:flex-row">
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
