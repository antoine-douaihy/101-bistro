"use client";

import * as React from "react";
import type { Lang } from "@/types";
import { localeDir } from "@/lib/locale";
import { getMessages, type Messages } from "@/lib/i18n/messages";

interface I18nValue {
  locale: Lang;
  dir: "ltr" | "rtl";
  /** The resolved message dictionary for the active locale. */
  m: Messages;
}

const I18nContext = React.createContext<I18nValue>({
  locale: "en",
  dir: "ltr",
  m: getMessages("en"),
});

/**
 * Provides the active locale + UI message dictionary to client components. The
 * `locale` prop is resolved on the server (from the `lang` cookie) and passed
 * down, so the client renders the correct language with no hydration mismatch.
 */
export function LocaleProvider({
  locale,
  children,
}: {
  locale: Lang;
  children: React.ReactNode;
}) {
  const value = React.useMemo<I18nValue>(
    () => ({ locale, dir: localeDir(locale), m: getMessages(locale) }),
    [locale]
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/** Access the active locale, direction, and message dictionary. */
export function useI18n() {
  return React.useContext(I18nContext);
}
