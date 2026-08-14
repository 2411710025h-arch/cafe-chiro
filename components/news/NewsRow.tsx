import Link from "next/link";
import { Placeholder } from "@/components/media/Placeholder";
import { formatStamp } from "@/lib/format";
import { localePath } from "@/lib/paths";
import type { NewsArticle } from "@/lib/types";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/messages/ja";

/**
 * Editorial news row (not a boxed card). Thumbnail + date/category + title.
 * Admin-provided thumbnails use a plain <img> so any URL works without
 * next/image domain config; placeholders are used when none is set.
 */
export function NewsRow({
  article,
  locale,
  dict
}: {
  article: NewsArticle;
  locale: Locale;
  dict: Dictionary;
}) {
  const title = article.title[locale] || article.title.ja;
  const category = dict.newsPage.categories[article.category];

  return (
    <Link
      href={localePath(locale, `news/${article.slug}`)}
      className="group grid grid-cols-[64px,1fr,auto] items-center gap-4 border-b border-line py-6 sm:grid-cols-[96px,1fr,auto] sm:gap-8"
    >
      <div className="aspect-square w-16 overflow-hidden rounded-img sm:w-24">
        {article.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.thumbnailUrl}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <Placeholder variant="news" tone="dim" className="h-full w-full" />
        )}
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <time className="label tabular-nums" dateTime={article.publishedAt}>
            {formatStamp(article.publishedAt)}
          </time>
          <span aria-hidden className="text-mist-strong">·</span>
          <span className="label label-ink">{category}</span>
        </div>
        <h3 className="mt-2 text-pretty text-base font-medium leading-snug group-hover:underline sm:text-lg">
          {title}
        </h3>
      </div>

      <span
        aria-hidden
        className="hidden text-ink-muted transition-transform duration-250 group-hover:translate-x-1 sm:block"
      >
        →
      </span>
    </Link>
  );
}
