import { createClient } from "@/lib/supabase/server";

export interface Announcement {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
}

export interface AnnouncementsQuery {
  page?: number;
  limit?: number;
  search?: string;
}

export interface AnnouncementsResponse {
  data: Announcement[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function getAnnouncements(
  query: AnnouncementsQuery = {}
): Promise<AnnouncementsResponse> {
  const supabase = await createClient();
  
  const { page = 1, limit = 9, search = "" } = query;
  const offset = (page - 1) * limit;

  try {
    let queryBuilder = supabase
      .from("announcements")
      .select("*", { count: "exact" });

    // Apply search filter jika ada
    if (search.trim()) {
      queryBuilder = queryBuilder.or(
        `title.ilike.%${search}%,description.ilike.%${search}%`
      );
    }

    // Apply pagination
    queryBuilder = queryBuilder
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    const { data, error, count } = await queryBuilder;

    if (error) {
      console.error("Error fetching announcements:", error.message);
      return {
        data: [],
        total: 0,
        page,
        limit,
        totalPages: 0,
      };
    }

    const totalPages = count ? Math.ceil(count / limit) : 0;

    return {
      data: (data as Announcement[]) || [],
      total: count || 0,
      page,
      limit,
      totalPages,
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Unexpected error fetching announcements:", err.message);
    }
    return {
      data: [],
      total: 0,
      page,
      limit,
      totalPages: 0,
    };
  }
}

// Function lama untuk backward compatibility
export async function listAnnouncements({ limit }: { limit?: number } = {}): Promise<Announcement[]> {
  const response = await getAnnouncements({ limit: limit || 3 });
  return response.data;
}