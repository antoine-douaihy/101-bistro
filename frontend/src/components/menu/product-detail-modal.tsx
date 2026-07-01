"use client";

import * as React from "react";
import { Check, Clock, Star } from "lucide-react";
import type { Category, Product, ProductOptionGroup } from "@/types/menu";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/i18n/locale-provider";
import { fmt } from "@/lib/i18n/messages";
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { MaterialIcon } from "@/components/common/icon";
import { ProductImage } from "./product-image";
import { ProductBadges } from "./product-badges";
import { AvailabilityTag } from "./availability-tag";
import { SpiceMeter } from "./spice-meter";

interface ProductDetailModalProps {
  product: Product | null;
  category: Category | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type OptionSelection = Record<string, string[]>;

function defaultSelection(product: Product | null): {
  variationId: string | null;
  options: OptionSelection;
} {
  if (!product) return { variationId: null, options: {} };
  const variationId = product.variations?.[0]?.id ?? null;
  const options: OptionSelection = {};
  product.options?.forEach((group) => {
    if (group.type === "single" && group.required) {
      const def = group.choices.find((c) => c.isDefault) ?? group.choices[0];
      options[group.id] = def ? [def.id] : [];
    } else {
      options[group.id] = [];
    }
  });
  return { variationId, options };
}

export function ProductDetailModal({
  product,
  category,
  open,
  onOpenChange,
}: ProductDetailModalProps) {
  const { m } = useI18n();
  const [variationId, setVariationId] = React.useState<string | null>(null);
  const [options, setOptions] = React.useState<OptionSelection>({});

  // Reset the configuration when a different product opens. This is the
  // documented "adjust state while rendering on prop change" pattern — cheaper
  // and more correct than a reset effect.
  const [activeProductId, setActiveProductId] = React.useState(product?.id);
  if (product && product.id !== activeProductId) {
    const init = defaultSelection(product);
    setActiveProductId(product.id);
    setVariationId(init.variationId);
    setOptions(init.options);
  }

  if (!product) return null;

  function toggleOption(group: ProductOptionGroup, choiceId: string) {
    setOptions((prev) => {
      const current = prev[group.id] ?? [];
      if (group.type === "single") {
        return { ...prev, [group.id]: [choiceId] };
      }
      const exists = current.includes(choiceId);
      if (exists) {
        return { ...prev, [group.id]: current.filter((id) => id !== choiceId) };
      }
      if (group.max && current.length >= group.max) return prev;
      return { ...prev, [group.id]: [...current, choiceId] };
    });
  }

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={product.name}
      description={product.shortDescription}
      size="lg"
      className="sm:max-h-[90vh]"
    >
      <div className="flex max-h-[92dvh] flex-col sm:max-h-[90vh]">
        {/* Hero */}
        <div className="relative shrink-0">
          <ProductImage
            image={product.image}
            alt={product.name}
            iconName={category?.icon}
            seed={product.id}
            sizes="(max-width: 640px) 100vw, 768px"
            rounded="rounded-none"
            className="aspect-[16/10] w-full sm:aspect-[2/1]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card to-transparent" />
          {product.badges?.length ? (
            <div className="absolute start-4 top-4">
              <ProductBadges badges={product.badges} max={3} size="default" />
            </div>
          ) : null}
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 pb-4 pt-1 sm:px-7">
          {category && (
            <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-primary">
              <MaterialIcon name={category.icon} className="size-3.5 text-sm" />
              {category.name}
            </div>
          )}

          <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
            {product.name}
          </h2>

          {/* meta row */}
          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {product.rating ? (
              <span className="inline-flex items-center gap-1 font-medium text-foreground">
                <Star className="size-4 fill-warning text-warning" />
                {product.rating.toFixed(1)}
                <span className="font-normal text-muted-foreground">
                  ({product.ratingCount})
                </span>
              </span>
            ) : null}
            {product.preparationTime ? (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4" />
                {product.preparationTime} min
              </span>
            ) : null}
            {product.spiceLevel ? (
              <SpiceMeter level={product.spiceLevel} showLabel />
            ) : null}
            <AvailabilityTag status={product.availability} />
          </div>

          {product.description && (
            <p className="mt-4 text-pretty text-[0.95rem] leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          )}

          {/* Variations */}
          {product.variations?.length ? (
            <Fieldset label={m.menu.chooseSize}>
              <div className="flex flex-wrap gap-2">
                {product.variations.map((v) => {
                  const active = v.id === variationId;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setVariationId(v.id)}
                      className={cn(
                        "flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition-all",
                        active
                          ? "border-primary bg-primary/8 text-foreground ring-1 ring-primary/30"
                          : "border-border bg-background hover:border-border/60 hover:bg-accent"
                      )}
                    >
                      <span>{v.label}</span>
                      <span className="text-muted-foreground">
                        {formatPrice(v.price, product.currency)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </Fieldset>
          ) : null}

          {/* Option groups */}
          {product.options?.map((group) => {
            const selected = options[group.id] ?? [];
            return (
              <Fieldset
                key={group.id}
                label={group.label}
                hint={
                  group.required
                    ? m.menu.required
                    : group.type === "multiple"
                      ? group.max
                        ? fmt(m.menu.upTo, { max: group.max })
                        : m.menu.optional
                      : m.menu.optional
                }
              >
                <div className="flex flex-wrap gap-2">
                  {group.choices.map((choice) => {
                    const active = selected.includes(choice.id);
                    return (
                      <button
                        key={choice.id}
                        type="button"
                        onClick={() => toggleOption(group, choice.id)}
                        className={cn(
                          "flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition-all",
                          active
                            ? "border-primary bg-primary/8 text-foreground ring-1 ring-primary/30"
                            : "border-border bg-background hover:border-border/60 hover:bg-accent"
                        )}
                      >
                        <span
                          className={cn(
                            "grid size-4 place-items-center rounded-full border transition-colors",
                            active
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border"
                          )}
                        >
                          {active && <Check className="size-3" />}
                        </span>
                        {choice.label}
                        {choice.priceDelta ? (
                          <span className="text-muted-foreground">
                            +{formatPrice(choice.priceDelta, product.currency)}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </Fieldset>
            );
          })}

          {/* Nutrition & allergens */}
          {(product.nutrition || product.allergens?.length) && (
            <div className="mt-6 grid gap-4 rounded-2xl bg-surface-muted/60 p-4 sm:grid-cols-2">
              {product.nutrition && (
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {m.menu.nutrition}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    {product.nutrition.calories != null && (
                      <NutritionStat label="kcal" value={product.nutrition.calories} />
                    )}
                    {product.nutrition.protein != null && (
                      <NutritionStat label="protein" value={`${product.nutrition.protein}g`} />
                    )}
                    {product.nutrition.carbs != null && (
                      <NutritionStat label="carbs" value={`${product.nutrition.carbs}g`} />
                    )}
                    {product.nutrition.fat != null && (
                      <NutritionStat label="fat" value={`${product.nutrition.fat}g`} />
                    )}
                  </div>
                </div>
              )}
              {product.allergens?.length ? (
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {m.menu.allergens}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {product.allergens.map((a) => (
                      <Badge key={a} variant="outline" size="sm" className="capitalize">
                        {a}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

function Fieldset({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="mt-6">
      <legend className="mb-2.5 flex w-full items-center justify-between">
        <span className="font-display text-base font-semibold tracking-tight text-foreground">
          {label}
        </span>
        {hint && (
          <span className="text-xs font-medium text-muted-foreground">{hint}</span>
        )}
      </legend>
      {children}
    </fieldset>
  );
}

function NutritionStat({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-baseline gap-1">
      <span className="font-semibold tabular-nums text-foreground">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </span>
  );
}
