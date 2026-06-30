"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type Side = "right" | "left" | "bottom";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
  side?: Side;
  className?: string;
  showClose?: boolean;
}

const sideMotion: Record<Side, Record<string, object>> = {
  right: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
  },
  left: {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "-100%" },
  },
  bottom: {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "100%" },
  },
};

const sidePosition: Record<Side, string> = {
  right: "inset-y-0 right-0 h-full w-full max-w-sm rounded-l-3xl border-l",
  left: "inset-y-0 left-0 h-full w-full max-w-sm rounded-r-3xl border-r",
  bottom:
    "inset-x-0 bottom-0 max-h-[85vh] w-full rounded-t-3xl border-t",
};

export function Sheet({
  open,
  onOpenChange,
  children,
  title,
  description,
  side = "right",
  className,
  showClose = true,
}: SheetProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-oxblood/45 backdrop-blur-md"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild forceMount>
              <motion.div
                {...sideMotion[side]}
                transition={{ type: "spring", damping: 30, stiffness: 320 }}
                className={cn(
                  "fixed z-50 flex flex-col border-border/60 bg-card text-card-foreground shadow-pop",
                  sidePosition[side],
                  className
                )}
              >
                {title ? (
                  <Dialog.Title className="sr-only">{title}</Dialog.Title>
                ) : (
                  <VisuallyHidden asChild>
                    <Dialog.Title>Panel</Dialog.Title>
                  </VisuallyHidden>
                )}
                {description && (
                  <VisuallyHidden asChild>
                    <Dialog.Description>{description}</Dialog.Description>
                  </VisuallyHidden>
                )}

                {showClose && (
                  <Dialog.Close asChild>
                    <button
                      aria-label="Close"
                      className="absolute right-3.5 top-3.5 z-20 grid size-9 place-items-center rounded-full bg-background/70 text-foreground shadow-card backdrop-blur-md transition-all hover:bg-background active:scale-95"
                    >
                      <X className="size-4.5" />
                    </button>
                  </Dialog.Close>
                )}

                {children}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
