"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/types/menu";
import { PRIMARY_NAV, SITE } from "@/constants/site";
import { Sheet } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/brand/logo";
import { Icon } from "@/components/common/icon";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
}

export function MobileNav({ open, onOpenChange, categories }: MobileNavProps) {
  const topLevel = categories
    .filter((c) => !c.parentId)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const close = () => onOpenChange(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange} title="Menu" side="left">
      <div className="flex items-center gap-2.5 px-5 pb-5 pt-6">
        <Logo height={30} tone="brand" />
      </div>
      <Separator />

      <nav className="flex flex-col gap-0.5 px-3 py-4">
        {PRIMARY_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={close}
            className="rounded-xl px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex-1 overflow-y-auto px-3 pb-4">
        <p className="px-3 pb-2 pt-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          Categories
        </p>
        <div className="grid gap-0.5">
          {topLevel.map((c) => (
            <Link
              key={c.id}
              href={`/menu?category=${c.slug}`}
              onClick={close}
              className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-accent"
            >
              <span className="grid size-9 place-items-center rounded-lg bg-surface-muted text-primary">
                <Icon name={c.icon} className="size-4.5" />
              </span>
              <span className="flex-1 text-sm font-medium">{c.name}</span>
              {c.itemCount != null && (
                <span className="text-xs tabular-nums text-muted-foreground">
                  {c.itemCount}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>

      <Separator />
      <div className="space-y-3 px-5 py-4">
        <Button asChild size="lg" className="w-full" onClick={close}>
          <Link href="/menu">
            Explore the full menu <ArrowRight className="size-4" />
          </Link>
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          {SITE.address.line1}, {SITE.address.city}
        </p>
      </div>
    </Sheet>
  );
}
