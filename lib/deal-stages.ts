import type { DealStage } from "@/types/deal";

export const STAGE_COLOR: Record<DealStage, string> = {
  inquiry: "#5C5870", // ink-faint — tek stiglo, još nije "obojeno"
  negotiating: "#7C5CFC", // brand
  "contract-sent": "#9B7BFF", // brand, svetlija nijansa — prelaz
  "in-progress": "#F5A623", // gold — aktivan rad
  completed: "#4ADE80", // rise — gotovo, naplaćeno
};
