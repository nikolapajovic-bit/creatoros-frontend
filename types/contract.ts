export type ContractStatus =
  | "draft"
  | "awaiting_signature"
  | "changes_requested"
  | "signed"
  | "declined"
  | "expired";

export interface RevisionRequest {
  message: string;
  requestedByMe: boolean;
  createdAt: string;
}

export interface Contract {
  id: string;
  title: string;
  brand: string;
  bodyText: string;
  status: ContractStatus;
  value: number;
  currency: string;
  createdDate: string;
  expiryDate: string;
  creatorSigned: boolean;
  brandSigned: boolean;
  sentByBrand: boolean;
  hasFinalPdf: boolean;
  revisionRequests: RevisionRequest[];
}

export interface ContractStatusConfig {
  key: ContractStatus;
  label: string;
  color: string;
}

export const CONTRACT_STATUSES: ContractStatusConfig[] = [
  { key: "draft", label: "Draft", color: "#5C5870" },
  { key: "awaiting_signature", label: "Awaiting signature", color: "#F5A623" },
  { key: "changes_requested", label: "Changes requested", color: "#9B7BFF" },
  { key: "signed", label: "Signed", color: "#4ADE80" },
  { key: "declined", label: "Declined", color: "#F0577A" },
  { key: "expired", label: "Expired", color: "#F0577A" },
];
