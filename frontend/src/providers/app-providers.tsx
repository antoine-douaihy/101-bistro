"use client";

import type { Category } from "@/types/menu";
import type { Lang } from "@/types";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LocaleProvider } from "@/components/i18n/locale-provider";
import { ProductModalProvider } from "./product-modal-provider";

/** Composes all client-side providers around the app. */
export function AppProviders({
  categories,
  locale,
  children,
}: {
  categories: Category[];
  locale: Lang;
  children: React.ReactNode;
}) {
  return (
    <LocaleProvider locale={locale}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        storageKey="theme-101bistro"
        disableTransitionOnChange
      >
        <TooltipProvider delayDuration={200} skipDelayDuration={300}>
          <ProductModalProvider categories={categories}>
            {children}
          </ProductModalProvider>
        </TooltipProvider>
      </ThemeProvider>
    </LocaleProvider>
  );
}
