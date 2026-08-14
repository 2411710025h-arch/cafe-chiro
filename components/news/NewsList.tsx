"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { NewsRow } from "@/components/news/NewsRow";
import { usePublishedNews } from "@/lib/store/newsStore";
import { NEWS_CATEGORIES, type NewsCategory } from "@/lib/types";
import { useI18n } from "@/lib/i18n/I18nProvider";

type Filter = "ALL" | NewsCategory;

export function NewsList() {
  const { locale, dict } = useI18n();
  const all = usePublishedNews();
  const [filter, setFilter] = useState<Filter>("ALL");

  const filtered = useMemo(
    () => (filter === "ALL" ? all : all.filter((a) => a.category === filter)),
    [all, filter]
  );

  const filters: Filter[] = ["ALL", ...NEWS_CATEGORIES];

  return (
    <Container className="pb-section">
      {/* Filter */}
      <div className="flex flex-wrap gap-2 border-b border-line pb-6">
        {filters.map((f) => {
          const active = filter === f;
          const label = f === "ALL" ? dict.newsPage.all : dict.newsPage.categories[f];
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={active}
              className={`rounded-sm border px-4 py-2 text-xs font-medium tracking-wide transition-colors duration-200 ${
                active
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-ink-muted hover:border-ink hover:text-ink"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <p className="py-16 text-sm text-ink-muted">{dict.newsPage.empty}</p>
      ) : (
        <div className="mt-2">
          {filtered.map((article) => (
            <NewsRow key={article.id} article={article} locale={locale} dict={dict} />
          ))}
        </div>
      )}
    </Container>
  );
}
