import { apiFetch } from "@/lib/api/client";
import type { Invoice, Payout, MonthlyRevenue } from "@/types/finance";

interface InvoiceApiResponse {
  _id: string;
  number: string;
  brand: string;
  description: string;
  platform?: string;
  amount: number;
  currency: string;
  status: Invoice["status"];
  issuedDate: string;
  dueDate: string;
  billedTo?: string;
}

interface PayoutApiResponse {
  _id: string;
  amount: number;
  currency: string;
  status: Payout["status"];
  date: string;
  method: string;
}

function mapInvoice(raw: InvoiceApiResponse): Invoice {
  return {
    id: raw._id,
    number: raw.number,
    brand: raw.brand,
    description: raw.description,
    platform: raw.platform,
    amount: raw.amount,
    currency: raw.currency,
    status: raw.status,
    issuedDate: raw.issuedDate,
    dueDate: raw.dueDate,
  };
}

function mapPayout(raw: PayoutApiResponse): Payout {
  return {
    id: raw._id,
    amount: raw.amount,
    currency: raw.currency,
    status: raw.status,
    date: raw.date,
    method: raw.method,
  };
}

export async function getInvoicesRequest(): Promise<Invoice[]> {
  const data = await apiFetch<{ invoices: InvoiceApiResponse[] }>(
    "/finance/invoices",
  );
  return data.invoices.map(mapInvoice);
}

export async function getPayoutsRequest(): Promise<Payout[]> {
  const data = await apiFetch<{ payouts: PayoutApiResponse[] }>(
    "/finance/payouts",
  );
  return data.payouts.map(mapPayout);
}

export async function getMonthlyRevenueRequest(): Promise<MonthlyRevenue[]> {
  const data = await apiFetch<{ revenue: MonthlyRevenue[] }>(
    "/finance/revenue",
  );
  return data.revenue;
}

export async function suggestInvoiceNumberRequest(): Promise<string> {
  const data = await apiFetch<{ number: string }>(
    "/finance/invoices/suggest-number",
  );
  return data.number;
}

export async function createInvoiceRequest(input: {
  number: string;
  brand: string;
  amount: number;
  currency?: string;
  issuedDate: string;
  dueDate: string;
  dealId?: string;
  contractId?: string;
}): Promise<Invoice> {
  const data = await apiFetch<{ invoice: InvoiceApiResponse }>(
    "/finance/invoices",
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );

  return mapInvoice(data.invoice);
}

export async function createPayoutRequest(input: {
  amount: number;
  currency?: string;
  date: string;
  method: string;
}): Promise<Payout> {
  const data = await apiFetch<{ payout: PayoutApiResponse }>(
    "/finance/payouts",
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );

  return mapPayout(data.payout);
}

export async function getReceivedInvoicesRequest(): Promise<Invoice[]> {
  const data = await apiFetch<{ invoices: InvoiceApiResponse[] }>(
    "/finance/invoices/received",
  );

  return data.invoices.map(mapInvoice);
}
