"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { NewsRow } from "@/components/news/NewsRow";
import { usePublishedNews } from "@/lib/store/newsStore";
import { localePath } from "@/lib/paths";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/messages/ja";

export function NewsSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const news = usePublishedNews().slice(0, 3);
  const n = dict.newsSection;

  return (
    <section className="border-b border-line py-section" aria-labelledby="news-heading">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <div>
            <Reveal>
              <Eyebrow index="07">{n.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="news-heading" className="mt-6 text-display-sm font-semibold">
                {n.heading}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <Link
              href={localePath(locale, "news")}
              className="link-underline hidden text-sm font-medium sm:inline-block"
            >
              {n.link} →
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 border-t border-line">
          {news.length === 0 ? (
            <p className="py-10 text-sm text-ink-muted">{dict.states.emptyNews}</p>
          ) : (
            news.map((article) => (
              <NewsRow
                key={article.id}
                article={article}
                locale={locale}
                dict={dict}
              />
            ))
          )}
        </div>

        <Link
          href={localePath(locale, "news")}
          className="link-underline mt-8 inline-block text-sm font-medium sm:hidden"
        >
          {n.link} →
        </Link>
      </Container>
    </section>
  );
}
