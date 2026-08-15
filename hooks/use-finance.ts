import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as financeApi from "@/lib/api/finance";

export function useInvoices() {
  return useQuery({
    queryKey: ["invoices"],
    queryFn: financeApi.getInvoicesRequest,
  });
}

export function usePayouts() {
  return useQuery({
    queryKey: ["payouts"],
    queryFn: financeApi.getPayoutsRequest,
  });
}

export function useMonthlyRevenue() {
  return useQuery({
    queryKey: ["monthly-revenue"],
    queryFn: financeApi.getMonthlyRevenueRequest,
  });
}

export function useCreateInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: financeApi.createInvoiceRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
}

export function useCreatePayout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: financeApi.createPayoutRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payouts"] });
    },
  });
}

export function useReceivedInvoices() {
  return useQuery({
    queryKey: ["invoices", "received"],
    queryFn: financeApi.getReceivedInvoicesRequest,
  });
}
