"use client";

import { useFormStatus } from "react-dom";
import { LogOut } from "lucide-react";
import { logout } from "@/app/actions/auth-actions";

function LogoutSubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-md border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
      title="Keluar"
    >
      <LogOut className="h-4 w-4" />
      <span className="ml-1 hidden sm:inline">{pending ? "Keluar..." : "Keluar"}</span>
    </button>
  );
}

export function LogoutButton() {
  return (
    <form action={logout}>
      <LogoutSubmitButton />
    </form>
  );
}