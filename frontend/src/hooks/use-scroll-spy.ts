"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view, for sticky category navigation.
 * Pass the ids of the sections to observe.
 */
export function useScrollSpy(
  ids: string[],
  options?: { rootMargin?: string; threshold?: number }
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!ids.length) return;
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      {
        rootMargin: options?.rootMargin ?? "-45% 0px -50% 0px",
        threshold: options?.threshold ?? 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, options?.rootMargin, options?.threshold]);

  return activeId;
}
