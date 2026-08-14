"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { useAllNews, newsStore, sortByPublished } from "@/lib/store/newsStore";
import { formatDate } from "@/lib/format";
import type { NewsArticle } from "@/lib/types";
import { AdminNewsForm } from "./AdminNewsForm";

export function AdminNews() {
  const { locale, dict } = useI18n();
  const a = dict.admin.news;
  const list = sortByPublished(useAllNews());
  const [editing, setEditing] = useState<NewsArticle | "new" | null>(null);

  if (editing) {
    return (
      <AdminNewsForm
        initial={editing === "new" ? null : editing}
        onDone={() => setEditing(null)}
        onCancel={() => setEditing(null)}
      />
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setEditing("new")}
          className="btn btn-primary !px-5 !py-2.5"
        >
          + {a.new}
        </button>
        <button
          type="button"
          onClick={() => {
            if (window.confirm(a.resetSeed + "?")) newsStore.reset();
          }}
          className="text-xs text-ink-muted underline-offset-2 hover:text-ink hover:underline"
        >
          {a.resetSeed}
        </button>
      </div>

      {list.length === 0 ? (
        <div className="rounded border border-line bg-paper-soft px-6 py-16 text-center text-sm text-ink-muted">
          {a.empty}
        </div>
      ) : (
        <ul className="border-t border-line">
          {list.map((article) => (
            <li
              key={article.id}
              className="flex flex-col gap-3 border-b border-line py-4 sm:flex-row sm:items-center sm:gap-6"
            >
              <div className="flex shrink-0 items-center gap-3">
                <span className="label label-ink w-16">{article.category}</span>
                <StatusBadge published={article.status === "published"} dict={dict} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-medium">
                  {article.title.ja || article.title.en || article.title.ko}
                </p>
                <p className="mt-0.5 text-xs tabular-nums text-ink-muted">
                  {formatDate(article.publishedAt, locale)} · /{article.slug}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => setEditing(article)}
                  className="rounded-sm border border-line px-3 py-1.5 text-xs transition-colors hover:border-ink"
                >
                  {a.edit}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(a.confirmDelete)) newsStore.remove(article.id);
                  }}
                  className="rounded-sm border border-line px-3 py-1.5 text-xs text-ink-muted transition-colors hover:border-ink hover:text-ink"
                >
                  {a.delete}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function StatusBadge({
  published,
  dict
}: {
  published: boolean;
  dict: ReturnType<typeof useI18n>["dict"];
}) {
  const a = dict.admin.news;
  return published ? (
    <span className="rounded-xs bg-ink px-2 py-0.5 text-[10px] font-medium tracking-wide text-paper">
      {a.statusPublished}
    </span>
  ) : (
    <span className="rounded-xs border border-mist-strong px-2 py-0.5 text-[10px] font-medium tracking-wide text-ink-muted">
      {a.statusDraft}
    </span>
  );
}
