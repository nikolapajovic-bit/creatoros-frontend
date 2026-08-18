"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { getSignedPdfUrlRequest } from "@/lib/api/contracts";

export default function ViewContractPdfPage() {
  const params = useParams<{ contractId: string }>();
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getSignedPdfUrlRequest(params.contractId)
      .then(setUrl)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load PDF"));
  }, [params.contractId]);

  return (
    <div className="flex h-[calc(100vh-2rem)] flex-col gap-3">
      <Link
        href={`/contracts/${params.contractId}`}
        className="inline-flex w-fit items-center gap-1.5 text-sm text-ink-muted hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to contract
      </Link>

      <div className="flex-1 overflow-hidden rounded-2xl bg-surface ring-1 ring-foreground/10">
        {error ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <AlertCircle className="h-8 w-8 text-fall" />
            <p className="text-sm text-foreground">{error}</p>
          </div>
        ) : url ? (
          <embed src={url} type="application/pdf" className="h-full w-full" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-brand" />
          </div>
        )}
      </div>
    </div>
  );
}