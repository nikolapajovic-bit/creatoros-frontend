export type DealStage =
  | "inquiry"
  | "negotiating"
  | "contract-sent"
  | "in-progress"
  | "completed";

export type ApprovalStatus = "pending" | "accepted" | "declined";

export interface Offer {
  value: number;
  message?: string;
  proposedByMe: boolean;
  createdAt: string;
}

export interface Deal {
  id: string;
  brand: string;
  brandLogoUrl?: string;
  title: string;
  stage: DealStage;
  approvalStatus: ApprovalStatus;
  sentByBrand: boolean; // da li je deal poslat od brenda (vs. kreator ga sam kreirao)
  value: number;
  currency: string;
  deadline: string; // ISO date string
  platform: "instagram" | "tiktok" | "youtube" | "other";
  offers: Offer[];
  creatorMarkedComplete: boolean;
  brandMarkedComplete: boolean;
}

export interface DealStageConfig {
  key: DealStage;
  label: string;
}

export const DEAL_STAGES: DealStageConfig[] = [
  { key: "inquiry", label: "Inquiry" },
  { key: "negotiating", label: "Negotiating" },
  { key: "contract-sent", label: "Contract Sent" },
  { key: "in-progress", label: "In Progress" },
  { key: "completed", label: "Completed" },
];
