/**
 * Canonical site origin used for metadata, sitemap and robots.
 *
 * Priority:
 * 1. NEXT_PUBLIC_SITE_URL — explicit override (recommended in Production).
 * 2. VERCEL_PROJECT_PRODUCTION_URL — the stable production domain on Vercel,
 *    so canonical/OG URLs are correct even when the env var above is unset.
 * 3. http://localhost:3000 — local development fallback.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

/** Default Open Graph / Twitter share image (relative to SITE_URL). */
export const OG_IMAGE = {
  url: "/interior/hero.png",
  width: 1672,
  height: 941,
  alt: "CAFE CHIRO"
} as const;
