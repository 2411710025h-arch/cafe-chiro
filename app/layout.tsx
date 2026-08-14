import type { ReactNode } from "react";
import "./globals.css";

/**
 * Pass-through root layout. The real <html>/<body> live in app/[locale]/layout
 * so the lang attribute can follow the active locale.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
