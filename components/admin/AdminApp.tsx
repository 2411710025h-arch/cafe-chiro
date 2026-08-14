"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { AdminNews } from "./AdminNews";
import { AdminReservations } from "./AdminReservations";

const PASSCODE = process.env.NEXT_PUBLIC_ADMIN_DEMO_PASSCODE || "chiro-admin";
const SESSION_KEY = "chiro:admin";

export function AdminApp() {
  const { dict } = useI18n();
  const [mounted, setMounted] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<"news" | "reservations">("news");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") setAuthed(true);
    } catch {
      /* ignore */
    }
  }, []);

  function login(e: React.FormEvent) {
    e.preventDefault();
    if (pass === PASSCODE) {
      setAuthed(true);
      setError(false);
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
    } else {
      setError(true);
    }
  }

  function logout() {
    setAuthed(false);
    setPass("");
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
  }

  if (!mounted) {
    return <div className="min-h-[60vh]" aria-hidden />;
  }

  if (!authed) {
    return (
      <Container className="flex min-h-[70vh] items-center justify-center py-16">
        <form onSubmit={login} className="w-full max-w-sm">
          <span className="label">{dict.admin.title}</span>
          <h1 className="mt-4 text-display-sm font-semibold">
            {dict.admin.login.heading}
          </h1>
          <label className="label mb-2 mt-8 block" htmlFor="admin-pass">
            {dict.admin.login.passcode}
          </label>
          <input
            id="admin-pass"
            type="password"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
              setError(false);
            }}
            autoComplete="off"
            aria-invalid={error}
            className={`w-full rounded-sm border bg-paper px-4 py-3 text-[15px] outline-none focus:border-ink ${
              error ? "border-ink" : "border-mist-strong"
            }`}
          />
          {error && (
            <p role="alert" className="mt-2 text-xs text-ink">
              {dict.admin.login.error}
            </p>
          )}
          <button type="submit" className="btn btn-primary mt-6 w-full">
            {dict.admin.login.enter}
          </button>
          <p className="mt-6 text-xs text-ink-muted">{dict.admin.login.demoHint}</p>
        </form>
      </Container>
    );
  }

  return (
    <Container className="py-12 md:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <span className="label">{dict.admin.title}</span>
          <h1 className="mt-2 text-2xl font-semibold">{dict.admin.subtitle}</h1>
        </div>
        <button type="button" onClick={logout} className="btn btn-outline !px-4 !py-2">
          {dict.admin.logout}
        </button>
      </div>

      <div className="mt-6 flex gap-1 border-b border-line">
        {(["news", "reservations"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setTab(k)}
            className={`-mb-px border-b-2 px-4 py-3 text-sm transition-colors ${
              tab === k
                ? "border-ink font-medium text-ink"
                : "border-transparent text-ink-muted hover:text-ink"
            }`}
          >
            {dict.admin.tabs[k]}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === "news" ? <AdminNews /> : <AdminReservations />}
      </div>

      <p className="mt-12 border-t border-line pt-6 text-xs text-ink-muted">
        {dict.admin.storageNote}
      </p>
    </Container>
  );
}
