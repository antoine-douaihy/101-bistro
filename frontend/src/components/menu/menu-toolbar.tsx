"use client";

import { ChevronDown, LayoutGrid, Rows3, SlidersHorizontal } from "lucide-react";
import type { SortKey } from "@/types/menu";
import { SORT_OPTIONS } from "@/constants/menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SearchBar } from "./search-bar";

interface MenuToolbarProps {
  query: string;
  onQueryChange: (value: string) => void;
  sort: SortKey;
  onSortChange: (sort: SortKey) => void;
  view: "card" | "row";
  onViewChange: (view: "card" | "row") => void;
  onOpenFilters: () => void;
  activeFilterCount: number;
  resultCount: number;
}

export function MenuToolbar({
  query,
  onQueryChange,
  sort,
  onSortChange,
  view,
  onViewChange,
  onOpenFilters,
  activeFilterCount,
  resultCount,
}: MenuToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <SearchBar
        value={query}
        onChange={onQueryChange}
        className="sm:max-w-md"
      />

      <div className="flex items-center gap-2 sm:ml-auto">
        {/* Sort (desktop inline) */}
        <div className="relative hidden sm:block">
          <select
            aria-label="Sort dishes"
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortKey)}
            className="h-11 cursor-pointer appearance-none rounded-xl border border-border bg-background/60 pl-4 pr-9 text-sm font-medium text-foreground shadow-xs backdrop-blur-sm transition-colors hover:bg-accent focus-visible:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        </div>

        {/* View toggle */}
        <div className="hidden items-center rounded-xl border border-border bg-background/60 p-1 backdrop-blur-sm sm:flex">
          <ViewButton
            active={view === "card"}
            onClick={() => onViewChange("card")}
            label="Grid view"
          >
            <LayoutGrid className="size-4" />
          </ViewButton>
          <ViewButton
            active={view === "row"}
            onClick={() => onViewChange("row")}
            label="List view"
          >
            <Rows3 className="size-4" />
          </ViewButton>
        </div>

        {/* Filters */}
        <Button
          variant="outline"
          onClick={onOpenFilters}
          className="relative shrink-0"
        >
          <SlidersHorizontal className="size-4" />
          <span className="hidden sm:inline">Filters</span>
          {activeFilterCount > 0 && (
            <span className="grid size-5 place-items-center rounded-full bg-primary text-[0.6875rem] font-semibold text-primary-foreground">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </div>

      <p className="text-sm tabular-nums text-muted-foreground sm:hidden">
        {resultCount} dishes
      </p>
    </div>
  );
}

function ViewButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "grid size-9 place-items-center rounded-lg transition-colors",
        active
          ? "bg-primary text-primary-foreground shadow-card"
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}
