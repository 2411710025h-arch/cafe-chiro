"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { newsStore, type NewsDraftInput } from "@/lib/store/newsStore";
import { NEWS_CATEGORIES, type NewsArticle, type NewsCategory, type NewsStatus } from "@/lib/types";
import { locales, localeLabels, type Locale } from "@/lib/i18n/config";

function toLocalInput(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

function fromLocalInput(value: string): string {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

export function AdminNewsForm({
  initial,
  onDone,
  onCancel
}: {
  initial: NewsArticle | null;
  onDone: () => void;
  onCancel: () => void;
}) {
  const { dict } = useI18n();
  const a = dict.admin.news;

  const [langTab, setLangTab] = useState<Locale>("ja");
  const [title, setTitle] = useState({
    ja: initial?.title.ja ?? "",
    en: initial?.title.en ?? "",
    ko: initial?.title.ko ?? ""
  });
  const [content, setContent] = useState({
    ja: initial?.content.ja ?? "",
    en: initial?.content.en ?? "",
    ko: initial?.content.ko ?? ""
  });
  const [category, setCategory] = useState<NewsCategory>(initial?.category ?? "NEWS");
  const [status, setStatus] = useState<NewsStatus>(initial?.status ?? "draft");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [thumbnailUrl, setThumbnailUrl] = useState(initial?.thumbnailUrl ?? "");
  const [publishedAt, setPublishedAt] = useState(
    toLocalInput(initial?.publishedAt ?? new Date().toISOString())
  );
  const [touched, setTouched] = useState(false);

  const jaMissing = title.ja.trim() === "" || content.ja.trim() === "";

  function save() {
    setTouched(true);
    if (jaMissing) {
      setLangTab("ja");
      return;
    }
    const input: NewsDraftInput = {
      slug: slug.trim() || undefined,
      title,
      content,
      category,
      status,
      thumbnailUrl: thumbnailUrl.trim() || null,
      publishedAt: fromLocalInput(publishedAt)
    };
    if (initial) newsStore.update(initial.id, input);
    else newsStore.create(input);
    onDone();
  }

  const labelForLang: Record<Locale, string> = {
    ja: a.langJa,
    en: a.langEn,
    ko: a.langKo
  };

  return (
    <div className="animate-fade-up">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-medium">
          {initial ? a.edit : a.new}
        </h2>
        <button type="button" onClick={onCancel} className="btn btn-outline !px-4 !py-2">
          {a.cancel}
        </button>
      </div>

      {/* Shared meta */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="label mb-2 block" htmlFor="f-category">
            {a.category}
          </label>
          <select
            id="f-category"
            value={category}
            onChange={(e) => setCategory(e.target.value as NewsCategory)}
            className="w-full rounded-sm border border-mist-strong bg-paper px-3 py-2.5 text-sm outline-none focus:border-ink"
          >
            {NEWS_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label mb-2 block" htmlFor="f-status">
            {a.status}
          </label>
          <select
            id="f-status"
            value={status}
            onChange={(e) => setStatus(e.target.value as NewsStatus)}
            className="w-full rounded-sm border border-mist-strong bg-paper px-3 py-2.5 text-sm outline-none focus:border-ink"
          >
            <option value="draft">{a.statusDraft}</option>
            <option value="published">{a.statusPublished}</option>
          </select>
        </div>

        <div>
          <label className="label mb-2 block" htmlFor="f-published">
            {a.publishedAt}
          </label>
          <input
            id="f-published"
            type="datetime-local"
            value={publishedAt}
            onChange={(e) => setPublishedAt(e.target.value)}
            className="w-full rounded-sm border border-mist-strong bg-paper px-3 py-2.5 text-sm outline-none focus:border-ink"
          />
        </div>

        <div>
          <label className="label mb-2 block" htmlFor="f-slug">
            {a.slug}
          </label>
          <input
            id="f-slug"
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="auto"
            className="w-full rounded-sm border border-mist-strong bg-paper px-3 py-2.5 text-sm outline-none focus:border-ink"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="label mb-2 block" htmlFor="f-thumb">
            {a.thumbnail}
          </label>
          <input
            id="f-thumb"
            type="url"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            placeholder="https://…"
            className="w-full rounded-sm border border-mist-strong bg-paper px-3 py-2.5 text-sm outline-none focus:border-ink"
          />
        </div>
      </div>

      {/* Language tabs */}
      <div className="mt-8 flex gap-1 border-b border-line">
        {locales.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLangTab(l)}
            className={`-mb-px border-b-2 px-4 py-2 text-sm transition-colors ${
              langTab === l
                ? "border-ink font-medium text-ink"
                : "border-transparent text-ink-muted hover:text-ink"
            }`}
          >
            {labelForLang[l]}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <label className="label mb-2 block" htmlFor="f-title">
          {a.title}
          {langTab === "ja" && <span className="ml-1 text-ink">*</span>}
        </label>
        <input
          id="f-title"
          type="text"
          value={title[langTab]}
          onChange={(e) => setTitle((t) => ({ ...t, [langTab]: e.target.value }))}
          className="w-full rounded-sm border border-mist-strong bg-paper px-4 py-3 text-[15px] outline-none focus:border-ink"
        />

        <label className="label mb-2 mt-5 block" htmlFor="f-content">
          {a.content}
          {langTab === "ja" && <span className="ml-1 text-ink">*</span>}
        </label>
        <textarea
          id="f-content"
          rows={10}
          value={content[langTab]}
          onChange={(e) => setContent((c) => ({ ...c, [langTab]: e.target.value }))}
          className="w-full rounded-sm border border-mist-strong bg-paper px-4 py-3 text-[15px] leading-relaxed outline-none focus:border-ink"
        />
      </div>

      {touched && jaMissing && (
        <p role="alert" className="mt-4 text-sm text-ink">
          {localeLabels.ja} · {a.title} / {a.content} — {dict.common.required}
        </p>
      )}

      <div className="mt-8 flex gap-3">
        <button type="button" onClick={save} className="btn btn-primary">
          {a.save}
        </button>
        <button type="button" onClick={onCancel} className="btn btn-outline">
          {a.cancel}
        </button>
      </div>
    </div>
  );
}
