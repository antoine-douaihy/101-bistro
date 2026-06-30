import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { OPENING_HOURS, PRIMARY_NAV, SITE } from "@/constants/site";
import { Container } from "@/components/common/container";
import { Logo } from "@/components/brand/logo";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from "@/components/brand/social-icons";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border/60 bg-surface-muted/50">
      <Container width="wide" className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo height={36} tone="brand" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {SITE.tagline} {SITE.description.split(".")[1]?.trim()}.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <SocialLink href={SITE.social.instagram} label="Instagram">
                <InstagramIcon className="size-4.5" />
              </SocialLink>
              <SocialLink href={SITE.social.facebook} label="Facebook">
                <FacebookIcon className="size-4.5" />
              </SocialLink>
              <SocialLink href={SITE.social.tiktok} label="TikTok">
                <TikTokIcon className="size-4.5" />
              </SocialLink>
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <FooterHeading>Explore</FooterHeading>
            <ul className="space-y-2.5">
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit */}
          <div className="lg:col-span-3">
            <FooterHeading>Visit us</FooterHeading>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>
                  {SITE.address.line1}
                  <br />
                  {SITE.address.city}, {SITE.address.country}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-primary" />
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-foreground"
                >
                  {SITE.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="lg:col-span-3">
            <FooterHeading>
              <Clock className="size-3.5" /> Hours
            </FooterHeading>
            <ul className="space-y-1.5 text-sm">
              {OPENING_HOURS.slice(0, 4).map((h) => (
                <li
                  key={h.day}
                  className="flex justify-between gap-4 text-muted-foreground"
                >
                  <span>{h.day}</span>
                  <span className="tabular-nums">
                    {h.closed ? "Closed" : `${h.open} – ${h.close}`}
                  </span>
                </li>
              ))}
              <li className="flex justify-between gap-4 text-muted-foreground">
                <span>Fri – Sun</span>
                <span className="tabular-nums">11:00 – late</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Crafted with care · A premium digital menu experience
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-foreground">
      {children}
    </h3>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid size-10 place-items-center rounded-full border border-border/70 bg-background text-foreground/70 transition-colors hover:bg-primary hover:text-primary-foreground"
    >
      {children}
    </a>
  );
}
