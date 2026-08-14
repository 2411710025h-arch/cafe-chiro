import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { localePath } from "@/lib/paths";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/messages/ja";

export function AboutSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const a = dict.aboutSection;
  return (
    <section className="border-b border-line py-section" aria-labelledby="about-heading">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow index="02">{a.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2
              id="about-heading"
              className="mt-6 text-display-sm font-semibold text-balance"
            >
              <span className="block">{a.headingLine1}</span>
              <span className="block">{a.headingLine2}</span>
            </h2>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="flex flex-col gap-5 text-[15px] leading-relaxed text-ink-soft">
            {a.body.map((p, i) => (
              <Reveal key={i} delay={i * 90}>
                <p className="text-pretty">{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={a.body.length * 90}>
            <Link
              href={localePath(locale, "about")}
              className="link-underline mt-8 inline-block text-sm font-medium"
            >
              {a.link} →
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
