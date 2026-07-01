import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";

export async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/djkn.jpeg"
            alt="Logo DJKN"
            width={40}
            height={40}
            className="rounded-full object-cover"
            priority
          />
          <span className="text-lg font-bold text-djkn-700 hidden sm:inline">
            {SITE_CONFIG.name}
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link href="/pengumuman" className="text-djkn-800 hover:text-djkn-600 transition-colors hidden md:inline">
            Pengumuman
          </Link>
          <Link href="/peraturan" className="text-djkn-800 hover:text-djkn-600 transition-colors hidden md:inline">
            Peraturan
          </Link>
          <Link href="/tentang" className="text-djkn-800 hover:text-djkn-600 transition-colors hidden md:inline">
            Tentang
          </Link>
          
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-md border border-djkn-700 px-4 py-2 text-sm font-medium text-djkn-700 transition-colors hover:bg-djkn-50"
              >
                Dashboard
              </Link>
              <LogoutButton />
            </>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-md bg-djkn-700 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-djkn-800"
            >
              Masuk
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

// Client component untuk logout button
import { LogoutButton } from "./logout-button";