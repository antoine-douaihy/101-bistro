"use client";

import * as React from "react";
import { UtensilsCrossed, X } from "lucide-react";
import type { Category, MenuFilterState, Product } from "@/types/menu";
import { BADGE_META } from "@/constants/menu";
import { useMenuFilters } from "@/hooks/use-menu-filters";
import { useI18n } from "@/components/i18n/locale-provider";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/common/icon";
import { CategoryNav } from "./category-nav";
import { MenuToolbar } from "./menu-toolbar";
import { ProductGrid } from "./product-grid";
import { FilterSheet } from "./filter-sheet";
import { EmptyState } from "./empty-state";

interface MenuBrowserProps {
  products: Product[];
  categories: Category[];
  initial?: Partial<MenuFilterState>;
}

export function MenuBrowser({
  products,
  categories,
  initial,
}: MenuBrowserProps) {
  const { m } = useI18n();
  const topLevel = React.useMemo(
    () =>
      categories
        .filter((c) => !c.parentId)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [categories]
  );

  const {
    filters,
    results,
    activeFilterCount,
    isSearching,
    setQuery,
    setCategory,
    setSort,
    toggleBadge,
    setAvailableOnly,
    resetAll,
  } = useMenuFilters({
    products,
    categories,
    initial,
  });

  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const [view, setView] = React.useState<"card" | "row">("card");

  // Resolve the active top-level category to highlight its pill in the rail.
  const activeRootId = React.useMemo(() => {
    if (!filters.categoryId) return null;
    const active = categories.find((c) => c.id === filters.categoryId);
    return active?.parentId ?? active?.id ?? null;
  }, [filters.categoryId, categories]);

  return (
    <>
      {/* Sticky controls */}
      <div className="sticky top-16 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <Container width="wide" className="space-y-3 py-3">
          <CategoryNav
            categories={topLevel}
            activeId={activeRootId}
            onSelect={setCategory}
            allLabel={m.menu.all}
          />
          <MenuToolbar
            query={filters.query}
            onQueryChange={setQuery}
            sort={filters.sort}
            onSortChange={setSort}
            view={view}
            onViewChange={setView}
            onOpenFilters={() => setFiltersOpen(true)}
            activeFilterCount={activeFilterCount}
            resultCount={results.length}
          />
        </Container>
      </div>

      {/* Results */}
      <Container width="wide" className="py-6 sm:py-8">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold tabular-nums text-foreground">
              {results.length}
            </span>{" "}
            {isSearching ? m.menu.results : m.menu.dishes}
            {isSearching && filters.query && (
              <>
                {" "}
                {m.menu.resultsFor}{" "}
                <span className="font-medium text-foreground">
                  “{filters.query}”
                </span>
              </>
            )}
          </p>

          {/* Active badge chips */}
          {filters.badges.map((badge) => (
            <button
              key={badge}
              type="button"
              onClick={() => toggleBadge(badge)}
              className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/15"
            >
              <Icon name={BADGE_META[badge].icon} className="size-3" />
              {m.badges[badge]}
              <X className="size-3" />
            </button>
          ))}

          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={resetAll}
              className="text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              {m.menu.clearAll}
            </button>
          )}
        </div>

        {results.length > 0 ? (
          <ProductGrid
            products={results}
            categories={categories}
            variant={view}
            priorityCount={view === "card" ? 4 : 0}
          />
        ) : (
          <EmptyState
            icon={UtensilsCrossed}
            title={m.menu.emptyTitle}
            description={m.menu.emptyDescription}
            action={
              <Button onClick={resetAll} variant="outline">
                {m.menu.clearFilters}
              </Button>
            }
          />
        )}
      </Container>

      <FilterSheet
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
        filters={filters}
        resultCount={results.length}
        activeFilterCount={activeFilterCount}
        onToggleBadge={toggleBadge}
        onSetSort={setSort}
        onSetAvailableOnly={setAvailableOnly}
        onResetAll={resetAll}
      />
    </>
  );
}
