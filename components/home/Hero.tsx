import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/media/Photo";
import { localePath } from "@/lib/paths";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/messages/ja";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="border-b border-line" aria-labelledby="hero-title">
      <Container className="pt-16 md:pt-24">
        <Reveal>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="label label-ink">{dict.meta.brand}</span>
            <span aria-hidden className="h-px w-8 bg-mist-strong" />
            <span className="label">
              {dict.hero.catCafe} · {dict.hero.location}
            </span>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1
            id="hero-title"
            className="mt-8 max-w-5xl text-display-xl font-semibold text-balance"
          >
            <span className="block">{dict.hero.line1}</span>
            <span className="block">{dict.hero.line2}</span>
          </h1>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href={localePath(locale, "reservation")} className="btn btn-primary">
              {dict.common.reserve}
            </Link>
            <Link href={localePath(locale, "cats")} className="btn btn-outline">
              {dict.common.viewCats}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </Container>

      <Container className="pb-16 pt-12 md:pb-20 md:pt-16">
        <Reveal delay={120}>
          <Photo
            src="/interior/hero.png"
            alt={`${dict.meta.brand} — ${dict.hero.location}`}
            focus="50% 42%"
            className="aspect-[4/3] w-full sm:aspect-[2/1] lg:aspect-[21/9]"
          />
        </Reveal>
      </Container>
    </section>
  );
}
