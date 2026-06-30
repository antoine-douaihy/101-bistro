import { Flame } from "lucide-react";
import type { SpiceLevel } from "@/types/menu";
import { SPICE_LABELS } from "@/constants/menu";
import { cn } from "@/lib/utils";

export function SpiceMeter({
  level,
  className,
  showLabel = false,
}: {
  level: SpiceLevel;
  className?: string;
  showLabel?: boolean;
}) {
  if (!level) return null;
  return (
    <span
      className={cn("inline-flex items-center gap-1", className)}
      title={`Spice: ${SPICE_LABELS[level]}`}
    >
      <span className="flex items-center">
        {[1, 2, 3].map((i) => (
          <Flame
            key={i}
            className={cn(
              "size-3.5",
              i <= level ? "text-destructive" : "text-muted-foreground/30"
            )}
            aria-hidden
          />
        ))}
      </span>
      {showLabel && (
        <span className="text-xs font-medium text-muted-foreground">
          {SPICE_LABELS[level]}
        </span>
      )}
    </span>
  );
}
