"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="inline-flex items-center justify-center rounded-md border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
      title="Keluar"
    >
      <LogOut className="h-4 w-4" />
      <span className="ml-1 hidden sm:inline">
        {isLoading ? "Keluar..." : "Keluar"}
      </span>
    </button>
  );
}