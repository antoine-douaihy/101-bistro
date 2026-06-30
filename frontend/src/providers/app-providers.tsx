"use client";

import type { Category } from "@/types/menu";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProductModalProvider } from "./product-modal-provider";

/** Composes all client-side providers around the app. */
export function AppProviders({
  categories,
  children,
}: {
  categories: Category[];
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider delayDuration={200} skipDelayDuration={300}>
        <ProductModalProvider categories={categories}>
          {children}
        </ProductModalProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
