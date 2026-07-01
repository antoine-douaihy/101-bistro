import { MapPin, Phone } from "lucide-react";
import { SITE } from "@/constants/site";
import { Container } from "@/components/common/container";
import { Logo } from "@/components/brand/logo";
import { InstagramIcon } from "@/components/brand/social-icons";
import { getServerI18n } from "@/lib/i18n/server";
import { fmt } from "@/lib/i18n/messages";

export async function SiteFooter() {
  const { m } = await getServerI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-border/60 bg-surface-muted/50">
      <Container width="wide" className="py-6">
        <div className="flex flex-col items-center gap-x-8 gap-y-4 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:justify-between">
          {/* Brand + social */}
          <div className="flex items-center gap-4">
            <Logo height={26} tone="brand" />
            <div className="flex items-center gap-1.5">
              <SocialLink href={SITE.social.instagram} label="Instagram">
                <InstagramIcon className="size-4" />
              </SocialLink>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 shrink-0 text-primary" />
              {SITE.address.line1}, {SITE.address.city}
            </span>
            {SITE.phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/\s/g, "")}`}
                dir="ltr"
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Phone className="size-4 shrink-0 text-primary" />
                {phone}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-xs">
            <span>{fmt(m.footer.rights, { year, name: SITE.name })}</span>
            <span aria-hidden className="text-border">·</span>
            <span>{m.footer.developedBy}</span>
          </p>
        </div>
      </Container>
    </footer>
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
      className="grid size-9 place-items-center rounded-full border border-border/70 bg-background text-foreground/70 transition-colors hover:bg-primary hover:text-primary-foreground"
    >
      {children}
    </a>
  );
}
