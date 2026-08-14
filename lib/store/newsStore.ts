"use client";

import { useSyncExternalStore } from "react";
import { newsSeed } from "@/content/news.seed";
import type { NewsArticle, NewsCategory, NewsStatus } from "@/lib/types";

/**
 * Browser-side News store (localStorage). This powers the working CMS demo.
 * In production this layer is replaced by Supabase (see supabase/migrations).
 *
 * SSR-safety: getServerSnapshot returns the static seed so the server render
 * and the first client render match; localStorage is merged in after mount.
 */

const KEY = "chiro:news:v1";
const SERVER_SNAPSHOT: NewsArticle[] = newsSeed;

let cache: NewsArticle[] | null = null;
const listeners = new Set<() => void>();

function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v));
}

function read(): NewsArticle[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as NewsArticle[]) : null;
  } catch {
    return null;
  }
}

function write(list: NewsArticle[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* ignore quota / privacy-mode errors */
  }
}

function ensure(): NewsArticle[] {
  if (cache) return cache;
  const stored = read();
  cache = stored ?? clone(newsSeed);
  return cache;
}

function commit(next: NewsArticle[]) {
  cache = next;
  write(next);
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): NewsArticle[] {
  return ensure();
}

function getServerSnapshot(): NewsArticle[] {
  return SERVER_SNAPSHOT;
}

function nowIso(): string {
  return new Date().toISOString();
}

function slugify(input: string): string {
  const base = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return base || "post-" + Math.random().toString(36).slice(2, 7);
}

export interface NewsDraftInput {
  slug?: string;
  title: NewsArticle["title"];
  content: NewsArticle["content"];
  category: NewsCategory;
  thumbnailUrl?: string | null;
  status: NewsStatus;
  publishedAt?: string;
}

export const newsStore = {
  subscribe,
  getSnapshot,
  getServerSnapshot,

  all(): NewsArticle[] {
    return ensure();
  },

  create(input: NewsDraftInput): NewsArticle {
    const list = ensure();
    const id = "post-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    let slug = slugify(input.slug || input.title.en || input.title.ja || id);
    // ensure unique slug
    if (list.some((a) => a.slug === slug)) slug = `${slug}-${Date.now().toString(36).slice(-4)}`;
    const article: NewsArticle = {
      id,
      slug,
      title: input.title,
      content: input.content,
      category: input.category,
      thumbnailUrl: input.thumbnailUrl ?? null,
      status: input.status,
      publishedAt: input.publishedAt || nowIso(),
      createdAt: nowIso(),
      updatedAt: nowIso()
    };
    commit([article, ...list]);
    return article;
  },

  update(id: string, input: NewsDraftInput): void {
    const list = ensure();
    const next = list.map((a) =>
      a.id === id
        ? {
            ...a,
            slug: input.slug ? slugify(input.slug) : a.slug,
            title: input.title,
            content: input.content,
            category: input.category,
            thumbnailUrl: input.thumbnailUrl ?? null,
            status: input.status,
            publishedAt: input.publishedAt || a.publishedAt,
            updatedAt: nowIso()
          }
        : a
    );
    commit(next);
  },

  remove(id: string): void {
    const list = ensure();
    commit(list.filter((a) => a.id !== id));
  },

  reset(): void {
    commit(clone(newsSeed));
  }
};

/** Sort helper: newest published first. */
export function sortByPublished(list: NewsArticle[]): NewsArticle[] {
  return [...list].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function publishedOnly(list: NewsArticle[]): NewsArticle[] {
  return sortByPublished(list.filter((a) => a.status === "published"));
}

/** Hook: full list (admin). */
export function useAllNews(): NewsArticle[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Hook: published + sorted (public site). */
export function usePublishedNews(): NewsArticle[] {
  const list = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return publishedOnly(list);
}
