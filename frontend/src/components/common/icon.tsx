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
