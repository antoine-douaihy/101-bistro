"use client";

import * as React from "react";
import type { Category, Product } from "@/types/menu";
import { ProductDetailModal } from "@/components/menu/product-detail-modal";

interface ProductModalContextValue {
  openProduct: (product: Product) => void;
  closeProduct: () => void;
}

const ProductModalContext = React.createContext<ProductModalContextValue | null>(
  null
);

/**
 * Single app-wide product detail modal. Any ProductCard — on the home page or
 * the menu — calls `openProduct` to surface it, keeping one modal instance and
 * consistent transitions everywhere.
 */
export function ProductModalProvider({
  categories,
  children,
}: {
  categories: Category[];
  children: React.ReactNode;
}) {
  const [product, setProduct] = React.useState<Product | null>(null);
  const [open, setOpen] = React.useState(false);

  const openProduct = React.useCallback((next: Product) => {
    setProduct(next);
    setOpen(true);
  }, []);

  const closeProduct = React.useCallback(() => setOpen(false), []);

  const category = React.useMemo(
    () => categories.find((c) => c.id === product?.categoryId) ?? null,
    [categories, product]
  );

  const value = React.useMemo(
    () => ({ openProduct, closeProduct }),
    [openProduct, closeProduct]
  );

  return (
    <ProductModalContext.Provider value={value}>
      {children}
      <ProductDetailModal
        product={product}
        category={category}
        open={open}
        onOpenChange={setOpen}
      />
    </ProductModalContext.Provider>
  );
}

export function useProductModal() {
  const ctx = React.useContext(ProductModalContext);
  if (!ctx) {
    throw new Error("useProductModal must be used within ProductModalProvider");
  }
  return ctx;
}
