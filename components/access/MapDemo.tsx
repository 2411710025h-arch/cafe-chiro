/**
 * Schematic, non-interactive map of the Minoh area (§17). Intentionally NOT a
 * real Google Maps embed and NOT a real pin — the café is fictional, so we
 * never place a false marker on a real map. This is a stylised demo view.
 */
export function MapDemo({
  label = "MINOH, OSAKA",
  className = ""
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-img border border-line bg-paper-dim ${className}`}
      role="img"
      aria-label={`${label} — demo map`}
    >
      <svg
        viewBox="0 0 600 400"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        {/* blocks / roads */}
        <g stroke="#d7dbe0" strokeWidth="1" fill="none">
          <line x1="0" y1="90" x2="600" y2="70" />
          <line x1="0" y1="200" x2="600" y2="210" />
          <line x1="0" y1="310" x2="600" y2="300" />
          <line x1="120" y1="0" x2="140" y2="400" />
          <line x1="300" y1="0" x2="300" y2="400" />
          <line x1="460" y1="0" x2="450" y2="400" />
        </g>
        {/* a diagonal thoroughfare */}
        <line x1="-20" y1="360" x2="620" y2="40" stroke="#e6e9ec" strokeWidth="10" />
        {/* block fills */}
        <g fill="#eef0f2">
          <rect x="150" y="100" width="130" height="80" />
          <rect x="320" y="220" width="120" height="70" />
        </g>
        {/* marker */}
        <g transform="translate(300 200)">
          <circle r="34" fill="#111111" opacity="0.06" />
          <path
            d="M0 -20 C11 -20 20 -11 20 0 C20 14 0 30 0 30 C0 30 -20 14 -20 0 C-20 -11 -11 -20 0 -20 Z"
            fill="#111111"
          />
          <circle cx="0" cy="-2" r="6" fill="#ffffff" />
        </g>
      </svg>

      <span className="absolute left-4 top-4 label label-ink">{label}</span>
      <span className="absolute bottom-4 right-4 rounded-xs border border-line bg-paper px-2 py-1 text-[10px] font-medium tracking-wide text-ink-muted">
        DEMO MAP
      </span>
    </div>
  );
}
