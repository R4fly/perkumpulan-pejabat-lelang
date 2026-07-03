import { createClient } from "@/lib/supabase/server";

export interface Regulation {
  id: string;
  title: string;
  description: string | null;
  file_url: string | null;
  created_at: string;
}

export interface RegulationsQuery {
  page?: number;
  limit?: number;
  search?: string;
}

export interface RegulationsResponse {
  data: Regulation[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function getRegulations(
  query: RegulationsQuery = {}
): Promise<RegulationsResponse> {
  const supabase = await createClient();
  
  const { page = 1, limit = 9, search = "" } = query;
  const offset = (page - 1) * limit;

  try {
    let queryBuilder = supabase
      .from("regulations")
      .select("*", { count: "exact" });

    if (search.trim()) {
      queryBuilder = queryBuilder.or(
        `title.ilike.%${search}%,description.ilike.%${search}%`
      );
    }

    queryBuilder = queryBuilder
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    const { data, error, count } = await queryBuilder;

    if (error) {
      console.error("Error fetching regulations:", error.message);
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
      data: (data as Regulation[]) || [],
      total: count || 0,
      page,
      limit,
      totalPages,
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Unexpected error fetching regulations:", err.message);
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

export async function getRegulationCount(): Promise<number> {
  const supabase = await createClient();
  
  try {
    const { count, error } = await supabase
      .from("regulations")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("Error counting regulations:", error.message);
      return 0;
    }

    return count || 0;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Unexpected error counting regulations:", err.message);
    }
    return 0;
  }
}