import { cache } from "react";
import type {
  Category,
  CategoryWithChildren,
  MenuFilterState,
  MenuQueryResult,
  Product,
} from "@/types/menu";
import { getMenuData } from "@/lib/queries";
import {
  applyMenuFilters,
  buildCategoryTree,
  DEFAULT_FILTERS,
} from "@/data/menu-utils";
import { mapMenus, type MappedMenu } from "./menu-adapter";

/**
 * The Menu Service is the ONLY data module the UI imports. It fetches the live
 * menu via the backend's `getMenuData()` and maps it into the design's domain
 * types (see `menu-adapter`). Components never touch the database directly.
 *
 * `loadMenu` is wrapped in React `cache()` so a single request renders from one
 * DB round-trip, and it degrades gracefully (empty catalogue) if the database
 * is unreachable or env vars are missing — which also keeps `next build` safe.
 */
const loadMenu = cache(async (): Promise<MappedMenu> => {
  try {
    const menus = await getMenuData();
    return mapMenus(menus);
  } catch (error) {
    console.error(
      "[menu-service] getMenuData() failed — serving an empty menu.",
      error
    );
    return { categories: [], products: [] };
  }
});

/* ------------------------------------------------------------------ */
/*  Categories                                                         */
/* ------------------------------------------------------------------ */
export async function getCategories(): Promise<Category[]> {
  const { categories } = await loadMenu();
  return categories;
}

export async function getCategoryTree(): Promise<CategoryWithChildren[]> {
  const { categories } = await loadMenu();
  return buildCategoryTree(categories);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { categories } = await loadMenu();
  return categories.find((c) => c.slug === slug || c.id === slug) ?? null;
}

/* ------------------------------------------------------------------ */
/*  Products                                                           */
/* ------------------------------------------------------------------ */
export async function getProducts(
  filters: Partial<MenuFilterState> = {}
): Promise<MenuQueryResult> {
  const { products, categories } = await loadMenu();
  const merged: MenuFilterState = { ...DEFAULT_FILTERS, ...filters };
  const items = applyMenuFilters(products, categories, merged);
  return { items, total: items.length };
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { products } = await loadMenu();
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const { products } = await loadMenu();
  return products.find((p) => p.id === id) ?? null;
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const { products } = await loadMenu();
  // The backend has no "featured" flag yet, so surface available items that
  // have imagery first, then fall back to any available item.
  const available = products.filter((p) => p.availability !== "sold-out");
  const withImages = available.filter((p) => p.image);
  return (withImages.length >= limit ? withImages : available).slice(0, limit);
}

/* ------------------------------------------------------------------ */
/*  Stats                                                              */
/* ------------------------------------------------------------------ */
export async function getCatalogueStats(): Promise<{
  productCount: number;
  categoryCount: number;
}> {
  const { products, categories } = await loadMenu();
  return {
    productCount: products.length,
    categoryCount: categories.filter((c) => !c.parentId).length,
  };
}
