"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  /** Accessible title; pass `srTitle` to hide it visually. */
  title?: string;
  srTitle?: boolean;
  description?: string;
  className?: string;
  showClose?: boolean;
  /** Use the larger content layout for rich detail views. */
  size?: "default" | "lg";
}

const overlayMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const },
};

const contentMotion = {
  initial: { opacity: 0, scale: 0.96, y: 16 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.97, y: 12 },
  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
};

export function Modal({
  open,
  onOpenChange,
  children,
  title,
  srTitle = false,
  description,
  className,
  showClose = true,
  size = "default",
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                {...overlayMotion}
                className="fixed inset-0 z-50 bg-oxblood/45 backdrop-blur-md"
              />
            </Dialog.Overlay>

            <div className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto p-0 sm:items-center sm:p-6">
              <Dialog.Content
                asChild
                forceMount
                onOpenAutoFocus={(e) => e.preventDefault()}
                aria-describedby={description ? undefined : undefined}
              >
                <motion.div
                  {...contentMotion}
                  className={cn(
                    "relative w-full overflow-hidden border border-border/60 bg-card text-card-foreground shadow-pop",
                    "rounded-t-3xl sm:rounded-3xl",
                    size === "lg"
                      ? "max-w-3xl"
                      : "max-w-lg",
                    className
                  )}
                >
                  {title ? (
                    srTitle ? (
                      <VisuallyHidden asChild>
                        <Dialog.Title>{title}</Dialog.Title>
                      </VisuallyHidden>
                    ) : (
                      <Dialog.Title className="sr-only">{title}</Dialog.Title>
                    )
                  ) : null}
                  {description && (
                    <VisuallyHidden asChild>
                      <Dialog.Description>{description}</Dialog.Description>
                    </VisuallyHidden>
                  )}

                  {showClose && (
                    <Dialog.Close asChild>
                      <button
                        aria-label="Close"
                        className="absolute end-3.5 top-3.5 z-20 grid size-9 place-items-center rounded-full bg-background/70 text-foreground shadow-card backdrop-blur-md transition-all hover:bg-background active:scale-95"
                      >
                        <X className="size-4.5" />
                      </button>
                    </Dialog.Close>
                  )}

                  {children}
                </motion.div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
