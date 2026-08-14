"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { useI18n } from "@/lib/i18n/I18nProvider";

export default function LocaleError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { dict } = useI18n();

  useEffect(() => {
    // Surface for diagnostics; replace with real logging in production.
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="label">ERROR</p>
      <h1 className="mt-4 text-display-sm font-semibold">
        {dict.states.errorTitle}
      </h1>
      <p className="mt-4 max-w-sm text-sm text-ink-muted">{dict.states.errorBody}</p>
      <button type="button" onClick={reset} className="btn btn-primary mt-8">
        {dict.states.retry}
      </button>
    </Container>
  );
}
