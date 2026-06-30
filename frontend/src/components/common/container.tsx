import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  /** Controls max width. `default` ~1200px, `wide` ~1320px, `prose` ~720px. */
  width?: "default" | "wide" | "narrow" | "prose";
}

const widths = {
  narrow: "max-w-3xl",
  prose: "max-w-2xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
};

/** App-wide horizontal gutter + max-width wrapper. */
export function Container({
  className,
  width = "default",
  asChild,
  ...props
}: ContainerProps) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        widths[width],
        className
      )}
      {...props}
    />
  );
}
