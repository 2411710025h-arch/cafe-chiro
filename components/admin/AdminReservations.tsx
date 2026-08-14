"use client";

import { useReservations } from "@/lib/store/reservationStore";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { formatDateTime, formatFullDate } from "@/lib/format";

export function AdminReservations() {
  const { locale, dict } = useI18n();
  const rows = useReservations();
  const r = dict.admin.reservations;

  if (rows.length === 0) {
    return (
      <div className="rounded border border-line bg-paper-soft px-6 py-16 text-center text-sm text-ink-muted">
        {r.empty}
      </div>
    );
  }

  return (
    <div>
      <p className="mb-4 text-sm text-ink-muted">
        {rows.length} {r.count}
      </p>
      <div className="overflow-x-auto rounded border border-line">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line bg-paper-soft text-left">
              {[
                r.code,
                r.date,
                r.time,
                r.duration,
                r.party,
                r.name,
                r.email,
                r.phone,
                r.note,
                r.createdAt
              ].map((h) => (
                <th key={h} className="whitespace-nowrap px-4 py-3 label">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-line last:border-0 align-top">
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-medium">
                  {row.code}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  {formatFullDate(row.date, locale)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 tabular-nums">
                  {row.startTime}
                </td>
                <td className="whitespace-nowrap px-4 py-3 tabular-nums">
                  {row.duration}
                  {dict.common.minutes}
                </td>
                <td className="whitespace-nowrap px-4 py-3 tabular-nums">
                  {row.partySize}
                </td>
                <td className="whitespace-nowrap px-4 py-3">{row.name}</td>
                <td className="whitespace-nowrap px-4 py-3 text-ink-muted">
                  {row.email}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-ink-muted">
                  {row.phone}
                </td>
                <td className="max-w-[220px] px-4 py-3 text-ink-muted">
                  {row.note || "—"}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-xs text-ink-muted">
                  {formatDateTime(row.createdAt, locale)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
