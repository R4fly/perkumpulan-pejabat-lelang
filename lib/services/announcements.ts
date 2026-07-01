import { createClient } from "@/lib/supabase/server";

export interface Announcement {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
}

export async function getAnnouncements(): Promise<Announcement[]> {
  const supabase = await createClient();
  
  try {
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching announcements:", error.message);
      return [];
    }

    return data as Announcement[];
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Unexpected error fetching announcements:", err.message);
    }
    return [];
  }
}