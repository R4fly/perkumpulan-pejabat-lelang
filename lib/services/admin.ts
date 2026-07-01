"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

export async function createAnnouncement(formData: FormData) {
  // Validasi admin sebelum melakukan operasi
  await requireAdmin();

  const supabase = await createClient();
  
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const image_url = formData.get("image_url") as string;

  const { error } = await supabase.from("announcements").insert({ title, description, image_url });

  if (error) {
    console.error("Error creating announcement:", error.message);
    throw new Error("Gagal membuat pengumuman: " + error.message);
  }

  revalidatePath("/admin");
  revalidatePath("/pengumuman");
}

export async function deleteAnnouncement(id: string) {
  // Validasi admin sebelum melakukan operasi
  await requireAdmin();

  const supabase = await createClient();
  const { error } = await supabase.from("announcements").delete().eq("id", id);
  
  if (error) {
    console.error("Error deleting announcement:", error.message);
    throw new Error("Gagal menghapus pengumuman: " + error.message);
  }
  
  revalidatePath("/admin");
  revalidatePath("/pengumuman");
}