import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale, isLocale } from "@/lib/i18n/config";

/** Pick a locale from Accept-Language, falling back to the default. */
function detectLocale(req: NextRequest): string {
  const header = req.headers.get("accept-language") || "";
  const preferred = header
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase());
  for (const p of preferred) {
    const base = p.split("-")[0];
    if (isLocale(base)) return base;
  }
  return defaultLocale;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return;

  const locale = detectLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes and any file with an extension.
  matcher: ["/((?!_next|api|.*\\..*).*)"]
};
