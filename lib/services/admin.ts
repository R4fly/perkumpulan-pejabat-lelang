"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createAnnouncement(formData: FormData) {
  const supabase = await createClient();
  
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const image_url = formData.get("image_url") as string;

  const { error } = await supabase.from("announcements").insert({ title, description, image_url });

  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/pengumuman");
}

export async function deleteAnnouncement(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("announcements").delete().eq("id", id);
  if (error) throw new Error(error.message);
  
  revalidatePath("/admin");
  revalidatePath("/pengumuman");
}