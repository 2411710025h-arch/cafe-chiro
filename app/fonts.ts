import { Inter } from "next/font/google";

/**
 * Latin display face. JP/KR are rendered via a system CJK stack (see
 * tailwind.config.ts / globals.css) — this avoids next/font's CJK subset
 * pitfalls and the multi-MB webfont download, while still reading as a modern
 * Noto/Hiragino-style sans on virtually every device.
 */
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export const fontVariables = inter.variable;
