import { getAnnouncements } from "@/lib/services/announcements";

export async function listAnnouncements({ limit }: { limit?: number } = {}) {
  const response = await getAnnouncements({ limit: limit || 3 });
  return response.data;
}