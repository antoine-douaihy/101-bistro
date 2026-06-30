/**
 * 101 Bistro — Menu domain model.
 *
 * These types are the contract the UI is built against. When the backend /
 * CMS lands, the service layer (src/services) maps API responses into these
 * shapes, so components never change.
 *
 * Designed to scale to 400+ items, nested categories, variations, options,
 * availability, badges, search & filtering, and future multilingual support.
 */

/** Supported locales (future multilingual). */
export type Locale = "en" | "ar" | "fr";

/**
 * A user-facing string. Today it is a plain string; when translations are
 * added this alias becomes `string | Partial<Record<Locale, string>>` and a
 * single `t()` resolver handles the rest — no component churn.
 */
export type LocalizedText = string;

export type Currency = "USD" | "EUR" | "LBP";

export interface Money {
  amount: number;
  currency: Currency;
}

/** Dietary / merchandising labels shown as pills on cards. */
export type ProductBadge =
  | "signature"
  | "new"
  | "popular"
  | "chef-special"
  | "seasonal"
  | "spicy"
  | "vegetarian"
  | "vegan"
  | "gluten-free";

export type AvailabilityStatus =
  | "available"
  | "limited"
  | "sold-out"
  | "coming-soon";

export type SpiceLevel = 0 | 1 | 2 | 3;

export interface ProductImage {
  src: string;
  alt: LocalizedText;
  width?: number;
  height?: number;
  /** Tiny base64 placeholder for next/image blur. */
  blurDataURL?: string;
}

/** A discrete priced variant, e.g. Small / Large, 30cm / 40cm. */
export interface ProductVariation {
  id: string;
  label: LocalizedText;
  price: number;
  available?: boolean;
  sku?: string;
}

/** A single selectable choice inside an option group. */
export interface ProductOptionChoice {
  id: string;
  label: LocalizedText;
  priceDelta?: number;
  isDefault?: boolean;
  available?: boolean;
}

/** A configurable group, e.g. "Add-ons", "Cooking preference". */
export interface ProductOptionGroup {
  id: string;
  label: LocalizedText;
  type: "single" | "multiple";
  required?: boolean;
  min?: number;
  max?: number;
  choices: ProductOptionChoice[];
}

export interface NutritionInfo {
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

export interface Product {
  id: string;
  slug: string;
  name: LocalizedText;
  shortDescription?: LocalizedText;
  description?: LocalizedText;

  categoryId: string;

  /** Base price, in major currency units. */
  price: number;
  currency: Currency;
  /** Original price for showing a strikethrough discount. */
  compareAtPrice?: number;

  image?: ProductImage;
  gallery?: ProductImage[];

  badges?: ProductBadge[];
  /** Free-form search/dietary tags. */
  tags?: string[];

  availability: AvailabilityStatus;
  isFeatured?: boolean;

  variations?: ProductVariation[];
  options?: ProductOptionGroup[];

  nutrition?: NutritionInfo;
  allergens?: string[];
  spiceLevel?: SpiceLevel;
  preparationTime?: number;

  rating?: number;
  ratingCount?: number;

  /** Manual ordering within a category. */
  order?: number;
}

export interface Category {
  id: string;
  slug: string;
  name: LocalizedText;
  description?: LocalizedText;
  /** Lucide icon name, resolved at render time. */
  icon?: string;
  image?: ProductImage;
  /** Null/undefined for top-level; set for nested categories. */
  parentId?: string | null;
  order?: number;
  isFeatured?: boolean;
  /** Denormalised count from the backend for fast UI. */
  itemCount?: number;
}

export interface CategoryWithChildren extends Category {
  children?: CategoryWithChildren[];
}

/* ----------------------------- Search / filter ---------------------------- */

export type SortKey =
  | "recommended"
  | "popular"
  | "price-asc"
  | "price-desc"
  | "name-asc";

export interface MenuFilterState {
  query: string;
  categoryId: string | null;
  badges: ProductBadge[];
  tags: string[];
  availableOnly: boolean;
  sort: SortKey;
}

export interface MenuQueryResult {
  items: Product[];
  total: number;
}

/* ------------------------------- UI helpers ------------------------------- */

/** Generic async UI state for any data-fetching surface. */
export type AsyncStatus = "idle" | "loading" | "success" | "error" | "empty";

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface OpeningHours {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
}
