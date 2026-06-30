import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names, resolving conflicts deterministically.
 * Used by every UI primitive (shadcn convention).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
