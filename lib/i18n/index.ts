import { en } from "./en";
import { zh } from "./zh";
export const dictionaries = { en, zh };
export type Locale = "en" | "zh";
export function getDict(lang: string) {
  return dictionaries[lang as Locale] ?? dictionaries.en;
}
