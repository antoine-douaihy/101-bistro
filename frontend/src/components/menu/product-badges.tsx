import type { ProductBadge } from "@/types/menu";
import { BADGE_META, type BadgeMeta } from "@/constants/menu";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/common/icon";
import { cn } from "@/lib/utils";

const TONE_VARIANT: Record<BadgeMeta["tone"], React.ComponentProps<typeof Badge>["variant"]> = {
  brand: "brand",
  neutral: "muted",
  success: "success",
  spice: "spice",
  accent: "accent",
};

interface ProductBadgesProps {
  badges?: ProductBadge[];
  max?: number;
  size?: React.ComponentProps<typeof Badge>["size"];
  withIcon?: boolean;
  className?: string;
}

export function ProductBadges({
  badges,
  max = 3,
  size = "sm",
  withIcon = true,
  className,
}: ProductBadgesProps) {
  if (!badges?.length) return null;
  const shown = badges.slice(0, max);
  const extra = badges.length - shown.length;

  return (
    <div className={cn("flex flex-wrap items-center gap-1.5", className)}>
      {shown.map((badge) => {
        const meta = BADGE_META[badge];
        if (!meta) return null;
        return (
          <Badge key={badge} variant={TONE_VARIANT[meta.tone]} size={size}>
            {withIcon && <Icon name={meta.icon} className="size-3" />}
            {meta.label}
          </Badge>
        );
      })}
      {extra > 0 && (
        <Badge variant="muted" size={size}>
          +{extra}
        </Badge>
      )}
    </div>
  );
}
