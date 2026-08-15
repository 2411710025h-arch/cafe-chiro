import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { localePath } from "@/lib/paths";
import { cats } from "@/content/cats";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/messages/ja";

/**
 * ABOUT — a scroll *editorial*, not a scroll presentation. Sections vary in
 * layout, image size and copy position so the page reads like a quiet magazine
 * feature about a real café, never a template with the photo swapped. Motion is
 * limited to the site's subtle reveal; no snap, no hijack. Four dedicated
 * photos under /public/interior/about-editorial-*.
 */

function Lines({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <span key={i} className="block">
          {line}
        </span>
      ))}
    </>
  );
}

export function AboutEditorial({
  locale,
  dict
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = dict.aboutStory;

  return (
    <>
      {/* 01 — INTRO: white, generous whitespace, no photo, left-aligned */}
      <section className="border-b border-line">
        <Container className="pb-20 pt-24 md:pb-28 md:pt-36 lg:pt-44">
          <Reveal>
            <span className="label label-ink">ABOUT CAFE CHIRO</span>
          </Reveal>
          <Reveal delay={90}>
            <h1
              className="mt-7 font-semibold text-balance"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.75rem)", lineHeight: 1.06, letterSpacing: "-0.02em" }}
            >
              <Lines text={t.introHeading} />
            </h1>
          </Reveal>
          <Reveal delay={170}>
            <p
              className="mt-8 text-pretty text-[15px] leading-relaxed text-ink-muted"
              style={{ maxWidth: "30rem" }}
            >
              {t.introBody}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* 02 — THE SPACE: small copy left, large offset image right */}
      <section className="py-section">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-3 lg:pb-6">
              <Reveal>
                <h2
                  className="font-semibold text-balance"
                  style={{ fontSize: "clamp(1.9rem, 2.8vw, 2.6rem)", lineHeight: 1.12, letterSpacing: "-0.01em" }}
                >
                  <Lines text={t.space.heading} />
                </h2>
                <p className="mt-5 text-pretty text-[15px] leading-relaxed text-ink-muted">
                  {t.space.body}
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-9">
              <Reveal delay={120}>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-paper-dim">
                  <Image
                    src="/interior/about-editorial-01-space.webp"
                    alt={`${dict.meta.brand} — the space`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    className="object-cover"
                    style={{ objectPosition: "50% 52%" }}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* 03 — EVERYDAY: sticky text left, portrait image right */}
      <section className="border-t border-line py-section">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
                <Reveal>
                  <h2
                    className="font-semibold text-balance"
                    style={{ fontSize: "clamp(1.9rem, 3vw, 2.9rem)", lineHeight: 1.12, letterSpacing: "-0.01em" }}
                  >
                    <Lines text={t.everyday.heading} />
                  </h2>
                  <p className="mt-6 max-w-md text-pretty text-[15px] leading-relaxed text-ink-soft">
                    {t.everyday.body}
                  </p>
                </Reveal>
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal delay={100}>
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-paper-dim">
                  <Image
                    src="/interior/about-editorial-02-table.webp"
                    alt="Coffee and a book by the window"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    style={{ objectPosition: "45% 55%" }}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* 04 — DETAIL BREAK: a small counter detail + whitespace, no big heading */}
      <section className="py-section">
        <Container>
          <div className="grid grid-cols-1 items-center gap-8 sm:grid-cols-12">
            <div className="sm:col-span-4 sm:col-start-2">
              <Reveal>
                <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-paper-dim">
                  <Image
                    src="/interior/about-editorial-01-space.webp"
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                    style={{ objectPosition: "7% 62%" }}
                  />
                </div>
              </Reveal>
            </div>
            <div className="sm:col-span-4 sm:col-start-8">
              <Reveal delay={100}>
                <span className="label">CAFE / CATS / EVERYDAY</span>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* 05 — DISTANCE: image left, text right (reversed rhythm) */}
      <section className="border-t border-line py-section">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-paper-dim">
                  <Image
                    src="/interior/about-editorial-03-cat.webp"
                    alt="A cat by the window"
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                    style={{ objectPosition: "52% 40%" }}
                  />
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={100}>
                <h2
                  className="font-semibold text-balance"
                  style={{ fontSize: "clamp(1.9rem, 2.8vw, 2.6rem)", lineHeight: 1.12, letterSpacing: "-0.01em" }}
                >
                  <Lines text={t.distance.heading} />
                </h2>
                <p className="mt-5 text-pretty text-[15px] leading-relaxed text-ink-muted">
                  {t.distance.body}
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* 06 — RESIDENTS: a wide photo, then a quiet typographic close */}
      <section className="border-t border-line pt-section">
        <Container>
          <Reveal>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-paper-dim">
              <Image
                src="/interior/about-editorial-04-residents.webp"
                alt={`Four cats live at ${dict.meta.brand}`}
                fill
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: "50% 50%" }}
              />
            </div>
          </Reveal>
        </Container>

        <Container className="py-section">
          <div className="max-w-3xl">
            <Reveal>
              <span className="label">4 CATS LIVE HERE</span>
            </Reveal>
            <Reveal delay={80}>
              <h2
                className="mt-6 font-semibold text-balance"
                style={{ fontSize: "clamp(2.1rem, 4.5vw, 4rem)", lineHeight: 1.06, letterSpacing: "-0.02em" }}
              >
                <Lines text={t.residentsHeading} />
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
                {cats.map((c) => (
                  <span
                    key={c.id}
                    className="text-base font-medium tracking-[0.18em] text-ink"
                  >
                    {c.name}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-12 flex flex-col gap-3 sm:flex-row">
                <Link href={localePath(locale, "cats")} className="btn btn-primary">
                  {dict.common.viewCats} →
                </Link>
                <Link href={localePath(locale, "reservation")} className="btn btn-outline">
                  {dict.common.reserve}
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
