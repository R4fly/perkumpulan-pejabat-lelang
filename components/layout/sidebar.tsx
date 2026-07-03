"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Home,
  Megaphone,
  FileText,
  User,
  Settings,
  HelpCircle,
  LayoutDashboard,
  Users,
  BarChart3,
  ChevronsRight,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuItem {
  icon: React.ElementType;
  title: string;
  href: string;
  badge?: number;
}

interface SidebarProps {
  variant: "user" | "admin";
  userEmail: string;
  userRole: "user" | "admin";
}

const USER_MENU: MenuItem[] = [
  { icon: Home, title: "Beranda", href: "/" },
  { icon: Megaphone, title: "Pengumuman", href: "/pengumuman" },
  { icon: FileText, title: "Peraturan", href: "/peraturan" },
  { icon: User, title: "Profil Saya", href: "/dashboard/profil" },
  { icon: Settings, title: "Pengaturan", href: "/dashboard/pengaturan" },
  { icon: HelpCircle, title: "Bantuan", href: "/tentang" },
];

const ADMIN_MENU: MenuItem[] = [
  { icon: LayoutDashboard, title: "Overview", href: "/admin" },
  { icon: Megaphone, title: "Kelola Pengumuman", href: "/admin/pengumuman" },
  { icon: FileText, title: "Kelola Peraturan", href: "/admin/peraturan" },
  { icon: Users, title: "Kelola Anggota", href: "/admin/anggota" },
  { icon: Shield, title: "Kelola Admin", href: "/admin/manage-admins" },
  { icon: BarChart3, title: "Laporan", href: "/admin/laporan" },
  { icon: Settings, title: "Pengaturan", href: "/admin/pengaturan" },
];

export function Sidebar({ variant, userEmail, userRole }: SidebarProps) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const menu = variant === "admin" ? ADMIN_MENU : USER_MENU;

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        className={cn(
          "fixed lg:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)] shrink-0 border-r transition-all duration-300 ease-in-out",
          "border-djkn-200 bg-white shadow-sm",
          open ? "w-64" : "w-16",
          !open && "hidden lg:block"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Title Section */}
          <div className="border-b border-djkn-200 p-4">
            <div className="flex items-center gap-3">
              <div className="grid size-10 shrink-0 place-content-center rounded-lg bg-gradient-to-br from-djkn-600 to-djkn-800 shadow-sm">
                <Image
                  src="/djkn.jpeg"
                  alt="PPL"
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
              </div>
              {open && (
                <div className="flex-1 min-w-0 transition-opacity duration-200">
                  <div className="flex items-center gap-2">
                    <div className="min-w-0">
                      <span className="block text-sm font-semibold text-djkn-900 truncate">
                        {userEmail.split("@")[0]}
                      </span>
                      <span className="block text-xs text-djkn-500 truncate">
                        {userRole === "admin" ? "Administrator" : "Anggota"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {open && (
              <div className="px-3 py-2 text-xs font-medium text-djkn-500 uppercase tracking-wide">
                {variant === "admin" ? "Admin Panel" : "Menu"}
              </div>
            )}
            {menu.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative flex h-11 w-full items-center rounded-md transition-all duration-200",
                    isActive
                      ? "bg-djkn-50 text-djkn-800 shadow-sm border-l-2 border-djkn-700"
                      : "text-djkn-600 hover:bg-djkn-50 hover:text-djkn-900"
                  )}
                  title={!open ? item.title : undefined}
                >
                  <div className="grid h-full w-12 place-content-center">
                    <Icon className="h-4 w-4" />
                  </div>
                  {open && (
                    <span className="text-sm font-medium flex-1 truncate">
                      {item.title}
                    </span>
                  )}
                  {item.badge && open && (
                    <span className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-djkn-700 text-xs text-white font-medium">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => setOpen(!open)}
            className="border-t border-djkn-200 transition-colors hover:bg-djkn-50"
          >
            <div className="flex items-center p-3">
              <div className="grid size-10 place-content-center">
                <ChevronsRight
                  className={cn(
                    "h-4 w-4 transition-transform duration-300 text-djkn-500",
                    open && "rotate-180"
                  )}
                />
              </div>
              {open && (
                <span className="text-sm font-medium text-djkn-600 transition-opacity duration-200">
                  Sembunyikan
                </span>
              )}
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Toggle Button (when sidebar is closed) */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-4 left-4 z-50 lg:hidden p-3 rounded-full bg-djkn-700 text-white shadow-lg hover:bg-djkn-800 transition-colors"
        >
          <LayoutDashboard className="h-5 w-5" />
        </button>
      )}
    </>
  );
}