import type {
  Menu,
  Category as DbCategory,
  Product as DbProduct,
  Lang,
} from "@/types";
import type {
  Category,
  Currency,
  Product,
  ProductVariation,
} from "@/types/menu";
import { slugify } from "@/lib/format";

/**
 * Adapter: backend (Supabase) shape  ->  design/component shape.
 *
 * The backend serves multilingual menus (`getMenuData(): Menu[]`) with numeric
 * ids and `translations.{en,ar,ku}`. The design components are built against the
 * flat domain model in `@/types/menu`. This module is the single translation
 * point between the two, so neither side has to know about the other.
 *
 * To change the displayed language or currency, edit the two constants below.
 */
const LOCALE: Lang = "en";
const MENU_CURRENCY: Currency = "USD";

type Translatable = Partial<Record<Lang, { name?: string; description?: string }>>;

function pick(
  translations: Translatable | undefined,
  field: "name" | "description"
): string | undefined {
  if (!translations) return undefined;
  return (
    translations[LOCALE]?.[field] ??
    translations.en?.[field] ??
    Object.values(translations)[0]?.[field]
  );
}

export function mapProduct(p: DbProduct): Product {
  const name = pick(p.translations, "name") ?? `Item ${p.id}`;
  const description = pick(p.translations, "description");

  const variations: ProductVariation[] | undefined = p.variants?.length
    ? p.variants.map((v) => ({
        id: String(v.id),
        label: pick(v.translations, "name") ?? "Option",
        price: v.price ?? 0,
        available: v.status,
      }))
    : undefined;

  return {
    id: String(p.id),
    slug: `${slugify(name) || "item"}-${p.id}`,
    name,
    description,
    shortDescription: description,
    categoryId: String(p.category_id),
    price: p.price ?? variations?.[0]?.price ?? 0,
    currency: MENU_CURRENCY,
    image:
      p.image || p.image_medium
        ? { src: (p.image_medium ?? p.image)!, alt: name }
        : undefined,
    availability: p.status ? "available" : "sold-out",
    variations,
    nutrition: p.calorie ? { calories: p.calorie } : undefined,
    order: p.sort_order,
  };
}

export function mapCategory(c: DbCategory): Category {
  const name = pick(c.translations, "name") ?? `Category ${c.id}`;
  return {
    id: String(c.id),
    slug: `${slugify(name) || "category"}-${c.id}`,
    name,
    description: pick(c.translations, "description"),
    parentId: null,
    order: c.sort_order,
    itemCount: c.products?.length ?? 0,
    image: c.image ? { src: c.image, alt: name } : undefined,
  };
}

export interface MappedMenu {
  categories: Category[];
  products: Product[];
}

/** Flattens all active menus into a single category + product catalogue. */
export function mapMenus(menus: Menu[]): MappedMenu {
  const categories: Category[] = [];
  const products: Product[] = [];

  for (const menu of menus ?? []) {
    for (const category of menu.categories ?? []) {
      categories.push(mapCategory(category));
      for (const product of category.products ?? []) {
        products.push(mapProduct(product));
      }
    }
  }

  return { categories, products };
}
