import Link from "next/link";
import { ArrowRight, QrCode } from "lucide-react";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/common/reveal";

export function HomeCta({ productCount }: { productCount: number }) {
  return (
    <section className="pb-8 pt-4 sm:pb-12">
      <Container width="wide">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-border/60 px-6 py-14 text-center shadow-float sm:px-12 sm:py-20">
            <div
              className="absolute inset-0 -z-10 bg-gradient-to-br from-oxblood via-[#5a1d1c] to-primary"
              aria-hidden
            />
            <div
              className="absolute inset-0 -z-10 bg-[radial-gradient(80%_120%_at_50%_-20%,rgba(255,255,255,0.18),transparent_60%)]"
              aria-hidden
            />

            <h2 className="mx-auto max-w-2xl text-balance font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              The whole menu, in your pocket.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-white/75 sm:text-lg">
              {productCount}+ dishes, always up to date. Scan at the table or
              browse from anywhere.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="xl"
                pill
                className="w-full bg-white text-oxblood hover:bg-white/90 sm:w-auto"
              >
                <Link href="/menu">
                  Browse the menu <ArrowRight className="size-4.5" />
                </Link>
              </Button>
              <span className="inline-flex items-center gap-2 text-sm text-white/70">
                <QrCode className="size-4.5" /> QR menu coming soon
              </span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
