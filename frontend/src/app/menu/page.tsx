import type { Metadata } from "next";
import { getCategories, getProducts } from "@/services/menu-service";
import { getServerI18n } from "@/lib/i18n/server";
import { fmt } from "@/lib/i18n/messages";
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

  const [{ m }, categories, productsResult] = await Promise.all([
    getServerI18n(),
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
            {m.menuPage.eyebrow}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {m.menuPage.title}
          </h1>
          <p className="mt-3 max-w-2xl text-pretty text-muted-foreground sm:text-lg">
            {fmt(m.menuPage.subtitle, {
              count: productsResult.total,
              categories: categories.filter((c) => !c.parentId).length,
            })}
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
