export function Eyebrow({
  children,
  index,
  className = ""
}: {
  children: React.ReactNode;
  index?: string;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      {index && <span className="label label-ink tabular-nums">{index}</span>}
      {index && <span aria-hidden className="h-px w-6 bg-mist-strong" />}
      <span className="label">{children}</span>
    </span>
  );
}
