"use client";

import { useCallback, useMemo, useState } from "react";
import type {
  Category,
  MenuFilterState,
  Product,
  ProductBadge,
  SortKey,
} from "@/types/menu";
import {
  applyMenuFilters,
  countActiveFilters,
  DEFAULT_FILTERS,
} from "@/data/menu-utils";
import { useDebouncedValue } from "./use-debounced-value";

interface UseMenuFiltersArgs {
  products: Product[];
  categories: Category[];
  initial?: Partial<MenuFilterState>;
}

/**
 * Owns all menu browsing state (search, category, badges, sort) and derives the
 * filtered product list. Filtering currently runs client-side over the provided
 * data; when a search API exists, swap the `results` memo for a service call
 * keyed on the same `filters` object.
 */
export function useMenuFilters({
  products,
  categories,
  initial,
}: UseMenuFiltersArgs) {
  const [filters, setFilters] = useState<MenuFilterState>({
    ...DEFAULT_FILTERS,
    ...initial,
  });

  const debouncedQuery = useDebouncedValue(filters.query, 200);

  const results = useMemo(
    () =>
      applyMenuFilters(products, categories, {
        ...filters,
        query: debouncedQuery,
      }),
    [products, categories, filters, debouncedQuery]
  );

  const setQuery = useCallback(
    (query: string) => setFilters((f) => ({ ...f, query })),
    []
  );

  const setCategory = useCallback(
    (categoryId: string | null) =>
      setFilters((f) => ({ ...f, categoryId })),
    []
  );

  const setSort = useCallback(
    (sort: SortKey) => setFilters((f) => ({ ...f, sort })),
    []
  );

  const toggleBadge = useCallback((badge: ProductBadge) => {
    setFilters((f) => ({
      ...f,
      badges: f.badges.includes(badge)
        ? f.badges.filter((b) => b !== badge)
        : [...f.badges, badge],
    }));
  }, []);

  const toggleTag = useCallback((tag: string) => {
    setFilters((f) => ({
      ...f,
      tags: f.tags.includes(tag)
        ? f.tags.filter((t) => t !== tag)
        : [...f.tags, tag],
    }));
  }, []);

  const setAvailableOnly = useCallback(
    (availableOnly: boolean) =>
      setFilters((f) => ({ ...f, availableOnly })),
    []
  );

  const reset = useCallback(
    () => setFilters((f) => ({ ...DEFAULT_FILTERS, categoryId: f.categoryId })),
    []
  );

  const resetAll = useCallback(() => setFilters(DEFAULT_FILTERS), []);

  const activeFilterCount = useMemo(
    () => countActiveFilters(filters),
    [filters]
  );

  return {
    filters,
    results,
    activeFilterCount,
    isSearching: filters.query.trim().length > 0,
    setQuery,
    setCategory,
    setSort,
    toggleBadge,
    toggleTag,
    setAvailableOnly,
    reset,
    resetAll,
  };
}
