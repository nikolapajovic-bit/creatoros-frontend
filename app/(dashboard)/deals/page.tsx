"use client";

import { Loader2, Handshake, TrendingUp, CheckCircle2 } from "lucide-react";
import { DealList } from "@/components/deals/deal-list";
import { PendingDealCard } from "@/components/deals/pending-deal-card";
import { SendDealDialog } from "@/components/deals/send-deal-dialog";
import { useDeals, useSentDeals } from "@/hooks/use-deals";
import { useAuthStore } from "@/store/auth-store";
import { formatCurrency } from "@/lib/utils";
import { Deal } from "@/types/deal";

export default function DealsPage() {
  const user = useAuthStore((s) => s.user);
  const isSender = user?.role === "brand" || user?.role === "agency";

  const dealsQuery = useDeals();
  const sentQuery = useSentDeals();

  const query = isSender ? sentQuery : dealsQuery;
  const allDeals = query.data ?? [];

  if (query.isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-brand" />
      </div>
    );
  }

  if (query.isError) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-ink-faint">
        Failed to load deals. Please try again.
      </div>
    );
  }

  const pendingDeals = allDeals.filter((d) => d.approvalStatus === "pending");
  const confirmedDeals = allDeals.filter((d) => d.approvalStatus !== "pending");

  const activeCount = confirmedDeals.filter((d) => d.stage !== "completed").length;
  const totalValue = confirmedDeals.reduce((sum, d) => sum + d.value, 0);
  const completedCount = confirmedDeals.filter((d) => d.stage === "completed").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-foreground">Deals</h1>
          <p className="text-sm text-muted-foreground">
            {activeCount} active · {formatCurrency(totalValue)} total pipeline value
          </p>
        </div>
        {isSender && <SendDealDialog />}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon={Handshake} accent="brand" label="Active deals" value={String(activeCount)} />
        <StatCard icon={TrendingUp} accent="gold" label="Pipeline value" value={formatCurrency(totalValue)} />
        <StatCard icon={CheckCircle2} accent="rise" label="Completed" value={String(completedCount)} />
      </div>

      {pendingDeals.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-wider text-ink-faint">
            {isSender ? "Awaiting creator response" : "Awaiting your response"} ({pendingDeals.length})
          </p>
          <div className="space-y-2">
            {pendingDeals.map((deal) =>
              isSender ? (
                <PendingSentCard key={deal.id} deal={deal} />
              ) : (
                <PendingDealCard key={deal.id} deal={deal} />
              )
            )}
          </div>
        </div>
      )}

      {confirmedDeals.length === 0 && pendingDeals.length === 0 ? (
        <EmptyState
          title="No deals yet"
          description={
            isSender
              ? "Send your first deal proposal to a creator."
              : "Your brand collaborations will show up here."
          }
        />
      ) : (
        <DealList deals={confirmedDeals} />
      )}
    </div>
  );
}

function PendingSentCard({ deal }: { deal: Deal }) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-gold/10 p-4 ring-1 ring-gold/30">
      <div>
        <p className="text-sm font-medium text-foreground">{deal.brand}</p>
        <p className="truncate text-xs text-muted-foreground">{deal.title}</p>
      </div>
      <span className="ml-auto shrink-0 font-mono text-sm font-semibold text-gold">
        {formatCurrency(deal.value, deal.currency)}
      </span>
      <span className="shrink-0 rounded-full bg-surface-raised px-2.5 py-1 text-xs font-medium text-ink-muted">
        Waiting for response
      </span>
    </div>
  );
}

function StatCard({
  icon: Icon,
  accent,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  accent: "gold" | "rise" | "brand";
  label: string;
  value: string;
}) {
  const gradientFrom = { gold: "from-gold/15", rise: "from-rise/15", brand: "from-brand/15" }[accent];
  const textColor = { gold: "text-gold", rise: "text-rise", brand: "text-brand" }[accent];

  return (
    <div className={`flex items-center gap-3 overflow-hidden rounded-xl bg-linear-to-b ${gradientFrom} to-transparent p-4 ring-1 ring-foreground/10`}>
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface shadow-glow ${textColor}`}>
        <Icon className="h-4.5 w-4.5" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-mono text-lg font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="relative flex h-64 flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl bg-surface/80 backdrop-blur-xl ring-1 ring-foreground/10">
      <div className="pointer-events-none absolute -top-20 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-brand/15 blur-[90px]" />
      <p className="relative text-sm font-medium text-foreground">{title}</p>
      <p className="relative text-xs text-ink-faint">{description}</p>
    </div>
  );
}