"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { localePath } from "@/lib/paths";

export function MobileReserveBar() {
  const { locale, dict } = useI18n();
  const pathname = usePathname() || "/";
  const rest = pathname.replace(/^\/(ja|en|ko)/, "") || "/";

  // Don't show it on the reservation flow or in the admin.
  if (rest.startsWith("/reservation") || rest.startsWith("/admin")) return null;

  return (
    <>
      {/* In-flow spacer so the fixed bar never covers footer content. */}
      <div aria-hidden className="h-[60px] lg:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
        <div className="container-edge py-2.5">
          <Link
            href={localePath(locale, "reservation")}
            className="btn btn-primary w-full !py-3"
          >
            {dict.nav.reservationFull}
          </Link>
        </div>
      </div>
    </>
  );
}
