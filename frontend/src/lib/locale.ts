import type { Lang } from "@/types";

/**
 * Locale configuration — the single source of truth for the language switcher.
 *
 * The menu content itself is translated in the database (see `lib/queries` and
 * `services/menu-adapter`); this module only describes the locales we expose in
 * the UI (their display names and text direction) plus a couple of tiny helpers
 * shared by both server and client code. Keep it free of server-only imports
 * (`next/headers`) so client components can import it too.
 */

export const LOCALE_COOKIE = "lang";
export const DEFAULT_LOCALE: Lang = "en";

export interface LocaleMeta {
  code: Lang;
  /** English label (for aria / tooltips). */
  label: string;
  /** Endonym — the language's own name, shown in the switcher. */
  native: string;
  dir: "ltr" | "rtl";
}

/** Order here is the order shown in the switcher; English first (the default). */
export const LOCALES: LocaleMeta[] = [
  { code: "en", label: "English", native: "English", dir: "ltr" },
  { code: "ar", label: "Arabic", native: "العربية", dir: "rtl" },
  { code: "ku", label: "Kurdish", native: "کوردی", dir: "rtl" },
];

export const SUPPORTED_LOCALES: Lang[] = LOCALES.map((l) => l.code);

export function isLocale(value: string | undefined | null): value is Lang {
  return !!value && SUPPORTED_LOCALES.includes(value as Lang);
}

export function localeMeta(code: Lang): LocaleMeta {
  return LOCALES.find((l) => l.code === code) ?? LOCALES[0];
}

export function localeDir(code: Lang): "ltr" | "rtl" {
  return localeMeta(code).dir;
}
