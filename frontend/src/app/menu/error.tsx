"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";

export default function MenuError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Wire to your error reporter (Sentry, etc.) when available.
    console.error("Menu route error:", error);
  }, [error]);

  return (
    <Container width="narrow" className="py-24">
      <div className="flex flex-col items-center rounded-3xl border border-border/60 bg-card p-10 text-center shadow-card">
        <span className="grid size-16 place-items-center rounded-2xl bg-destructive/10 text-destructive">
          <AlertTriangle className="size-8" />
        </span>
        <h1 className="mt-6 font-display text-2xl font-semibold tracking-tight">
          We couldn&apos;t load the menu
        </h1>
        <p className="mt-2 max-w-sm text-pretty text-muted-foreground">
          Something went wrong while fetching dishes. Please try again — if it
          keeps happening, our kitchen has been notified.
        </p>
        <Button onClick={reset} className="mt-7" size="lg">
          <RotateCcw className="size-4" /> Try again
        </Button>
      </div>
    </Container>
  );
}
