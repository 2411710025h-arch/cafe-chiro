"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { localePath } from "@/lib/paths";
import {
  buildDayOptions,
  generateStartTimes,
  availableDurations,
  durationFits,
  parseDateString,
  DURATIONS,
  type Duration
} from "@/lib/slots";
import { formatFullDate, formatWeekday, intlLocale } from "@/lib/format";
import { catCharge, formatYen } from "@/content/menu";
import { reservationStore } from "@/lib/store/reservationStore";
import type { Reservation } from "@/lib/types";

const STEP_KEYS = ["date", "time", "duration", "party", "info", "confirm"] as const;
const PARTY_SIZES = [1, 2, 3, 4, 5];
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function priceFor(duration: number): number {
  return catCharge.find((c) => c.minutes === duration)?.price ?? 0;
}

export function ReservationFlow() {
  const { locale, dict } = useI18n();
  const t = dict.reservation;

  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1); // 1..6 interactive, 7 = done
  const [date, setDate] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [duration, setDuration] = useState<Duration | null>(null);
  const [party, setParty] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", note: "" });
  const [errors, setErrors] = useState<{ name?: boolean; email?: boolean; phone?: boolean }>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Reservation | null>(null);

  useEffect(() => setMounted(true), []);

  const days = useMemo(() => (mounted ? buildDayOptions(28) : []), [mounted]);
  const times = useMemo(() => generateStartTimes(), []);

  function selectTime(time: string) {
    setStartTime(time);
    if (duration && !durationFits(time, duration)) setDuration(null);
  }

  function validateInfo() {
    const next = {
      name: form.name.trim().length === 0,
      email: !emailRe.test(form.email.trim()),
      phone: form.phone.trim().length < 6
    };
    setErrors(next);
    return !next.name && !next.email && !next.phone;
  }

  const canNext = (() => {
    switch (step) {
      case 1:
        return !!date;
      case 2:
        return !!startTime;
      case 3:
        return !!duration;
      case 4:
        return !!party;
      case 5:
        return true; // validated on click
      default:
        return true;
    }
  })();

  function next() {
    if (step === 5 && !validateInfo()) return;
    setStep((s) => Math.min(s + 1, 6));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 1));
  }

  function submit() {
    if (!date || !startTime || !duration || !party) return;
    setSubmitting(true);
    // Simulated latency for a natural submit feel.
    setTimeout(() => {
      const reservation = reservationStore.create({
        date,
        startTime,
        duration,
        partySize: party,
        name: form.name,
        email: form.email,
        phone: form.phone,
        note: form.note
      });
      setResult(reservation);
      setSubmitting(false);
      setStep(7);
    }, 550);
  }

  function reset() {
    setStep(1);
    setDate(null);
    setStartTime(null);
    setDuration(null);
    setParty(null);
    setForm({ name: "", email: "", phone: "", note: "" });
    setErrors({});
    setResult(null);
  }

  if (!mounted) {
    return <div className="min-h-[360px] animate-fade-in" aria-hidden />;
  }

  // ---- Completion screen -------------------------------------------------
  if (step === 7 && result) {
    return (
      <div className="animate-fade-up">
        <div className="rounded border border-line bg-paper-soft p-8 sm:p-12">
          <span className="label label-ink">07 · {t.steps.done}</span>
          <h2 className="mt-6 text-display-sm font-semibold">{t.done.title}</h2>
          <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-ink-muted">
            {t.done.body}
          </p>

          <div className="mt-8 border-t border-line pt-6">
            <span className="label">{t.done.codeLabel}</span>
            <p className="mt-2 select-all font-mono text-2xl font-semibold tracking-wider sm:text-3xl">
              {result.code}
            </p>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-line pt-6 text-sm sm:grid-cols-4">
            <div>
              <dt className="label">{t.confirm.date}</dt>
              <dd className="mt-1">{formatFullDate(result.date, locale)}</dd>
            </div>
            <div>
              <dt className="label">{t.confirm.time}</dt>
              <dd className="mt-1 tabular-nums">{result.startTime}</dd>
            </div>
            <div>
              <dt className="label">{t.confirm.duration}</dt>
              <dd className="mt-1 tabular-nums">
                {result.duration} {dict.common.minutes}
              </dd>
            </div>
            <div>
              <dt className="label">{t.confirm.party}</dt>
              <dd className="mt-1 tabular-nums">
                {result.partySize}
                {t.party.unit}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={reset} className="btn btn-outline">
            {t.done.addAnother}
          </button>
          <Link href={localePath(locale)} className="btn btn-primary">
            {t.done.backHome}
          </Link>
        </div>
        <p className="mt-6 text-xs text-ink-muted">{t.demoNote}</p>
      </div>
    );
  }

  const monthFmt = new Intl.DateTimeFormat(intlLocale[locale], { month: "short" });

  return (
    <div>
      {/* Step indicator */}
      <div className="mb-10">
        <ol className="flex items-center gap-2">
          {STEP_KEYS.map((key, i) => {
            const n = i + 1;
            const active = n === step;
            const done = n < step;
            return (
              <li key={key} className="flex flex-1 items-center gap-2">
                <span
                  className={`text-xs tabular-nums transition-colors ${
                    active ? "text-ink font-semibold" : done ? "text-ink" : "text-ink-muted/50"
                  }`}
                >
                  {String(n).padStart(2, "0")}
                </span>
                {i < STEP_KEYS.length - 1 && (
                  <span
                    className={`h-px flex-1 transition-colors ${
                      done ? "bg-ink" : "bg-line"
                    }`}
                  />
                )}
              </li>
            );
          })}
        </ol>
        <p className="mt-3 text-sm">
          <span className="label mr-2">
            {t.stepOf} {String(step).padStart(2, "0")}
          </span>
          <span className="font-medium">{t.steps[STEP_KEYS[step - 1]]}</span>
        </p>
      </div>

      {/* Step body */}
      <div className="min-h-[280px]">
        {step === 1 && (
          <fieldset className="animate-fade-up">
            <legend className="mb-1 text-lg font-medium">{t.date.title}</legend>
            <p className="mb-5 text-sm text-ink-muted">{t.date.hint}</p>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
              {days.map((d) => {
                const dObj = parseDateString(d.date);
                const selected = date === d.date;
                return (
                  <button
                    key={d.date}
                    type="button"
                    disabled={d.closed}
                    aria-pressed={selected}
                    onClick={() => setDate(d.date)}
                    className={`flex flex-col items-center gap-0.5 rounded-sm border py-3 transition-colors duration-200 ${
                      d.closed
                        ? "cursor-not-allowed border-line text-ink-muted/40"
                        : selected
                          ? "border-ink bg-ink text-paper"
                          : "border-line hover:border-ink"
                    }`}
                  >
                    <span className="text-[10px] uppercase tracking-wide">
                      {formatWeekday(d.date, locale)}
                    </span>
                    <span className="text-lg font-semibold tabular-nums leading-none">
                      {dObj.getDate()}
                    </span>
                    <span className="text-[10px] text-current opacity-70">
                      {d.closed ? t.date.closedWed : monthFmt.format(dObj)}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset className="animate-fade-up">
            <legend className="mb-1 text-lg font-medium">{t.time.title}</legend>
            <p className="mb-5 text-sm text-ink-muted">{t.time.hint}</p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
              {times.map((time) => {
                const selected = startTime === time;
                return (
                  <button
                    key={time}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => selectTime(time)}
                    className={`rounded-sm border py-3 text-sm tabular-nums transition-colors duration-200 ${
                      selected
                        ? "border-ink bg-ink text-paper"
                        : "border-line hover:border-ink"
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {step === 3 && startTime && (
          <fieldset className="animate-fade-up">
            <legend className="mb-1 text-lg font-medium">{t.duration.title}</legend>
            <p className="mb-5 text-sm text-ink-muted">{t.duration.hint}</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {DURATIONS.map((d) => {
                const fits = availableDurations(startTime).includes(d);
                const selected = duration === d;
                return (
                  <button
                    key={d}
                    type="button"
                    disabled={!fits}
                    aria-pressed={selected}
                    onClick={() => setDuration(d)}
                    className={`flex flex-col items-start gap-1 rounded-sm border px-5 py-5 text-left transition-colors duration-200 ${
                      !fits
                        ? "cursor-not-allowed border-line text-ink-muted/40"
                        : selected
                          ? "border-ink bg-ink text-paper"
                          : "border-line hover:border-ink"
                    }`}
                  >
                    <span className="text-xl font-semibold tabular-nums">
                      {d} <span className="text-sm font-normal">MIN</span>
                    </span>
                    <span className="text-sm tabular-nums opacity-80">
                      {fits ? formatYen(priceFor(d)) : t.duration.unavailable}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {step === 4 && (
          <fieldset className="animate-fade-up">
            <legend className="mb-1 text-lg font-medium">{t.party.title}</legend>
            <p className="mb-5 text-sm text-ink-muted">{t.party.hint}</p>
            <div className="flex flex-wrap gap-2">
              {PARTY_SIZES.map((n) => {
                const selected = party === n;
                return (
                  <button
                    key={n}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setParty(n)}
                    className={`h-14 w-14 rounded-sm border text-lg font-semibold tabular-nums transition-colors duration-200 ${
                      selected
                        ? "border-ink bg-ink text-paper"
                        : "border-line hover:border-ink"
                    }`}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {step === 5 && (
          <div className="animate-fade-up">
            <h2 className="mb-5 text-lg font-medium">{t.info.title}</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field
                label={t.info.name}
                required
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                placeholder={t.info.namePlaceholder}
                error={errors.name ? t.errors.name : undefined}
                autoComplete="name"
              />
              <Field
                label={t.info.phone}
                required
                value={form.phone}
                onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
                placeholder={t.info.phonePlaceholder}
                error={errors.phone ? t.errors.phone : undefined}
                inputMode="tel"
                autoComplete="tel"
              />
              <div className="sm:col-span-2">
                <Field
                  label={t.info.email}
                  required
                  value={form.email}
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  placeholder={t.info.emailPlaceholder}
                  error={errors.email ? t.errors.email : undefined}
                  inputMode="email"
                  autoComplete="email"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="label mb-2 block" htmlFor="res-note">
                  {t.info.note}
                  <span className="ml-2 normal-case tracking-normal text-ink-muted/70">
                    ({dict.common.optional})
                  </span>
                </label>
                <textarea
                  id="res-note"
                  rows={3}
                  value={form.note}
                  onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                  placeholder={t.info.notePlaceholder}
                  className="w-full rounded-sm border border-mist-strong bg-paper px-4 py-3 text-[15px] outline-none transition-colors focus:border-ink"
                />
              </div>
            </div>
          </div>
        )}

        {step === 6 && date && startTime && duration && party && (
          <div className="animate-fade-up">
            <h2 className="mb-1 text-lg font-medium">{t.confirm.title}</h2>
            <p className="mb-6 text-sm text-ink-muted">{t.confirm.hint}</p>
            <dl className="border-t border-line">
              <Summary label={t.confirm.date} value={formatFullDate(date, locale)} />
              <Summary label={t.confirm.time} value={startTime} />
              <Summary
                label={t.confirm.duration}
                value={`${duration} ${dict.common.minutes} · ${formatYen(priceFor(duration))}`}
              />
              <Summary label={t.confirm.party} value={`${party}${t.party.unit}`} />
              <Summary label={t.confirm.name} value={form.name} />
              <Summary label={t.confirm.email} value={form.email} />
              <Summary label={t.confirm.phone} value={form.phone} />
              {form.note.trim() && (
                <Summary label={t.confirm.note} value={form.note} />
              )}
            </dl>
            <p className="mt-6 text-xs text-ink-muted">{t.demoNote}</p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-6">
        <button
          type="button"
          onClick={back}
          disabled={step === 1}
          className="btn btn-outline disabled:opacity-0"
        >
          ← {t.actions.back}
        </button>

        {step < 6 ? (
          <button
            type="button"
            onClick={next}
            disabled={!canNext}
            className="btn btn-primary"
          >
            {t.actions.next} →
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={submitting}
            className="btn btn-primary"
          >
            {submitting ? t.confirm.submitting : t.confirm.submit}
          </button>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  error,
  required,
  inputMode,
  autoComplete
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  inputMode?: "text" | "tel" | "email";
  autoComplete?: string;
}) {
  const id = "res-" + label.replace(/\s+/g, "-").toLowerCase();
  return (
    <div>
      <label className="label mb-2 block" htmlFor={id}>
        {label}
        {required && <span className="ml-1 text-ink">*</span>}
      </label>
      <input
        id={id}
        type="text"
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`w-full rounded-sm border bg-paper px-4 py-3 text-[15px] outline-none transition-colors focus:border-ink ${
          error ? "border-ink" : "border-mist-strong"
        }`}
      />
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1.5 text-xs text-ink">
          {error}
        </p>
      )}
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-line py-3 sm:flex-row sm:gap-6">
      <dt className="label w-28 shrink-0 pt-0.5">{label}</dt>
      <dd className="text-[15px] text-ink-soft">{value}</dd>
    </div>
  );
}
