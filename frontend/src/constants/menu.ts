import type { ProductBadge, SortKey } from "@/types/menu";

/**
 * Presentation metadata for badges, sorting, and dietary filters.
 * Pure config — drives the filter & toolbar UI with no hardcoded markup.
 */

export interface BadgeMeta {
  label: string;
  /** Lucide icon name. */
  icon: string;
  tone: "brand" | "neutral" | "success" | "spice" | "accent";
}

export const BADGE_META: Record<ProductBadge, BadgeMeta> = {
  signature: { label: "Signature", icon: "Crown", tone: "brand" },
  new: { label: "New", icon: "Sparkles", tone: "accent" },
  popular: { label: "Popular", icon: "Flame", tone: "brand" },
  "chef-special": { label: "Chef's Special", icon: "ChefHat", tone: "accent" },
  seasonal: { label: "Seasonal", icon: "Leaf", tone: "success" },
  spicy: { label: "Spicy", icon: "Flame", tone: "spice" },
  vegetarian: { label: "Vegetarian", icon: "Sprout", tone: "success" },
  vegan: { label: "Vegan", icon: "Vegan", tone: "success" },
  "gluten-free": { label: "Gluten-Free", icon: "Wheat", tone: "neutral" },
};

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "popular", label: "Most popular" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name-asc", label: "Name: A–Z" },
];

/** Dietary filters surface a curated subset of badges. */
export const DIETARY_FILTERS: ProductBadge[] = [
  "vegetarian",
  "vegan",
  "gluten-free",
  "spicy",
];

/** Merchandising filters. */
export const HIGHLIGHT_FILTERS: ProductBadge[] = [
  "signature",
  "popular",
  "new",
  "chef-special",
  "seasonal",
];

export const AVAILABILITY_META = {
  available: { label: "Available", tone: "success" as const },
  limited: { label: "Limited", tone: "warning" as const },
  "sold-out": { label: "Sold out", tone: "muted" as const },
  "coming-soon": { label: "Coming soon", tone: "accent" as const },
};

export const SPICE_LABELS = ["Mild", "Medium", "Hot", "Fiery"] as const;
