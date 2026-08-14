import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { CatPortrait } from "@/components/media/CatPortrait";
import { cats } from "@/content/cats";
import { localePath } from "@/lib/paths";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/messages/ja";

export function CatsSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const c = dict.catsSection;
  const labels = dict.catsPage.labels;

  return (
    <section id="cats" className="border-b border-line py-section" aria-labelledby="cats-heading">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <Eyebrow index="03">{c.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="cats-heading" className="mt-6 text-display-sm font-semibold">
                {c.heading}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <Link
              href={localePath(locale, "cats")}
              className="link-underline hidden text-sm font-medium md:inline-block"
            >
              {c.link} →
            </Link>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <p className="mt-6 max-w-prose text-[15px] leading-relaxed text-ink-muted">
            {c.lead}
          </p>
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {cats.map((cat, i) => {
            const sexSymbol =
              cat.sex === "male"
                ? dict.catsPage.sexMale
                : dict.catsPage.sexFemale;
            return (
              <li key={cat.id}>
                <Reveal delay={i * 80}>
                  <Link
                    href={`${localePath(locale, "cats")}#${cat.id}`}
                    className="group block"
                  >
                    <CatPortrait
                      cat={cat}
                      locale={locale}
                      showName={false}
                      className="aspect-[3/4] w-full transition-transform duration-450 ease-brand group-hover:-translate-y-1"
                    />
                    <div className="mt-4">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-lg font-semibold tracking-[0.08em] group-hover:underline">
                          {cat.name}
                        </span>
                        <span className="font-jp text-sm text-ink-muted">
                          {cat.nameLocal[locale]}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-ink-muted">
                        {cat.breed[locale]} · {sexSymbol} · {cat.age}
                        {labels.years}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal>
          <Link
            href={localePath(locale, "cats")}
            className="link-underline mt-10 inline-block text-sm font-medium md:hidden"
          >
            {c.link} →
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
