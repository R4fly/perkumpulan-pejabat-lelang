"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { sendAnnouncementNotification } from "@/lib/services/email";

export async function createAnnouncement(formData: FormData) {
  await requireAdmin();

  const supabase = await createClient();
  
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const image_url = formData.get("image_url") as string;

  // Insert announcement
  const { data: announcement, error } = await supabase
    .from("announcements")
    .insert({ title, description, image_url })
    .select()
    .single();

  if (error) {
    console.error("Error creating announcement:", error.message);
    throw new Error("Gagal membuat pengumuman: " + error.message);
  }

  // Get all subscribers
  const { data: subscribers } = await supabase
    .from("email_subscriptions")
    .select("email, unsubscribe_token")
    .eq("subscribed_to_announcements", true);

  // Send notification emails (async, tidak block response)
  if (subscribers && subscribers.length > 0) {
    // Kirim emails secara parallel
    Promise.all(
      subscribers.map((subscriber) =>
        sendAnnouncementNotification(
          subscriber.email,
          title,
          description,
          announcement.id,
          subscriber.unsubscribe_token
        )
      )
    ).catch((err) => {
      console.error("Error sending notification emails:", err);
    });
  }

  revalidatePath("/admin");
  revalidatePath("/pengumuman");
}

export async function deleteAnnouncement(id: string) {
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