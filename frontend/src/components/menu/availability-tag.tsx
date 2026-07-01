"use client";

import type { AvailabilityStatus } from "@/types/menu";
import { AVAILABILITY_META } from "@/constants/menu";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/i18n/locale-provider";

const TONE_CLASS: Record<string, string> = {
  success: "text-success",
  warning: "text-warning",
  muted: "text-muted-foreground",
  accent: "text-primary",
};

const DOT_CLASS: Record<string, string> = {
  success: "bg-success",
  warning: "bg-warning",
  muted: "bg-muted-foreground",
  accent: "bg-primary",
};

interface AvailabilityTagProps {
  status: AvailabilityStatus;
  className?: string;
  /** Hide the label, show only the status dot. */
  dotOnly?: boolean;
}

export function AvailabilityTag({
  status,
  className,
  dotOnly,
}: AvailabilityTagProps) {
  const { m } = useI18n();
  const meta = AVAILABILITY_META[status];
  if (status === "available" && !dotOnly) return null; // available is the default; no noise

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium",
        TONE_CLASS[meta.tone],
        className
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          DOT_CLASS[meta.tone],
          status === "limited" && "animate-pulse"
        )}
      />
      {!dotOnly && m.availability[status]}
    </span>
  );
}
