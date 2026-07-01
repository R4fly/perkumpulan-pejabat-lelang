"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Scale } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/types";

interface NavLink {
  href: string;
  label: string;
}

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Beranda" },
  { href: "/peraturan", label: "Peraturan" },
  { href: "/pengumuman", label: "Pengumuman" },
  { href: "/tentang", label: "Tentang Kami" },
];

export function Navbar(): React.JSX.Element {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-djkn-100 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Navigasi utama"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-djkn-700 hover:text-djkn-800"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-djkn-700 text-djkn-50">
            <Scale className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-semibold sm:text-base">
              {SITE_CONFIG.name}
            </span>
            <span className="text-xs text-muted-foreground">
              Asosiasi Pejabat Lelang Indonesia
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-djkn-50 text-djkn-800"
                      : "text-foreground/80 hover:bg-djkn-50 hover:text-djkn-800",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li className="ml-2">
            <Button asChild size="sm">
              <Link href="/login">Masuk</Link>
            </Button>
          </li>
        </ul>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </Button>
      </nav>

      {/* Mobile menu */}
      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-djkn-100 bg-background md:hidden"
        >
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-djkn-50 text-djkn-800"
                        : "text-foreground/80 hover:bg-djkn-50 hover:text-djkn-800",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-1">
              <Button asChild className="w-full">
                <Link href="/login">Masuk</Link>
              </Button>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
