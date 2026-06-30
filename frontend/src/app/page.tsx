import {
  getCategories,
  getCatalogueStats,
  getFeaturedProducts,
} from "@/services/menu-service";
import { Hero } from "@/components/sections/hero";
import { CategoryShowcase } from "@/components/sections/category-showcase";
import { FeaturedItems } from "@/components/sections/featured-items";
import { BrandStory } from "@/components/sections/brand-story";
import { VisitSection } from "@/components/sections/visit-section";
import { HomeCta } from "@/components/sections/home-cta";

// Rendered per-request so it always reflects the live menu in the database.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [categories, featured, stats] = await Promise.all([
    getCategories(),
    getFeaturedProducts(10),
    getCatalogueStats(),
  ]);

  const topLevel = categories
    .filter((c) => !c.parentId)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const featuredCategories = topLevel
    .filter((c) => c.isFeatured)
    .slice(0, 6)
    .map((c) => ({ id: c.slug, name: c.name, icon: c.icon }));

  return (
    <>
      <Hero
        productCount={stats.productCount}
        categoryCount={stats.categoryCount}
        featuredCategories={featuredCategories}
      />
      <CategoryShowcase categories={topLevel} />
      <FeaturedItems products={featured} categories={categories} />
      <BrandStory />
      <VisitSection />
      <HomeCta productCount={stats.productCount} />
    </>
  );
}
