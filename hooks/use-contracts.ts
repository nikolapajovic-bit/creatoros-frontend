import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as contractsApi from "@/lib/api/contracts";
import { useAuthStore } from "@/store/auth-store";
import type { Contract } from "@/types/contract";

const CONTRACTS_KEY = ["contracts"] as const;

export function useContracts() {
  const userId = useAuthStore((s) => s.user?.id);

  return useQuery({
    queryKey: [...CONTRACTS_KEY, userId],
    queryFn: () => contractsApi.getContractsRequest(userId!),
    enabled: !!userId,
  });
}

export function useSentContracts() {
  const userId = useAuthStore((s) => s.user?.id);

  return useQuery({
    queryKey: [...CONTRACTS_KEY, "sent", userId],
    queryFn: () => contractsApi.getSentContractsRequest(userId!),
    enabled: !!userId,
  });
}

export function useContract(id: string) {
  const userId = useAuthStore((s) => s.user?.id);

  return useQuery({
    queryKey: [...CONTRACTS_KEY, id, userId],
    queryFn: () => contractsApi.getContractRequest(id, userId!),
    enabled: !!id && !!userId,
  });
}

export function useUpdateContract() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<Contract> }) =>
      contractsApi.updateContractRequest(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTRACTS_KEY });
    },
  });
}

export function useSignContract() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      input,
    }: {
      id: string;
      input: Parameters<typeof contractsApi.signContractRequest>[1];
    }) => contractsApi.signContractRequest(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTRACTS_KEY });
    },
  });
}

export function useSendContract() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: contractsApi.sendContractRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTRACTS_KEY });
    },
  });
}

export function useDeclineContract() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: contractsApi.declineContractRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CONTRACTS_KEY }),
  });
}

export function useRequestChanges() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, message }: { id: string; message: string }) =>
      contractsApi.requestChangesRequest(id, message),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CONTRACTS_KEY }),
  });
}

export function useReviseContract() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      input,
    }: {
      id: string;
      input: Parameters<typeof contractsApi.reviseContractRequest>[1];
    }) => contractsApi.reviseContractRequest(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CONTRACTS_KEY }),
  });
}

export function useWithdrawContract() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: contractsApi.withdrawContractRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CONTRACTS_KEY }),
  });
}
