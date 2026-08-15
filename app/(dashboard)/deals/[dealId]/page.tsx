"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarClock,
  Camera,
  PlaySquare,
  Music2,
  Loader2,
  Check,
  X,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { StageStepper } from "@/components/deals/stage-stepper";
import { OfferPanel } from "@/components/deals/offer-panel";
import { brandGradient, brandInitial } from "@/lib/brand-visual";
import { formatCurrency } from "@/lib/utils";
import { DEAL_STAGES } from "@/types/deal";
import { useDeal, useRespondToDeal, useUpdateDeal, useMarkDealComplete } from "@/hooks/use-deals";

const PLATFORM_ICONS = {
  instagram: Camera,
  youtube: PlaySquare,
  tiktok: Music2,
  other: CalendarClock,
};

export default function DealDetailPage() {
  const params = useParams<{ dealId: string }>();
  const router = useRouter();
  const { data: deal, isLoading, isError } = useDeal(params.dealId);
  const respond = useRespondToDeal();
  const updateDeal = useUpdateDeal();
  const markComplete = useMarkDealComplete();

  function handleAdvanceStage() {
    if (!deal) return;
    const currentIndex = DEAL_STAGES.findIndex((s) => s.key === deal.stage);
    const next = DEAL_STAGES[currentIndex + 1];
    if (!next) return;

    if (next.key === "completed") {
      markComplete.mutate(deal.id);
      return;
    }

    updateDeal.mutate({ id: deal.id, input: { stage: next.key } });
  }

  function handleRespond(response: "accepted" | "declined") {
    if (!deal) return;
    respond.mutate(
      { id: deal.id, response },
      { onSuccess: () => router.push("/deals") }
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-brand" />
      </div>
    );
  }

  if (isError || !deal) {
    return (
      <div className="space-y-4">
        <Link href="/deals" className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink">
          <ArrowLeft className="h-4 w-4" />
          Back to Deals
        </Link>
        <p className="text-sm text-ink-faint">Deal not found.</p>
      </div>
    );
  }

  const Icon = PLATFORM_ICONS[deal.platform];
  const deadline = new Date(deal.deadline).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6">
      <Link href="/deals" className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink">
        <ArrowLeft className="h-4 w-4" />
        Back to Deals
      </Link>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-b from-brand/15 to-transparent p-6 ring-1 ring-foreground/10">
        <div className="pointer-events-none absolute -top-24 left-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-brand/20 blur-[100px]" />

        <div className="relative flex items-start gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-display text-xl font-semibold text-white shadow-glow"
            style={{ backgroundImage: brandGradient(deal.brand) }}
          >
            {brandInitial(deal.brand)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h1 className="font-display text-xl font-semibold text-foreground">{deal.brand}</h1>
              <Icon className="h-4 w-4 shrink-0 text-ink-faint" />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{deal.title}</p>
          </div>
          <p className="shrink-0 rounded-xl bg-gold/10 px-4 py-2 font-mono text-2xl font-semibold text-gold">
            {formatCurrency(deal.value, deal.currency)}
          </p>
        </div>

        <div className="relative mt-8">
          {deal.approvalStatus === "pending" ? (
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-ink-muted">This deal is awaiting your response.</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleRespond("declined")}
                  disabled={respond.isPending}
                  className="flex items-center gap-1.5 rounded-xl bg-surface-raised px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-fall/15 hover:text-fall disabled:opacity-50"
                >
                  <X className="h-4 w-4" />
                  Decline
                </button>
                <button
                  onClick={() => handleRespond("accepted")}
                  disabled={respond.isPending}
                  className="flex items-center gap-1.5 rounded-xl bg-rise px-4 py-2 text-sm font-medium text-white shadow-glow transition-colors hover:bg-rise/90 disabled:opacity-50 disabled:shadow-none"
                >
                  {respond.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                  Accept
                </button>
              </div>
            </div>
          ) : (
            <div>
              <StageStepper current={deal.stage} />
              {deal.stage !== "completed" && (
                <div className="mt-6 flex flex-col items-end gap-2">
                  {deal.sentByBrand && deal.stage === "in-progress" && (
                    <div className="flex items-center gap-3 rounded-full bg-surface-raised px-3 py-1.5 text-xs text-ink-faint">
                      <span className="flex items-center gap-1">
                        {deal.creatorMarkedComplete ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-rise" />
                        ) : (
                          <Clock className="h-3.5 w-3.5" />
                        )}
                        Creator
                      </span>
                      <span className="flex items-center gap-1">
                        {deal.brandMarkedComplete ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-rise" />
                        ) : (
                          <Clock className="h-3.5 w-3.5" />
                        )}
                        Brand
                      </span>
                    </div>
                  )}
                  <button
                    onClick={handleAdvanceStage}
                    disabled={updateDeal.isPending || markComplete.isPending}
                    className="rounded-xl bg-linear-to-r from-brand to-brand-hover px-4 py-2 text-sm font-semibold text-white shadow-glow transition-all disabled:opacity-60 disabled:shadow-none"
                  >
                    {updateDeal.isPending || markComplete.isPending
                      ? "Updating..."
                      : `Mark as "${DEAL_STAGES[DEAL_STAGES.findIndex((s) => s.key === deal.stage) + 1]?.label}"`}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Info kartice */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-surface p-4 ring-1 ring-foreground/10">
          <p className="text-xs text-muted-foreground">Deadline</p>
          <p className="mt-1 text-sm font-medium text-foreground">{deadline}</p>
        </div>
        <div className="rounded-xl bg-surface p-4 ring-1 ring-foreground/10">
          <p className="text-xs text-muted-foreground">Platform</p>
          <p className="mt-1 text-sm font-medium capitalize text-foreground">{deal.platform}</p>
        </div>
        <div className="rounded-xl bg-surface p-4 ring-1 ring-foreground/10">
          <p className="text-xs text-muted-foreground">Value</p>
          <p className="mt-1 text-sm font-medium text-foreground">
            {formatCurrency(deal.value, deal.currency)}
          </p>
        </div>
      </div>

      {deal.sentByBrand && deal.approvalStatus === "accepted" && <OfferPanel deal={deal} />}

      <div className="overflow-hidden rounded-xl bg-surface ring-1 ring-foreground/10">
        <div className="bg-linear-to-b from-brand/10 to-transparent px-5 py-4">
          <p className="text-sm font-medium text-foreground">Notes</p>
        </div>
        <p className="px-5 py-5 text-sm text-muted-foreground">
          No notes yet for this deal. This section will connect to the backend so you can add
          deliverable details, brand contacts, and internal notes.
        </p>
      </div>
    </div>
  );
}