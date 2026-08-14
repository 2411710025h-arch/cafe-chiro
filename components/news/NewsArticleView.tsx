"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Placeholder } from "@/components/media/Placeholder";
import { NewsRow } from "@/components/news/NewsRow";
import { usePublishedNews } from "@/lib/store/newsStore";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { localePath } from "@/lib/paths";
import { formatDate } from "@/lib/format";
import type { NewsArticle } from "@/lib/types";

export function NewsArticleView({
  slug,
  initial
}: {
  slug: string;
  initial: NewsArticle | null;
}) {
  const { locale, dict } = useI18n();
  const published = usePublishedNews();
  const article = published.find((a) => a.slug === slug) ?? initial;

  if (!article) {
    return (
      <Container className="py-section">
        <p className="label">404</p>
        <h1 className="mt-4 text-display-sm font-semibold">
          {dict.states.notFoundTitle}
        </h1>
        <p className="mt-4 text-ink-muted">{dict.states.notFoundBody}</p>
        <Link
          href={localePath(locale, "news")}
          className="link-underline mt-8 inline-block text-sm font-medium"
        >
          ← {dict.newsPage.backToList}
        </Link>
      </Container>
    );
  }

  const title = article.title[locale] || article.title.ja;
  const body = (article.content[locale] || article.content.ja).split(/\n{2,}/);
  const others = published.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <article>
      <Container className="pt-12 md:pt-20">
        <Reveal>
          <Link
            href={localePath(locale, "news")}
            className="link-underline text-sm text-ink-muted"
          >
            ← {dict.newsPage.backToList}
          </Link>
        </Reveal>

        <div className="mx-auto mt-8 max-w-3xl">
          <Reveal>
            <div className="flex items-center gap-3">
              <time className="label tabular-nums" dateTime={article.publishedAt}>
                {formatDate(article.publishedAt, locale)}
              </time>
              <span aria-hidden className="text-mist-strong">·</span>
              <span className="label label-ink">
                {dict.newsPage.categories[article.category]}
              </span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 text-display-sm font-semibold text-balance">
              {title}
            </h1>
          </Reveal>
        </div>
      </Container>

      <Container className="py-10">
        <div className="mx-auto max-w-3xl">
          <Reveal delay={120}>
            <div className="aspect-[16/9] w-full">
              {article.thumbnailUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={article.thumbnailUrl}
                  alt={title}
                  className="h-full w-full rounded-img object-cover"
                />
              ) : (
                <Placeholder
                  variant="news"
                  tone="dim"
                  className="h-full w-full"
                  label={dict.newsPage.categories[article.category]}
                />
              )}
            </div>
          </Reveal>

          <div className="mt-10 flex flex-col gap-5 text-[16px] leading-[1.9] text-ink-soft">
            {body.map((para, i) => (
              <p key={i} className="text-pretty">
                {para.split("\n").map((line, j, arr) => (
                  <span key={j}>
                    {line}
                    {j < arr.length - 1 && <br />}
                  </span>
                ))}
              </p>
            ))}
          </div>
        </div>
      </Container>

      {others.length > 0 && (
        <Container className="border-t border-line py-section">
          <span className="label">{dict.newsSection.eyebrow}</span>
          <div className="mt-6 border-t border-line">
            {others.map((a) => (
              <NewsRow key={a.id} article={a} locale={locale} dict={dict} />
            ))}
          </div>
        </Container>
      )}
    </article>
  );
}
