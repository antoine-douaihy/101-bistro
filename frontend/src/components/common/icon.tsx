import {
  Beef,
  ChefHat,
  Coffee,
  CookingPot,
  CupSoda,
  Crown,
  Fish,
  Flame,
  IceCreamCone,
  Leaf,
  Pizza,
  Salad,
  Sandwich,
  Soup,
  Sparkles,
  Sprout,
  Utensils,
  UtensilsCrossed,
  Vegan,
  Wheat,
  type LucideIcon,
} from "lucide-react";
import { MATERIAL_SYMBOL_PATHS } from "@/lib/material-symbol-paths";

/**
 * Curated icon registry for data-driven names (categories & badges). Explicit
 * map keeps the bundle tree-shaken — no `import * as Icons`.
 */
const REGISTRY: Record<string, LucideIcon> = {
  UtensilsCrossed,
  Utensils,
  Salad,
  Soup,
  Pizza,
  CookingPot,
  Beef,
  Sandwich,
  Fish,
  ChefHat,
  IceCreamCone,
  CupSoda,
  Coffee,
  Crown,
  Sparkles,
  Flame,
  Leaf,
  Sprout,
  Vegan,
  Wheat,
};

interface IconProps {
  name?: string;
  className?: string;
  fallback?: LucideIcon;
}

/** Resolve a Lucide icon by name with a sensible fallback. */
export function Icon({ name, className, fallback = Utensils }: IconProps) {
  const Cmp = (name && REGISTRY[name]) || fallback;
  return <Cmp className={className} aria-hidden />;
}

export function getIcon(name?: string): LucideIcon {
  return (name && REGISTRY[name]) || Utensils;
}

/**
 * Renders a Material Symbols icon by name as an inline SVG (paths are bundled —
 * no web font, so icons paint instantly with the HTML). Size comes from `size-*`
 * classes; color follows the text color via `currentColor`. Falls back to a
 * Lucide icon when the name is missing or unknown.
 */
export function MaterialIcon({ name, className, fallback = Utensils }: IconProps) {
  const path = name ? MATERIAL_SYMBOL_PATHS[name] : undefined;
  if (!path) {
    const Cmp = fallback;
    return <Cmp className={className} aria-hidden />;
  }
  return (
    <svg
      viewBox="0 -960 960 960"
      className={className}
      fill="currentColor"
      aria-hidden
      dangerouslySetInnerHTML={{ __html: path }}
    />
  );
}
