import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as dealsApi from "@/lib/api/deals";
import { useAuthStore } from "@/store/auth-store";
import type { Deal } from "@/types/deal";

const DEALS_KEY = ["deals"] as const;

export function useDeals() {
  const userId = useAuthStore((s) => s.user?.id);

  return useQuery({
    queryKey: [...DEALS_KEY, userId],
    queryFn: () => dealsApi.getDealsRequest(userId!),
    enabled: !!userId,
  });
}

export function useSentDeals() {
  const userId = useAuthStore((s) => s.user?.id);

  return useQuery({
    queryKey: [...DEALS_KEY, "sent", userId],
    queryFn: () => dealsApi.getSentDealsRequest(userId!),
    enabled: !!userId,
  });
}

export function useDeal(id: string) {
  const userId = useAuthStore((s) => s.user?.id);

  return useQuery({
    queryKey: [...DEALS_KEY, id, userId],
    queryFn: () => dealsApi.getDealRequest(id, userId!),
    enabled: !!id && !!userId,
  });
}

export function useUpdateDeal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<Deal> }) =>
      dealsApi.updateDealRequest(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DEALS_KEY });
    },
  });
}

export function useCreateDeal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dealsApi.createDealRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DEALS_KEY });
    },
  });
}

export function useSendDeal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dealsApi.sendDealRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DEALS_KEY });
    },
  });
}

export function useRespondToDeal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      response,
    }: {
      id: string;
      response: "accepted" | "declined";
    }) => dealsApi.respondToDealRequest(id, response),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DEALS_KEY });
    },
  });
}

export function useProposeOffer() {
  const queryClient = useQueryClient();
  const userId = useAuthStore((s) => s.user?.id);

  return useMutation({
    mutationFn: ({
      id,
      value,
      message,
    }: {
      id: string;
      value: number;
      message?: string;
    }) => dealsApi.proposeOfferRequest(id, value, message, userId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DEALS_KEY });
    },
  });
}

export function useAcceptOffer() {
  const queryClient = useQueryClient();
  const userId = useAuthStore((s) => s.user?.id);

  return useMutation({
    mutationFn: (id: string) => dealsApi.acceptOfferRequest(id, userId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DEALS_KEY });
    },
  });
}

export function useMarkDealComplete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dealsApi.markDealCompleteRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DEALS_KEY });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
}
