import { apiFetch } from "@/lib/api/client";
import type { Deal } from "@/types/deal";

interface OfferApiResponse {
  value: number;
  message?: string;
  proposedBy: string;
  createdAt: string;
}

interface DealApiResponse {
  _id: string;
  brand: string;
  title: string;
  stage: Deal["stage"];
  approvalStatus: Deal["approvalStatus"];
  sentBy?: string;
  value: number;
  currency: string;
  deadline: string;
  platform: Deal["platform"];
  offers: OfferApiResponse[];
  creatorMarkedComplete: boolean;
  brandMarkedComplete: boolean;
}

function mapDeal(raw: DealApiResponse, currentUserId?: string): Deal {
  return {
    id: raw._id,
    brand: raw.brand,
    title: raw.title,
    stage: raw.stage,
    approvalStatus: raw.approvalStatus,
    sentByBrand: !!raw.sentBy,
    value: raw.value,
    currency: raw.currency,
    deadline: raw.deadline,
    platform: raw.platform,
    offers: (raw.offers ?? []).map((o) => ({
      value: o.value,
      message: o.message,
      proposedByMe: o.proposedBy === currentUserId,
      createdAt: o.createdAt,
    })),
    creatorMarkedComplete: raw.creatorMarkedComplete,
    brandMarkedComplete: raw.brandMarkedComplete,
  };
}

export async function getDealsRequest(currentUserId: string): Promise<Deal[]> {
  const data = await apiFetch<{ deals: DealApiResponse[] }>("/deals");
  return data.deals.map((d) => mapDeal(d, currentUserId));
}

export async function getDealRequest(
  id: string,
  currentUserId: string,
): Promise<Deal> {
  const data = await apiFetch<{ deal: DealApiResponse }>(`/deals/${id}`);
  return mapDeal(data.deal, currentUserId);
}

export async function createDealRequest(input: {
  brand: string;
  title: string;
  value: number;
  currency?: string;
  deadline: string;
  platform: Deal["platform"];
}): Promise<Deal> {
  const data = await apiFetch<{ deal: DealApiResponse }>("/deals", {
    method: "POST",
    body: JSON.stringify(input),
  });
  return mapDeal(data.deal);
}

export async function updateDealRequest(
  id: string,
  input: Partial<{ stage: Deal["stage"]; value: number; title: string }>,
): Promise<Deal> {
  const data = await apiFetch<{ deal: DealApiResponse }>(`/deals/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
  return mapDeal(data.deal);
}

export async function respondToDealRequest(
  id: string,
  response: "accepted" | "declined",
): Promise<Deal> {
  const data = await apiFetch<{ deal: DealApiResponse }>(
    `/deals/${id}/respond`,
    {
      method: "PATCH",
      body: JSON.stringify({ response }),
    },
  );
  return mapDeal(data.deal);
}

export async function deleteDealRequest(id: string): Promise<void> {
  await apiFetch<void>(`/deals/${id}`, { method: "DELETE" });
}

export async function sendDealRequest(input: {
  creatorId: string;
  brand: string;
  title: string;
  value: number;
  currency?: string;
  deadline: string;
  platform: Deal["platform"];
}): Promise<Deal> {
  const data = await apiFetch<{ deal: DealApiResponse }>("/deals/send", {
    method: "POST",
    body: JSON.stringify(input),
  });
  return mapDeal(data.deal);
}

export async function getSentDealsRequest(
  currentUserId: string,
): Promise<Deal[]> {
  const data = await apiFetch<{ deals: DealApiResponse[] }>("/deals/sent");
  return data.deals.map((d) => mapDeal(d, currentUserId));
}

export async function proposeOfferRequest(
  id: string,
  value: number,
  message: string | undefined,
  currentUserId: string,
): Promise<Deal> {
  const data = await apiFetch<{ deal: DealApiResponse }>(`/deals/${id}/offer`, {
    method: "POST",
    body: JSON.stringify({ value, message }),
  });
  return mapDeal(data.deal, currentUserId);
}

export async function acceptOfferRequest(
  id: string,
  currentUserId: string,
): Promise<Deal> {
  const data = await apiFetch<{ deal: DealApiResponse }>(
    `/deals/${id}/offer/accept`,
    {
      method: "PATCH",
    },
  );
  return mapDeal(data.deal, currentUserId);
}

export async function markDealCompleteRequest(id: string): Promise<Deal> {
  const data = await apiFetch<{ deal: DealApiResponse }>(
    `/deals/${id}/complete`,
    {
      method: "PATCH",
    },
  );

  return mapDeal(data.deal);
}
