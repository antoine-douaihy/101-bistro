"use client";

import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  // `resolvedTheme` is undefined until next-themes hydrates, so both the server
  // and the first client render show the Sun — no hydration mismatch, and no
  // setState-in-effect needed to guard it.
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative grid size-10 place-items-center overflow-hidden rounded-full border border-border/70 bg-background/50 text-foreground/80 backdrop-blur-sm transition-colors hover:bg-accent hover:text-foreground",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ y: 12, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -12, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="grid place-items-center"
        >
          {isDark ? (
            <Moon className="size-[1.15rem]" />
          ) : (
            <Sun className="size-[1.15rem]" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
