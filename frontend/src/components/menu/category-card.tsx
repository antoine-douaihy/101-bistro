import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/types/menu";
import { pluralize } from "@/lib/format";
import { Icon } from "@/components/common/icon";
import { cn } from "@/lib/utils";

const GRADIENTS = [
  "from-[#fbe4df] to-[#f4c7b6] dark:from-[#3a1a16] dark:to-[#241210]",
  "from-[#f6ecdc] to-[#e9d0ad] dark:from-[#322318] dark:to-[#221710]",
  "from-[#eef1e6] to-[#d6dfc2] dark:from-[#22291c] dark:to-[#181f14]",
  "from-[#fce7e6] to-[#f3c4c2] dark:from-[#3a1715] dark:to-[#280f10]",
  "from-[#f1ebe6] to-[#dccfc3] dark:from-[#2a241f] dark:to-[#1c1814]",
  "from-[#fae9dd] to-[#efceb2] dark:from-[#352318] dark:to-[#251711]",
];

interface CategoryCardProps {
  category: Category;
  index?: number;
  className?: string;
  size?: "default" | "lg";
}

export function CategoryCard({
  category,
  index = 0,
  className,
  size = "default",
}: CategoryCardProps) {
  const gradient = GRADIENTS[index % GRADIENTS.length];

  return (
    <Link
      href={`/menu?category=${category.slug}`}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/60 p-5 shadow-card transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-float",
        size === "lg" ? "min-h-52" : "min-h-44",
        className
      )}
    >
      <div
        className={cn("absolute inset-0 -z-10 bg-gradient-to-br", gradient)}
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_85%_-10%,rgba(255,255,255,0.5),transparent_55%)] dark:bg-[radial-gradient(120%_90%_at_85%_-10%,rgba(255,255,255,0.08),transparent_55%)]"
        aria-hidden
      />

      <div className="flex items-start justify-between">
        <span className="grid size-12 place-items-center rounded-2xl bg-background/70 text-oxblood shadow-card backdrop-blur-sm dark:text-primary">
          <Icon name={category.icon} className="size-6" />
        </span>
        <span className="grid size-9 place-items-center rounded-full bg-background/60 text-oxblood opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 dark:text-foreground">
          <ArrowUpRight className="size-4" />
        </span>
      </div>

      <div className="mt-6">
        <h3 className="font-display text-xl font-semibold tracking-tight text-oxblood dark:text-foreground">
          {category.name}
        </h3>
        {category.itemCount != null && (
          <p className="mt-0.5 text-sm text-oxblood/60 dark:text-muted-foreground">
            {category.itemCount} {pluralize(category.itemCount, "dish", "dishes")}
          </p>
        )}
      </div>
    </Link>
  );
}
