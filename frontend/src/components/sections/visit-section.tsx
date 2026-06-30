import { Clock, MapPin, Phone } from "lucide-react";
import { OPENING_HOURS, SITE } from "@/constants/site";
import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal } from "@/components/common/reveal";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";

/** Returns today's weekday name to highlight the current row. */
function todayName() {
  return new Date().toLocaleDateString("en-US", { weekday: "long" });
}

export function VisitSection() {
  const today = todayName();

  return (
    <section id="visit" className="py-16 sm:py-20">
      <Container width="wide">
        <Reveal>
          <SectionHeading
            eyebrow="Plan your visit"
            title="Find us"
            description="Walk-ins welcome. Book ahead for larger tables."
            align="center"
            className="mx-auto items-center text-center"
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-5">
          {/* Map placeholder */}
          <Reveal className="lg:col-span-3">
            <div className="relative h-full min-h-72 overflow-hidden rounded-3xl border border-border/60 shadow-card">
              <div className="absolute inset-0 bg-gradient-to-br from-[#eef1ea] to-[#dfe4d6] dark:from-[#1c211b] dark:to-[#141813]" />
              {/* faux street grid */}
              <div
                className="absolute inset-0 opacity-60 dark:opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
                  backgroundSize: "44px 44px",
                }}
                aria-hidden
              />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="relative grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-float">
                  <MapPin className="size-7" />
                  <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-2xl bg-background/80 px-4 py-3 shadow-card backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <Logo height={26} tone="brand" />
                  <div>
                    <p className="text-sm font-semibold">{SITE.address.line1}</p>
                    <p className="text-xs text-muted-foreground">
                      {SITE.address.city}, {SITE.address.country}
                    </p>
                  </div>
                </div>
                <Button asChild size="sm" variant="outline" className="shrink-0">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      `${SITE.address.line1}, ${SITE.address.city}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Directions
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>

          {/* Hours & contact */}
          <Reveal delay={0.08} className="lg:col-span-2">
            <div className="flex h-full flex-col gap-5 rounded-3xl border border-border/60 bg-card p-6 shadow-card">
              <div>
                <h3 className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
                  <Clock className="size-4.5 text-primary" /> Opening hours
                </h3>
                <ul className="mt-4 space-y-2 text-sm">
                  {OPENING_HOURS.map((h) => {
                    const isToday = h.day === today;
                    return (
                      <li
                        key={h.day}
                        className={
                          "flex justify-between gap-4 rounded-lg px-2 py-1 " +
                          (isToday
                            ? "bg-primary/8 font-semibold text-foreground"
                            : "text-muted-foreground")
                        }
                      >
                        <span>{h.day}</span>
                        <span className="tabular-nums">
                          {h.closed ? "Closed" : `${h.open} – ${h.close}`}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-auto border-t border-border/60 pt-5">
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Phone className="size-4.5" />
                  </span>
                  {SITE.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
