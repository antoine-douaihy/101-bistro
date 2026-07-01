"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Globe } from "lucide-react";
import type { Lang } from "@/types";
import { LOCALE_COOKIE, LOCALES, localeMeta } from "@/lib/locale";
import { cn } from "@/lib/utils";

/**
 * Persist the choice (cookie, one year) and optimistically apply direction/lang
 * to the document so the flip feels instant before the server re-render lands.
 * Kept at module scope: these are imperative DOM side-effects triggered from an
 * event, not render-time state.
 */
function persistLocale(code: Lang) {
  document.cookie = `${LOCALE_COOKIE}=${code}; path=/; max-age=31536000; samesite=lax`;
  const meta = localeMeta(code);
  document.documentElement.setAttribute("lang", code);
  document.documentElement.setAttribute("dir", meta.dir);
}

/**
 * Language switcher.
 *
 * The menu content is rendered server-side in the active locale (resolved from
 * the `lang` cookie — see `lib/locale-server`). So switching languages is just:
 * write the cookie, optimistically flip `<html dir/lang>` for an instant visual
 * response, then `router.refresh()` to re-render the server components with the
 * newly-selected translations. English is the default when no cookie is set.
 */
export function LanguageSwitcher({
  locale,
  className,
}: {
  locale: Lang;
  className?: string;
}) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [pending, setPending] = React.useState<Lang | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const active = localeMeta(locale);

  // Close on outside click / Escape.
  React.useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const select = (code: Lang) => {
    setOpen(false);
    if (code === locale) return;

    persistLocale(code);

    setPending(code);
    router.refresh();
    // Clear the pending state after the refresh has had a chance to paint.
    window.setTimeout(() => setPending(null), 600);
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Change language — current: ${active.label}`}
        className="group flex h-10 items-center gap-1.5 rounded-full border border-border/70 bg-background/50 ps-2.5 pe-3 text-foreground/80 backdrop-blur-sm transition-colors hover:bg-accent hover:text-foreground"
      >
        <Globe className="size-[1.15rem]" />
        <span className="text-sm font-medium uppercase tracking-wide">
          {active.code}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong absolute end-0 z-50 mt-2 w-44 origin-top overflow-hidden rounded-2xl border border-border/60 p-1.5 shadow-float"
          >
            {LOCALES.map((l) => {
              const isActive = l.code === locale;
              return (
                <button
                  key={l.code}
                  type="button"
                  role="menuitemradio"
                  aria-checked={isActive}
                  onClick={() => select(l.code)}
                  dir={l.dir}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-start transition-colors",
                    isActive
                      ? "bg-primary/10 text-foreground"
                      : "text-foreground/90 hover:bg-accent hover:text-foreground"
                  )}
                >
                  <span className="flex min-w-0 flex-col leading-tight">
                    <span className="truncate text-sm font-medium">
                      {l.native}
                    </span>
                    <span className="text-[0.6875rem] uppercase tracking-wide text-foreground/60">
                      {l.label}
                    </span>
                  </span>
                  {(isActive || pending === l.code) && (
                    <Check className="size-4 shrink-0 text-primary" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
