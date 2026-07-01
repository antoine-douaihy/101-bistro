"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import type { Category } from "@/types/menu";
import { Icon } from "@/components/common/icon";
import { useI18n } from "@/components/i18n/locale-provider";
import { SearchBar } from "./search-bar";

const POPULAR_SEARCHES = ["Truffle", "Vegan", "Pizza", "Grill", "Dessert", "Spicy"];

interface SearchOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
}

/**
 * Command-palette style search. UI only — submitting routes to /menu with a
 * shareable query string, which the menu page reads to seed its filters.
 */
export function SearchOverlay({
  open,
  onOpenChange,
  categories,
}: SearchOverlayProps) {
  const router = useRouter();
  const { m } = useI18n();
  const [query, setQuery] = React.useState("");

  const topLevel = categories
    .filter((c) => !c.parentId)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .slice(0, 8);

  function go(href: string) {
    onOpenChange(false);
    setQuery("");
    router.push(href);
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-oxblood/40 backdrop-blur-md"
              />
            </Dialog.Overlay>

            <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-[12vh]">
              <Dialog.Content asChild forceMount>
                <motion.div
                  initial={{ opacity: 0, y: -16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full max-w-xl overflow-hidden rounded-3xl border border-border/60 bg-card text-card-foreground shadow-pop"
                >
                  <VisuallyHidden asChild>
                    <Dialog.Title>{m.header.searchAria}</Dialog.Title>
                  </VisuallyHidden>

                  <div className="p-3 sm:p-4">
                    <SearchBar
                      value={query}
                      onChange={setQuery}
                      size="lg"
                      autoFocus
                      placeholder={m.search.overlayPlaceholder}
                      onSubmit={(v) =>
                        go(`/menu${v.trim() ? `?q=${encodeURIComponent(v.trim())}` : ""}`)
                      }
                    />
                  </div>

                  <div className="max-h-[55vh] overflow-y-auto border-t border-border/60 px-4 py-4">
                    <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      <TrendingUp className="size-3.5" /> {m.search.popular}
                    </p>
                    <div className="mb-6 flex flex-wrap gap-2">
                      {POPULAR_SEARCHES.map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => go(`/menu?q=${encodeURIComponent(term)}`)}
                          className="rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                        >
                          {term}
                        </button>
                      ))}
                    </div>

                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {m.search.browseByCategory}
                    </p>
                    <div className="grid gap-1">
                      {topLevel.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => go(`/menu?category=${c.slug}`)}
                          className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-start transition-colors hover:bg-accent"
                        >
                          <span className="grid size-9 place-items-center rounded-lg bg-surface-muted text-primary">
                            <Icon name={c.icon} className="size-4.5" />
                          </span>
                          <span className="flex-1 text-sm font-medium">
                            {c.name}
                          </span>
                          {c.itemCount != null && (
                            <span className="text-xs tabular-nums text-muted-foreground">
                              {c.itemCount}
                            </span>
                          )}
                          <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
