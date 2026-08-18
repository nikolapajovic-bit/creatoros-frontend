"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, Loader2, FileText } from "lucide-react";
import { SignatureProgress } from "@/components/contracts/signature-progress";
import { SignContractDialog } from "@/components/contracts/sign-contract-dialog";
import { RevisionHistory } from "@/components/contracts/revision-history";
import { ContractResponseActions } from "@/components/contracts/request-changes-dialog";
import { ContractRevisionActions } from "@/components/contracts/revise-contract-dialog";
import { brandGradient, brandInitial } from "@/lib/brand-visual";
import { formatCurrency } from "@/lib/utils";
import { CONTRACT_STATUSES } from "@/types/contract";
import { useContract } from "@/hooks/use-contracts";
import { useAuthStore } from "@/store/auth-store";

const STATUS_CONFIG = Object.fromEntries(CONTRACT_STATUSES.map((s) => [s.key, s]));

export default function ContractDetailPage() {
  const params = useParams<{ contractId: string }>();
  const { data: contract, isLoading, isError } = useContract(params.contractId);
  const user = useAuthStore((s) => s.user);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-brand" />
      </div>
    );
  }

  if (isError || !contract) {
    return (
      <div className="space-y-4">
        <Link href="/contracts" className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink">
          <ArrowLeft className="h-4 w-4" />
          Back to Contracts
        </Link>
        <p className="text-sm text-ink-faint">Contract not found.</p>
      </div>
    );
  }

  const status = STATUS_CONFIG[contract.status];
  const isCreator = user?.role === "creator";
  const isPendingResponse = contract.status === "awaiting_signature";
  const isChangesRequested = contract.status === "changes_requested";
  const needsMySignature = isCreator ? !contract.creatorSigned : !contract.brandSigned;

  const created = new Date(contract.createdDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const expires = new Date(contract.expiryDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="space-y-6">
      <Link href="/contracts" className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink">
        <ArrowLeft className="h-4 w-4" />
        Back to Contracts
      </Link>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-b from-brand/15 to-transparent p-6 ring-1 ring-foreground/10">
        <div className="pointer-events-none absolute -top-24 left-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-brand/20 blur-[100px]" />

        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-display text-xl font-semibold text-white shadow-glow"
              style={{ backgroundImage: brandGradient(contract.brand) }}
            >
              {brandInitial(contract.brand)}
            </div>
            <div className="min-w-0">
              <h1 className="font-display text-xl font-semibold text-foreground">{contract.title}</h1>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <span
                  className="flex items-center gap-1.5 rounded-full bg-surface-raised px-2.5 py-0.5"
                  style={{ color: status.color }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: status.color }} />
                  {status.label}
                </span>
                · {contract.brand}
              </p>
            </div>
          </div>
          <p className="rounded-xl bg-gold/10 px-4 py-2 font-mono text-2xl font-semibold text-gold">
            {formatCurrency(contract.value, contract.currency)}
          </p>
        </div>

        <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4">
          <SignatureProgress creatorSigned={contract.creatorSigned} brandSigned={contract.brandSigned} />

          <div className="flex gap-2">
            {isPendingResponse && needsMySignature && (
              <SignContractDialog contractId={contract.id} />
            )}

            {isCreator && isPendingResponse && (
              <ContractResponseActions contractId={contract.id} />
            )}

            {!isCreator && isChangesRequested && (
              <ContractRevisionActions contract={contract} />
            )}

            {contract.status === "signed" && contract.hasFinalPdf ? (
              <Link
                href={`/contracts/${contract.id}/view-pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-xl bg-surface-raised px-3.5 py-2 text-xs font-medium text-ink-muted transition-colors hover:bg-surface hover:text-ink"
              >
                <Download className="h-3.5 w-3.5" />
                View signed PDF
              </Link>
            ) : (
              <button
                disabled
                title="Available once both parties have signed"
                className="flex cursor-not-allowed items-center gap-1.5 rounded-xl bg-surface-raised px-3.5 py-2 text-xs font-medium text-ink-faint opacity-50"
              >
                <Download className="h-3.5 w-3.5" />
                Download PDF
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Info kartice */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-surface p-4 ring-1 ring-foreground/10">
          <p className="text-xs text-muted-foreground">Created</p>
          <p className="mt-1 text-sm font-medium text-foreground">{created}</p>
        </div>
        <div className="rounded-xl bg-surface p-4 ring-1 ring-foreground/10">
          <p className="text-xs text-muted-foreground">Expires</p>
          <p className="mt-1 text-sm font-medium text-foreground">{expires}</p>
        </div>
        <div className="rounded-xl bg-surface p-4 ring-1 ring-foreground/10">
          <p className="text-xs text-muted-foreground">Value</p>
          <p className="mt-1 text-sm font-medium text-foreground">
            {formatCurrency(contract.value, contract.currency)}
          </p>
        </div>
      </div>

      <RevisionHistory revisionRequests={contract.revisionRequests} />

      {/* Tekst ugovora */}
      <div className="overflow-hidden rounded-xl bg-surface ring-1 ring-foreground/10">
        <div className="flex items-center gap-2 bg-linear-to-b from-brand/10 to-transparent px-5 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/15 text-brand">
            <FileText className="h-4 w-4" />
          </div>
          <p className="text-sm font-medium text-foreground">Contract terms</p>
        </div>
        <p className="whitespace-pre-line px-5 py-5 text-sm leading-relaxed text-muted-foreground">
          {contract.bodyText}
        </p>
      </div>
    </div>
  );
}