import type { SVGProps } from "react";

/**
 * CAFE CHIRO mark — a geometric sitting cat reconstructed from the brand board.
 * Single-colour silhouette (currentColor) with a negative-space nose rendered
 * in the paper token. Designed for light surfaces. Whiskers are ink strokes.
 */
export function CatMark({
  title = "CAFE CHIRO",
  ...props
}: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg
      viewBox="0 0 128 140"
      role="img"
      aria-label={title}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill="currentColor">
        {/* ears */}
        <path d="M40 6 L36 46 L66 30 Z" />
        <path d="M88 6 L92 46 L62 30 Z" />
        {/* head */}
        <rect x="33" y="24" width="62" height="52" rx="21" />
        {/* body (sitting) */}
        <path d="M41 64 C36 78 30 96 28 110 C26 122 29 132 29 132 L99 132 C99 132 102 122 100 110 C98 96 92 78 87 64 Z" />
        {/* curled tail */}
        <path d="M96 132 C120 132 124 104 104 98 C118 106 112 124 92 124 Z" />
      </g>
      {/* nose — negative space (reads correctly on light surfaces) */}
      <path d="M57 60 L71 60 L64 69 Z" fill="var(--paper)" />
      {/* whiskers */}
      <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <line x1="33" y1="56" x2="9" y2="52" />
        <line x1="33" y1="63" x2="9" y2="66" />
        <line x1="95" y1="56" x2="119" y2="52" />
        <line x1="95" y1="63" x2="119" y2="66" />
      </g>
    </svg>
  );
}
