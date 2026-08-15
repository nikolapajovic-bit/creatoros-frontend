export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue";
export type PayoutStatus = "pending" | "processing" | "completed";

export interface Invoice {
  id: string;
  number: string;
  brand: string;
  description: string;
  platform?: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  issuedDate: string;
  dueDate: string;
}

export interface Payout {
  id: string;
  amount: number;
  currency: string;
  status: PayoutStatus;
  date: string;
  method: string;
}

export interface MonthlyRevenue {
  month: string;
  amount: number;
}

export interface InvoiceStatusConfig {
  key: InvoiceStatus;
  label: string;
  color: string;
}

export const INVOICE_STATUSES: InvoiceStatusConfig[] = [
  { key: "draft", label: "Draft", color: "#5C5870" },
  { key: "sent", label: "Sent", color: "#7C5CFC" },
  { key: "paid", label: "Paid", color: "#4ADE80" },
  { key: "overdue", label: "Overdue", color: "#F0577A" },
];
