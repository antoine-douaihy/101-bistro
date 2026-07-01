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
import { cn } from "@/lib/utils";

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
 * Renders a Google Material Symbols icon by name (via the
 * `material-symbols-outlined` font). Glyph size follows the `font-size` set by
 * the class name, so pass a `text-*` utility alongside any `size-*`/color
 * classes. Falls back to a Lucide icon when no name is provided.
 */
export function MaterialIcon({ name, className, fallback = Utensils }: IconProps) {
  if (!name) {
    const Cmp = fallback;
    return <Cmp className={className} aria-hidden />;
  }
  return (
    <span className={cn("material-symbols-outlined", className)} aria-hidden>
      {name}
    </span>
  );
}
