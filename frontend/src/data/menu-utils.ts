import type {
  Category,
  CategoryWithChildren,
  MenuFilterState,
  Product,
  SortKey,
} from "@/types/menu";

/**
 * Pure, framework-agnostic selectors over the menu domain.
 *
 * These mirror the operations a search/catalogue API would perform server-side.
 * Today they run client-side over mock data; tomorrow the same filter shape is
 * forwarded to the backend and these become a thin fallback. Keeping them pure
 * makes them trivial to unit-test.
 */

/** Build a nested tree from a flat category list. */
export function buildCategoryTree(categories: Category[]): CategoryWithChildren[] {
  const byId = new Map<string, CategoryWithChildren>();
  categories.forEach((c) => byId.set(c.id, { ...c, children: [] }));

  const roots: CategoryWithChildren[] = [];
  byId.forEach((node) => {
    if (node.parentId && byId.has(node.parentId)) {
      byId.get(node.parentId)!.children!.push(node);
    } else {
      roots.push(node);
    }
  });

  const sortByOrder = (a: Category, b: Category) =>
    (a.order ?? 0) - (b.order ?? 0);
  roots.sort(sortByOrder);
  roots.forEach((r) => r.children?.sort(sortByOrder));
  return roots;
}

/** All descendant category ids for a given category (inclusive). */
export function getDescendantCategoryIds(
  categoryId: string,
  categories: Category[]
): string[] {
  const ids = [categoryId];
  const children = categories.filter((c) => c.parentId === categoryId);
  children.forEach((child) => {
    ids.push(...getDescendantCategoryIds(child.id, categories));
  });
  return ids;
}

export function getProductsForCategory(
  products: Product[],
  categoryId: string | null,
  categories: Category[]
): Product[] {
  if (!categoryId) return products;
  const ids = new Set(getDescendantCategoryIds(categoryId, categories));
  return products.filter((p) => ids.has(p.categoryId));
}

/** Lightweight relevance scoring for client-side search. */
function searchScore(product: Product, query: string): number {
  const q = query.trim().toLowerCase();
  if (!q) return 1;
  const name = product.name.toLowerCase();
  const desc = (product.shortDescription ?? "").toLowerCase();
  const tags = (product.tags ?? []).join(" ").toLowerCase();

  if (name === q) return 100;
  if (name.startsWith(q)) return 80;
  if (name.includes(q)) return 60;
  if (tags.includes(q)) return 40;
  if (desc.includes(q)) return 20;
  // token match
  const tokens = q.split(/\s+/);
  if (tokens.every((t) => `${name} ${desc} ${tags}`.includes(t))) return 10;
  return 0;
}

export function searchProducts(products: Product[], query: string): Product[] {
  if (!query.trim()) return products;
  return products
    .map((p) => ({ p, score: searchScore(p, query) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p);
}

export function sortProducts(products: Product[], sort: SortKey): Product[] {
  const list = [...products];
  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    case "name-asc":
      return list.sort((a, b) => a.name.localeCompare(b.name));
    case "popular":
      return list.sort((a, b) => (b.ratingCount ?? 0) - (a.ratingCount ?? 0));
    case "recommended":
    default:
      return list.sort((a, b) => {
        const fa = a.isFeatured ? 1 : 0;
        const fb = b.isFeatured ? 1 : 0;
        if (fb !== fa) return fb - fa;
        return (b.rating ?? 0) - (a.rating ?? 0);
      });
  }
}

/** Apply the full filter pipeline used by the menu page. */
export function applyMenuFilters(
  products: Product[],
  categories: Category[],
  filters: MenuFilterState
): Product[] {
  let result = getProductsForCategory(products, filters.categoryId, categories);

  if (filters.availableOnly) {
    result = result.filter((p) => p.availability !== "sold-out");
  }

  if (filters.badges.length) {
    result = result.filter((p) =>
      filters.badges.every((b) => p.badges?.includes(b))
    );
  }

  if (filters.tags.length) {
    result = result.filter((p) =>
      filters.tags.every((t) => p.tags?.includes(t))
    );
  }

  if (filters.query.trim()) {
    result = searchProducts(result, filters.query);
    // search already orders by relevance unless a sort is explicitly chosen
    if (filters.sort !== "recommended") result = sortProducts(result, filters.sort);
    return result;
  }

  return sortProducts(result, filters.sort);
}

export const DEFAULT_FILTERS: MenuFilterState = {
  query: "",
  categoryId: null,
  badges: [],
  tags: [],
  availableOnly: false,
  sort: "recommended",
};

export function countActiveFilters(filters: MenuFilterState): number {
  return (
    filters.badges.length +
    filters.tags.length +
    (filters.availableOnly ? 1 : 0) +
    (filters.sort !== "recommended" ? 1 : 0)
  );
}
