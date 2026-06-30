import type { Metadata } from "next";
import { getCategories, getProducts } from "@/services/menu-service";
import { Container } from "@/components/common/container";
import { MenuBrowser } from "@/components/menu/menu-browser";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Browse the full 101 Bistro menu — starters, salads, pizza, pasta, grills, seafood, desserts and drinks. Search, filter and discover.",
};

// Rendered per-request so it always reflects the live menu in the database.
export const dynamic = "force-dynamic";

interface MenuPageProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export default async function MenuPage({ searchParams }: MenuPageProps) {
  const { q, category } = await searchParams;

  const [categories, productsResult] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  // Resolve the category param by slug or id (tolerant of either).
  const matched = category
    ? categories.find((c) => c.slug === category || c.id === category)
    : null;

  return (
    <div className="pb-10">
      {/* Page header */}
      <section className="border-b border-border/60 bg-surface-muted/40">
        <Container width="wide" className="py-10 sm:py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            The menu
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Everything we serve
          </h1>
          <p className="mt-3 max-w-2xl text-pretty text-muted-foreground sm:text-lg">
            {productsResult.total}+ dishes across {""}
            {categories.filter((c) => !c.parentId).length} categories. Search by
            name or ingredient, filter by dietary needs, and tap any dish for the
            full details.
          </p>
        </Container>
      </section>

      <MenuBrowser
        products={productsResult.items}
        categories={categories}
        initial={{ query: q ?? "", categoryId: matched?.id ?? null }}
      />
    </div>
  );
}
