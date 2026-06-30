"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category, Product } from "@/types/menu";
import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/common/section-heading";
import { ProductCard } from "@/components/menu/product-card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/common/reveal";

interface FeaturedItemsProps {
  products: Product[];
  categories: Category[];
}

export function FeaturedItems({ products, categories }: FeaturedItemsProps) {
  if (!products.length) return null;
  const iconFor = (id: string) => categories.find((c) => c.id === id)?.icon;

  return (
    <section className="bg-surface-muted/40 py-16 sm:py-20">
      <Container width="wide">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Chef's selection"
              title="Signature favourites"
              description="A handful of the dishes our regulars keep coming back for."
            />
            <Button asChild variant="ghost" className="shrink-0">
              <Link href="/menu?q=signature">
                See more <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </Container>

      {/* Edge-to-edge horizontal rail */}
      <div className="mask-fade-x no-scrollbar mt-10 overflow-x-auto">
        <div className="flex gap-4 px-5 sm:px-6 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {products.map((product) => (
            <div key={product.id} className="w-[15rem] shrink-0 sm:w-[17rem]">
              <ProductCard
                product={product}
                iconName={iconFor(product.categoryId)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
