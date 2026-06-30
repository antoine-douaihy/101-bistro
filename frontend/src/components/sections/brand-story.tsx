import { Leaf, Soup, ChefHat } from "lucide-react";
import { Container } from "@/components/common/container";
import { Reveal } from "@/components/common/reveal";
import { Logo } from "@/components/brand/logo";

const PILLARS = [
  {
    icon: Leaf,
    title: "Seasonal & local",
    body: "We build the menu around what's at its peak, sourced from growers we trust.",
  },
  {
    icon: ChefHat,
    title: "Made to order",
    body: "Every plate is finished à la minute — never sitting, always considered.",
  },
  {
    icon: Soup,
    title: "Honest cooking",
    body: "Familiar dishes, elevated with technique and a little quiet ambition.",
  },
];

export function BrandStory() {
  return (
    <section id="story" className="py-16 sm:py-24">
      <Container width="wide">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Visual */}
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/60 shadow-float">
              <div className="absolute inset-0 bg-gradient-to-br from-[#f7ddd4] via-[#efc7b6] to-[#e3a88f] dark:from-[#3a1d16] dark:via-[#2c1410] dark:to-[#1d0d0b]" />
              <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(255,255,255,0.5),transparent_55%)] dark:bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(255,255,255,0.08),transparent_55%)]" />
              <div className="absolute inset-0 grid place-items-center">
                <Logo height={120} tone="brand" className="opacity-90" />
              </div>
              <div className="absolute bottom-5 left-5 rounded-2xl bg-background/70 px-4 py-3 shadow-card backdrop-blur-md">
                <p className="font-display text-sm font-semibold">Est. 101</p>
                <p className="text-xs text-muted-foreground">Neighbourhood bistro</p>
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <span className="h-px w-6 bg-primary/40" /> Our story
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-4 text-balance font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Cooking that feels like a place, not just a plate.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                101 Bistro began with a simple idea: a warm room, a short walk
                from home, where the food is generous and the details are never
                an afterthought. Today our kitchen sends out hundreds of dishes a
                week — each one held to the same standard as the first.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {PILLARS.map((p, i) => (
                <Reveal key={p.title} delay={0.16 + i * 0.06}>
                  <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-card">
                    <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                      <p.icon className="size-5" />
                    </span>
                    <h3 className="mt-3 font-display text-base font-semibold tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
