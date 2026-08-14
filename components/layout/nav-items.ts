import type { Dictionary } from "@/messages/ja";

export const NAV_ITEMS = [
  { key: "about", href: "about" },
  { key: "cats", href: "cats" },
  { key: "menu", href: "menu" },
  { key: "price", href: "price" },
  { key: "news", href: "news" },
  { key: "access", href: "access" }
] as const;

export type NavKey = (typeof NAV_ITEMS)[number]["key"];

export function navLabel(dict: Dictionary, key: NavKey): string {
  return dict.nav[key];
}
