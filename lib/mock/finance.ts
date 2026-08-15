import type { Invoice, Payout, MonthlyRevenue } from "@/types/finance";

export const MOCK_INVOICES: Invoice[] = [
  {
    id: "i1",
    number: "INV-2026-014",
    brand: "Nova Beauty",
    amount: 850,
    currency: "USD",
    status: "sent",
    issuedDate: "2026-07-28",
    dueDate: "2026-08-11",
  },
  {
    id: "i2",
    number: "INV-2026-013",
    brand: "Urban Fit",
    amount: 1200,
    currency: "USD",
    status: "paid",
    issuedDate: "2026-07-15",
    dueDate: "2026-07-29",
  },
  {
    id: "i3",
    number: "INV-2026-012",
    brand: "Café Lumen",
    amount: 400,
    currency: "USD",
    status: "paid",
    issuedDate: "2026-07-10",
    dueDate: "2026-07-24",
  },
  {
    id: "i4",
    number: "INV-2026-011",
    brand: "Aster Skincare",
    amount: 300,
    currency: "USD",
    status: "overdue",
    issuedDate: "2026-06-20",
    dueDate: "2026-07-04",
  },
  {
    id: "i5",
    number: "INV-2026-010",
    brand: "Pulse Audio",
    amount: 650,
    currency: "USD",
    status: "draft",
    issuedDate: "2026-08-01",
    dueDate: "2026-08-15",
  },
  {
    id: "i6",
    number: "INV-2026-009",
    brand: "Nova Beauty",
    amount: 900,
    currency: "USD",
    status: "paid",
    issuedDate: "2026-06-30",
    dueDate: "2026-07-14",
  },
];

export const MOCK_PAYOUTS: Payout[] = [
  {
    id: "p1",
    amount: 2100,
    currency: "USD",
    status: "completed",
    date: "2026-07-30",
    method: "Bank transfer",
  },
  {
    id: "p2",
    amount: 900,
    currency: "USD",
    status: "completed",
    date: "2026-07-16",
    method: "PayPal",
  },
  {
    id: "p3",
    amount: 1200,
    currency: "USD",
    status: "processing",
    date: "2026-08-01",
    method: "Bank transfer",
  },
];

export const MOCK_MONTHLY_REVENUE: MonthlyRevenue[] = [
  { month: "Feb", amount: 2800 },
  { month: "Mar", amount: 3400 },
  { month: "Apr", amount: 3100 },
  { month: "May", amount: 4200 },
  { month: "Jun", amount: 3900 },
  { month: "Jul", amount: 4820 },
];

// Ukupna zarada od pocetka koriscenja platforme (lifetime)
export const MOCK_LIFETIME_EARNINGS = 42850;

// Zarada u istom periodu prosle godine - za poredjenje
export const MOCK_LIFETIME_EARNINGS_LAST_YEAR = 31200;
