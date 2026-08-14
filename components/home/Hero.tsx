import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CatMark } from "@/components/brand/CatMark";
import { Placeholder } from "@/components/media/Placeholder";
import { localePath } from "@/lib/paths";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/messages/ja";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="relative border-b border-line" aria-labelledby="hero-title">
      <Container className="grid grid-cols-1 items-center gap-12 py-16 md:py-20 lg:min-h-[calc(100svh-var(--header-h))] lg:grid-cols-12 lg:gap-8 lg:py-0">
        <div className="lg:col-span-7 lg:py-24">
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
              className="mt-8 text-display-xl font-semibold text-balance"
            >
              <span className="block">{dict.hero.line1}</span>
              <span className="block">{dict.hero.line2}</span>
            </h1>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={localePath(locale, "reservation")}
                className="btn btn-primary"
              >
                {dict.common.reserve}
              </Link>
              <Link
                href={localePath(locale, "cats")}
                className="btn btn-outline"
              >
                {dict.common.viewCats}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5 lg:py-24">
          <Reveal delay={180}>
            <div className="relative">
              <Placeholder
                variant="interior"
                tone="dim"
                className="aspect-[4/5] w-full"
              />
              {/* subtle hint that cats live here */}
              <div className="absolute -bottom-4 left-4 flex items-center gap-3 rounded-sm border border-line bg-paper px-4 py-3">
                <CatMark className="h-7 w-auto text-ink" />
                <span className="label">Since 2026</span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>

      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block">
        <span className="label [writing-mode:vertical-rl] tracking-[0.3em]">
          {dict.hero.scroll}
        </span>
      </div>
    </section>
  );
}
