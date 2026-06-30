"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import type { Product } from "@/types/menu";
import { useProductModal } from "@/providers/product-modal-provider";
import { cn } from "@/lib/utils";
import { ProductImage } from "./product-image";
import { ProductBadges } from "./product-badges";
import { AvailabilityTag } from "./availability-tag";
import { SpiceMeter } from "./spice-meter";
import { Price } from "./price";

interface ProductCardProps {
  product: Product;
  iconName?: string;
  variant?: "card" | "row";
  priority?: boolean;
  className?: string;
}

export function ProductCard(props: ProductCardProps) {
  if (props.variant === "row") return <ProductRow {...props} />;
  return <ProductCardGrid {...props} />;
}

function useOpen(product: Product) {
  const { openProduct } = useProductModal();
  return React.useCallback(() => openProduct(product), [openProduct, product]);
}

function priceFrom(product: Product): { amount: number; from: boolean } {
  if (product.variations?.length) {
    const min = Math.min(...product.variations.map((v) => v.price));
    return { amount: min, from: true };
  }
  return { amount: product.price, from: false };
}

/* ------------------------------- card grid ------------------------------- */
function ProductCardGrid({
  product,
  iconName,
  priority,
  className,
}: ProductCardProps) {
  const open = useOpen(product);
  const soldOut = product.availability === "sold-out";
  const { amount, from } = priceFrom(product);

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card text-card-foreground shadow-card transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-1 hover:border-border hover:shadow-float focus-within:-translate-y-1 focus-within:shadow-float",
        soldOut && "opacity-80",
        className
      )}
    >
      <div className="relative aspect-[5/4] w-full">
        <ProductImage
          image={product.image}
          alt={product.name}
          iconName={iconName}
          seed={product.id}
          priority={priority}
          rounded="rounded-none"
          className="size-full"
        />

        {/* badges */}
        {product.badges?.length ? (
          <div className="pointer-events-none absolute left-3 top-3">
            <ProductBadges badges={product.badges} max={2} size="sm" />
          </div>
        ) : null}

        {soldOut && (
          <div className="absolute inset-0 grid place-items-center bg-oxblood/35 backdrop-blur-[2px]">
            <span className="rounded-full bg-background/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-foreground shadow-card">
              Sold out
            </span>
          </div>
        )}

        {/* quick add (UI only — future ordering) */}
        {!soldOut && (
          <button
            type="button"
            aria-label={`Quick view ${product.name}`}
            onClick={open}
            className="absolute bottom-3 right-3 z-10 grid size-9 place-items-center rounded-full bg-background/85 text-foreground shadow-card backdrop-blur-md transition-all duration-200 hover:bg-primary hover:text-primary-foreground active:scale-90"
          >
            <Plus className="size-4.5" />
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-[1.0625rem] font-semibold leading-snug tracking-tight">
            <button
              type="button"
              onClick={open}
              className="text-left outline-none after:absolute after:inset-0 after:content-[''] after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-ring"
            >
              {product.name}
            </button>
          </h3>
        </div>

        {product.shortDescription && (
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {product.shortDescription}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-1.5">
          <Price amount={amount} currency={product.currency} from={from} compareAt={product.compareAtPrice} />
          <div className="flex items-center gap-2">
            {product.spiceLevel ? <SpiceMeter level={product.spiceLevel} /> : null}
            <AvailabilityTag status={product.availability} />
          </div>
        </div>
      </div>
    </article>
  );
}

/* --------------------------------- row ----------------------------------- */
function ProductRow({ product, iconName, className }: ProductCardProps) {
  const open = useOpen(product);
  const soldOut = product.availability === "sold-out";
  const { amount, from } = priceFrom(product);

  return (
    <article
      className={cn(
        "group relative flex items-center gap-4 rounded-2xl border border-transparent p-2.5 pr-3 transition-colors duration-200 hover:border-border/70 hover:bg-card focus-within:border-border/70 focus-within:bg-card",
        soldOut && "opacity-70",
        className
      )}
    >
      <ProductImage
        image={product.image}
        alt={product.name}
        iconName={iconName}
        seed={product.id}
        rounded="rounded-xl"
        sizes="80px"
        className="size-20 shrink-0"
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="truncate font-display text-base font-semibold tracking-tight">
            <button
              type="button"
              onClick={open}
              className="text-left outline-none after:absolute after:inset-0 after:content-[''] after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-ring"
            >
              {product.name}
            </button>
          </h3>
          <Price
            amount={amount}
            currency={product.currency}
            from={from}
            compareAt={product.compareAtPrice}
            size="sm"
            className="shrink-0"
          />
        </div>

        {product.shortDescription && (
          <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">
            {product.shortDescription}
          </p>
        )}

        <div className="mt-1.5 flex items-center gap-2.5">
          <ProductBadges badges={product.badges} max={2} size="sm" />
          {product.spiceLevel ? <SpiceMeter level={product.spiceLevel} /> : null}
          <AvailabilityTag status={product.availability} />
        </div>
      </div>
    </article>
  );
}
