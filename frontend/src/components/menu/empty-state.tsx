import { SearchX, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: IconCmp = SearchX,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-surface-muted/50 px-6 py-16 text-center",
        className
      )}
    >
      <div className="mb-5 grid size-16 place-items-center rounded-2xl bg-background shadow-card">
        <IconCmp className="size-7 text-muted-foreground" aria-hidden />
      </div>
      <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      {description && (
        <p className="mt-2 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
