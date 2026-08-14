export interface SocialLink {
  label: string;
  handle: string;
  href: string;
}

/**
 * Demo / placeholder links only. These deliberately do NOT point at real
 * accounts (the café is fictional). `#` keeps them safe and inert.
 */
export const socialLinks: SocialLink[] = [
  { label: "Instagram", handle: "@cafe_chiro_minoh", href: "#" },
  { label: "X", handle: "@cafechiro_minoh", href: "#" },
  { label: "TikTok", handle: "@cafechiro", href: "#" },
  { label: "LINE", handle: "CAFE CHIRO", href: "#" }
];
