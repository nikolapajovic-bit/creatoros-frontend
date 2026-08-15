export type MediaType = "image" | "video";

export interface MediaAsset {
  id: string;
  title: string;
  type: MediaType;
  tags: string[];
  relatedBrand?: string;
  durationSeconds?: number;
  fileUrl?: string;
  createdAt: string;
}
