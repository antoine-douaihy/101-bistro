import { cn } from "@/lib/utils";
import { SITE } from "@/constants/site";

/** Intrinsic aspect ratio of the brand lockup (viewBox 1440 × 810). */
const LOGO_RATIO = 1440 / 810;

interface LogoProps {
  /** Rendered height in px; width is derived from the lockup ratio. */
  height?: number;
  className?: string;
  /**
   * The lockup is monochrome and recoloured with `currentColor` via CSS mask,
   * so it adapts to light/dark. Control the colour with a `text-*` class.
   */
  tone?: "foreground" | "brand" | "inherit";
  title?: string;
}

/**
 * Renders the official 101 Bistro lockup. Uses a CSS mask + `currentColor` so a
 * single asset works on any surface and theme without shipping recoloured SVGs.
 */
export function Logo({
  height = 40,
  className,
  tone = "foreground",
  title = SITE.name,
}: LogoProps) {
  return (
    <span
      role="img"
      aria-label={title}
      className={cn(
        "inline-block bg-current align-middle transition-colors",
        tone === "foreground" && "text-foreground",
        tone === "brand" && "text-primary",
        className
      )}
      style={{
        height,
        width: height * LOGO_RATIO,
        WebkitMaskImage: "url(/brand/101LOGO-nobg.svg)",
        maskImage: "url(/brand/101LOGO-nobg.svg)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}
