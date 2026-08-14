import type { GuideIcon as GuideIconKey } from "@/content/guide";

/** Minimal line icons for the guide (abstract, never cutesy). */
export function GuideIcon({
  name,
  className = ""
}: {
  name: GuideIconKey;
  className?: string;
}) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className
  };

  switch (name) {
    case "sanitize":
      return (
        <svg {...common}>
          <path d="M12 3c0 0-6 6.6-6 10.5a6 6 0 0 0 12 0C18 9.6 12 3 12 3Z" />
        </svg>
      );
    case "no-lift":
      return (
        <svg {...common}>
          <line x1="12" y1="20" x2="12" y2="7" />
          <path d="M7 11l5-5 5 5" />
          <line x1="4" y1="4" x2="20" y2="20" />
        </svg>
      );
    case "no-flash":
      return (
        <svg {...common}>
          <path d="M13 2 5 13h5l-1 8 8-12h-5z" />
          <line x1="3" y1="21" x2="21" y2="3" />
        </svg>
      );
    case "no-feed":
      return (
        <svg {...common}>
          <line x1="3.5" y1="11" x2="20.5" y2="11" />
          <path d="M5 11a7 7 0 0 0 14 0" />
          <line x1="4" y1="4" x2="20" y2="20" />
        </svg>
      );
    case "sleeping":
      return (
        <svg {...common}>
          <path d="M20 14A8 8 0 1 1 10 4a6.2 6.2 0 0 0 10 10Z" />
        </svg>
      );
    case "pace":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5V12l3 1.8" />
        </svg>
      );
    default:
      return null;
  }
}
