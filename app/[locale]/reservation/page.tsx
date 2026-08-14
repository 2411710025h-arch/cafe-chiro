import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ReservationFlow } from "@/components/reservation/ReservationFlow";

export function generateMetadata({
  params
}: {
  params: { locale: string };
}): Metadata {
  const locale: Locale = isLocale(params.locale) ? params.locale : "ja";
  const dict = getDictionary(locale);
  return {
    ...pageMetadata(locale, "reservation", dict.reservation.title, dict.reservation.lead),
    robots: { index: false, follow: true }
  };
}

export default function ReservationPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "ja";
  const dict = getDictionary(locale);

  return (
    <>
      <PageHeader
        eyebrow={dict.reservation.eyebrow}
        index="05"
        title={dict.reservation.title}
        lead={dict.reservation.lead}
      />
      <Container className="pb-section">
        <div className="mx-auto max-w-3xl">
          <ReservationFlow />
        </div>
      </Container>
    </>
  );
}
