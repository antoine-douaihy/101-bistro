"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/types/menu";
import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/common/section-heading";
import { CategoryCard } from "@/components/menu/category-card";
import { Reveal, RevealGroup, revealItemVariants } from "@/components/common/reveal";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface CategoryShowcaseProps {
  categories: Category[];
}

export function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  return (
    <section id="categories" className="py-16 sm:py-20">
      <Container width="wide">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Browse the menu"
              title="Find your craving"
              description="From small plates to fire-grilled mains — explore every corner of the kitchen."
            />
            <Button asChild variant="ghost" className="shrink-0">
              <Link href="/menu">
                View all <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Reveal>

        <RevealGroup className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category, i) => (
            <motion.div key={category.id} variants={revealItemVariants}>
              <CategoryCard category={category} index={i} />
            </motion.div>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
