import { apiFetch } from "@/lib/api/client";

interface FoundUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface CreatorSummary {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface BusinessContact {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

export async function lookupUserByEmail(email: string): Promise<FoundUser> {
  return (
    await apiFetch<{ user: FoundUser }>(
      `/users/lookup?email=${encodeURIComponent(email)}`,
    )
  ).user;
}

export async function listCreatorsRequest(): Promise<CreatorSummary[]> {
  const data = await apiFetch<{ creators: CreatorSummary[] }>(
    "/users/creators",
  );
  return data.creators;
}

export async function getBusinessContactsRequest(): Promise<BusinessContact[]> {
  const data = await apiFetch<{ contacts: BusinessContact[] }>(
    "/users/contacts",
  );

  return data.contacts;
}
