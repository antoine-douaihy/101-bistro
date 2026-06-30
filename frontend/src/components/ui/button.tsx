import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-card hover:shadow-soft hover:brightness-105",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/70 border border-border/70",
        outline:
          "border border-border bg-background/60 text-foreground hover:bg-accent hover:border-border/60 backdrop-blur-sm",
        ghost:
          "text-foreground/80 hover:bg-accent hover:text-foreground",
        glass:
          "glass text-foreground hover:bg-background/80 shadow-card",
        link: "text-primary underline-offset-4 hover:underline px-0",
        destructive:
          "bg-destructive text-destructive-foreground hover:brightness-105 shadow-card",
      },
      size: {
        sm: "h-9 rounded-lg px-3.5 text-sm",
        default: "h-11 rounded-xl px-5 text-sm",
        lg: "h-13 rounded-2xl px-7 text-base",
        xl: "h-14 rounded-2xl px-8 text-base",
        icon: "size-11 rounded-xl",
        "icon-sm": "size-9 rounded-lg",
      },
      pill: {
        true: "rounded-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      pill: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, pill, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, pill, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
