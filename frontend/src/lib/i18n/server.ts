import { cache } from "react";
import { getLocale } from "@/lib/locale-server";
import { localeDir } from "@/lib/locale";
import { getMessages, type Messages } from "./messages";

/**
 * Server-side i18n accessor for Server Components (hero, sections, footer, menu
 * page). Mirrors the client `useI18n()` shape. Cached per request so repeated
 * calls within one render don't re-read the cookie.
 */
export const getServerI18n = cache(async (): Promise<{
  locale: Awaited<ReturnType<typeof getLocale>>;
  dir: "ltr" | "rtl";
  m: Messages;
}> => {
  const locale = await getLocale();
  return { locale, dir: localeDir(locale), m: getMessages(locale) };
});
