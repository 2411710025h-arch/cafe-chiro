"use client";

import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { localePath } from "@/lib/paths";
import { NAV_ITEMS } from "./nav-items";
import { LanguageSwitch } from "./LanguageSwitch";
import { socialLinks } from "@/content/social";

export function Footer() {
  const { locale, dict } = useI18n();
  const b = dict.business;

  return (
    <footer className="border-t border-line bg-paper-soft">
      <div className="container-edge py-16 lg:py-20">
        <div className="flex flex-col gap-10 border-b border-line pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link href={localePath(locale)} aria-label={dict.meta.brand}>
              <Logo />
            </Link>
            <p className="mt-5 max-w-xs text-sm text-ink-muted">
              {dict.footer.tagline}
            </p>
          </div>
          <a
            href="#top"
            className="label link-underline self-start lg:self-auto"
          >
            {dict.footer.backToTop} ↑
          </a>
        </div>

        <div className="grid grid-cols-2 gap-10 py-12 md:grid-cols-4">
          {/* Site */}
          <nav aria-label="Footer site">
            <h2 className="label mb-5">{dict.footer.siteNav}</h2>
            <ul className="flex flex-col gap-3 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={localePath(locale, item.href)}
                    className="text-ink-muted transition-colors duration-250 hover:text-ink"
                  >
                    {dict.nav[item.key]}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={localePath(locale, "reservation")}
                  className="text-ink-muted transition-colors duration-250 hover:text-ink"
                >
                  {dict.nav.reservationFull}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="label mb-5">{dict.footer.contactNav}</h2>
            <address className="flex flex-col gap-3 text-sm not-italic text-ink-muted">
              <span>
                {b.addressPostal}
                <br />
                {b.address}
              </span>
              <span>
                {dict.accessPage.hoursLabel} {b.hours}
                <br />
                {dict.accessPage.closedLabel} {b.closed}
              </span>
              <span>{b.tel}</span>
              <a
                href={`mailto:${b.email}`}
                className="link-underline w-fit text-ink"
              >
                {b.email}
              </a>
            </address>
          </div>

          {/* Follow */}
          <div>
            <h2 className="label mb-5">{dict.footer.followNav}</h2>
            <ul className="flex flex-col gap-3 text-sm">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="group flex items-baseline gap-2 text-ink-muted transition-colors duration-250 hover:text-ink"
                    rel="nofollow noopener"
                  >
                    <span className="text-ink">{s.label}</span>
                    <span className="text-xs">{s.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Language */}
          <div>
            <h2 className="label mb-5">{dict.footer.langNav}</h2>
            <LanguageSwitch />
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line pt-8 text-xs text-ink-muted md:flex-row md:items-center md:justify-between">
          <p>{dict.footer.disclaimer}</p>
          <p>{dict.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
