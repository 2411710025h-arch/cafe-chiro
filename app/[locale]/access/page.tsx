import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { localePath } from "@/lib/paths";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { InfoList } from "@/components/access/InfoList";
import { MapDemo } from "@/components/access/MapDemo";

export function generateMetadata({
  params
}: {
  params: { locale: string };
}): Metadata {
  const locale: Locale = isLocale(params.locale) ? params.locale : "ja";
  const dict = getDictionary(locale);
  return pageMetadata(locale, "access", dict.accessPage.title, dict.accessPage.lead);
}

export default function AccessPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "ja";
  const dict = getDictionary(locale);

  return (
    <>
      <PageHeader
        eyebrow={dict.accessPage.eyebrow}
        index="07"
        title={dict.accessPage.title}
        lead={dict.accessPage.lead}
      />

      <Container className="pb-section">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <InfoList dict={dict} />
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={localePath(locale, "reservation")}
                  className="btn btn-primary"
                >
                  {dict.common.reserve}
                </Link>
                <a href={`mailto:${dict.business.email}`} className="btn btn-outline">
                  {dict.accessPage.emailLabel}
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={80}>
              <MapDemo
                label={dict.hero.location}
                className="aspect-[4/3] w-full lg:aspect-[16/11]"
              />
              <p className="mt-3 text-xs text-ink-muted">{dict.accessPage.mapNote}</p>
            </Reveal>
          </div>
        </div>
      </Container>
    </>
  );
}
