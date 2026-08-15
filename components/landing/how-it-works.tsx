const STEPS = [
  {
    n: "01",
    title: "Connect your accounts",
    desc: "Link Instagram, TikTok, and YouTube. Your follower count, engagement, and top posts sync in automatically.",
  },
  {
    n: "02",
    title: "Send or receive a deal",
    desc: "Pitch a brand or respond to an inquiry, negotiate terms, and send a contract for e-signature — all in one thread.",
  },
  {
    n: "03",
    title: "Get paid, see what worked",
    desc: "Track the invoice to paid, then check the analytics to see how the campaign actually performed.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-3 py-20 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">
            From first message to paid
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Up and running in three steps
          </h2>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl bg-surface ring-1 ring-foreground/10">
          <div className="bg-linear-to-b from-brand/10 to-transparent px-6 py-4">
            <p className="text-sm font-medium text-foreground">Onboarding</p>
          </div>

          <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-3 md:gap-6 md:p-8">
            {STEPS.map((step) => (
              <div key={step.n} className="flex gap-3.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-muted font-mono text-xs font-semibold text-brand">
                  {step.n}
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
