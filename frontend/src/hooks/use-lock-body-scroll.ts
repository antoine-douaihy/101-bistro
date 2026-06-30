"use client";

import { useEffect } from "react";

/** Locks body scroll while `locked` is true (modals, overlays, drawers). */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const original = document.body.style.overflow;
    const scrollBarComp =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollBarComp > 0) {
      document.body.style.paddingRight = `${scrollBarComp}px`;
    }
    return () => {
      document.body.style.overflow = original;
      document.body.style.paddingRight = "";
    };
  }, [locked]);
}
