"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="grid min-h-[70vh] place-items-center px-5">
      <div className="flex max-w-md flex-col items-center rounded-3xl border border-border/60 bg-card p-10 text-center shadow-card">
        <span className="grid size-16 place-items-center rounded-2xl bg-destructive/10 text-destructive">
          <AlertTriangle className="size-8" />
        </span>
        <h1 className="mt-6 font-display text-2xl font-semibold tracking-tight">
          Something went wrong
        </h1>
        <p className="mt-2 text-pretty text-muted-foreground">
          An unexpected error occurred. Please try again.
        </p>
        <Button onClick={reset} className="mt-7" size="lg">
          <RotateCcw className="size-4" /> Try again
        </Button>
      </div>
    </div>
  );
}
