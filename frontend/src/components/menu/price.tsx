import type { Currency } from "@/types/menu";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

interface PriceProps {
  amount: number;
  currency?: Currency;
  compareAt?: number;
  className?: string;
  size?: "sm" | "default" | "lg";
  /** Show "from" prefix for items with variations. */
  from?: boolean;
}

const sizes = {
  sm: "text-sm",
  default: "text-base",
  lg: "text-xl",
};

export function Price({
  amount,
  currency = "USD",
  compareAt,
  className,
  size = "default",
  from,
}: PriceProps) {
  const hasDiscount = compareAt !== undefined && compareAt > amount;
  return (
    <span className={cn("inline-flex items-baseline gap-1.5", className)}>
      {from && (
        <span className="text-[0.7em] font-normal text-muted-foreground">
          from
        </span>
      )}
      <span
        className={cn(
          "font-display font-semibold tabular-nums tracking-tight text-foreground",
          sizes[size]
        )}
      >
        {formatPrice(amount, currency)}
      </span>
      {hasDiscount && (
        <span className="text-xs font-medium tabular-nums text-muted-foreground line-through">
          {formatPrice(compareAt, currency)}
        </span>
      )}
    </span>
  );
}
