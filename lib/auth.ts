import { createClient } from "@/lib/supabase/server";

export async function isAdmin(): Promise<boolean> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !user.email) {
    return false;
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  
  if (!adminEmail) {
    console.error("ADMIN_EMAIL is not set in environment variables");
    return false;
  }

  return user.email.toLowerCase() === adminEmail.toLowerCase();
}

export async function requireAdmin(): Promise<void> {
  const isUserAdmin = await isAdmin();
  
  if (!isUserAdmin) {
    throw new Error("Unauthorized: Admin access required");
  }
}