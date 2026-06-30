"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  size?: "default" | "lg";
  onSubmit?: (value: string) => void;
}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      value,
      onChange,
      placeholder = "Search dishes, ingredients…",
      className,
      autoFocus,
      size = "default",
      onSubmit,
    },
    ref
  ) => {
    return (
      <div className={cn("relative w-full", className)}>
        <Search
          className={cn(
            "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground",
            size === "lg" ? "size-5" : "size-4.5"
          )}
          aria-hidden
        />
        <input
          ref={ref}
          type="search"
          inputMode="search"
          value={value}
          autoFocus={autoFocus}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSubmit?.(value);
          }}
          placeholder={placeholder}
          aria-label="Search the menu"
          className={cn(
            "w-full rounded-2xl border border-input bg-background/70 pl-11 pr-11 text-foreground shadow-xs backdrop-blur-sm transition-colors",
            "placeholder:text-muted-foreground",
            "focus-visible:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "[&::-webkit-search-cancel-button]:appearance-none",
            size === "lg" ? "h-13 text-base" : "h-11 text-sm"
          )}
        />
        {value && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 grid -translate-y-1/2 place-items-center rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    );
  }
);
SearchBar.displayName = "SearchBar";
