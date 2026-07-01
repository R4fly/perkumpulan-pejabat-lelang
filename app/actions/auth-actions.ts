"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function logout() {
  const supabase = await createClient();
  
  // Clear session di server (cookie akan otomatis terhapus oleh middleware)
  await supabase.auth.signOut();
  
  // Redirect ke home setelah logout berhasil
  redirect("/");
}