import { CatMark } from "@/components/brand/CatMark";

type Variant = "interior" | "news" | "plain";

/**
 * Designed image placeholder (monochrome). Used wherever real photography is
 * not yet available. See IMAGE_PROMPTS.md for the generation prompts.
 */
export function Placeholder({
  label,
  variant = "plain",
  className = "",
  tone = "soft"
}: {
  label?: string;
  variant?: Variant;
  className?: string;
  tone?: "soft" | "dim";
}) {
  const bg = tone === "dim" ? "bg-paper-dim" : "bg-paper-soft";
  return (
    <div
      className={`relative overflow-hidden rounded-img border border-line ${bg} ${className}`}
    >
      {variant === "interior" && (
        <svg
          aria-hidden
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full text-mist-strong"
        >
          {/* minimal interior line-art: glass front, table, hanging light */}
          <g stroke="currentColor" strokeWidth="1" fill="none">
            <line x1="0" y1="70" x2="400" y2="70" />
            <line x1="70" y1="70" x2="70" y2="300" />
            <line x1="200" y1="70" x2="200" y2="300" />
            <line x1="330" y1="70" x2="330" y2="300" />
            <rect x="120" y="200" width="160" height="6" />
            <line x1="140" y1="206" x2="140" y2="250" />
            <line x1="260" y1="206" x2="260" y2="250" />
            <line x1="250" y1="70" x2="250" y2="120" />
            <circle cx="250" cy="128" r="8" />
          </g>
        </svg>
      )}

      {variant === "news" && (
        <CatMark
          aria-hidden
          className="absolute -bottom-4 -right-3 h-24 w-auto text-mist-strong opacity-70"
        />
      )}

      {label && (
        <span className="absolute left-4 top-4 label">{label}</span>
      )}
    </div>
  );
}
