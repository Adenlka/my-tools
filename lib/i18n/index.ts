import { en } from "./en";
import { zh } from "./zh";
import { ja } from "./ja";
export const dictionaries = { en, zh, ja };
export type Locale = "en" | "zh" | "ja";
export function getDict(lang: string) {
  return dictionaries[lang as Locale] ?? dictionaries.en;
}
