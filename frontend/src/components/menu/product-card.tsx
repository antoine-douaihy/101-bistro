"use client";

import * as React from "react";
import type { Product } from "@/types/menu";
import { useProductModal } from "@/providers/product-modal-provider";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/i18n/locale-provider";
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
  const { m } = useI18n();
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
          <div className="pointer-events-none absolute start-3 top-3">
            <ProductBadges badges={product.badges} max={2} size="sm" />
          </div>
        ) : null}

        {soldOut && (
          <div className="absolute inset-0 grid place-items-center bg-oxblood/35 backdrop-blur-[2px]">
            <span className="rounded-full bg-background/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-foreground shadow-card">
              {m.menu.soldOut}
            </span>
          </div>
        )}

      </div>

      {/* Fixed layout so every card is the same height in every language:
          the name always reserves two lines and the price sits at the bottom.
          The full description is shown in the detail modal on click. */}
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <h3 className="line-clamp-2 min-h-[2.7em] font-display text-[0.95rem] font-semibold leading-snug tracking-tight">
          <button
            type="button"
            onClick={open}
            className="text-start outline-none after:absolute after:inset-0 after:content-[''] after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-ring"
          >
            {product.name}
          </button>
        </h3>

        <div className="mt-auto flex items-center justify-between gap-2 pt-0.5">
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
        "group relative flex items-center gap-4 rounded-2xl border border-transparent p-2.5 pe-3 transition-colors duration-200 hover:border-border/70 hover:bg-card focus-within:border-border/70 focus-within:bg-card",
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
              className="text-start outline-none after:absolute after:inset-0 after:content-[''] after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-ring"
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

        <div className="mt-1.5 flex items-center gap-2.5">
          <ProductBadges badges={product.badges} max={2} size="sm" />
          {product.spiceLevel ? <SpiceMeter level={product.spiceLevel} /> : null}
          <AvailabilityTag status={product.availability} />
        </div>
      </div>
    </article>
  );
}
