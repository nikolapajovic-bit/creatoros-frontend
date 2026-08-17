"use client";

import { FileSignature, Clock, CheckCircle2, Loader2 } from "lucide-react";
import { ContractRow } from "@/components/contracts/contract-row";
import { SentContractRow } from "@/components/contracts/sent-contract-row";
import { SendContractDialog } from "@/components/contracts/send-contract-dialog";
import { useContracts, useSentContracts } from "@/hooks/use-contracts";
import { useAuthStore } from "@/store/auth-store";
import { formatCurrency } from "@/lib/utils";

export default function ContractsPage() {
  const user = useAuthStore((s) => s.user);
  const isSender = user?.role === "brand" || user?.role === "agency";

  const contractsQuery = useContracts();
  const sentQuery = useSentContracts();

  const isLoading = isSender ? sentQuery.isLoading : contractsQuery.isLoading;
  const isError = isSender ? sentQuery.isError : contractsQuery.isError;

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-brand" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-ink-faint">
        Failed to load contracts. Please try again.
      </div>
    );
  }

  // --- Brand/Agency pogled ---
  if (isSender) {
    const sentContracts = sentQuery.data ?? [];
    const awaitingCount = sentContracts.filter((c) => c.status === "awaiting_signature").length;
    const signedCount = sentContracts.filter((c) => c.status === "signed").reduce((sum, c) => sum + Number(c.value), 0);

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-semibold text-foreground">Contracts</h1>
            <p className="text-sm text-muted-foreground">
              {awaitingCount} awaiting signature · {signedCount} signed
            </p>
          </div>
          <SendContractDialog />
        </div>

        {sentContracts.length === 0 ? (
          <EmptyState
            title="No contracts sent yet"
            description="Send your first contract to a creator."
          />
        ) : (
          <div className="space-y-2">
            {sentContracts.map((contract) => (
              <SentContractRow key={contract.id} contract={contract} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // --- Creator pogled ---
  const contracts = contractsQuery.data ?? [];
  const awaitingCount = contracts.filter((c) => c.status === "awaiting_signature").length;
  const signedValue = contracts
    .filter((c) => c.status === "signed")
    .reduce((sum, c) => sum + c.value, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-foreground">Contracts</h1>
        <p className="text-sm text-muted-foreground">
          {awaitingCount} awaiting signature · {formatCurrency(signedValue)} in signed agreements
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          icon={Clock}
          accent="gold"
          label="Awaiting signature"
          value={String(awaitingCount)}
        />
        <StatCard
          icon={CheckCircle2}
          accent="rise"
          label="Signed value"
          value={formatCurrency(signedValue)}
        />
        <StatCard
          icon={FileSignature}
          accent="brand"
          label="Total contracts"
          value={String(contracts.length)}
        />
      </div>

      {contracts.length === 0 ? (
        <EmptyState title="No contracts yet" description="Your agreements will show up here." />
      ) : (
        <div className="space-y-2">
          {contracts.map((contract) => (
            <ContractRow key={contract.id} contract={contract} />
          ))}
        </div>
      )}
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
  const accentClasses = {
    gold: "from-gold/15 text-gold",
    rise: "from-rise/15 text-rise",
    brand: "from-brand/15 text-brand",
  }[accent];

  return (
    <div
      className={`flex items-center gap-3 overflow-hidden rounded-xl bg-linear-to-b ${accentClasses.split(" ")[0]} to-transparent p-4 ring-1 ring-foreground/10`}
    >
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface shadow-glow ${accentClasses.split(" ")[1]}`}>
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