import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="px-3 py-20 md:px-6">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl bg-linear-to-b from-brand/15 to-transparent p-10 text-center ring-1 ring-foreground/10 sm:p-14">
        <div className="pointer-events-none absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-brand/20 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-20 right-1/4 h-56 w-56 rounded-full bg-gold/15 blur-[90px]" />

        <h2 className="relative font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Stop managing brand deals in your DMs.
        </h2>
        <p className="relative mx-auto mt-4 max-w-md text-[15px] text-muted-foreground">
          Set up your workspace in a few minutes. Free forever for your first
          five active deals.
        </p>
        <div className="relative mt-8 flex justify-center">
          <Button asChild size="lg" className="group h-12 w-full px-6 text-[15px] sm:w-auto">
            <Link href="/register">
              Create your free account
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
