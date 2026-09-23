import { fetchWithAuth, API_URL } from "@/lib/api/client";
import type { MediaAsset } from "@/types/media";

interface MediaApiResponse {
  _id: string;
  title: string;
  type: MediaAsset["type"];
  tags: string[];
  relatedBrand?: string;
  durationSeconds?: number;
  fileUrl: string;
  createdAt: string;
}

function mapMedia(raw: MediaApiResponse): MediaAsset {
  return {
    id: raw._id,
    title: raw.title,
    type: raw.type,
    tags: raw.tags,
    relatedBrand: raw.relatedBrand,
    durationSeconds: raw.durationSeconds,
    fileUrl: raw.fileUrl,
    createdAt: raw.createdAt,
  };
}

// Backend servira fajlove na istom hostu/portu kao API, samo bez "/api" prefiksa
export function getMediaFileUrl(fileUrl: string): string {
  const base = API_URL.replace(/\/api\/?$/, "");
  return `${base}${fileUrl}`;
}

export async function getMediaRequest(): Promise<MediaAsset[]> {
  const res = await fetchWithAuth(`${API_URL}/media`);
  if (!res.ok) throw new Error("Failed to load media");
  const data = await res.json();
  return data.media.map(mapMedia);
}

export async function uploadMediaRequest(input: {
  file: File;
  title: string;
  tags: string[];
  relatedBrand?: string;
}): Promise<MediaAsset> {
  const formData = new FormData();
  formData.append("file", input.file);
  formData.append("title", input.title);
  formData.append("tags", input.tags.join(","));
  if (input.relatedBrand) formData.append("relatedBrand", input.relatedBrand);

  const res = await fetchWithAuth(`${API_URL}/media`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? "Upload failed");
  }

  const data = await res.json();
  return mapMedia(data.asset);
}

export async function deleteMediaRequest(id: string): Promise<void> {
  const res = await fetchWithAuth(`${API_URL}/media/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete media");
}
