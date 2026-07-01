import { cookies } from "next/headers";
import type { Lang } from "@/types";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale } from "./locale";

/**
 * Resolves the active locale for the current request from the `lang` cookie,
 * falling back to the default (English). Server-only — it reads `next/headers`,
 * so never import this from a client component (use `lib/locale` there instead).
 */
export async function getLocale(): Promise<Lang> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : DEFAULT_LOCALE;
}
