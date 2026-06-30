import Link from "next/link";
import { ArrowRight, MapPin, Sparkles, Star } from "lucide-react";
import { SITE } from "@/constants/site";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/common/reveal";
import { Icon } from "@/components/common/icon";

interface HeroProps {
  productCount: number;
  categoryCount: number;
  featuredCategories: { id: string; name: string; icon?: string }[];
}

export function Hero({
  productCount,
  categoryCount,
  featuredCategories,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient aurora background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-muted/60 to-background" />
        <div className="absolute -left-[10%] -top-[20%] size-[40rem] rounded-full bg-primary/20 blur-[120px] animate-aurora" />
        <div className="absolute -right-[5%] top-[5%] size-[34rem] rounded-full bg-[#f0a884]/25 blur-[120px] animate-aurora [animation-delay:-6s] dark:bg-[#7a2d22]/30" />
        <div className="absolute bottom-[-20%] left-[20%] size-[36rem] rounded-full bg-oxblood/10 blur-[130px] animate-aurora [animation-delay:-12s] dark:bg-oxblood/40" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,transparent,var(--background))]" />
      </div>

      <Container width="wide" className="pb-16 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3.5 py-1.5 text-xs font-medium text-foreground/80 shadow-card backdrop-blur-sm">
              <Sparkles className="size-3.5 text-primary" />
              {SITE.name} · {SITE.address.city}
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-6 text-balance font-display text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              A modern bistro,
              <br />
              <span className="text-gradient-brand">plated with intent.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Seasonal plates, stone-baked pizza, fresh pasta and fire-grilled
              mains — a {productCount}+ dish menu crafted from the finest
              ingredients. Browse, discover, and plan your visit.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="xl" pill className="w-full sm:w-auto">
                <Link href="/menu">
                  Explore the menu <ArrowRight className="size-4.5" />
                </Link>
              </Button>
              <Button
                asChild
                size="xl"
                variant="glass"
                pill
                className="w-full sm:w-auto"
              >
                <Link href="#visit">
                  <MapPin className="size-4.5" /> Find us
                </Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <Stat value={`${productCount}+`} label="Dishes" />
              <Divider />
              <Stat value={`${categoryCount}`} label="Categories" />
              <Divider />
              <span className="inline-flex items-center gap-1.5">
                <Star className="size-4 fill-warning text-warning" />
                <span className="font-semibold text-foreground">4.8</span> rated
              </span>
            </div>
          </Reveal>
        </div>

        {/* Floating category chips */}
        <Reveal delay={0.3}>
          <div className="mask-fade-x no-scrollbar mt-14 flex justify-start gap-3 overflow-x-auto sm:justify-center">
            {featuredCategories.map((c) => (
              <Link
                key={c.id}
                href={`/menu?category=${c.id}`}
                className="group flex shrink-0 items-center gap-2.5 rounded-2xl border border-border/60 bg-card/70 px-4 py-3 shadow-card backdrop-blur-md transition-all hover:-translate-y-0.5 hover:shadow-float"
              >
                <span className="grid size-9 place-items-center rounded-xl bg-surface-muted text-primary">
                  <Icon name={c.icon} className="size-4.5" />
                </span>
                <span className="text-sm font-medium">{c.name}</span>
              </Link>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span className="font-display text-base font-semibold text-foreground">
        {value}
      </span>
      {label}
    </span>
  );
}

function Divider() {
  return <span className="h-4 w-px bg-border" aria-hidden />;
}
