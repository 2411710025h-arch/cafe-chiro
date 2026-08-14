import type { Locale } from "./i18n/config";

export type Localized = Record<Locale, string>;

export type NewsCategory = "NEWS" | "EVENT" | "MENU" | "CATS";
export type NewsStatus = "draft" | "published";

export interface NewsArticle {
  id: string;
  slug: string;
  title: Localized;
  content: Localized;
  category: NewsCategory;
  thumbnailUrl?: string | null;
  status: NewsStatus;
  publishedAt: string; // ISO date-time
  createdAt: string;
  updatedAt: string;
}

export interface Reservation {
  id: string;
  code: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  duration: number; // minutes: 60 | 90 | 120
  partySize: number;
  name: string;
  email: string;
  phone: string;
  note?: string;
  createdAt: string; // ISO
}

export const NEWS_CATEGORIES: NewsCategory[] = ["NEWS", "EVENT", "MENU", "CATS"];
