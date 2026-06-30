"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search } from "lucide-react";
import type { Category } from "@/types/menu";
import { PRIMARY_NAV, SITE } from "@/constants/site";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { SearchOverlay } from "@/components/menu/search-overlay";
import { MobileNav } from "./mobile-nav";

export function SiteHeader({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cmd/Ctrl-K opens search.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("#")[0]) && href !== "/";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 h-16 w-full transition-all duration-300",
        scrolled
          ? "glass-strong border-b border-border/60 shadow-card"
          : "border-b border-transparent bg-background/0"
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center gap-4 px-5 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label={`${SITE.name} — home`}
          className="flex items-center gap-2.5 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Logo height={34} tone="brand" />
          <span className="sr-only">{SITE.name}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="ml-4 hidden items-center gap-1 lg:flex">
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-primary" />
              )}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search the menu"
            className="group hidden items-center gap-2 rounded-full border border-border/70 bg-background/50 py-2 pl-3.5 pr-2 text-sm text-muted-foreground backdrop-blur-sm transition-colors hover:bg-accent hover:text-foreground sm:flex"
          >
            <Search className="size-4" />
            <span className="hidden md:inline">Search…</span>
            <kbd className="hidden rounded-md border border-border bg-muted px-1.5 py-0.5 font-sans text-[0.6875rem] font-medium text-muted-foreground md:inline">
              ⌘K
            </kbd>
          </button>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search the menu"
            className="grid size-10 place-items-center rounded-full border border-border/70 bg-background/50 text-foreground/80 backdrop-blur-sm transition-colors hover:bg-accent hover:text-foreground sm:hidden"
          >
            <Search className="size-[1.15rem]" />
          </button>

          <ThemeToggle />

          <Button asChild className="hidden sm:inline-flex" pill>
            <Link href="/menu">View Menu</Link>
          </Button>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="grid size-10 place-items-center rounded-full border border-border/70 bg-background/50 text-foreground/80 backdrop-blur-sm transition-colors hover:bg-accent hover:text-foreground lg:hidden"
          >
            <Menu className="size-[1.15rem]" />
          </button>
        </div>
      </div>

      <SearchOverlay
        open={searchOpen}
        onOpenChange={setSearchOpen}
        categories={categories}
      />
      <MobileNav
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        categories={categories}
      />
    </header>
  );
}
