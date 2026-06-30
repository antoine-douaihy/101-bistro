import Link from "next/link";
import { ArrowLeft, UtensilsCrossed } from "lucide-react";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";

export default function NotFound() {
  return (
    <Container width="narrow" className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <Logo height={44} tone="brand" />
      <span className="mt-10 grid size-16 place-items-center rounded-2xl bg-surface-muted text-primary shadow-card">
        <UtensilsCrossed className="size-8" />
      </span>
      <p className="mt-6 font-display text-6xl font-semibold tracking-tight text-foreground">
        404
      </p>
      <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight">
        This table isn&apos;t set
      </h1>
      <p className="mt-2 max-w-sm text-pretty text-muted-foreground">
        The page you&apos;re looking for has moved or never existed. Let&apos;s
        get you back to the good stuff.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/menu">Browse the menu</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/">
            <ArrowLeft className="size-4" /> Back home
          </Link>
        </Button>
      </div>
    </Container>
  );
}
