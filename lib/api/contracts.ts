import { apiFetch } from "@/lib/api/client";
import type { Contract } from "@/types/contract";

interface RevisionRequestApiResponse {
  message: string;
  requestedBy: string;
  createdAt: string;
}

interface ContractApiResponse {
  _id: string;
  title: string;
  brand: string;
  bodyText: string;
  status: Contract["status"];
  value: number;
  currency: string;
  createdAt: string;
  expiryDate: string;
  creatorSigned: boolean;
  brandSigned: boolean;
  sentBy?: string;
  finalPdfUrl?: string;
  revisionRequests: RevisionRequestApiResponse[];
}

function mapContract(
  raw: ContractApiResponse,
  currentUserId?: string,
): Contract {
  return {
    id: raw._id,
    title: raw.title,
    brand: raw.brand,
    bodyText: raw.bodyText,
    status: raw.status,
    value: raw.value,
    currency: raw.currency,
    createdDate: raw.createdAt,
    expiryDate: raw.expiryDate,
    creatorSigned: raw.creatorSigned,
    brandSigned: raw.brandSigned,
    sentByBrand: !!raw.sentBy,
    finalPdfUrl: raw.finalPdfUrl,
    revisionRequests: (raw.revisionRequests ?? []).map((r) => ({
      message: r.message,
      requestedByMe: r.requestedBy === currentUserId,
      createdAt: r.createdAt,
    })),
  };
}

export async function getContractsRequest(
  currentUserId: string,
): Promise<Contract[]> {
  const data = await apiFetch<{ contracts: ContractApiResponse[] }>(
    "/contracts",
  );
  return data.contracts.map((c) => mapContract(c, currentUserId));
}

export async function getSentContractsRequest(
  currentUserId: string,
): Promise<Contract[]> {
  const data = await apiFetch<{ contracts: ContractApiResponse[] }>(
    "/contracts/sent",
  );
  return data.contracts.map((c) => mapContract(c, currentUserId));
}

export async function getContractRequest(
  id: string,
  currentUserId: string,
): Promise<Contract> {
  const data = await apiFetch<{ contract: ContractApiResponse }>(
    `/contracts/${id}`,
  );
  return mapContract(data.contract, currentUserId);
}

export async function updateContractRequest(
  id: string,
  input: Partial<{ status: Contract["status"]; value: number }>,
): Promise<Contract> {
  const data = await apiFetch<{ contract: ContractApiResponse }>(
    `/contracts/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(input),
    },
  );
  return mapContract(data.contract);
}

export async function signContractRequest(
  id: string,
  input: {
    fullName: string;
    agreedToConsent: true;
    signatureImage?: string;
    useSavedSignature?: boolean;
    saveSignatureForFuture?: boolean;
  },
): Promise<Contract> {
  const data = await apiFetch<{ contract: ContractApiResponse }>(
    `/contracts/${id}/sign`,
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );
  return mapContract(data.contract);
}

export interface SendContractInput {
  creatorId: string;
  title: string;
  brand: string;
  bodyText: string;
  value: number;
  currency?: string;
  expiryDate: string;
}

export async function sendContractRequest(
  input: SendContractInput,
): Promise<Contract> {
  const data = await apiFetch<{ contract: ContractApiResponse }>(
    "/contracts/send",
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );
  return mapContract(data.contract);
}

export async function declineContractRequest(id: string): Promise<Contract> {
  const data = await apiFetch<{ contract: ContractApiResponse }>(
    `/contracts/${id}/decline`,
    {
      method: "PATCH",
    },
  );
  return mapContract(data.contract);
}

export async function requestChangesRequest(
  id: string,
  message: string,
): Promise<Contract> {
  const data = await apiFetch<{ contract: ContractApiResponse }>(
    `/contracts/${id}/request-changes`,
    {
      method: "POST",
      body: JSON.stringify({ message }),
    },
  );
  return mapContract(data.contract);
}

export async function reviseContractRequest(
  id: string,
  input: Partial<{ bodyText: string; value: number; expiryDate: string }>,
): Promise<Contract> {
  const data = await apiFetch<{ contract: ContractApiResponse }>(
    `/contracts/${id}/revise`,
    {
      method: "PATCH",
      body: JSON.stringify(input),
    },
  );
  return mapContract(data.contract);
}

export async function withdrawContractRequest(id: string): Promise<Contract> {
  const data = await apiFetch<{ contract: ContractApiResponse }>(
    `/contracts/${id}/withdraw`,
    {
      method: "PATCH",
    },
  );

  return mapContract(data.contract);
}
