"use client";

import { ChevronDown, LayoutGrid, Rows3 } from "lucide-react";
import type { SortKey } from "@/types/menu";
import { SORT_OPTIONS } from "@/constants/menu";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/i18n/locale-provider";
import { SearchBar } from "./search-bar";

interface MenuToolbarProps {
  query: string;
  onQueryChange: (value: string) => void;
  sort: SortKey;
  onSortChange: (sort: SortKey) => void;
  view: "card" | "row";
  onViewChange: (view: "card" | "row") => void;
  resultCount: number;
}

export function MenuToolbar({
  query,
  onQueryChange,
  sort,
  onSortChange,
  view,
  onViewChange,
  resultCount,
}: MenuToolbarProps) {
  const { m } = useI18n();
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <SearchBar
        value={query}
        onChange={onQueryChange}
        placeholder={m.search.placeholder}
        className="sm:max-w-md"
      />

      <div className="flex items-center gap-2 sm:ms-auto">
        {/* Sort (desktop inline) */}
        <div className="relative hidden sm:block">
          <select
            aria-label={m.menu.sortAria}
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortKey)}
            className="h-11 cursor-pointer appearance-none rounded-xl border border-border bg-background/60 ps-4 pe-9 text-sm font-medium text-foreground shadow-xs backdrop-blur-sm transition-colors hover:bg-accent focus-visible:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {m.sort[opt.value]}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        </div>

        {/* View toggle */}
        <div className="hidden items-center rounded-xl border border-border bg-background/60 p-1 backdrop-blur-sm sm:flex">
          <ViewButton
            active={view === "card"}
            onClick={() => onViewChange("card")}
            label={m.menu.gridView}
          >
            <LayoutGrid className="size-4" />
          </ViewButton>
          <ViewButton
            active={view === "row"}
            onClick={() => onViewChange("row")}
            label={m.menu.listView}
          >
            <Rows3 className="size-4" />
          </ViewButton>
        </div>
      </div>

      <p className="text-sm tabular-nums text-muted-foreground sm:hidden">
        {resultCount} {m.menu.dishes}
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
