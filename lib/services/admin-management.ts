"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

export async function getAllUsers() {
  await requireAdmin();

  const supabase = await createClient();

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("id, email, role, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching users:", error);
    return [];
  }

  return profiles || [];
}

export async function promoteToAdmin(userId: string) {
  await requireAdmin();

  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .update({ role: "admin" })
    .eq("id", userId);

  if (error) {
    console.error("Error promoting user:", error);
    throw new Error("Gagal promote user ke admin");
  }

  revalidatePath("/admin/manage-admins");
  revalidatePath("/admin");
}

export async function demoteToUser(userId: string) {
  await requireAdmin();

  const supabase = await createClient();

  // Cek apakah ini admin terakhir
  const { count } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .eq("role", "admin");

  if (count === 1) {
    throw new Error("Tidak bisa demote admin terakhir. Harus ada minimal 1 admin.");
  }

  const { error } = await supabase
    .from("profiles")
    .update({ role: "user" })
    .eq("id", userId);

  if (error) {
    console.error("Error demoting user:", error);
    throw new Error("Gagal demote admin ke user");
  }

  revalidatePath("/admin/manage-admins");
  revalidatePath("/admin");
}