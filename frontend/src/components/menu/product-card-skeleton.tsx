import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function ProductCardSkeleton({
  variant = "card",
  className,
}: {
  variant?: "card" | "row";
  className?: string;
}) {
  if (variant === "row") {
    return (
      <div className={cn("flex items-center gap-4 p-2.5", className)}>
        <Skeleton className="size-20 shrink-0 rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="flex justify-between gap-3">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card",
        className
      )}
    >
      <Skeleton className="aspect-[5/4] w-full rounded-none" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <div className="flex items-center justify-between pt-1">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-10" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({
  count = 8,
  variant = "card",
}: {
  count?: number;
  variant?: "card" | "row";
}) {
  return (
    <div
      className={cn(
        variant === "card"
          ? "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
          : "flex flex-col gap-1"
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} variant={variant} />
      ))}
    </div>
  );
}
