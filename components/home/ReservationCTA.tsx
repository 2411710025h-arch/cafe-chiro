import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { localePath } from "@/lib/paths";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/messages/ja";

export function ReservationCTA({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const r = dict.reservationSection;
  return (
    <section className="bg-ink py-section text-paper" aria-labelledby="reserve-cta-heading">
      <Container>
        <Reveal>
          <span className="label" style={{ color: "rgba(255,255,255,0.55)" }}>
            06 · {r.eyebrow}
          </span>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal delay={80} className="lg:col-span-8">
            <h2
              id="reserve-cta-heading"
              className="text-display-lg font-semibold text-balance"
            >
              <span className="block">{r.headingLine1}</span>
              <span className="block">{r.headingLine2}</span>
            </h2>
          </Reveal>
          <Reveal delay={160} className="lg:col-span-4">
            <p className="mb-8 text-[15px]" style={{ color: "rgba(255,255,255,0.7)" }}>
              {r.lead}
            </p>
            <Link
              href={localePath(locale, "reservation")}
              className="btn w-full bg-paper text-ink hover:bg-white sm:w-auto"
            >
              {r.cta} →
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
