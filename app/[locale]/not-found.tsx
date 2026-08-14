"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CatMark } from "@/components/brand/CatMark";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { localePath } from "@/lib/paths";

export default function LocaleNotFound() {
  const { locale, dict } = useI18n();
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <CatMark className="h-16 w-auto text-mist-strong" />
      <p className="mt-8 label tabular-nums">404</p>
      <h1 className="mt-4 text-display-sm font-semibold">
        {dict.states.notFoundTitle}
      </h1>
      <p className="mt-4 max-w-sm text-sm text-ink-muted">
        {dict.states.notFoundBody}
      </p>
      <Link href={localePath(locale)} className="btn btn-primary mt-8">
        {dict.states.backHome}
      </Link>
    </Container>
  );
}
