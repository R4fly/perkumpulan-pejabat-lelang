// lib/data.ts
import { getAnnouncements } from "@/lib/services/announcements";

export async function listAnnouncements({ limit }: { limit?: number } = {}) {
  const announcements = await getAnnouncements();
  if (limit) {
    return announcements.slice(0, limit);
  }
  return announcements;
}