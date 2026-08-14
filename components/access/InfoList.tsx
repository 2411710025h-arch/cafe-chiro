import type { Dictionary } from "@/messages/ja";

export function InfoList({ dict }: { dict: Dictionary }) {
  const b = dict.business;
  const a = dict.accessPage;

  const rows: { label: string; value: React.ReactNode }[] = [
    {
      label: a.addressLabel,
      value: (
        <>
          {b.addressPostal}
          <br />
          {b.address}
        </>
      )
    },
    { label: a.hoursLabel, value: b.hours },
    { label: a.closedLabel, value: b.closed },
    { label: a.telLabel, value: b.tel },
    {
      label: a.emailLabel,
      value: (
        <a href={`mailto:${b.email}`} className="link-underline">
          {b.email}
        </a>
      )
    }
  ];

  return (
    <dl className="border-t border-line">
      {rows.map((row, i) => (
        <div
          key={i}
          className="flex flex-col gap-1 border-b border-line py-4 sm:flex-row sm:gap-6"
        >
          <dt className="label w-32 shrink-0 pt-1">{row.label}</dt>
          <dd className="text-[15px] leading-relaxed text-ink-soft">
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
