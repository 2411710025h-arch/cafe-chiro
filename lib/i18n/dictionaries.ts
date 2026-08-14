import ja, { type Dictionary } from "@/messages/ja";
import en from "@/messages/en";
import ko from "@/messages/ko";
import type { Locale } from "./config";

const dictionaries: Record<Locale, Dictionary> = { ja, en, ko };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
