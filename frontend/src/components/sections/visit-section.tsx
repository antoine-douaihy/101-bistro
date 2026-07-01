import { Clock, Phone } from "lucide-react";
import { OPENING_HOURS, SITE } from "@/constants/site";
import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal } from "@/components/common/reveal";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { getServerI18n } from "@/lib/i18n/server";

/** Returns today's weekday name to highlight the current row. */
function todayName() {
  return new Date().toLocaleDateString("en-US", { weekday: "long" });
}

export async function VisitSection() {
  const { m } = await getServerI18n();
  const today = todayName();

  return (
    <section id="visit" className="py-16 sm:py-20">
      <Container width="wide">
        <Reveal>
          <SectionHeading
            eyebrow={m.home.visit.eyebrow}
            title={m.home.visit.title}
            description={m.home.visit.description}
            align="center"
            className="mx-auto items-center text-center"
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-5">
          {/* Live map */}
          <Reveal className="lg:col-span-3">
            <div className="relative h-full min-h-72 overflow-hidden rounded-3xl border border-border/60 shadow-card">
              <iframe
                title={`${SITE.name} — ${SITE.address.full}`}
                src={SITE.map.embedUrl}
                className="absolute inset-0 size-full border-0 dark:[filter:invert(0.9)_hue-rotate(180deg)_brightness(0.95)]"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
              {/* scrim keeps the address card legible over the map */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background/70 to-transparent"
                aria-hidden
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-2xl bg-background/85 px-4 py-3 shadow-card backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <Logo height={26} tone="brand" />
                  <div>
                    <p className="text-sm font-semibold">{SITE.address.line1}</p>
                    <p className="text-xs text-muted-foreground">
                      {SITE.address.city}, {SITE.address.region}
                    </p>
                  </div>
                </div>
                <Button asChild size="sm" variant="outline" className="shrink-0">
                  <a
                    href={SITE.map.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {m.home.visit.directions}
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
                  <Clock className="size-4.5 text-primary" />{" "}
                  {m.home.visit.openingHours}
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
                        <span>{m.days[h.day as keyof typeof m.days]}</span>
                        <span className="tabular-nums" dir="ltr">
                          {h.closed ? m.common.closed : `${h.open} – ${h.close}`}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-auto space-y-2 border-t border-border/60 pt-5">
                {SITE.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    dir="ltr"
                    className="flex items-center gap-3 text-sm font-medium text-foreground transition-colors hover:text-primary"
                  >
                    <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Phone className="size-4.5" />
                    </span>
                    {phone}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
