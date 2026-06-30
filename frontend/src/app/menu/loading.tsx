import { Container } from "@/components/common/container";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductGridSkeleton } from "@/components/menu/product-card-skeleton";

export default function MenuLoading() {
  return (
    <div className="pb-10">
      <section className="border-b border-border/60 bg-surface-muted/40">
        <Container width="wide" className="py-10 sm:py-12">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-3 h-10 w-72 max-w-full" />
          <Skeleton className="mt-4 h-4 w-full max-w-xl" />
        </Container>
      </section>

      {/* sticky controls */}
      <div className="border-b border-border/60 bg-background/80">
        <Container width="wide" className="space-y-3 py-3">
          <div className="flex gap-2 overflow-hidden">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-24 shrink-0 rounded-full" />
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Skeleton className="h-11 w-full rounded-2xl sm:max-w-md" />
            <div className="flex gap-2 sm:ml-auto">
              <Skeleton className="hidden h-11 w-40 rounded-xl sm:block" />
              <Skeleton className="h-11 w-28 rounded-xl" />
            </div>
          </div>
        </Container>
      </div>

      <Container width="wide" className="py-8">
        <Skeleton className="mb-4 h-4 w-28" />
        <ProductGridSkeleton count={12} />
      </Container>
    </div>
  );
}
