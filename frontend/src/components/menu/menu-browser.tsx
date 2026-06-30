"use client";

import * as React from "react";
import { UtensilsCrossed, X } from "lucide-react";
import type { Category, MenuFilterState, Product } from "@/types/menu";
import { BADGE_META } from "@/constants/menu";
import { useMenuFilters } from "@/hooks/use-menu-filters";
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

  // Resolve the active top-level category to optionally show a sub-rail.
  const activeRootId = React.useMemo(() => {
    if (!filters.categoryId) return null;
    const active = categories.find((c) => c.id === filters.categoryId);
    return active?.parentId ?? active?.id ?? null;
  }, [filters.categoryId, categories]);

  const subCategories = React.useMemo(
    () =>
      categories
        .filter((c) => c.parentId === activeRootId)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [categories, activeRootId]
  );

  return (
    <>
      {/* Sticky controls */}
      <div className="sticky top-16 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <Container width="wide" className="space-y-3 py-3">
          <CategoryNav
            categories={topLevel}
            activeId={activeRootId}
            onSelect={setCategory}
          />
          {subCategories.length > 0 && (
            <CategoryNav
              categories={subCategories}
              activeId={filters.categoryId}
              onSelect={(id) => setCategory(id ?? activeRootId)}
              includeAll
              allLabel="All in section"
              className="opacity-90"
            />
          )}
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
            {isSearching ? "results" : "dishes"}
            {isSearching && filters.query && (
              <>
                {" "}
                for{" "}
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
              {BADGE_META[badge].label}
              <X className="size-3" />
            </button>
          ))}

          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={resetAll}
              className="text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Clear all
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
            title="No dishes match your search"
            description="Try a different keyword, remove a filter, or browse another category. Our full menu has plenty to discover."
            action={
              <Button onClick={resetAll} variant="outline">
                Clear filters
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
