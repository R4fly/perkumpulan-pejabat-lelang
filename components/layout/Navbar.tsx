import Link from "next/link";
import { SITE_CONFIG } from "@/lib/types";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-djkn-700 dark:text-djkn-400">
            {SITE_CONFIG.name}
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/pengumuman" className="text-djkn-800 dark:text-djkn-200 hover:text-djkn-600 dark:hover:text-djkn-400 transition-colors">
            Pengumuman
          </Link>
          <Link href="/peraturan" className="text-djkn-800 dark:text-djkn-200 hover:text-djkn-600 dark:hover:text-djkn-400 transition-colors">
            Peraturan
          </Link>
          <Link href="/tentang" className="text-djkn-800 dark:text-djkn-200 hover:text-djkn-600 dark:hover:text-djkn-400 transition-colors">
            Tentang
          </Link>
          <ThemeToggle />
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-md bg-djkn-700 dark:bg-djkn-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-djkn-800 dark:hover:bg-djkn-700"
          >
            Masuk
          </Link>
        </nav>
      </div>
    </header>
  );
}