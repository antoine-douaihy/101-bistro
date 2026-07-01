"use client";

import { motion } from "framer-motion";
import type { Category, Product } from "@/types/menu";
import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";

interface ProductGridProps {
  products: Product[];
  categories: Category[];
  variant?: "card" | "row";
  className?: string;
  /** Prioritise images for the first N cards (above the fold). */
  priorityCount?: number;
}

/**
 * Responsive, virtualisation-friendly product grid. Resolves each product's
 * category icon for the image placeholder. Built to render hundreds of items.
 */
export function ProductGrid({
  products,
  categories,
  variant = "card",
  className,
  priorityCount = 0,
}: ProductGridProps) {
  const iconFor = (categoryId: string) =>
    categories.find((c) => c.id === categoryId)?.icon;

  return (
    <div
      className={cn(
        variant === "card"
          ? "grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
          : "flex flex-col gap-0.5",
        className
      )}
    >
      {products.map((product, i) => (
        <motion.div
          key={product.id}
          layout="position"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.35,
            delay: Math.min(i, 8) * 0.025,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <ProductCard
            product={product}
            iconName={iconFor(product.categoryId)}
            variant={variant}
            priority={i < priorityCount}
          />
        </motion.div>
      ))}
    </div>
  );
}
