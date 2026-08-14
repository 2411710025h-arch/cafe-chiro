"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { localePath } from "@/lib/paths";
import { NAV_ITEMS } from "./nav-items";
import { LanguageSwitch } from "./LanguageSwitch";

export function Header() {
  const { locale, dict } = useI18n();
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);

  const rest = pathname.replace(/^\/(ja|en|ko)/, "") || "/";
  const isActive = (href: string) =>
    rest === `/${href}` || rest.startsWith(`/${href}/`);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll + Escape-to-close while the menu is open.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/80 backdrop-blur-md">
      <div className="container-edge flex h-[--header-h] items-center justify-between gap-4">
        <Link
          href={localePath(locale)}
          aria-label={`${dict.meta.brand} — ${dict.nav.home}`}
          className="shrink-0"
        >
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 lg:flex"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={localePath(locale, item.href)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`text-[13px] tracking-wide transition-colors duration-250 ${
                isActive(item.href)
                  ? "text-ink"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {dict.nav[item.key]}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <LanguageSwitch />
          <Link
            href={localePath(locale, "reservation")}
            className="btn btn-primary !px-5 !py-2.5"
          >
            {dict.nav.reservationFull}
          </Link>
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
          className="relative z-50 flex h-10 w-10 items-center justify-center lg:hidden"
        >
          <span className="sr-only">
            {open ? dict.nav.closeMenu : dict.nav.openMenu}
          </span>
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 block h-px w-6 bg-ink transition-all duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-px w-6 bg-ink transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-6 bg-ink transition-all duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 bottom-0 top-[--header-h] z-40 bg-paper transition-opacity duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav
          aria-label="Mobile"
          className="container-edge flex h-full flex-col justify-between py-8"
        >
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item, i) => (
              <li key={item.key}>
                <Link
                  href={localePath(locale, item.href)}
                  className="flex items-baseline gap-4 border-b border-line py-4"
                >
                  <span className="label tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-2xl font-medium">{dict.nav[item.key]}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-6 pb-24">
            <Link
              href={localePath(locale, "reservation")}
              className="btn btn-primary w-full"
            >
              {dict.nav.reservationFull}
            </Link>
            <LanguageSwitch className="justify-center" />
          </div>
        </nav>
      </div>
    </header>
  );
}
