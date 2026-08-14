import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { InfoList } from "@/components/access/InfoList";
import { MapDemo } from "@/components/access/MapDemo";
import { localePath } from "@/lib/paths";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/messages/ja";

export function AccessSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="py-section" aria-labelledby="access-heading">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow index="08">{dict.accessSection.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="access-heading" className="mt-6 text-display-sm font-semibold">
              {dict.accessSection.heading}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-8">
              <InfoList dict={dict} />
            </div>
          </Reveal>
          <Reveal delay={200}>
            <Link
              href={localePath(locale, "access")}
              className="link-underline mt-6 inline-block text-sm font-medium"
            >
              {dict.accessPage.directions} →
            </Link>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={120}>
            <MapDemo
              label={dict.hero.location}
              className="aspect-[4/3] w-full lg:aspect-[16/10]"
            />
            <p className="mt-3 text-xs text-ink-muted">{dict.accessPage.mapNote}</p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
