import { createClient } from "@/lib/supabase/server";

export interface Regulation {
  id: string;
  title: string;
  description: string | null;
  file_url: string | null;
  created_at: string;
}

export async function getRegulations(): Promise<Regulation[]> {
  const supabase = await createClient();
  
  try {
    const { data, error } = await supabase
      .from("regulations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching regulations:", error.message);
      return [];
    }

    return data as Regulation[];
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Unexpected error fetching regulations:", err.message);
    }
    return [];
  }
}