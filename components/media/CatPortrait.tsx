import { CatMark } from "@/components/brand/CatMark";
import { CatPhoto } from "@/components/media/CatPhoto";
import type { Cat, CoatVariant } from "@/content/cats";
import type { Locale } from "@/lib/i18n/config";

/**
 * Cat portrait. Uses the real photo (cat.photo under /public) when present and
 * falls back to a monochrome silhouette — coat variants are differentiated only
 * by ink tone (never by chromatic colour), per the brand.
 */

const coatTone: Record<CoatVariant, string> = {
  solid: "#141414",
  tabby: "#33373b",
  mid: "#6b7075",
  light: "#a6acb2"
};

export function CatPortrait({
  cat,
  locale,
  className = "",
  showName = true
}: {
  cat: Cat;
  locale: Locale;
  className?: string;
  showName?: boolean;
}) {
  const tone = coatTone[cat.coat];
  return (
    <div
      className={`relative overflow-hidden rounded-img bg-paper-dim ${className}`}
      data-cat={cat.id}
    >
      {/* catch tag — legible over both the silhouette and a photo */}
      <span
        className="pointer-events-none absolute left-4 top-4 z-10 label label-ink"
        style={{ textShadow: "0 1px 12px rgba(255,255,255,0.55)" }}
      >
        {cat.catch}
      </span>

      {/* silhouette composition */}
      <div className="absolute inset-0 flex items-end justify-center">
        {cat.coat === "tabby" && (
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(115deg, #111 0 2px, transparent 2px 12px)"
            }}
          />
        )}
        <CatMark
          title={cat.name}
          className="h-[78%] w-auto translate-y-[6%]"
          style={{ color: tone }}
        />
      </div>

      {/* real photo (covers the silhouette when the file exists) */}
      {cat.photo && (
        <CatPhoto
          src={cat.photo}
          alt={`${cat.name} — ${cat.breed[locale]}`}
          focus={cat.focus}
          className="absolute inset-0"
        />
      )}

      {showName && (
        <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between p-4">
          <span className="text-lg font-semibold tracking-[0.12em] text-ink">
            {cat.name}
          </span>
          <span className="font-jp text-xs text-ink-muted">
            {cat.nameLocal[locale]}
          </span>
        </div>
      )}
    </div>
  );
}
