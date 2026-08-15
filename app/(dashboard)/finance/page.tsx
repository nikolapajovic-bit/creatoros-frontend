"use client";

import { Loader2, Wallet, TrendingUp, Clock } from "lucide-react";
import { RevenueBarChart } from "@/components/finance/revenue-bar-chart";
import { InvoiceRow } from "@/components/finance/invoice-row";
import { PayoutsList } from "@/components/finance/payouts-list";
import { CreatePayoutDialog } from "@/components/finance/create-payout-dialog";
import {
  useInvoices,
  usePayouts,
  useMonthlyRevenue,
  useReceivedInvoices,
} from "@/hooks/use-finance";
import { useAuthStore } from "@/store/auth-store";
import { formatCurrency } from "@/lib/utils";

export default function FinancePage() {
  const user = useAuthStore((s) => s.user);
  const isSender = user?.role === "brand" || user?.role === "agency";

  if (isSender) {
    return <BrandFinanceView />;
  }

  return <CreatorFinanceView />;
}

function BrandFinanceView() {
  const { data: invoices, isLoading } = useReceivedInvoices();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-brand" />
      </div>
    );
  }

  const safeInvoices = invoices ?? [];
  const totalOwed = safeInvoices
    .filter((i) => i.status !== "paid")
    .reduce((sum, i) => sum + i.amount, 0);
  const totalPaid = safeInvoices
    .filter((i) => i.status === "paid")
    .reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-foreground">Finance</h1>
        <p className="text-sm text-muted-foreground">Invoices from your creator collaborations</p>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-linear-to-b from-gold/15 to-transparent p-6 ring-1 ring-foreground/10">
        <div className="pointer-events-none absolute -top-24 left-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-gold/20 blur-[100px]" />
        <div className="relative flex flex-wrap gap-8">
          <div>
            <p className="text-sm text-muted-foreground">Outstanding</p>
            <p className="mt-1 rounded-xl bg-gold/15 px-4 py-2 font-mono text-3xl font-semibold text-gold">
              {formatCurrency(totalOwed)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Paid</p>
            <p className="mt-1 rounded-xl bg-rise/15 px-4 py-2 font-mono text-3xl font-semibold text-rise">
              {formatCurrency(totalPaid)}
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl bg-surface ring-1 ring-foreground/10">
        <div className="bg-linear-to-b from-brand/10 to-transparent px-5 py-4">
          <p className="text-sm font-medium text-foreground">Received invoices</p>
        </div>
        {safeInvoices.length === 0 ? (
          <p className="py-10 text-center text-sm text-ink-faint">No invoices yet.</p>
        ) : (
          <div className="space-y-2 p-5">
            {safeInvoices.map((invoice) => (
              <InvoiceRow key={invoice.id} invoice={invoice} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CreatorFinanceView() {
  const { data: invoices, isLoading: invoicesLoading } = useInvoices();
  const { data: payouts, isLoading: payoutsLoading } = usePayouts();
  const { data: revenue, isLoading: revenueLoading } = useMonthlyRevenue();

  const isLoading = invoicesLoading || payoutsLoading || revenueLoading;

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-brand" />
      </div>
    );
  }

  const safeInvoices = invoices ?? [];
  const safePayouts = payouts ?? [];
  const safeRevenue = revenue ?? [];

  const outstanding = safeInvoices
    .filter((i) => i.status === "sent" || i.status === "overdue")
    .reduce((sum, i) => sum + i.amount, 0);

  const paidThisMonth = safeRevenue.length > 0 ? safeRevenue[safeRevenue.length - 1].amount : 0;

  const lifetimeEarnings = safeInvoices
    .filter((i) => i.status === "paid")
    .reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-foreground">Finance</h1>
          <p className="text-sm text-muted-foreground">Revenue, invoices, and payouts</p>
        </div>
        <CreatePayoutDialog />
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-b from-gold/15 to-transparent p-6 ring-1 ring-foreground/10">
        <div className="pointer-events-none absolute -top-24 left-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-gold/20 blur-[100px]" />

        <div className="relative flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Total lifetime earnings</p>
            <p className="mt-1 font-mono text-4xl font-semibold text-foreground">
              {formatCurrency(lifetimeEarnings)}
            </p>
          </div>
          <div className="flex gap-3">
            <div className="rounded-xl bg-surface/60 px-4 py-2.5">
              <p className="text-xs text-muted-foreground">This month</p>
              <p className="mt-0.5 font-mono text-lg font-semibold text-foreground">
                {formatCurrency(paidThisMonth)}
              </p>
            </div>
            <div className="rounded-xl bg-surface/60 px-4 py-2.5">
              <p className="text-xs text-muted-foreground">Outstanding</p>
              <p className="mt-0.5 font-mono text-lg font-semibold text-foreground">
                {formatCurrency(outstanding)}
              </p>
            </div>
          </div>
        </div>

        {safeRevenue.length > 0 && (
          <div className="relative mt-6 h-56">
            <RevenueBarChart data={safeRevenue} />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="overflow-hidden rounded-xl bg-surface ring-1 ring-foreground/10 lg:col-span-2">
          <div className="flex items-center gap-2 bg-linear-to-b from-brand/10 to-transparent px-5 py-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/15 text-brand">
              <Wallet className="h-4 w-4" />
            </div>
            <p className="text-sm font-medium text-foreground">Invoices</p>
          </div>
          {safeInvoices.length === 0 ? (
            <p className="py-10 text-center text-sm text-ink-faint">No invoices yet.</p>
          ) : (
            <div className="space-y-2 p-5">
              {safeInvoices.map((invoice) => (
                <InvoiceRow key={invoice.id} invoice={invoice} />
              ))}
            </div>
          )}
        </div>

        <div className="overflow-hidden rounded-xl bg-surface ring-1 ring-foreground/10">
          <div className="flex items-center gap-2 bg-linear-to-b from-rise/10 to-transparent px-5 py-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rise/15 text-rise">
              <TrendingUp className="h-4 w-4" />
            </div>
            <p className="text-sm font-medium text-foreground">Recent payouts</p>
          </div>
          {safePayouts.length === 0 ? (
            <p className="py-10 text-center text-sm text-ink-faint">No payouts yet.</p>
          ) : (
            <div className="p-5">
              <PayoutsList payouts={safePayouts} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}