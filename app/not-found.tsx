import Link from "next/link";
import { fontVariables } from "./fonts";

/**
 * Root-level 404 (rare — middleware routes everything under a locale). Supplies
 * its own <html>/<body> because the root layout is a pass-through.
 */
export default function RootNotFound() {
  return (
    <html lang="ja" className={fontVariables}>
      <body className="min-h-screen bg-paper text-ink">
        <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <p className="label tabular-nums">404</p>
          <h1 className="mt-4 text-2xl font-semibold">ページが見つかりません</h1>
          <p className="mt-2 text-sm text-ink-muted">Page not found</p>
          <Link href="/ja" className="btn btn-primary mt-8">
            CAFE CHIRO →
          </Link>
        </main>
      </body>
    </html>
  );
}
