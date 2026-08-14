import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { localePath } from "@/lib/paths";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/media/Photo";

export function generateMetadata({
  params
}: {
  params: { locale: string };
}): Metadata {
  const locale: Locale = isLocale(params.locale) ? params.locale : "ja";
  const dict = getDictionary(locale);
  return pageMetadata(
    locale,
    "about",
    dict.aboutPage.title.replace(/\n/g, " "),
    dict.aboutPage.lead
  );
}

export default function AboutPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "ja";
  const dict = getDictionary(locale);
  const a = dict.aboutPage;

  return (
    <>
      <PageHeader
        eyebrow={a.eyebrow}
        index="01"
        title={a.title}
        lead={a.lead}
      />

      <Container className="pb-8">
        <Reveal>
          <Photo
            src="/interior/space.png"
            alt={`${dict.meta.brand} — interior`}
            focus="50% 40%"
            className="aspect-[16/9] w-full"
            label="SPACE"
          />
        </Reveal>
      </Container>

      {/* values */}
      <Container className="py-12">
        <ul className="grid grid-cols-1 border-t border-line sm:grid-cols-3">
          {a.values.map((v, i) => (
            <li
              key={v.title}
              className="border-b border-line px-1 py-8 sm:border-r sm:px-6 sm:last:border-r-0"
            >
              <Reveal delay={i * 80}>
                <span className="label label-ink tabular-nums">
                  0{i + 1}
                </span>
                <h2 className="mt-4 text-xl font-semibold tracking-[0.08em]">
                  {v.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {v.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>

      {/* narrative sections */}
      <Container className="py-section">
        <div className="flex flex-col gap-16">
          {a.sections.map((section, i) => (
            <div
              key={i}
              className="grid grid-cols-1 gap-6 border-t border-line pt-10 lg:grid-cols-12 lg:gap-8"
            >
              <div className="lg:col-span-4">
                <Reveal>
                  <span className="label tabular-nums">
                    0{i + 1}
                  </span>
                  <h2 className="mt-4 text-display-sm font-semibold">
                    {section.heading}
                  </h2>
                </Reveal>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <div className="flex flex-col gap-5 text-[15px] leading-relaxed text-ink-soft">
                  {section.body.map((p, j) => (
                    <Reveal key={j} delay={j * 80}>
                      <p className="text-pretty">{p}</p>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* closing links */}
      <Container className="pb-section">
        <div className="flex flex-col gap-4 border-t border-line pt-10 sm:flex-row">
          <Link href={localePath(locale, "cats")} className="btn btn-outline">
            {dict.common.viewCats} →
          </Link>
          <Link href={localePath(locale, "reservation")} className="btn btn-primary">
            {dict.common.reserve}
          </Link>
        </div>
      </Container>
    </>
  );
}
