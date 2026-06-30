"use client";

import type { MenuFilterState, ProductBadge, SortKey } from "@/types/menu";
import {
  BADGE_META,
  DIETARY_FILTERS,
  HIGHLIGHT_FILTERS,
  SORT_OPTIONS,
} from "@/constants/menu";
import { Sheet } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@/components/common/icon";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface FilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: MenuFilterState;
  resultCount: number;
  activeFilterCount: number;
  onToggleBadge: (badge: ProductBadge) => void;
  onSetSort: (sort: SortKey) => void;
  onSetAvailableOnly: (value: boolean) => void;
  onResetAll: () => void;
}

export function FilterSheet({
  open,
  onOpenChange,
  filters,
  resultCount,
  activeFilterCount,
  onToggleBadge,
  onSetSort,
  onSetAvailableOnly,
  onResetAll,
}: FilterSheetProps) {
  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      title="Filters"
      side="right"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 pb-4 pt-5">
        <div className="flex items-center gap-2">
          <h2 className="font-display text-xl font-semibold tracking-tight">
            Filters
          </h2>
          {activeFilterCount > 0 && (
            <span className="grid size-6 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {activeFilterCount}
            </span>
          )}
        </div>
      </div>
      <Separator />

      {/* Body */}
      <div className="flex-1 space-y-7 overflow-y-auto px-5 py-6">
        <FilterGroup title="Sort by">
          <div className="grid gap-1.5">
            {SORT_OPTIONS.map((opt) => {
              const active = filters.sort === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onSetSort(opt.value)}
                  className={cn(
                    "flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-sm font-medium transition-all",
                    active
                      ? "border-primary/40 bg-primary/8 text-foreground"
                      : "border-border bg-background hover:bg-accent"
                  )}
                >
                  {opt.label}
                  {active && <Check className="size-4 text-primary" />}
                </button>
              );
            })}
          </div>
        </FilterGroup>

        <FilterGroup title="Highlights">
          <ChipGroup
            badges={HIGHLIGHT_FILTERS}
            selected={filters.badges}
            onToggle={onToggleBadge}
          />
        </FilterGroup>

        <FilterGroup title="Dietary">
          <ChipGroup
            badges={DIETARY_FILTERS}
            selected={filters.badges}
            onToggle={onToggleBadge}
          />
        </FilterGroup>

        <FilterGroup title="Availability">
          <label className="flex items-center justify-between rounded-xl border border-border bg-background px-3.5 py-3 text-sm">
            <span className="font-medium">Available items only</span>
            <Switch
              checked={filters.availableOnly}
              onCheckedChange={onSetAvailableOnly}
              aria-label="Show available items only"
            />
          </label>
        </FilterGroup>
      </div>

      {/* Footer */}
      <Separator />
      <div className="flex items-center gap-3 px-5 py-4">
        <Button
          variant="ghost"
          size="lg"
          onClick={onResetAll}
          disabled={activeFilterCount === 0}
          className="flex-1"
        >
          Reset all
        </Button>
        <Button size="lg" onClick={() => onOpenChange(false)} className="flex-1">
          Show {resultCount}
        </Button>
      </div>
    </Sheet>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
        {title}
      </h3>
      {children}
    </div>
  );
}

function ChipGroup({
  badges,
  selected,
  onToggle,
}: {
  badges: ProductBadge[];
  selected: ProductBadge[];
  onToggle: (badge: ProductBadge) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge) => {
        const meta = BADGE_META[badge];
        const active = selected.includes(badge);
        return (
          <button
            key={badge}
            type="button"
            aria-pressed={active}
            onClick={() => onToggle(badge)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-all active:scale-95",
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-foreground/80 hover:bg-accent hover:text-foreground"
            )}
          >
            <Icon name={meta.icon} className="size-3.5" />
            {meta.label}
          </button>
        );
      })}
    </div>
  );
}
