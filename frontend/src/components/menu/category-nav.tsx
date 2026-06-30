"use client";

import * as React from "react";
import type { Category } from "@/types/menu";
import { Icon } from "@/components/common/icon";
import { cn } from "@/lib/utils";

interface CategoryNavProps {
  categories: Category[];
  activeId: string | null;
  onSelect: (id: string | null) => void;
  className?: string;
  /** Show "All" as the first chip. */
  includeAll?: boolean;
  allLabel?: string;
}

/**
 * Horizontally scrollable category pill rail. Auto-scrolls the active pill into
 * view and fades its edges. Used as a sticky sub-nav on the menu page.
 */
export function CategoryNav({
  categories,
  activeId,
  onSelect,
  className,
  includeAll = true,
  allLabel = "All",
}: CategoryNavProps) {
  const railRef = React.useRef<HTMLDivElement>(null);
  const activeRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeId]);

  return (
    <div
      ref={railRef}
      className={cn(
        "no-scrollbar mask-fade-x flex items-center gap-2 overflow-x-auto py-1",
        className
      )}
      role="tablist"
      aria-label="Menu categories"
    >
      {includeAll && (
        <CategoryPill
          ref={activeId === null ? activeRef : undefined}
          active={activeId === null}
          onClick={() => onSelect(null)}
          label={allLabel}
        />
      )}
      {categories.map((category) => (
        <CategoryPill
          key={category.id}
          ref={activeId === category.id ? activeRef : undefined}
          active={activeId === category.id}
          onClick={() => onSelect(category.id)}
          label={category.name}
          iconName={category.icon}
          count={category.itemCount}
        />
      ))}
    </div>
  );
}

const CategoryPill = React.forwardRef<
  HTMLButtonElement,
  {
    active: boolean;
    onClick: () => void;
    label: string;
    iconName?: string;
    count?: number;
  }
>(({ active, onClick, label, iconName, count }, ref) => (
  <button
    ref={ref}
    type="button"
    role="tab"
    aria-selected={active}
    onClick={onClick}
    className={cn(
      "group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-95",
      active
        ? "border-transparent bg-primary text-primary-foreground shadow-card"
        : "border-border/70 bg-background/60 text-foreground/80 backdrop-blur-sm hover:border-border hover:bg-accent hover:text-foreground"
    )}
  >
    {iconName && <Icon name={iconName} className="size-4 opacity-80" />}
    {label}
    {count != null && (
      <span
        className={cn(
          "rounded-full px-1.5 text-xs tabular-nums transition-colors",
          active
            ? "bg-primary-foreground/20 text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        {count}
      </span>
    )}
  </button>
));
CategoryPill.displayName = "CategoryPill";
